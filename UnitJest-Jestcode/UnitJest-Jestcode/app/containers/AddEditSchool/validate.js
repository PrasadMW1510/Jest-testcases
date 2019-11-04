/* eslint-disable no-param-reassign */

import getErrorMsg from 'utils/slmsErrors';
import { hasBlankString, isValidEmail } from 'utils/utilities';
import moment from 'moment';
import { FORM_FIELD_NAMES } from 'components/SchoolForm/constants';

const toggledGradingPeriodFieldName = formFieldName =>
  formFieldName === FORM_FIELD_NAMES.GradingPeriodStart
    ? FORM_FIELD_NAMES.GradingPeriodEnd
    : FORM_FIELD_NAMES.GradingPeriodStart;

/*
  IMPORTANT:  redux-form validation requires AT LEAST ONE form field name as a key in
  the returned 'errors' object (or the built-in keys, such as syncErrors, asyncErrors, or
  submitErrors).  Thus, the validateGradingPeriods function puts any grading period failures
  into the form field (array) name, e.g. gradingPeriodStart, in addition to the
  itemized error keys like 'gradingPeriodStart[1]'.
 */
const validateGradingPeriods = (values, schoolYearStartDate, schoolYearEndDate, errors) => {
  const gradingPeriodStarts = values.get(FORM_FIELD_NAMES.GradingPeriodStart);
  const gradingPeriodEnds = values.get(FORM_FIELD_NAMES.GradingPeriodEnd);
  const numGradingPeriods = parseInt(values.get(FORM_FIELD_NAMES.NumberOfGradingPeriods), 10);
  // list the dates in grading period order; i.e. gp1-start, gp1-end, gp2-start, gp2-end, etc.
  const gradingPeriodDates = [];
  for (let i = 0; i < numGradingPeriods; i += 1) {
    let gradingPeriodStart = gradingPeriodStarts && gradingPeriodStarts.get(i);
    gradingPeriodStart = gradingPeriodStart && moment(gradingPeriodStart);
    gradingPeriodDates.push(
      gradingPeriodStart && gradingPeriodStart.isValid() ? gradingPeriodStart : null
    );
    let gradingPeriodEnd = gradingPeriodEnds && gradingPeriodEnds.get(i);
    gradingPeriodEnd = gradingPeriodEnd && moment(gradingPeriodEnd);
    gradingPeriodDates.push(
      gradingPeriodEnd && gradingPeriodEnd.isValid() ? gradingPeriodEnd : null
    );
  }
  // now see if they're ordered sequentially, and don't violate the school year range
  let latestDate = null;
  let index = 0;
  let formFieldName = FORM_FIELD_NAMES.GradingPeriodStart;
  // as long as we haven't set both an imperative-type error AND a popup error field name, keep iterating..
  while (
    index < gradingPeriodDates.length &&
    !(errors.hasImperativeNotificationErrors && errors.popupErrorFieldName)
  ) {
    const gradingPeriodNumber = Math.floor(index / 2) + 1;
    const gradingPeriodDate = gradingPeriodDates[index];
    if (gradingPeriodDate) {
      // if the grading period date lies outside the school year boundaries..
      if (
        gradingPeriodDate.isBefore(schoolYearStartDate) ||
        gradingPeriodDate.isAfter(schoolYearEndDate)
      ) {
        errors.popupErrorFieldName = `${formFieldName}[${gradingPeriodNumber - 1}]`;
        errors[errors.popupErrorFieldName] = getErrorMsg(1000);
        errors.hasImperativeNotificationErrors = true;
        // for the next line, see comment at the beginning of this function
        errors[formFieldName] = errors[errors.popupErrorFieldName];
      } else if (latestDate && gradingPeriodDate.isSameOrBefore(latestDate)) {
        // otherwise, if it's out of sequence..
        errors.popupErrorFieldName = `${formFieldName}[${gradingPeriodNumber - 1}]`;
        errors[errors.popupErrorFieldName] = getErrorMsg(222);
        errors.hasImperativeNotificationErrors = true;
        // for the next line, see comment at the beginning of this function
        errors[formFieldName] = errors[errors.popupErrorFieldName];
      } else {
        // otherwise, update the latest date to be this one
        latestDate = gradingPeriodDate;
      }
    } else {
      errors.popupErrorFieldName = `${formFieldName}[${gradingPeriodNumber - 1}]`;
      errors[errors.popupErrorFieldName] = getErrorMsg(221);
      // for the next line, see comment at the beginning of this function
      errors[formFieldName] = errors[errors.popupErrorFieldName];
    }
    index += 1;
    formFieldName = toggledGradingPeriodFieldName(formFieldName);
  }
};

