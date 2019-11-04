/**
 *
 * SchoolProfile
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Field } from 'redux-form/immutable';
import {
  CheckboxControl,
  DateInputControl,
  DropdownControl,
  InputControl,
} from 'components/forms/';
import {
  FORM_FIELD_NAMES,
  NUM_GRADING_PERIODS_LIST,
  SCHOOL_TYPE_LIST,
  TITLE_1_STATUS_LIST,
} from './constants';

class SchoolProfile extends Component {
  // componentDidUpdate is responsible for popping up any imperative errors
  componentDidUpdate = () => {
    const { showWarningModal, validationErrors } = this.props;
    const popupErrorFieldName = validationErrors.popupErrorFieldName;
    // if there are validation errors requiring a popup warning modal (currently they are only calendars)..
    if (validationErrors.hasImperativeNotificationErrors && popupErrorFieldName) {
      // validation errors with the school year dates require additional cleanup:
      if (popupErrorFieldName === FORM_FIELD_NAMES.SchoolYearStart) {
        this.handleChangeSchoolYearStart(null);
      } else if (popupErrorFieldName === FORM_FIELD_NAMES.SchoolYearEnd) {
        this.handleChangeSchoolYearEnd(null);
      }
      // this clear method hits the DatePicker's API directly, which ensures a complete reset
      // if the user is still interacting with the component (e.g. typing into the field directly)
      this.clearCalendarInput(popupErrorFieldName);
      // NOTE: it's actually possible for multiple popup warnings to be attempted at once, e.g.
      // if a user sets a school start date (which also sets the first grading period start
      // date), and then attempts to set a school end date that is before the start date:
      // in that case, the school end date will be cleared; the warning modal will be
      // opened; the clearing will drive another validation, which detects the first grading
      // period as invalid too.  The ModalController prevents duplicate modals of the same
      // type from being opened.  Longer-term, these multiple change actions might be wrapped
      // together in a saga.
      showWarningModal(validationErrors[popupErrorFieldName]);
    }
  };

  getGradeId = item => item && item.name[0];
  getSchoolTypeId = item => item && item.label;
  formatGradeLabel = item => (item && item.name && item.name[0]) || '';

  updateGradingPeriodDatesForSchoolYearEndDate = (numGradingPeriods, schoolYearEndDate) => {
    const { dispatchChangeToFormField } = this.props;
    const finalGradingPeriodIndex = numGradingPeriods - 1;
    const newDateValue = moment(schoolYearEndDate);
    if (newDateValue.isValid()) {
      // a change to the school year end date should first clear out
      // all of the grading period dates except the start date of the first
      // grading period
      for (let i = 0; i < numGradingPeriods; i += 1) {
        if (i > 0) {
          dispatchChangeToFormField(`${FORM_FIELD_NAMES.GradingPeriodStart}[${i}]`, null);
        }
        dispatchChangeToFormField(`${FORM_FIELD_NAMES.GradingPeriodEnd}[${i}]`, null);
      }
      // set the final grading period's end date to match the new school year end date
      dispatchChangeToFormField(
        `${FORM_FIELD_NAMES.GradingPeriodEnd}[${finalGradingPeriodIndex}]`,
        newDateValue
      );
    } else {
      // otherwise (if the new school year end date is invalid), be sure to clear out the
      // final grading period's end date as well
      dispatchChangeToFormField(
        `${FORM_FIELD_NAMES.GradingPeriodEnd}[${finalGradingPeriodIndex}]`,
        null
      );
    }
  };

  handleChangeNumGradingPeriods = ev => {
    // this follows the same behavior as changing the school year end date:
    // erasing the intermediary grading periods, and updating the last
    // grading period's end date.
    this.updateGradingPeriodDatesForSchoolYearEndDate(
      ev.target.value,
      this.props.schoolYearEndDate
    );
  };

  handleChangeSchoolYearStart = newValue => {
    const { dispatchChangeToFormField, numGradingPeriods } = this.props;
    const newDateValue = moment(newValue);
    if (newDateValue.isValid()) {
      // a change to the school year start date should first clear out
      // all of the grading period dates except the end date of the final
      // grading period
      for (let i = 0; i < numGradingPeriods; i += 1) {
        dispatchChangeToFormField(`${FORM_FIELD_NAMES.GradingPeriodStart}[${i}]`, null);
        if (i < numGradingPeriods - 1) {
          dispatchChangeToFormField(`${FORM_FIELD_NAMES.GradingPeriodEnd}[${i}]`, null);
        }
      }
      // set the first grading period's start date to match the new school year start date
      dispatchChangeToFormField(`${FORM_FIELD_NAMES.GradingPeriodStart}[0]`, newDateValue);
    } else {
      // otherwise (if the new school year start date is invalid), be sure to clear out the
      // first grading period's start date as well
      dispatchChangeToFormField(`${FORM_FIELD_NAMES.GradingPeriodStart}[0]`, null);
    }
  };

  handleChangeSchoolYearEnd = newValue => {
    this.updateGradingPeriodDatesForSchoolYearEndDate(this.props.numGradingPeriods, newValue);
  };

  calendarRefs = {};
  // This next line represents an example of how one would use ref's with the DatePicker:
  clearCalendarInput = refName => this.calendarRefs[refName].getRenderedComponent().clearInput();

  assignCalendarRef = ref => {
    // When the user clicks the 'Cancel' button in the modal, the
    // calendars will unmount, causing the ref callback to be passed null.
    // This is standard React behavior (see https://reactjs.org/docs/refs-and-the-dom.html ).
    if (ref) {
      // template string notation is necessary here, because the grading period form fields have array-based
      // names, e.g. 'gradingPeriodStart[0]', 'gradingPeriodEnd[0]', 'gradingPeriodStart[1]', etc.
      this.calendarRefs[`${ref.props.name}`] = ref;
    }
  };

  renderGradingPeriod = gradingPeriodIndex => (
    <div key={gradingPeriodIndex}>
      <Field
        className="school-form__grading-period"
        component={DateInputControl}
        datePickerClassModifier="sam-datepicker-form-control__input"
        label={`Period ${gradingPeriodIndex} Starts`}
        name={`gradingPeriodStart[${gradingPeriodIndex - 1}]`}
        ref={this.assignCalendarRef}
        required
        withRef
      />
      <Field
        className="school-form__grading-period"
        component={DateInputControl}
        datePickerClassModifier="sam-datepicker-form-control__input"
        label={`Period ${gradingPeriodIndex} Ends`}
        name={`gradingPeriodEnd[${gradingPeriodIndex - 1}]`}
        ref={this.assignCalendarRef}
        required
        withRef
      />
    </div>
  );

  render() {
    const { grades } = this.props.formMeta;
    const gradingPeriodCalendars = [];
    for (
      let gradingPeriodIndex = 1;
      gradingPeriodIndex <= this.props.numGradingPeriods;
      gradingPeriodIndex += 1
    ) {
      gradingPeriodCalendars.push(this.renderGradingPeriod(gradingPeriodIndex));
    }
    return (
      <div className="school-form__form-identity">
        <Field
          className="school-form__identity-info"
          name={FORM_FIELD_NAMES.SchoolName}
          type="text"
          component={InputControl}
          label="Full School Name"
          maxLength={60}
          ref={this.props.refAssignFocusedField}
          required
          withRef
        />
        <Field
          className="school-form__identity-info"
          name={FORM_FIELD_NAMES.SchoolNumber}
          type="text"
          component={InputControl}
          label="School Number"
          maxLength={50}
          required
        />
        <Field
          name={FORM_FIELD_NAMES.Grades}
          component={CheckboxControl}
          getId={this.getGradeId}
          items={grades}
          label="Grades"
          formatLabel={this.formatGradeLabel}
          required
          row
        />
        <Field
          className="school-form__school-type"
          getId={this.getSchoolTypeId}
          name={FORM_FIELD_NAMES.SchoolTypes}
          component={CheckboxControl}
          items={SCHOOL_TYPE_LIST}
          label="School Type"
          required
          row
        />
        <div className="school-form__title-1-row">
          <Field
            className="school-form__title-1-status"
            name="title1Status"
            component={DropdownControl}
            items={TITLE_1_STATUS_LIST}
            label="Title 1 Status"
          />
          <div className="school-form__required-label">* Required</div>
        </div>
        <div className="school-form__school-year-callout">
          <Field
            className="school-form__school-year"
            component={DateInputControl}
            datePickerClassModifier="sam-datepicker-form-control__input"
            label="School starts"
            name="schoolYearStart"
            onChange={this.handleChangeSchoolYearStart}
            ref={this.assignCalendarRef}
            required
            withRef
          />
          <Field
            className="school-form__school-year"
            component={DateInputControl}
            datePickerClassModifier="sam-datepicker-form-control__input"
            label="School ends"
            name="schoolYearEnd"
            onChange={this.handleChangeSchoolYearEnd}
            ref={this.assignCalendarRef}
            required
            withRef
          />
          <Field
            className="school-form__num-grading-periods"
            name="numGradingPeriods"
            component={DropdownControl}
            items={NUM_GRADING_PERIODS_LIST}
            label="No. of Grading Periods"
            onChange={this.handleChangeNumGradingPeriods}
          />
        </div>
        <div className="school-form__grading-period-callout">{gradingPeriodCalendars}</div>
      </div>
    );
  }
}

SchoolProfile.defaultProps = {
  formMeta: {},
};

SchoolProfile.propTypes = {
  dispatchChangeToFormField: PropTypes.func.isRequired,
  formMeta: PropTypes.object.isRequired,
  numGradingPeriods: PropTypes.number.isRequired,
  refAssignFocusedField: PropTypes.func,
  schoolYearEndDate: PropTypes.object,
  showWarningModal: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
};

export default SchoolProfile;
