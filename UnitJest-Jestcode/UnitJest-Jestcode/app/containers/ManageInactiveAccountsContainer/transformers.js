import React from 'react';
import { CHECKMARK_IMAGE_SRC, TABLE_FIELDS } from 'components/ManageInactiveAccounts/constants';

const CHARACTER_LIMIT_BEFORE_TOOLTIP = 15;

const renderStringWithToolTipPositioned = (text, characterLimit, position) => {
  if (text.length > characterLimit) {
    return (
      <a className={`rt-td__tooltip rt-td__tooltip--${position}`} data-tip={text}>
        <div className="rt-td__truncated-block">{text}</div>
      </a>
    );
  }
  return text;
};

const renderEnrollmentWithTooltip = apiInactiveStudent => {
  if (apiInactiveStudent.is_enrolled[0] === 'true') {
    const programList = apiInactiveStudent.applications[0].application.map(program => program._);
    const programListString = programList.join(', ');
    return (
      <a className="rt-td__tooltip rt-td__tooltip--left" data-tip={programListString}>
        <img alt="checkmark" className="rt-td__enrollment-checkmark" src={CHECKMARK_IMAGE_SRC} />
      </a>
    );
  }
  return '';
};

const renderGradesForClassOrSchool = apiInactiveItem => {
  if (apiInactiveItem.grades && apiInactiveItem.grades[0]) {
    const gradeList = apiInactiveItem.grades[0].grade.map(grade => grade.name);
    return gradeList.join(', ');
  }
  return '';
};

const renderSchoolNameWithTooltip = (schoolName, characterLimit, position) => {
  if (schoolName && schoolName[0]) {
    if (schoolName[0].length > characterLimit) {
      return (
        <a className={`rt-td__tooltip rt-td__tooltip--${position}`} data-tip={schoolName[0]}>
          <div className="rt-td__truncated-block">{schoolName[0]}</div>
        </a>
      );
    }
    return schoolName[0];
  }
  return <div className="rt-td__not-applicable">N/A</div>;
};

const transformInactiveClasses = apiInactiveClasses =>
  apiInactiveClasses.map((apiInactiveClass, index) => ({
    _id: index + 1,
    [TABLE_FIELDS.Name]: renderStringWithToolTipPositioned(
      apiInactiveClass.name[0],
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.Grade]: renderGradesForClassOrSchool(apiInactiveClass),
    [TABLE_FIELDS.School]: renderSchoolNameWithTooltip(
      apiInactiveClass.school_name,
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.ClassId]: apiInactiveClass.class_id[0],
  }));

const transformInactiveSchools = apiInactiveSchools =>
  apiInactiveSchools.map((apiInactiveSchool, index) => ({
    _id: index + 1,
    [TABLE_FIELDS.Name]: renderStringWithToolTipPositioned(
      apiInactiveSchool.name[0],
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.SchoolId]: renderStringWithToolTipPositioned(
      apiInactiveSchool.school_number[0],
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.Grade]: renderGradesForClassOrSchool(apiInactiveSchool),
    [TABLE_FIELDS.OrgID]: apiInactiveSchool.org_id[0],
  }));

const transformInactiveStudents = apiInactiveStudents =>
  apiInactiveStudents.map((apiInactiveStudent, index) => ({
    _id: index + 1,
    [TABLE_FIELDS.Enrollment]: renderEnrollmentWithTooltip(apiInactiveStudent),
    [TABLE_FIELDS.Name]: renderStringWithToolTipPositioned(
      `${apiInactiveStudent.last_name[0]}, ${apiInactiveStudent.first_name[0]}`,
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.Status]: apiInactiveStudent.is_attached[0] === 'true' ? 'Active' : 'Inactive',
    [TABLE_FIELDS.StudentId]: renderStringWithToolTipPositioned(
      apiInactiveStudent.sis_id[0],
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.UserName]: renderStringWithToolTipPositioned(
      apiInactiveStudent.user_name[0],
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.UserID]: apiInactiveStudent.user_id[0],
    [TABLE_FIELDS.Grade]: renderGradesForClassOrSchool(apiInactiveStudent),
    [TABLE_FIELDS.FirstName]: apiInactiveStudent.first_name[0],
    [TABLE_FIELDS.LastName]: apiInactiveStudent.last_name[0],
  }));

const transformInactiveTeachers = apiInactiveTeachers =>
  apiInactiveTeachers.map((apiInactiveTeacher, index) => ({
    _id: index + 1,
    [TABLE_FIELDS.DistrictUserId]: renderStringWithToolTipPositioned(
      apiInactiveTeacher.district_user_id[0],
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.Name]: renderStringWithToolTipPositioned(
      `${apiInactiveTeacher.last_name[0]}, ${apiInactiveTeacher.first_name[0]}`,
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.School]: renderSchoolNameWithTooltip(
      apiInactiveTeacher.school_name,
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'left'
    ),
    [TABLE_FIELDS.UserName]: renderStringWithToolTipPositioned(
      apiInactiveTeacher.user_name[0],
      CHARACTER_LIMIT_BEFORE_TOOLTIP,
      'right'
    ),
    [TABLE_FIELDS.UserID]: apiInactiveTeacher.user_id[0],
  }));

const transformInactiveMembersResponse = apiResponse => {
  const outputData = apiResponse.output_data[0];
  const cohortResultName = Object.keys(outputData)[0].toString();
  const memberResults = apiResponse.output_data[0][cohortResultName];
  if (memberResults && memberResults[0]) {
    switch (cohortResultName) {
      case 'students':
        return transformInactiveStudents(memberResults[0].user);
      case 'teachers':
        return transformInactiveTeachers(memberResults[0].user);
      case 'classes':
        return transformInactiveClasses(memberResults[0].class);
      case 'schools':
        return transformInactiveSchools(memberResults[0].organization);
      default:
        return [];
    }
  }
  return [];
};

export { transformInactiveMembersResponse };