const validate = values => {
  // Return an object with appropriate errors mapped to field-name keys --
  // or empty if no errors. For example, a field named `foo` would have a
  // corresponding key in the return error object `{foo: "my foo error"}`.
  const errors = {};

  // School Profile tab
  const schoolName = values.get(FORM_FIELD_NAMES.SchoolName);
  const schoolNumber = values.get(FORM_FIELD_NAMES.SchoolNumber);
  const grades = values.get(FORM_FIELD_NAMES.Grades);
  const schoolTypes = values.get(FORM_FIELD_NAMES.SchoolTypes);
  if (hasBlankString(schoolName)) {
    errors[FORM_FIELD_NAMES.SchoolName] = getErrorMsg(131);
  }
  if (hasBlankString(schoolNumber)) {
    errors[FORM_FIELD_NAMES.SchoolNumber] = getErrorMsg(160);
  }
  if (!grades || grades.size === 0) {
    errors[FORM_FIELD_NAMES.Grades] = getErrorMsg(153);
  }
  if (!schoolTypes || schoolTypes.size === 0) {
    errors[FORM_FIELD_NAMES.SchoolTypes] = getErrorMsg(154);
  }

  // Calendars
  const schoolYearStart = values.get(FORM_FIELD_NAMES.SchoolYearStart);
  const schoolYearEnd = values.get(FORM_FIELD_NAMES.SchoolYearEnd);
  if (hasBlankString(schoolYearStart) || !moment(schoolYearStart).isValid()) {
    errors.popupErrorFieldName = FORM_FIELD_NAMES.SchoolYearStart;
    errors[FORM_FIELD_NAMES.SchoolYearStart] = getErrorMsg(227);
  } else if (hasBlankString(schoolYearEnd) || !moment(schoolYearEnd).isValid()) {
    errors.popupErrorFieldName = FORM_FIELD_NAMES.SchoolYearEnd;
    errors[FORM_FIELD_NAMES.SchoolYearEnd] = getErrorMsg(228);
  } else {
    // (by here, we know that schoolYearStart and schoolYearEnd are populated)
    const schoolYearStartDate = moment(schoolYearStart);
    const schoolYearEndDate = moment(schoolYearEnd);
    if (schoolYearStartDate.isSameOrAfter(schoolYearEnd)) {
      errors.popupErrorFieldName = FORM_FIELD_NAMES.SchoolYearEnd;
      errors[errors.popupErrorFieldName] = getErrorMsg(226);
      errors.hasImperativeNotificationErrors = true;
    } else {
      validateGradingPeriods(values, schoolYearStartDate, schoolYearEndDate, errors);
    }
  }

  // Contact Info tab
  const schoolContactLastName = values.get(FORM_FIELD_NAMES.SchoolContactLastName);
  const schoolContactFirstName = values.get(FORM_FIELD_NAMES.SchoolContactFirstName);
  const schoolContactEmail = values.get(FORM_FIELD_NAMES.SchoolContactEmail);
  const schoolContactAddressLine1 = values.get(FORM_FIELD_NAMES.SchoolContactAddressLine1);
  const schoolContactCity = values.get(FORM_FIELD_NAMES.SchoolContactCity);
  const schoolContactState = values.get(FORM_FIELD_NAMES.SchoolContactState);
  const schoolContactZip = values.get(FORM_FIELD_NAMES.SchoolContactZip);
  const schoolContactPhoneNumber = values.get(FORM_FIELD_NAMES.SchoolContactPhoneNumber);
  if (!schoolContactLastName || schoolContactLastName.trim().length === 0) {
    errors[FORM_FIELD_NAMES.SchoolContactLastName] = getErrorMsg(120);
  }
  if (!schoolContactFirstName || schoolContactFirstName.trim().length === 0) {
    errors[FORM_FIELD_NAMES.SchoolContactFirstName] = getErrorMsg(110);
  }
  if (
    !schoolContactEmail ||
    schoolContactEmail.trim().length === 0 ||
    !isValidEmail(schoolContactEmail)
  ) {
    errors[FORM_FIELD_NAMES.SchoolContactEmail] = getErrorMsg(175);
  }
  if (!schoolContactAddressLine1 || schoolContactAddressLine1.trim().length === 0) {
    errors[FORM_FIELD_NAMES.SchoolContactAddressLine1] = getErrorMsg(170);
  }
  if (!schoolContactCity || schoolContactCity.trim().length === 0) {
    errors[FORM_FIELD_NAMES.SchoolContactCity] = getErrorMsg(171);
  }
  if (!schoolContactState || schoolContactState.trim().length === 0) {
    errors[FORM_FIELD_NAMES.SchoolContactState] = getErrorMsg(172);
  }
  if (!schoolContactZip || schoolContactZip.trim().length === 0) {
    errors[FORM_FIELD_NAMES.SchoolContactZip] = getErrorMsg(173);
  }
  if (!schoolContactPhoneNumber || schoolContactPhoneNumber.trim().length === 0) {
    errors[FORM_FIELD_NAMES.SchoolContactPhoneNumber] = getErrorMsg(174);
  }
  return errors;
};

export default validate;
