/**
 *
 * EditDistrictProfile
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import FormFieldFocuser from 'components/FormFieldFocuser';
import { FormSection, FormErrors } from 'components/forms';
import NavBar, { NavItem } from 'components/NavBar';
import DistrictProfile from './DistrictProfile';
import DistrictContactInfo from './DistrictContactInfo';
import DemographicList from './DemographicList';
import AddDemographic from './AddDemographic';
import CustomDemographicList from './CustomDemographicList';
import {
  TAB_CONTACT,
  TAB_PROFILE,
  TAB_DEMOGRAPHICS,
  AYP_LIST,
  GENDER_LIST,
  ETHNICITY_LIST,
} from './constants';
import './EditDistrictProfile.scss';

class EditDistrictProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: TAB_PROFILE, // Current active tab
      customDemographics: [],
    };
  }

  handleTabClick = ev => this.setState({ activeTab: ev.currentTarget.id });
  handleSave = values => this.props.handleSave(values, this.props.data);

  hasProfileTabErrorsOnSave = validationErrors =>
    this.props.submitFailed && !!validationErrors.name;

  hasContactTabErrorsOnSave = (validationErrors, stateOrZipHasErrors) =>
    this.props.submitFailed &&
    !!(
      validationErrors.last_name ||
      validationErrors.first_name ||
      validationErrors.email_address1 ||
      validationErrors.address1 ||
      validationErrors.city ||
      stateOrZipHasErrors
    );

  render = () => {
    const {
      handleSubmit,
      isOpen,
      submitErrors,
      submitFailed,
      title,
      validationErrors: validationErrorsProp,
    } = this.props;

    const { activeTab } = this.state;
    const demographicTabActive = activeTab === TAB_DEMOGRAPHICS;

    const validationErrors = validationErrorsProp || {};
    const hasErrorsOnSave = submitFailed && !!(validationErrorsProp || submitErrors);
    const hasErrorsRequiringPopup = !!validationErrors.popupErrorFieldName;
    const stateOrZipHasErrors = !!(validationErrors.state || validationErrors.postal_code);
    const tabs = [
      {
        id: TAB_PROFILE,
        label: 'Profile',
        hasErrors: this.hasProfileTabErrorsOnSave(validationErrors),
      },
      {
        id: TAB_CONTACT,
        label: 'Contact',
        hasErrors: this.hasContactTabErrorsOnSave(validationErrors, stateOrZipHasErrors),
      },

      {
        id: TAB_DEMOGRAPHICS,
        label: 'Demographics',
      },
    ];
    return (
      <SAMModal
        isOpen={isOpen}
        contentLabel={`${title} Modal`}
        modalClassModifier="modal--edit-district-profile"
      >
        <div className="edit-district-profile edit-district-profile--orange">
          <h2 className="edit-district-profile__heading">{title}</h2>
          <div className="edit-district-profile__intro">
            Edit information about your account on the Profile, Contact, and Demographics tabs.
            Items marked with an asterisk (*) are required. When you are done, click Save to finish.
          </div>
          <div className="edit-district-profile__navbar-bg">
            <NavBar activeItemId={activeTab} theme="tabs" palette="orange" inset>
              {tabs.map(({ label, ...tab }) => (
                <NavItem key={tab.id} {...tab} onClick={this.handleTabClick}>
                  {label}
                </NavItem>
              ))}
            </NavBar>
          </div>
          <form onSubmit={handleSubmit(this.handleSave)}>
            <div
              className={`edit-district-profile__body edit-district-profile__body--${activeTab}`}
            >
              <main className="edit-district-profile__body-main">
                <div className="edit-district-profile__error-message">
                  {hasErrorsOnSave &&
                    !hasErrorsRequiringPopup &&
                    'Please correct your entries as indicated.'}
                </div>
                {/* Hiding the inactive tab while still keeping it in the DOM greatly simplifies the submission/validation logic. */}
                <FormSection
                  headerText="Profile Information"
                  sectionClassModifier="edit-district-profile__form"
                  sectionStyle={{ display: activeTab === TAB_PROFILE ? 'block' : 'none' }}
                >
                  {/* <FormFieldFocuser focusOnMount focusOnToggleTrue={activeTab === TAB_PROFILE}>
                 
                  </FormFieldFocuser> */}
                  <DistrictProfile
                    applications={this.props.applications}
                    timeZones={this.props.timeZones}
                  />
                </FormSection>
                <FormSection
                  headerText="Contact Information"
                  sectionClassModifier="edit-district-profile__form"
                  sectionStyle={{ display: activeTab === TAB_CONTACT ? 'block' : 'none' }}
                >
                  <FormFieldFocuser focusOnToggleTrue={activeTab === TAB_CONTACT}>
                    <DistrictContactInfo stateOrZipHasErrors={stateOrZipHasErrors} />
                  </FormFieldFocuser>
                </FormSection>
                {demographicTabActive && (
                  <div className="edit-district-profile__form-section-group">
                    <FormSection
                      headerText="AYP"
                      sectionClassModifier="edit-district-profile__demographics-section"
                    >
                      <DemographicList items={AYP_LIST} />
                    </FormSection>
                    <FormSection
                      headerText="Gender"
                      sectionClassModifier="edit-district-profile__demographics-section"
                    >
                      <DemographicList items={GENDER_LIST} />
                    </FormSection>
                    <FormSection
                      headerText="Ethnicity"
                      sectionClassModifier="edit-district-profile__demographics-section"
                    >
                      <DemographicList items={ETHNICITY_LIST} />
                    </FormSection>
                  </div>
                )}

                {demographicTabActive && (
                  <React.Fragment>
                    <CustomDemographicList
                      demographics={this.props.customDemographics}
                      showModal={this.props.showModal}
                    />
                    <AddDemographic onClick={this.props.handleAddDemographic} />
                  </React.Fragment>
                )}
              </main>
              <aside className="edit-district-profile__body-aside">
                <FormErrors
                  shouldShowErrors={hasErrorsOnSave && !hasErrorsRequiringPopup}
                  submitErrors={submitErrors.toJS()}
                  validationErrors={validationErrors}
                />
                <div>
                  <SAMButton onClickHandler={this.props.handleCancel}>Cancel</SAMButton>
                  <SAMButton isPrimaryButton buttonType="submit">
                    Save
                  </SAMButton>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </SAMModal>
    );
  };
}

EditDistrictProfile.defaultProps = {
  customDemographics: [],
  data: {}, // passed in from ModalController
  formData: fromJS({}),
  formMeta: fromJS({}),
  isOpen: false,
  submitErrors: fromJS({}), // TO-DO add validation
  title: '',
};

EditDistrictProfile.propTypes = {
  data: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
  timeZones: PropTypes.array.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleAddDemographic: PropTypes.func,
  customDemographics: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  submitErrors: PropTypes.object,
  submitFailed: PropTypes.bool,
  title: PropTypes.string.isRequired,
  validationErrors: PropTypes.object,
};

export default EditDistrictProfile;
