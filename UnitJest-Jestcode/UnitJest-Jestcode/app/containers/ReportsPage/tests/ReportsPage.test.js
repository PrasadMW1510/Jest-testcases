import React from 'react';
import { shallow } from 'enzyme';
import ReportList from 'components/ReportList/';
import ReportsCohortTitle from 'components/ReportsCohortTitle/';
import { fromJS } from 'immutable';
import { ReportsPage } from '../ReportsPage';

describe('<ReportsPage />', () => {
  let wrapper = null;
  let testReports = {};
  let testPrograms = {};
  let testUser = {};
  let testProc = null;
  let districtId = null;
  let schoolId = null;
  let gradeId = null;
  let teacherId = null;
  let classId = null;
  let groupId = null;
  let studentId = null;
  let userData = null;
  let schoolData = null;
  let gradeData = null;
  let teacherData = null;
  let classData = null;
  let groupData = null;
  let studentData = null;
  beforeEach(() => {
    testPrograms = fromJS([
      { $: { enabled: 'true', name: 'Fraction Nation', community_id: 'FAD' } },
      { $: { enabled: 'true', name: 'System 44', community_id: 'S44' } },
    ]);

    testReports = fromJS({
      reports: [
        {
          category_name: ['Category A'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data'],
          last_generated: ['2017/12/08'],
          name: ['Example Report A'],
          relationship: ['Optimal'],
          report_cohort_type: ['Aggregate'],
          report_id: ['def'],
          type_id: ['FAD_05'],
          app_id: ['FAD'],
          date_ranges: [['CurrSchoolYear', 'LastMonth', 'Custom']],
        },
        {
          category_name: ['Category B'],
          cohort_id: ['abcd'],
          cohort_type: ['school'],
          description: ['example report data 2'],
          last_generated: ['2017/12/08'],
          name: ['Example Report C'],
          relationship: ['Optimal'],
          report_cohort_type: ['Group'],
          report_id: ['def'],
          type_id: ['S44_05'],
          app_id: ['S44'],
          date_ranges: [['CurrSchoolYear', 'LastMonth', 'Custom']],
        },
        {
          category_name: ['Category C'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data 3'],
          last_generated: ['2018/01/18'],
          name: ['Example Report D'],
          relationship: ['Optimal'],
          report_cohort_type: ['Student'],
          report_id: ['def'],
          type_id: ['S44_06'],
          app_id: ['S44'],
          date_ranges: [['CurrSchoolYear', 'Custom']],
        },
        {
          category_name: ['Category C'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data 0'],
          last_generated: ['2018/01/18'],
          name: ['Example Report C'],
          relationship: ['Optimal'],
          report_cohort_type: ['Student'],
          report_id: ['def'],
          type_id: ['S44_07'],
          app_id: ['S44'],
          date_ranges: [['CurrSchoolYear', 'Custom']],
        },
        {
          category_name: ['Category C'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data 0'],
          last_generated: ['2018/01/18'],
          name: ['Example Report C'],
          relationship: ['Optimal'],
          report_cohort_type: ['Student'],
          report_id: ['def'],
          type_id: ['S44_08'],
          app_id: ['S44'],
          date_ranges: [['CurrSchoolYear', 'Custom']],
        },
      ],
    });
    testUser = fromJS({
      first_name: ['Test'],
      last_name: ['User'],
    });
    userData = fromJS({
      profile: { organizations: [{ organization: [{ name: ['Test District'] }] }] },
    });
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
    testProc = jest.fn();
    districtId = 'districtId';
    schoolId = 'schoolId';
    gradeId = 'gradeId';
    teacherId = 'teacherId';
    classId = 'classId';
    groupId = 'groupId';
    studentId = 'studentId';
    wrapper = shallow(
      <ReportsPage
        reports={testReports}
        reportListRequest={testProc}
        user={testUser}
        programs={testPrograms}
        districtId={districtId}
        schoolId={schoolId}
        gradeId={gradeId}
        teacherId={teacherId}
        classId={classId}
        groupId={groupId}
        studentId={studentId}
        userData={userData}
        schoolData={schoolData}
        gradeData={gradeData}
        teacherData={teacherData}
        classData={classData}
        groupData={groupData}
        studentData={studentData}
      />
    );
  });

  it('Should contain a SmartBar, ReportsCohortTitle, and ReportList', () => {
    expect(
      wrapper.containsMatchingElement(
        <ReportList
          reports={testReports}
          user={testUser}
          programs={testPrograms}
          districtId={districtId}
          schoolData={schoolData}
          gradeData={gradeData}
          teacherData={teacherData}
          classData={classData}
          groupData={groupData}
          studentData={studentData}
          schoolId={schoolId}
          gradeId={gradeId}
          teacherId={teacherId}
          classId={classId}
          groupId={groupId}
          studentId={studentId}
          userData={userData}
        />
      )
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(
        <ReportsCohortTitle
          schoolData={schoolData}
          gradeData={gradeData}
          teacherData={teacherData}
          classData={classData}
          groupData={groupData}
          studentData={studentData}
          userData={userData}
        />
      )
    ).toBeTruthy();
  });

  it('Should run do nothing when nothing changes (the things we do for 100% coverage)', () => {
    testProc.mockClear();
    wrapper.setProps({ districtId });

    expect(testProc).toHaveBeenCalledTimes(0);
  });
  it('Should run report request when SmartBar district changes', () => {
    districtId = 'something_different';
    wrapper.setProps({ districtId });
    expect(testProc).toHaveBeenCalled();
  });
  it('Should run report request when SmartBar school changes', () => {
    schoolId = 'something_different';
    wrapper.setProps({ schoolId });
    expect(testProc).toHaveBeenCalled();
  });
  it('Should run report request when SmartBar grade changes', () => {
    gradeId = 'something_different';
    wrapper.setProps({ gradeId });
    expect(testProc).toHaveBeenCalled();
  });
  it('Should run report request when SmartBar teacher changes', () => {
    teacherId = 'something_different';
    wrapper.setProps({ teacherId });
    expect(testProc).toHaveBeenCalled();
  });
  it('Should run report request when SmartBar class changes', () => {
    classId = 'something_different';
    wrapper.setProps({ classId });
    expect(testProc).toHaveBeenCalled();
  });
  it('Should run report request when SmartBar group changes', () => {
    groupId = 'something_different';
    wrapper.setProps({ groupId });
    expect(testProc).toHaveBeenCalled();
  });
  it('Should run report request when SmartBar student changes', () => {
    studentId = 'something_different';
    wrapper.setProps({ studentId });
    expect(testProc).toHaveBeenCalled();
  });
});
