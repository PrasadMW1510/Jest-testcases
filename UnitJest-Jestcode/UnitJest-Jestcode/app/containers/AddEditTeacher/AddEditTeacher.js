/**
 *
 * AddEditTeacher
 *
 */

import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reducer as formReducer } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';

import TeacherForm from 'components/TeacherForm';
import { hideModal, showEditAdminModalWarning } from 'containers/ModalController/actions';
import * as AppSelectors from 'containers/App/selectors';

import { makeSelectProfilePageClassesData } from 'containers/ProfilePageContainer/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { extractIds } from 'utils/transformData';
import { USER_ORG, USER_TYPE, COHORT_TYPE } from 'containers/App/constants';
import { makeSelectSchoolId, makeSelectCohortType } from 'containers/SmartBarContainer/selectors';
import { TEACHER_PERMISSIONS_DEFAULT } from 'components/TeacherForm/constants';

import {
  addEditTeacherRequest,
  postAddTeacherRequest,
  postSaveTeacherRequest,
  postSaveTeacherMIARequest,
} from './actions';
import reducer from './reducer';
import { FORM_TEACHER_PROFILE } from './constants';
import saga from './saga';
import {
  makeSelectFormErrors,
  makeSelectSubmitErrors,
  makeSelectAddEditTeacherProfileDetails,
  makeSelectAddEditTeacherPermissionsData,
  makeSelectAddEditTeacherSchoolsAndClassesData,
  makeSelectAddEditTeacherPasswordConfigData,
  makeSelectAddEditTeacherContainer,
} from './selectors';
import validate from './validate';

const TeacherFormEnhanced = reduxForm({
  form: FORM_TEACHER_PROFILE,
  validate,
  enableReinitialize: true,
})(TeacherForm);

export class AddEditTeacher extends React.Component {
  componentDidMount() {
    this.props.addEditTeacherRequest(this.props.data.editTeacherId);
  }

  getInitialValues = () => {
    const { profileData, userOrg, data, classes, cohortType, teacherData } = this.props;

    let teacherProfileData;
    if (cohortType === COHORT_TYPE.Teacher || this.props.data.editTeacherId) {
      if (!teacherData) return {};
      teacherProfileData = teacherData;
    } else {
      teacherProfileData = profileData;
    }

    let initialValues = {
      district_user_id: teacherProfileData.getIn(['district_user_id', 0]),
      email: teacherProfileData.getIn(['email', 0]),
      first_name: teacherProfileData.getIn(['first_name', 0]),
      last_name: teacherProfileData.getIn(['last_name', 0]),
      password: teacherProfileData.getIn(['password', 0]),
      password_confirm: teacherProfileData.getIn(['password', 0]),
      password_hint: teacherProfileData.getIn(['password_hint', 0]),
      prefix: teacherProfileData.getIn(['prefix', 0]),
      sps_id: teacherProfileData.getIn(['sps_id', 0]),
      suffix: teacherProfileData.getIn(['suffix', 0]),
      title: teacherProfileData.getIn(['title', 0]),
      user_name: teacherProfileData.getIn(['user_name', 0]),
      user_type: teacherProfileData.getIn(['user_type', 0]),
    };

    if (userOrg === USER_ORG.Teacher) {
      // Initial values expects an immutable map that looks like fromJS({ foo: true })
      initialValues.classes = extractIds(
        teacherProfileData.get('classes').toJS(),
        'class',
        'class_id'
      );
    } else if (cohortType === COHORT_TYPE.Teacher && classes) {
      initialValues.classes = extractIds(classes.toJS(), 'class', 'class_id');
    }

    if (data.editTeacherId) {
      initialValues.classes = {};
    }
    if (!data.editMode) {
      initialValues = { user_type: USER_TYPE.Teacher, classes: {} };
    }
    return fromJS(initialValues);
  };

  getSchoolsAndClasses = () => {
    if (this.props.userOrg === USER_ORG.Teacher) {
      if (this.props.schoolsAndClasses) {
        return this.props.schoolsAndClasses.toJS();
      }
    } else if (this.props.teacherSchoolsAndClasses) {
      return this.props.teacherSchoolsAndClasses.toJS();
    }
    return {};
  };

  getPasswordConfig = () => {
    if (this.props.userOrg === USER_ORG.Teacher) {
      return this.props.passwordConfigs.get('configs').toJS();
    }

    return this.props.teacherPasswordConfig.get('configs').toJS();
  };

  permissionsCheckedIds = () => {
    if (this.props.cohortType === COHORT_TYPE.Teacher || this.props.data.editTeacherId) {
      if (!this.props.teacherPermissions) return [];
      return this.props.teacherPermissions;
    }
    return TEACHER_PERMISSIONS_DEFAULT;
  };

