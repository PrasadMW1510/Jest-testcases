/**
 *
 * EditDistrictProfileContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { getFormValues, reduxForm, reducer as formReducer } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import makeSelectProfilePageData from 'containers/ProfilePageContainer/selectors';
import { sortData } from 'utils/utilities';
import EditDistrictProfile from 'components/EditDistrictProfile';
import * as ModalConstants from 'containers/ModalController/constants';
import { hideModal, showModal } from 'containers/ModalController/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import validate from './validate';
import { getTimeZonesRequest, updateDistrictProfileRequest } from './actions';
import {
  makeSelectEditDistrictProfileContainer,
  makeSelectDistrictTimeZones,
  makeSelectCustomDemographics,
  makeSelectSubmitErrors,
  makeSelectFormErrors,
} from './selectors';
import { FORM_EDIT_DISTRICT_PROFILE, FORM_TITLE } from './constants';

// Form initial values set in saga after data fetching is complete.
const EditDistrictProfileFormAdvanced = reduxForm({
  form: FORM_EDIT_DISTRICT_PROFILE,
  validate,
  enableReinitialize: true,
})(EditDistrictProfile);

export class EditDistrictProfileContainer extends React.Component {
  componentDidMount = () => {
    this.props.getTimeZonesRequest(this.props.profile);
  };

  getApplications = () => {
    const districtInfo = this.props.profile.get('profileDetailsDistAdmin').get('district_info');

    const applications = districtInfo.getIn([0, 'apps', 0, 'app']).toJS();

    const labeledApps = applications.map(app => {
      const name = app.$.name;

      const checkboxItem = {
        label: name,
        id: app._,
      };

      return checkboxItem;
    });

    const sortedLabeledApps = labeledApps.sort((a, b) => sortData(a.label, b.label));

    const appColumnCount = Math.ceil(sortedLabeledApps.length / 2);

    const leftSide = sortedLabeledApps.slice(0, appColumnCount);

    const rightSide = sortedLabeledApps.slice(appColumnCount, sortedLabeledApps.length);

    const appsInFormOrder = [];

    sortedLabeledApps.forEach((app, i) => {
      if (leftSide[i]) {
        appsInFormOrder.push(leftSide[i]);
      }
      if (rightSide[i]) {
        appsInFormOrder.push(rightSide[i]);
      }
    });

    return appsInFormOrder;
  };

  getApplicationsChecked = () => {
    const districtInfo = this.props.profile.get('profileDetailsDistAdmin').get('district_info');

    const applications = districtInfo.getIn([0, 'apps', 0, 'app']).toJS();

    const applicationsChecked = applications.reduce(
      (obj, app) => ({
        ...obj,
        [app._]: app.$.restricted === 'true',
      }),
      {}
    );

    return applicationsChecked;
  };

  getSchoolDaysChecked = () => {
    const districtInfo = this.props.profile.get('profileDetailsDistAdmin').get('district_info');
    const schoolDays = districtInfo.getIn([0, 'school_days', 0, 'school_day']);
    let schoolDaysChecked = {};

    if (schoolDays) {
      schoolDaysChecked = schoolDays.reduce(
        (obj, day) => ({
          ...obj,
          [day]: true,
        }),
        {}
      );
    }

    return schoolDaysChecked;
  };

  getInitialValues = () => {
    const { profile } = this.props;

    const displayName = profile.get('profileDetailsDistAdmin').getIn(['display_name', 0]);
    const districtInfo = this.props.profile.get('profileDetailsDistAdmin').get('district_info');
    const contactPerson = this.props.profile.get('profileDetailsDistAdmin').get('contact_person');
    const contactInfo = this.props.profile.get('profileDetailsDistAdmin').get('contact_info');

    const description = this.props.profile.get('profileDetailsDistAdmin').getIn(['description', 0]);
    const type = this.props.profile.get('profileDetailsDistAdmin').getIn(['type', 0]);

    const initialValues = {
      name: displayName,
      description,
      type,
      location: districtInfo.getIn([0, 'location', 0]),
      school_days: this.getSchoolDaysChecked(),
      time_zone: districtInfo.getIn([0, 'time_zone', 0]),
      start_of_day: districtInfo.getIn([0, 'start_of_day', 0]),
      end_of_day: districtInfo.getIn([0, 'end_of_day', 0]),
      restricted_apps: this.getApplicationsChecked(),
      last_name: contactPerson.getIn([0, 'last_name', 0]),
      first_name: contactPerson.getIn([0, 'first_name', 0]),
      middle_name: contactPerson.getIn([0, 'middle_name', 0]),
      title: contactPerson.getIn([0, 'title', 0]),
      email_address1: contactInfo.getIn([0, 'email_address1', 0]),
      address1: contactInfo.getIn([0, 'address1', 0]),
      address2: contactInfo.getIn([0, 'address2', 0]),
      address3: contactInfo.getIn([0, 'address3', 0]),
      phone_number1: contactInfo.getIn([0, 'phone_number1', 0]),
      state: contactInfo.getIn([0, 'state', 0]),
      city: contactInfo.getIn([0, 'city', 0]),
      postal_code: contactInfo.getIn([0, 'postal_code', 0]),
    };

    return fromJS(initialValues);
  };

  handleSave = values => {
    this.props.updateDistrictProfileRequest(values);
  };

  handleCancel = () => {
    this.props.hideModal();
  };

  handleAddDemographic = () => {
    const demographicList = this.props.customDemographics;
    this.props.showModal(ModalConstants.ADD_DEMOGRAPHIC_MODAL, {
      demographicList,
    });
  };

  render() {
    // we pick out the props defined via connect(..) method to prevent
    // duplicate properties in the child component.
    return (
      <EditDistrictProfileFormAdvanced
        handleCancel={this.handleCancel}
        handleSave={this.handleSave}
        handleAddDemographic={this.handleAddDemographic}
        showModal={this.props.showModal}
        isOpen
        initialValues={this.getInitialValues()}
        applications={this.getApplications()}
        customDemographics={this.props.customDemographics}
        timeZones={this.props.timeZones}
        onSubmitFail={this.handleSubmitFail}
        title={FORM_TITLE}
        {...this.props}
      />
    );
  }
}

EditDistrictProfileContainer.defaultProps = {
  data: {}, // passed-on from ModalController
};

EditDistrictProfileContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  customDemographics: PropTypes.array,
  profile: PropTypes.object.isRequired,
  getTimeZonesRequest: PropTypes.func.isRequired,
  updateDistrictProfileRequest: PropTypes.func.isRequired,
  timeZones: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  formData: getFormValues(FORM_EDIT_DISTRICT_PROFILE),
  profile: makeSelectProfilePageData(),
  editDistrictProfileContainer: makeSelectEditDistrictProfileContainer(),
  timeZones: makeSelectDistrictTimeZones(),
  customDemographics: makeSelectCustomDemographics(),
  submitErrors: makeSelectSubmitErrors(),
  validationErrors: makeSelectFormErrors(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  showModal,
  getTimeZonesRequest,
  updateDistrictProfileRequest,
});

const withFormReducer = injectReducer({ key: 'form', reducer: formReducer });
const withReducer = injectReducer({ key: 'editDistrictProfileContainer', reducer });

const withSaga = injectSaga({ key: 'editDistrictProfileContainer', saga });

export default compose(withConnect, withReducer, withFormReducer, withSaga)(
  EditDistrictProfileContainer
);
