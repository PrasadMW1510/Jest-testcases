// Transform immutable school data into a json structure that converts into the server-expected xml.
import moment from 'moment';
import { SLMS_DATE_FORMAT } from 'containers/App/constants';
import { FORM_FIELD_NAMES, TITLE_1_STATUS_LIST } from 'components/SchoolForm/constants';

const getGradingPeriods = schoolObj => {
  const numGradingPeriods = schoolObj[FORM_FIELD_NAMES.NumberOfGradingPeriods];
  const gradingPeriods = [];
  // it's important that we only iterate as far as the current number of grading periods,
  // (if, for example, the user has been switching the number of grading periods in the drop-down)
  for (let i = 0; i < numGradingPeriods; i += 1) {
    gradingPeriods.push({
      start_date: moment(schoolObj[FORM_FIELD_NAMES.GradingPeriodStart][i]).format(
        SLMS_DATE_FORMAT
      ),
      end_date: moment(schoolObj[FORM_FIELD_NAMES.GradingPeriodEnd][i]).format(SLMS_DATE_FORMAT),
    });
  }
  return gradingPeriods;
};

/**
 * Transform shape of raw school JSON from server into shape expected by forms
 *
 * @returns flattened object with form field key/value mappings to be used with redux-form
 */
export function transformSchoolDataForForm({
  contact_info: contactInfoProp,
  contact_person: contactPersonProp,
  name = '',
  school_info: schoolInfoProp,
}) {
  const contactInfo = contactInfoProp ? contactInfoProp[0] : {};
  const contactPerson = contactPersonProp ? contactPersonProp[0] : {};
  const schoolInfo = schoolInfoProp[0];
  const schoolYearStartText =
    schoolInfo.school_period.length > 0 && schoolInfo.school_period[0].start_date[0];
  const schoolYearEndText =
    schoolInfo.school_period.length > 0 && schoolInfo.school_period[0].end_date[0];
  const schoolYearStart = schoolYearStartText ? parseDate(schoolYearStartText) : null;
  const schoolYearEnd = schoolYearEndText ? parseDate(schoolYearEndText) : null;
  const gradingPeriods = schoolInfo.grading_periods[0].grading_period;
  const gradingPeriodStarts = [];
  const gradingPeriodEnds = [];
  gradingPeriods.forEach(gradingPeriodInfo => {
    gradingPeriodStarts.push(parseDate(gradingPeriodInfo.start_date[0]));
    gradingPeriodEnds.push(parseDate(gradingPeriodInfo.end_date[0]));
  });
  // TODO: convert to OrderedMap
  return {
    grades: extractIds(schoolInfo.grades, 'grade', 'name') || {},
    name: extractValue(name),
    [FORM_FIELD_NAMES.SchoolNumber]: extractValue(schoolInfo.school_number),
    [FORM_FIELD_NAMES.SchoolTypes]: extractIds(schoolInfo.school_types, 'school_type', '_') || {},
    [FORM_FIELD_NAMES.Title1Status]: extractValue(schoolInfo.title_1_status),
    [FORM_FIELD_NAMES.SchoolYearEnd]: schoolYearEnd,
    [FORM_FIELD_NAMES.SchoolYearStart]: schoolYearStart,
    [FORM_FIELD_NAMES.GradingPeriodStart]: gradingPeriodStarts,
    [FORM_FIELD_NAMES.GradingPeriodEnd]: gradingPeriodEnds,
    [FORM_FIELD_NAMES.NumberOfGradingPeriods]:
      gradingPeriodStarts.length > 0 ? gradingPeriodStarts.length : 4,
    [FORM_FIELD_NAMES.SchoolContactFirstName]: extractValue(contactPerson.first_name),
    [FORM_FIELD_NAMES.SchoolContactLastName]: extractValue(contactPerson.last_name),
    [FORM_FIELD_NAMES.SchoolContactMiddleName]: extractValue(contactPerson.middle_name),
    [FORM_FIELD_NAMES.SchoolContactTitle]: extractValue(contactPerson.title),
    [FORM_FIELD_NAMES.SchoolContactEmail]: extractValue(contactInfo.email_address1),
    [FORM_FIELD_NAMES.SchoolContactAddressLine1]: extractValue(contactInfo.address1),
    [FORM_FIELD_NAMES.SchoolContactAddressLine2]: extractValue(contactInfo.address2),
    [FORM_FIELD_NAMES.SchoolContactAddressLine3]: extractValue(contactInfo.address3),
    [FORM_FIELD_NAMES.SchoolContactCity]: extractValue(contactInfo.city),
    [FORM_FIELD_NAMES.SchoolContactState]: extractValue(contactInfo.state),
    [FORM_FIELD_NAMES.SchoolContactZip]: extractValue(contactInfo.postal_code),
    [FORM_FIELD_NAMES.SchoolContactPhoneNumber]: extractValue(contactInfo.phone_number1),
  };
}

