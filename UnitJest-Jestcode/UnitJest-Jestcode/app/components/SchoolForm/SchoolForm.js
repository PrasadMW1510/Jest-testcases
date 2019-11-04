/**
 *
 * SchoolForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import { FormSection, FormErrors } from 'components/forms';
import FormFieldFocuser from 'components/FormFieldFocuser';
import NavBar, { NavItem } from 'components/NavBar';
import SchoolProfile from './SchoolProfile';
import SchoolContactInfo from './SchoolContactInfo';
import { FORM_FIELD_NAMES, TAB_CONTACT, TAB_PROFILE } from './constants';
import './SchoolForm.scss';

class SchoolForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: TAB_PROFILE, // Current active tab
    };
  }

  handleTabClick = ev => this.setState({ activeTab: ev.currentTarget.id });
  handleSave = values => this.props.handleSave(values, this.props.data);

  hasProfileTabErrorsOnSave = validationErrors =>
    this.props.submitFailed &&
    !!(
      validationErrors[FORM_FIELD_NAMES.SchoolName] ||
      validationErrors[FORM_FIELD_NAMES.SchoolNumber] ||
      validationErrors[FORM_FIELD_NAMES.Grades] ||
      validationErrors[FORM_FIELD_NAMES.SchoolTypes]
    );

  hasContactTabErrorsOnSave = (validationErrors, stateOrZipHasErrors) =>
    this.props.submitFailed &&
    !!(
      validationErrors[FORM_FIELD_NAMES.SchoolContactLastName] ||
      validationErrors[FORM_FIELD_NAMES.SchoolContactFirstName] ||
      validationErrors[FORM_FIELD_NAMES.SchoolContactEmail] ||
      validationErrors[FORM_FIELD_NAMES.SchoolContactAddressLine1] ||
      validationErrors[FORM_FIELD_NAMES.SchoolContactCity] ||
      stateOrZipHasErrors
    );

  // Keeping this block around for the time being, to add possible flexibility to FormErrors wrt
  // the display order.
  /* renderValidationErrors = validationErrors =>
    VALIDATION_ERROR_DISPLAY_ORDER.map(
      inputName =>
        validationErrors[inputName] ? (
          <div className="school-form__error" key={inputName}>
            {validationErrors[inputName]}
          </div>
        ) : null
    ); */

  render = () => {
    const {
      change: dispatchChangeToFormField, // the redux-form change action
      formData: immFormData,
      formMeta: immMetaDataProps,
      handleSubmit,
      isOpen,
      submitErrors,
      showWarningModal,
      submitFailed,
      title,
      validationErrors: validationErrorsProp,
    } = this.props;
    const formMeta = immMetaDataProps.toJS();
    const formData = immFormData.toJS();
    const numGradingPeriods = formData.numGradingPeriods
      ? parseInt(formData.numGradingPeriods, 10)
      : 1;
    const { activeTab } = this.state;
    const validationErrors = validationErrorsProp || {};
    const hasErrorsOnSave = submitFailed && !!(validationErrorsProp || submitErrors);
    const hasErrorsRequiringPopup = !!validationErrors.popupErrorFieldName;
    const stateOrZipHasErrors = !!(
      validationErrors[FORM_FIELD_NAMES.SchoolContactState] ||
      validationErrors[FORM_FIELD_NAMES.SchoolContactZip]
    );
    const tabs = [
      {
        id: TAB_PROFILE,
        label: 'Profile *',
        hasErrors: this.hasProfileTabErrorsOnSave(validationErrors) && !hasErrorsRequiringPopup,
      },
      {
        id: TAB_CONTACT,
        label: 'Contact *',
        hasErrors:
          this.hasContactTabErrorsOnSave(validationErrors, stateOrZipHasErrors) &&
          !hasErrorsRequiringPopup,
      },
    ];
    return (
      <SAMModal
        isOpen={isOpen}
        contentLabel={`${title} Modal`}
        modalClassModifier="modal--school-form"
      >
        <div className="school-form school-form--orange">
          <h2 className="school-form__heading">{title}</h2>
          <div className="school-form__intro">
            Enter information about this School account on the Profile, Contact, and Demographics
            tabs. Items marked with an asterisk (*) are required. When you are done, click Save to
            finish.
          </div>
          <div className="school-form__navbar-bg">
            <NavBar activeItemId={activeTab} theme="tabs" palette="orange" inset>
              {tabs.map(({ label, ...tab }) => (
                <NavItem key={tab.id} {...tab} onClick={this.handleTabClick}>
                  {label}
                </NavItem>
              ))}
            </NavBar>
          </div>
          <form onSubmit={handleSubmit(this.handleSave)}>
            <div className={`school-form__body school-form__body--${activeTab}`}>
              <main className="school-form__body-main">
                <div className="school-form__error-message">
                  {hasErrorsOnSave &&
                    !hasErrorsRequiringPopup &&
                    'Please correct your entries as indicated.'}
                </div>
                {/* Hiding the inactive tab while still keeping it in the DOM greatly simplifies the submission/validation logic. */}
                <FormSection
                  headerText="School Profile & Grading Periods"
                  sectionClassModifier="school-form__form"
                  sectionStyle={{ display: activeTab === TAB_PROFILE ? 'block' : 'none' }}
                >
                  <FormFieldFocuser focusOnMount focusOnToggleTrue={activeTab === TAB_PROFILE}>
                    <SchoolProfile
                      dispatchChangeToFormField={dispatchChangeToFormField}
                      formMeta={formMeta}
                      numGradingPeriods={numGradingPeriods}
                      schoolYearEndDate={formData.schoolYearEnd}
                      showWarningModal={showWarningModal}
                      validationErrors={validationErrors}
                    />
                  </FormFieldFocuser>
                </FormSection>
                <FormSection
                  headerText="Contact Information"
                  sectionClassModifier="school-form__form"
                  sectionStyle={{
                    display: activeTab === TAB_CONTACT ? 'block' : 'none',
                  }}
                >
                  <FormFieldFocuser focusOnToggleTrue={activeTab === TAB_CONTACT}>
                    <SchoolContactInfo stateOrZipHasErrors={stateOrZipHasErrors} />
                  </FormFieldFocuser>
                </FormSection>
              </main>
              <aside className="school-form__body-aside">
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

SchoolForm.defaultProps = {
  data: {}, // passed in from ModalController
  formData: fromJS({}),
  formMeta: fromJS({}),
  isOpen: false,
  submitErrors: fromJS({}),
  title: '',
};

SchoolForm.propTypes = {
  change: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  formData: PropTypes.object,
  formMeta: PropTypes.object,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  submitErrors: PropTypes.object,
  showWarningModal: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool,
  title: PropTypes.string.isRequired,
  validationErrors: PropTypes.object,
};

export default SchoolForm;
