import { fromJS } from 'immutable';
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme/build/index';
import ReportsCohortTitle from '../index';

describe('<ReportsCohortTitle />', () => {
  let wrapper = null;
  let schoolData = null;
  let gradeData = null;
  let teacherData = null;
  let classData = null;
  let groupData = null;
  let studentData = null;
  let userData = null;
  beforeEach(() => {
    schoolData = fromJS({
      name: ['SchoolName'],
    });
    gradeData = fromJS({
      name: ['1'],
      full_name: ['Grade Name'],
    });
    teacherData = fromJS({
      first_name: ['Teacher'],
      last_name: ['Name'],
    });
    classData = fromJS({
      name: ['ClassName'],
    });
    groupData = fromJS({
      name: ['group'],
    });
    studentData = fromJS({
      first_name: ['Firstname'],
      last_name: ['Lastname'],
    });
    userData = fromJS({
      profile: { organizations: [{ organization: [{ name: ['Test District'] }] }] },
    });
    wrapper = shallow(
      <ReportsCohortTitle
        schoolData={schoolData}
        gradeData={gradeData}
        teacherData={teacherData}
        classData={classData}
        groupData={groupData}
        studentData={studentData}
        userData={userData}
      />
    );
  });
  it('Expect to render correctly with student cohort selected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly with group cohort selected', () => {
    studentData = null;
    wrapper.setProps({ studentData });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly with class cohort selected', () => {
    studentData = null;
    groupData = null;
    wrapper.setProps({ studentData, groupData });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly with teacher cohort selected', () => {
    studentData = null;
    groupData = null;
    classData = null;
    wrapper.setProps({ studentData, groupData, classData });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly with grade cohort selected', () => {
    studentData = null;
    groupData = null;
    classData = null;
    teacherData = null;
    wrapper.setProps({ studentData, groupData, classData, teacherData });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly with school cohort selected', () => {
    studentData = null;
    groupData = null;
    classData = null;
    teacherData = null;
    gradeData = null;
    wrapper.setProps({ studentData, groupData, classData, teacherData, gradeData });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly with district cohort selected', () => {
    studentData = null;
    groupData = null;
    classData = null;
    teacherData = null;
    gradeData = null;
    schoolData = null;
    wrapper.setProps({ studentData, groupData, classData, teacherData, gradeData, schoolData });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