  associatedClasses = () =>
    !this.props.data.editTeacherId && this.props.classes && this.props.classes.toJS()[0].class
      ? this.props.classes.toJS()[0].class.map(classItem => classItem.class_id[0])
      : [];

  handleCancel = () => {
    this.props.hideModal();
  };

  handleSave = (values, permissionsChecked) => {
    const { data, teacherData, profileData, userOrg } = this.props;

    let teacherProfileData = teacherData;
    if (userOrg === USER_ORG.Teacher) {
      teacherProfileData = profileData;
    }

    if (data.editMode) {
      if (values.get('user_name') !== teacherProfileData.getIn(['user_name', 0])) {
        this.props.showEditAdminModalWarning({ values, isTeacher: true, permissionsChecked });
        return;
      }

      if (data.editTeacherId) {
        this.props.postSaveTeacherMIARequest(values, permissionsChecked, data);
      } else {
        this.props.postSaveTeacherRequest(values, permissionsChecked);
      }
    } else {
      this.props.postAddTeacherRequest(values, permissionsChecked);
    }
  };

  render() {
    return (
      <TeacherFormEnhanced
        isOpen
        initialValues={this.getInitialValues()}
        handleCancel={this.handleCancel}
        handleSave={this.handleSave}
        schoolsAndClassesData={this.getSchoolsAndClasses()}
        associatedClasses={this.associatedClasses()}
        passwordConfigsArray={this.props.passwordConfigs.get('configs').toJS()}
        permissions={this.props.permissionsData}
        permissionsChecked={this.permissionsCheckedIds()}
        editMode={this.props.data.editMode}
        editingSameAccount={this.props.data.editingSameAccount}
        selectedSchoolId={this.props.selectedSchoolId}
        userType={this.props.userType}
        {...this.props}
      />
    );
  }
}

AddEditTeacher.defaultProps = {
  data: {
    editMode: true,
    editingSameAccount: true,
  },
};

AddEditTeacher.propTypes = {
  addEditTeacherRequest: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  passwordConfigs: PropTypes.object.isRequired,
  teacherPasswordConfig: PropTypes.object,
  permissionsData: PropTypes.object.isRequired,
  postAddTeacherRequest: PropTypes.func.isRequired,
  postSaveTeacherRequest: PropTypes.func.isRequired,
  postSaveTeacherMIARequest: PropTypes.func.isRequired,
  profileData: PropTypes.object,
  teacherData: PropTypes.object,
  teacherPermissions: PropTypes.array,
  classes: PropTypes.object,
  schoolsAndClasses: PropTypes.object.isRequired,
  teacherSchoolsAndClasses: PropTypes.object,
  showEditAdminModalWarning: PropTypes.func.isRequired,
  userOrg: PropTypes.string,
  selectedSchoolId: PropTypes.string,
  cohortType: PropTypes.string,
  userType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  passwordConfigs: AppSelectors.makeSelectPasswordConfigData(),
  permissionsData: AppSelectors.makeSelectPermissionsData(),
  profileData: AppSelectors.makeSelectProfileData(),
  schoolsAndClasses: AppSelectors.makeSelectSchoolsAndClassesData(),
  classes: makeSelectProfilePageClassesData(),
  submitErrors: makeSelectSubmitErrors(),
  validationErrors: makeSelectFormErrors(),
  userOrg: AppSelectors.makeSelectLoginUserOrg(),
  selectedSchoolId: makeSelectSchoolId(),
  cohortType: makeSelectCohortType(),
  userType: AppSelectors.makeSelectProfileUserType(),
  teacherData: makeSelectAddEditTeacherProfileDetails(),
  teacherPermissions: makeSelectAddEditTeacherPermissionsData(),
  teacherSchoolsAndClasses: makeSelectAddEditTeacherSchoolsAndClassesData(),
  teacherPasswordConfig: makeSelectAddEditTeacherPasswordConfigData(),
  addEditTeacherContainer: makeSelectAddEditTeacherContainer(),
});

const withConnect = connect(mapStateToProps, {
  addEditTeacherRequest,
  hideModal,
  postAddTeacherRequest,
  postSaveTeacherRequest,
  postSaveTeacherMIARequest,
  showEditAdminModalWarning,
});

const withFormReducer = injectReducer({ key: 'form', reducer: formReducer });
const withReducer = injectReducer({ key: 'addEditTeacherContainer', reducer });

const withSaga = injectSaga({ key: 'addEditTeacherContainer', saga });

export default compose(withConnect, withFormReducer, withReducer, withSaga)(AddEditTeacher);
