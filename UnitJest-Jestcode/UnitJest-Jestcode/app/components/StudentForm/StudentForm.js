/**
 *
 * StudentForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import {
  META_DATA_CLASSES,
  META_DATA_GRADES,
  META_DATA_GROUPS,
  META_DATA_PASSWORD_CONFIG,
} from 'containers/AddEditStudent/constants';
import SAMModal from 'components/SAMModal';
import Button from 'components/SAMButton';
import QuestionIconToolTip from 'components/QuestionIconToolTip';
import { createPasswordToolTipText } from 'utils/utilities';
import { DropdownControl, FormErrors, FormSection, InputControl } from 'components/forms/';
import NavBar, { NavItem } from 'components/NavBar';
import {
  FIELD_ERROR_GRADE,
  STUDENT_NAVBAR_ERROR,
  TAB_PROFILE,
  TABS_STYLE,
  TAB_ITEMS,
} from './constants';
import ClassesWithGroupsControl from './ClassesWithGroupsControl';
import './StudentForm.scss';

// <StudentForm /> handles top-level actions -- close modal, save, tab switching.
class StudentForm extends Component {
  state = { activeTab: TAB_PROFILE };

  getTooltipText = () => {
    const { formData, metaData } = this.props;
    const pwConfig = metaData[META_DATA_PASSWORD_CONFIG];
    const gradesMap =
      pwConfig && pwConfig.grade_mappings && pwConfig.grade_mappings[0].grade_mapping;
    const grade = formData && formData.get('grade');

    // Default is 'No Grade' text
    let tooltipText = FIELD_ERROR_GRADE;

    // Map grade to password complexity type
    if (grade && gradesMap) {
      const gradePasswordItem = gradesMap.find(item => item.$ && item.$.grade === grade);
      tooltipText = createPasswordToolTipText(pwConfig.configs, gradePasswordItem.$.config_id);
    }
    return tooltipText;
  };

  handleTabClick = ev => this.setState({ activeTab: ev.currentTarget.id });

  handleSave = values => {
    const { data, handleSave } = this.props;
    // Forwards on info to saga on whether is an `Add` or `Edit`
    return handleSave(values, data);
  };

  applyServerErrorMetaData = immServerErrors => {
    let immUpdatedServerErrors = immServerErrors;
    const alternateUserName = immServerErrors.getIn(['errorMeta', 'alternate_username', 0]);
    if (alternateUserName) {
      const currentUserNameError = immServerErrors.get('user_name');
      immUpdatedServerErrors = immServerErrors.set(
        'user_name',
        `${currentUserNameError}  Alternate value: ${alternateUserName}`
      );
    }
    return immUpdatedServerErrors;
  };

  showNavBarError = tabId => this.props.submitFailed && tabId === TAB_PROFILE;

  transformGrade = grade => ({ id: grade.name[0], label: grade.name[0] });

  // Only accept numbers & '/' (mm/dd/yyyy)
  restrictDateChars = value => value && value.replace(/[^\d/]/g, '');

  render = () => {
    const {
      formData,
      handleSubmit,
      isOpen,
      metaData,
      serverErrors: immServerErrorsProp,
      title,
      validationErrors,
      submitFailed,
    } = this.props;
    const immServerErrors = this.applyServerErrorMetaData(immServerErrorsProp);
    const grades = metaData[META_DATA_GRADES] || [];
    const classes = metaData[META_DATA_CLASSES] || [];
    const groups = metaData[META_DATA_GROUPS] || [];
    const pwConfig = metaData[META_DATA_PASSWORD_CONFIG];
    const { activeTab } = this.state;

    // Disable password fields until grade selection
    const disablePasswordFields = !formData.get('grade');
    const styleClassesGroups = ['student-form__class-groups'];

    const hasErrorsOnSave = submitFailed && !!(validationErrors || immServerErrors);

    // The 'Add Classes & Groups' needs an error display
    if (hasErrorsOnSave && validationErrors && validationErrors.classes) {
      styleClassesGroups.push('student-form__class-groups--error');
    }

    let gradesDropdown = grades.map(this.transformGrade);
    // Insert blank choice as first option
    if (disablePasswordFields) {
      gradesDropdown = [''].concat(gradesDropdown);
    }
    return (
      <SAMModal
        isOpen={isOpen}
        contentLabel={`${title} Modal`}
        modalClassModifier="modal--student-form"
      >
        <div className="student-form student-form--orange">
          <h2 className="student-form__heading">{title}</h2>
          <div className="student-form__intro">
            Enter information about this Student account on the Profile, Demographics, and Guardian
            tabs. Items marked with an asterisk (*) are required. When you are done, click Save to
            finish.
          </div>
          <div className="student-form__navbar-bg">
            <NavBar className={STUDENT_NAVBAR_ERROR} activeItemId={activeTab} {...TABS_STYLE}>
              {TAB_ITEMS.map(({ label, ...tab }) => (
                <NavItem
                  key={tab.id}
                  {...tab}
                  onClick={this.handleTabClick}
                  hasErrors={this.showNavBarError(tab.id)}
                >
                  {label}
                </NavItem>
              ))}
            </NavBar>
          </div>
          <form onSubmit={handleSubmit(this.handleSave)}>
            <div className={`student-form__body student-form__body--${activeTab}`}>
              <main className="student-form__body-main">
                <div className="student-form__error-message">
                  {hasErrorsOnSave && 'Please correct your entries as indicated.'}
                </div>
                <div className="student-form__sections">
                  <FormSection
                    sectionClassModifier="student-form__identity"
                    headerText="1. Identify Student"
                  >
                    <Field
                      name="sis_id"
                      type="text"
                      component={InputControl}
                      label="Student ID"
                      maxLength={32}
                      required
                    />
                    <Field
                      name="first_name"
                      type="text"
                      component={InputControl}
                      label="First Name"
                      maxLength={40}
                      required
                    />
                    <Field
                      name="middle_name"
                      type="text"
                      component={InputControl}
                      label="Middle Initial"
                      maxLength={2}
                    />
                    <Field
                      name="last_name"
                      type="text"
                      component={InputControl}
                      label="Last Name"
                      maxLength={40}
                      required
                    />
                    <Field
                      name="suffix"
                      type="text"
                      component={InputControl}
                      label="Suffix"
                      maxLength={5}
                    />
                    <Field
                      name="preferred_name"
                      type="text"
                      component={InputControl}
                      label="Preferred Name"
                      maxLength={100}
                    />
                    <Field
                      name="grade"
                      component={DropdownControl}
                      items={gradesDropdown}
                      label="Grade"
                      required
                    />
                    <Field
                      name="user_name"
                      type="text"
                      component={InputControl}
                      label="Username"
                      maxLength={20}
                      required
                    />
                    <div className="student-form__field-wrap">
                      <Field
                        className={!disablePasswordFields ? '' : 'form-control--disable'}
                        name="password"
                        type="password"
                        component={InputControl}
                        label="Password"
                        maxLength={16}
                        disabled={disablePasswordFields}
                        required
                      />
                      {pwConfig && (
                        <div className="student-form__help-icon">
                          <QuestionIconToolTip>{this.getTooltipText()}</QuestionIconToolTip>
                        </div>
                      )}
                    </div>

                    <Field
                      className={!disablePasswordFields ? '' : 'form-control--disable'}
                      name="password_confirm"
                      type="password"
                      component={InputControl}
                      label="Password Confirmation"
                      maxLength={16}
                      disabled={disablePasswordFields}
                      required
                    />
                    <div className="student-form__field-wrap">
                      <Field
                        className="form-control--sm"
                        name="birth_date"
                        type="text"
                        component={InputControl}
                        label="Date of Birth"
                        maxLength={10}
                        normalize={this.restrictDateChars}
                      />
                      <div className="student-form__dob-label">(Ex: 11/3/1967)</div>
                    </div>
                  </FormSection>
                  <FormSection
                    sectionClassModifier={styleClassesGroups.join(' ')}
                    headerText="2. Add to Classes & Groups"
                  >
                    {!classes.length && (
                      <div className="student-form__class-groups-empty">
                        A student must be associated with a class. Please add a class before you add
                        this student.
                      </div>
                    )}
                    <ClassesWithGroupsControl
                      name="classesWithGroups"
                      change={this.props.change}
                      classesAll={classes}
                      groupsAll={groups}
                      classes={formData && formData.get('classes')}
                      groups={formData && formData.get('groups')}
                    />
                  </FormSection>
                </div>
              </main>
              <aside className="student-form__body-aside">
                <FormErrors
                  shouldShowErrors={hasErrorsOnSave}
                  submitErrors={immServerErrors.toJS()}
                  validationErrors={validationErrors}
                />
                <div>
                  <Button onClickHandler={this.props.handleCancel}>Cancel</Button>
                  {/* Save handled in next story. Disabled for now. */}
                  <Button buttonType="submit" isPrimaryButton>
                    Save
                  </Button>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </SAMModal>
    );
  };
}

StudentForm.defaultProps = {
  data: {},
  formData: fromJS({}),
  isOpen: false,
  metaData: {},
  serverErrors: fromJS({}),
};

StudentForm.propTypes = {
  data: PropTypes.object.isRequired,
  formData: PropTypes.object,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  metaData: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  serverErrors: PropTypes.object,
  validationErrors: PropTypes.object,
  // Below props included by redux-form
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool,
};

export default StudentForm;
