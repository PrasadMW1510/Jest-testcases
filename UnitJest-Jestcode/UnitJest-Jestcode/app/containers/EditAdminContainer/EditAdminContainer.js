/**
 *
 * EditAdminContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, reducer as formReducer } from 'redux-form/immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { transformFormDisplayType } from 'utils/transformData';

import EditAdminForm from 'components/EditAdminForm';
import {
  hideModal,
  showModal,
  showEditAdminModalWarning,
} from 'containers/ModalController/actions';
import * as ModalConstants from 'containers/ModalController/constants';
import {
  makeSelectLoginUserOrg,
  makeSelectPasswordConfigData,
  makeSelectPermissionsData,
  makeSelectProfileData,
  makeSelectSchoolsData,
} from 'containers/App/selectors';
import {
  makeSelectAdminToEditData,
  makeSelectAdminToEditUserOrgId,
} from 'containers/ManageAdminAccountsContainer/selectors';
import { USER_ORG } from 'containers/App/constants';
import { FORM_EDIT_ADMIN, CREDENTIALS_MESSAGE } from './constants';
import { editAdminContainerRequest, postAddAdminRequest, postSaveAdminRequest } from './actions';
import { makeSelectFormErrors, makeSelectSubmitErrors } from './selectors';
import saga from './saga';
import validate from './validate';

const EditAdminFormEnhanced = reduxForm({
  form: FORM_EDIT_ADMIN,
  validate,
  enableReinitialize: true,
})(EditAdminForm);

export class EditAdminContainer extends React.Component {
  componentDidMount() {
    this.props.editAdminContainerRequest();

    if (this.props.data.defaultMode) {
      this.props.showModal(ModalConstants.WARNING_MODAL, {
        message: CREDENTIALS_MESSAGE,
      });
    }
  }

  getSchools = () => {
    if (!this.props.schools) {
      return null;
    }

    const list = this.props.schools
      .map(item => ({ text: item.getIn(['name', 0]), id: item.getIn(['org_id', 0]) }))
      .toJS();

    return list;
  };

  getInitialValues = () => {
    const { adminToEditData, profileData, userOrg, data } = this.props;

    let initialValues = {
      district_user_id: profileData.getIn(['district_user_id', 0]),
      email: profileData.getIn(['email', 0]),
      first_name: profileData.getIn(['first_name', 0]),
      last_name: profileData.getIn(['last_name', 0]),
      password: profileData.getIn(['password', 0]),
      password_confirm: profileData.getIn(['password', 0]),
      password_hint: profileData.getIn(['password_hint', 0]),
      prefix: profileData.getIn(['prefix', 0]),
      sps_id: profileData.getIn(['sps_id', 0]),
      suffix: profileData.getIn(['suffix', 0]),
      title: profileData.getIn(['title', 0]),
      user_name: profileData.getIn(['user_name', 0]),
      user_type: profileData.getIn(['user_type', 0]),
    };

    if (!data.editingSameAccount) {
      initialValues = {
        district_user_id: adminToEditData.getIn(['district_user_id', 0]),
        email: adminToEditData.getIn(['email', 0]),
        first_name: adminToEditData.getIn(['first_name', 0]),
        last_name: adminToEditData.getIn(['last_name', 0]),
        password: adminToEditData.getIn(['password', 0]),
        password_confirm: adminToEditData.getIn(['password', 0]),
        password_hint: adminToEditData.getIn(['password_hint', 0]),
        prefix: adminToEditData.getIn(['prefix', 0]),
        sps_id: adminToEditData.getIn(['sps_id', 0]),
        suffix: adminToEditData.getIn(['suffix', 0]),
        title: adminToEditData.getIn(['title', 0]),
        user_name: adminToEditData.getIn(['user_name', 0]),
        user_type: data.accountType,
      };
    }

    if (!data.editMode) {
      initialValues = { user_type: data.accountType };
    }

    if (userOrg === USER_ORG.School) {
      const organizationObj = profileData.getIn(['organizations', 0, 'organization', 0]);
      initialValues.school_name = organizationObj.getIn(['name', 0]);
    }

    if (userOrg === USER_ORG.District && !this.props.data.defaultMode) {
      const schools = this.props.schools.toJS();

      initialValues.school_name = schools[0].org_id[0];

      if (data.editMode && !data.editingSameAccount) {
        initialValues.school_name = this.props.adminToEditUserOrgId;
      }
    }

    return fromJS(initialValues);
  };

  handleCancel = () => {
    if (this.props.data.defaultMode) {
      this.props.showModal(ModalConstants.CANCEL_CREDENTIALS_MODAL);
      return;
    }
    this.props.hideModal();
  };

  handleSave = (values, permissionsChecked) => {
    const { data, profileData, adminToEditData } = this.props;

    if (data.editMode && data.editingSameAccount) {
      if (values.get('user_name') !== profileData.getIn(['user_name', 0])) {
        this.props.showEditAdminModalWarning({
          values,
          isTeacher: false,
          editingSameAccount: true,
        });
        return;
      }
      this.props.postSaveAdminRequest(values, permissionsChecked, data.editingSameAccount);
    }

    if (data.editMode && !data.editingSameAccount) {
      const userType = transformFormDisplayType(data.accountType);
      const formValues = values.set('user_type', userType);

      if (values.get('user_name') !== adminToEditData.getIn(['user_name', 0])) {
        this.props.showEditAdminModalWarning({
          values: formValues,
          isTeacher: false,
          editingSameAccount: false,
          permissionsChecked,
        });
        return;
      }

      this.props.postSaveAdminRequest(formValues, permissionsChecked, data.editingSameAccount);
    }

    if (!data.editMode) {
      this.props.postAddAdminRequest(values, permissionsChecked);
    }
  };

  render() {
    const { profileData } = this.props;
    const school = profileData.getIn(['organizations', 0, 'organization', 0]);
    return (
      <EditAdminFormEnhanced
        isOpen
        adminToEditData={this.props.adminToEditData}
        editMode={this.props.data.editMode}
        editingSameAccount={this.props.data.editingSameAccount}
        initialValues={this.getInitialValues()}
        schools={this.getSchools()}
        school={school}
        handleCancel={this.handleCancel}
        permissions={this.props.permissionsData}
        handleSave={this.handleSave}
        passwordConfigsArray={this.props.passwordConfigs.get('configs').toJS()}
        {...this.props}
      />
    );
  }
}

EditAdminContainer.defaultProps = {
  userOrg: '',
  data: {
    editMode: true,
    editingSameAccount: true,
  },
};

EditAdminContainer.propTypes = {
  editAdminContainerRequest: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  passwordConfigs: PropTypes.object.isRequired,
  permissionsData: PropTypes.object.isRequired,
  postSaveAdminRequest: PropTypes.func.isRequired,
  postAddAdminRequest: PropTypes.func.isRequired,
  profileData: PropTypes.object.isRequired,
  showEditAdminModalWarning: PropTypes.func.isRequired,
  adminToEditData: PropTypes.object,
  adminToEditUserOrgId: PropTypes.string,
  schools: PropTypes.object,
  userOrg: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  passwordConfigs: makeSelectPasswordConfigData(),
  schools: makeSelectSchoolsData(),
  permissionsData: makeSelectPermissionsData(),
  profileData: makeSelectProfileData(),
  adminToEditData: makeSelectAdminToEditData(),
  adminToEditUserOrgId: makeSelectAdminToEditUserOrgId(),
  submitErrors: makeSelectSubmitErrors(),
  userOrg: makeSelectLoginUserOrg(),
  validationErrors: makeSelectFormErrors(),
});

const withConnect = connect(mapStateToProps, {
  editAdminContainerRequest,
  hideModal,
  showModal,
  postSaveAdminRequest,
  postAddAdminRequest,
  showEditAdminModalWarning,
});

const withReducer = injectReducer({ key: 'form', reducer: formReducer });
const withSaga = injectSaga({ key: 'editAdminContainer', saga });

export default compose(withReducer, withSaga, withConnect)(EditAdminContainer);