export function transformSchoolMapForPost(schoolMap, schoolId, districtId) {
  const schoolObj = schoolMap.toJS();
  return {
    organization: {
      parent_org_id: districtId,
      ...(schoolId && { org_id: schoolId }),
      type: 'school',
      name: schoolObj[FORM_FIELD_NAMES.SchoolName],
      school_info: {
        school_types: {
          school_type: Object.keys(schoolObj[FORM_FIELD_NAMES.SchoolTypes] || {}),
        },
        grades: {
          grade: Object.keys(schoolObj[FORM_FIELD_NAMES.Grades] || {}),
        },
        title_1_status: schoolObj[FORM_FIELD_NAMES.Title1Status] || TITLE_1_STATUS_LIST[0].label,
        school_number: schoolObj[FORM_FIELD_NAMES.SchoolNumber],
        school_period: {
          start_date: moment(schoolObj[FORM_FIELD_NAMES.SchoolYearStart]).format(SLMS_DATE_FORMAT),
          end_date: moment(schoolObj[FORM_FIELD_NAMES.SchoolYearEnd]).format(SLMS_DATE_FORMAT),
        },
        grading_periods: {
          grading_period: getGradingPeriods(schoolObj),
        },
      },
      contact_person: {
        first_name: schoolObj[FORM_FIELD_NAMES.SchoolContactFirstName],
        middle_name: schoolObj[FORM_FIELD_NAMES.SchoolContactMiddleName],
        last_name: schoolObj[FORM_FIELD_NAMES.SchoolContactLastName],
        title: schoolObj[FORM_FIELD_NAMES.SchoolContactTitle],
      },
      contact_info: {
        address1: schoolObj[FORM_FIELD_NAMES.SchoolContactAddressLine1],
        address2: schoolObj[FORM_FIELD_NAMES.SchoolContactAddressLine2],
        address3: schoolObj[FORM_FIELD_NAMES.SchoolContactAddressLine3],
        city: schoolObj[FORM_FIELD_NAMES.SchoolContactCity],
        state: schoolObj[FORM_FIELD_NAMES.SchoolContactState],
        country: 'USA',
        postal_code: schoolObj[FORM_FIELD_NAMES.SchoolContactZip],
        phone_number1: schoolObj[FORM_FIELD_NAMES.SchoolContactPhoneNumber],
        email_address1: schoolObj[FORM_FIELD_NAMES.SchoolContactEmail],
      },
      groups: {},
    },
  };
}

// TODO: Move these functions to a more central spot; coordinate with Joe
export function extractValue(val) {
  return Array.isArray(val) && val.length === 1 ? val[0] : val;
}

export function parseDate(val) {
  const dateComponents = val.split('/');
  return moment({ month: dateComponents[0] - 1, date: dateComponents[1], year: dateComponents[2] });
}

// Convert server returned array into a shape used by forms. Omits any data not needed, just returns ids.
export function extractIds(arr, childId, key) {
  const items = arr && arr.length === 1 ? arr[0][childId] : null;
  return (
    items && key && items.reduce((obj, item) => ({ ...obj, [extractValue(item[key])]: true }), {})
  );
}
