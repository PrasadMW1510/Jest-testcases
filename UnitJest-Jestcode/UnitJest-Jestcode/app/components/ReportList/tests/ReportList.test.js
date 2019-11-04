import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as Request from 'containers/ReportsPage/request';
import * as AppConstants from 'containers/App/constants';
import ReportList from '../index';
import ReportSettings from '../ReportSettings/';

describe('<ReportList />', () => {
  let wrapper = null;
  let reports = null;
  let programs = null;
  let user = null;
  let districtId = null;
  let schoolId = null;
  let gradeId = null;
  let teacherId = null;
  let classId = null;
  let groupId = null;
  let studentId = null;
  let schoolData = null;
  let gradeData = null;
  let teacherData = null;
  let classData = null;
  let groupData = null;
  let studentData = null;
  let userData = null;
  beforeEach(() => {
    programs = fromJS([
      { $: { enabled: 'true', name: 'Fraction Nation', community_id: 'FAD' } },
      { $: { enabled: 'true', name: 'System 44', community_id: 'S44' } },
      { $: { enabled: 'true', name: 'System 44NG', community_id: 'S44NG' } },
    ]);

    reports = fromJS({
      reports: [
        {
          category_name: ['Category A'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data'],
          last_generated: ['2017-12-08'],
          name: ['Example Report B'],
          relationship: ['Optimal'],
          report_cohort_type: ['Aggregate'],
          report_id: ['def'],
          type_id: ['fad_09'],
          app_id: ['FAD'],
          date_ranges: [['CurrSchoolYear', 'LastMonth', 'Custom']],
        },
        {
          category_name: ['Category B'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data'],
          last_generated: ['2017-12-08'],
          name: ['Example Report A'],
          relationship: ['Optimal'],
          report_cohort_type: ['Aggregate'],
          report_id: ['def'],
          type_id: ['fad_03'],
          app_id: ['FAD'],
          date_ranges: [['CurrSchoolYear', 'LastMonth', 'Custom']],
        },
        {
          category_name: ['Category A'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data'],
          last_generated: ['2017-12-08'],
          name: ['Example Report C'],
          relationship: ['Optimal'],
          report_cohort_type: ['Aggregate'],
          report_id: ['def'],
          type_id: ['fad_05'],
          app_id: ['FAD'],
          date_ranges: [['CurrSchoolYear', 'LastMonth', 'Custom']],
        },
        {
          category_name: ['Category C'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data'],
          last_generated: ['2017-12-08'],
          name: ['Example Report D'],
          relationship: ['Optimal'],
          report_cohort_type: ['Aggregate'],
          report_id: ['def'],
          type_id: ['fad_09'],
          app_id: ['FAD'],
          date_ranges: [['CurrSchoolYear', 'LastMonth', 'Custom']],
        },
        {
          category_name: ['Category B'],
          cohort_id: ['abcd'],
          cohort_type: ['school'],
          description: ['example report data 2'],
          last_generated: ['2017-12-08'],
          name: ['Example Report C'],
          relationship: ['Optimal'],
          report_cohort_type: ['Group'],
          report_id: ['def'],
          type_id: ['s44_05'],
          app_id: ['S44'],
          date_ranges: [['CurrSchoolYear', 'LastMonth', 'Custom']],
        },
        {
          category_name: ['Category C'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data 3'],
          last_generated: ['2018-01-18'],
          name: ['Example Report D'],
          relationship: ['Optimal'],
          report_cohort_type: ['Student'],
          report_id: ['def'],
          type_id: ['s44_06'],
          app_id: ['S44'],
          date_ranges: [['CurrSchoolYear', 'Custom']],
        },
        {
          category_name: ['Category C'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data 0'],
          last_generated: ['2018-01-18'],
          name: ['Example Report C'],
          relationship: ['Optimal'],
          report_cohort_type: ['Student'],
          report_id: ['def'],
          type_id: ['s44ng_06'],
          app_id: ['S44NG'],
          date_ranges: [['CurrSchoolYear', 'Custom']],
        },
        {
          category_name: ['Category B'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data 0'],
          last_generated: ['2018-01-19'],
          name: ['Example Report B'],
          relationship: ['Optimal'],
          report_cohort_type: ['Student'],
          report_id: ['def'],
          type_id: ['s44ng_05'],
          app_id: ['S44NG'],
          date_ranges: [['CurrSchoolYear', 'Custom']],
        },
        {
          category_name: ['Category B'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data 0'],
          last_generated: ['2018-01-20'],
          name: ['Example Report B'],
          relationship: ['Optimal'],
          report_cohort_type: ['Student'],
          report_id: ['def'],
          type_id: ['s44ng_03'],
          app_id: ['S44NG'],
          date_ranges: [['CurrSchoolYear', 'Custom']],
        },
      ],
    });
    districtId = 'districtId';
    user = fromJS({
      first_name: ['Test'],
      last_name: ['User'],
      session_id: ['SESSIONID'],
      user_id: ['USERID'],
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
      name: ['GroupName'],
    });
    studentData = fromJS({
      first_name: ['Firstname'],
      last_name: ['Lastname'],
    });
    wrapper = shallow(
      <ReportList
        reports={reports}
        user={user}
        programs={programs}
        districtId={districtId}
        schoolId={schoolId}
        gradeId={gradeId}
        teacherId={teacherId}
        classId={classId}
        groupId={groupId}
        studentId={studentId}
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

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render as expected with empty reports', () => {
    reports = fromJS({ reports: [] });
    wrapper.setProps({ reports });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render as expected with undefined reports', () => {
    reports = fromJS({ reports: undefined });
    wrapper.setProps({ reports });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render as expected without reports', () => {
    reports = undefined;
    wrapper.setProps({ reports });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should handle unexpected reports when loading', () => {
    reports = fromJS({
      reports: [
        {
          category_name: ['Category A'],
          cohort_id: ['abc'],
          cohort_type: ['school'],
          description: ['example report data'],
          last_generated: ['2017-12-08'],
          name: ['Example Report B'],
          relationship: ['Optimal'],
          report_cohort_type: ['Aggregate'],
          report_id: ['def'],
          type_id: ['something_broken'],
          app_id: ['FAD'],
          date_ranges: [['CurrSchoolYear', 'LastMonth', 'Custom']],
        },
      ],
    });
    wrapper.setProps({ reports });

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should handle unexpected reports when running', () => {
    wrapper.setState({ active_report: { reportSettings: {} } });
    wrapper.instance().runReport();
    expect(wrapper.state('showErrorModal')).toEqual(true);
  });
  it('Should close modal when requested', () => {
    wrapper.instance().onRequestClose();
    expect(wrapper.state('show_report_custom_dialog')).toEqual(false);
    expect(wrapper.state('show_report_loading_modal')).toEqual(false);
  });

  it('Should save date options to state when chosen', () => {
    wrapper
      .instance()
      .chooseDate({ target: { className: 'report-date-range-radio', value: 'Custom' } });
    expect(wrapper.state('show_report_custom_dialog')).toEqual(true);
    wrapper
      .instance()
      .chooseDate({ target: { className: 'report-date-range-radio', value: 'CurrYear' } });
    expect(wrapper.state('reportOptions').date_range).toEqual('CurrYear');
    wrapper.instance().chooseDate({ target: { id: 'ReportDateCustomStart', value: '0/0/0000' } });
    wrapper.instance().chooseDate({ target: { id: 'ReportDateCustomEnd', value: '1/1/1111' } });
    expect(wrapper.state('reportOptions').date_range).toEqual('(0/0/0000,1/1/1111)');
  });

  it('Should save the chosen report in state', () => {
    wrapper.instance().chooseReport({ target: { value: 's44ng_05' } });
    expect(wrapper.state('active_report').type_id).toEqual('s44ng_05');
  });

  it('Should save the chosen report options in state', () => {
    wrapper.instance().chooseOption({ target: { value: 'test' } });
    expect(wrapper.state('active_report').chosen_option).toEqual('test');
  });

  it('Should show loading modal and call request when report is generated', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(Request, 'getReportId');
    const activeReport = {
      reportSettings: { connect_url: 'testurl', option_property: 'program' },
      type_id: 'testid',
      chosen_option: 'test',
    };
    wrapper.setState({ active_report: activeReport });
    wrapper.setProps({ user });
    wrapper.instance().runReport();
    expect(wrapper.state('show_report_loading_modal')).toEqual(true);
    expect(spy).toHaveBeenCalled();
  });

  it('Should handle the exception to the rule for math inventory report 7', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(Request, 'getReportId');
    const activeReport = {
      reportSettings: { connect_url: 'testurl', option_property: 'program' },
      type_id: 'math_inventory_07',
      chosen_option: 'test',
    };
    wrapper.setState({ active_report: activeReport });
    wrapper.setProps({ user });
    wrapper.instance().runReport();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should properly choose the cohort id and type for district', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(Request, 'getReportId');
    districtId = 'districtId';
    schoolId = '';
    gradeId = '';
    teacherId = '';
    classId = '';
    groupId = '';
    studentId = '';
    wrapper.setProps({ districtId, schoolId, gradeId, teacherId, classId, groupId, studentId });
    wrapper.setState({
      active_report: {
        reportSettings: {
          connect_url: '/Slms?ReportSomething&fam=$FAMILY$&id=$COHORT_ID$',
          option_property: null,
        },
        type_id: 's44ng_05',
      },
    });

    wrapper.instance().runReport();
    expect(spy.mock.calls[0][2]).toMatch(/.*districtId.*/);
    expect(spy.mock.calls[0][2]).toMatch(new RegExp(AppConstants.COHORT_TYPE.District));
  });

  it('Should properly choose the cohort id and type for school', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(Request, 'getReportId');
    districtId = 'districtId';
    schoolId = 'schoolId';
    gradeId = '';
    teacherId = '';
    classId = '';
    groupId = '';
    studentId = '';
    wrapper.setState({
      active_report: {
        reportSettings: {
          connect_url: '/Slms?ReportSomething&fam=$FAMILY$&id=$COHORT_ID$',
          option_property: null,
        },
        type_id: 's44ng_05',
      },
    });
    wrapper.setProps({ districtId, schoolId, gradeId, teacherId, classId, groupId, studentId });

    wrapper.instance().runReport();
    expect(spy.mock.calls[0][2]).toMatch(/.*schoolId.*/);
    expect(spy.mock.calls[0][2]).toMatch(new RegExp(AppConstants.COHORT_TYPE.School));
  });

  it('Should properly choose the cohort id and type for grade', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(Request, 'getReportId');
    districtId = 'districtId';
    schoolId = 'schoolId';
    gradeId = 'gradeId';
    teacherId = '';
    classId = '';
    groupId = '';
    studentId = '';
    wrapper.setState({
      active_report: {
        reportSettings: {
          connect_url: '/Slms?ReportSomething&fam=$FAMILY$&id=$COHORT_ID$',
          option_property: null,
        },
        type_id: 's44ng_05',
      },
    });
    wrapper.setProps({ districtId, schoolId, gradeId, teacherId, classId, groupId, studentId });

    wrapper.instance().runReport();
    expect(spy.mock.calls[0][2]).toMatch(/.*gradeId.*/);
    expect(spy.mock.calls[0][2]).toMatch(new RegExp(AppConstants.COHORT_TYPE.Grade));
  });

  it('Should properly choose the cohort id and type for teacher', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(Request, 'getReportId');
    districtId = 'districtId';
    schoolId = 'schoolId';
    gradeId = 'gradeId';
    teacherId = 'teacherId';
    classId = '';
    groupId = '';
    studentId = '';
    wrapper.setState({
      active_report: {
        reportSettings: {
          connect_url: '/Slms?ReportSomething&fam=$FAMILY$&id=$COHORT_ID$',
          option_property: null,
        },
        type_id: 's44ng_05',
      },
    });
    wrapper.setProps({ districtId, schoolId, gradeId, teacherId, classId, groupId, studentId });

    wrapper.instance().runReport();
    expect(spy.mock.calls[0][2]).toMatch(/.*teacherId.*/);
    expect(spy.mock.calls[0][2]).toMatch(new RegExp(AppConstants.COHORT_TYPE.Teacher));
  });

  it('Should properly choose the cohort id and type for class', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(Request, 'getReportId');
    districtId = 'districtId';
    schoolId = 'schoolId';
    gradeId = 'gradeId';
    teacherId = 'teacherId';
    classId = 'classId';
    groupId = '';
    studentId = '';
    wrapper.setState({
      active_report: {
        reportSettings: {
          connect_url: '/Slms?ReportSomething&fam=$FAMILY$&id=$COHORT_ID$',
          option_property: null,
        },
        type_id: 's44ng_05',
      },
    });
    wrapper.setProps({ districtId, schoolId, gradeId, teacherId, classId, groupId, studentId });

    wrapper.instance().runReport();
    expect(spy.mock.calls[0][2]).toMatch(/.*classId.*/);
    expect(spy.mock.calls[0][2]).toMatch(new RegExp(AppConstants.COHORT_TYPE.Class));
  });

  it('Should properly choose the cohort id and type for group', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(Request, 'getReportId');
    districtId = 'districtId';
    schoolId = 'schoolId';
    gradeId = 'gradeId';
    teacherId = 'teacherId';
    classId = 'classId';
    groupId = 'groupId';
    studentId = '';
    wrapper.setState({
      active_report: {
        reportSettings: {
          connect_url: '/Slms?ReportSomething&fam=$FAMILY$&id=$COHORT_ID$',
          option_property: null,
        },
        type_id: 's44ng_05',
      },
    });
    wrapper.setProps({ districtId, schoolId, gradeId, teacherId, classId, groupId, studentId });

    wrapper.instance().runReport();
    expect(spy.mock.calls[0][2]).toMatch(/.*groupId.*/);
    expect(spy.mock.calls[0][2]).toMatch(new RegExp(AppConstants.COHORT_TYPE.Group));
  });

  it('Should properly choose the cohort id and type for student', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(Request, 'getReportId');
    districtId = 'districtId';
    schoolId = 'schoolId';
    gradeId = 'gradeId';
    teacherId = 'teacherId';
    classId = 'classId';
    groupId = 'groupId';
    studentId = 'studentId';
    wrapper.setState({
      active_report: {
        reportSettings: {
          connect_url: '/Slms?ReportSomething&fam=$FAMILY$&id=$COHORT_ID$',
          option_property: null,
        },
        type_id: 's44ng_05',
      },
    });
    wrapper.setProps({ districtId, schoolId, gradeId, teacherId, classId, groupId, studentId });

    wrapper.instance().runReport();
    expect(spy.mock.calls[0][2]).toMatch(/.*studentId.*/);
    expect(spy.mock.calls[0][2]).toMatch(new RegExp(AppConstants.COHORT_TYPE.Student));
  });

  it('Should hide loading modal when getReportId callback runs', () => {
    wrapper.setState({
      active_report: {
        reportSettings: {
          connect_url: '/Slms?ReportSomething&fam=$FAMILY$&id=$COHORT_ID$',
          option_property: null,
        },
        type_id: 's44ng_05',
        show_report_loading_modal: true,
      },
    });
    wrapper.instance().runReportCallback(1);
    expect(wrapper.state('show_report_loading_modal')).toEqual(false);
  });

  it('Should update last run date when callback returns', () => {
    wrapper.setState({
      active_report: {
        reportSettings: {
          connect_url: '/Slms?ReportSomething&fam=$FAMILY$&id=$COHORT_ID$',
          option_property: null,
        },
        type_id: 's44ng_05',
        show_report_loading_modal: true,
      },
    });
    wrapper.instance().runReportCallback(1);
    const d = new Date();
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = d.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    const lastGenerated = `${d.getFullYear()}-${month}-${day}`;
    expect(wrapper.state('rows').S44NG[0].last_generated).toEqual(lastGenerated);
  });

  it('Should filter reports by type', () => {
    wrapper.find('#report-scope').simulate('change', { target: { value: 'Aggregate' } });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should sort reports by column: Type', () => {
    wrapper
      .find('#ReportListSort_type')
      .simulate('click', { target: { classList: { add() {} }, id: 'ReportListSort_type' } });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('#ReportListSort_type')
      .simulate('click', { target: { classList: { add() {} }, id: 'ReportListSort_type' } });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should sort reports by column: Name', () => {
    wrapper
      .find('#ReportListSort_name')
      .simulate('click', { target: { classList: { add() {} }, id: 'ReportListSort_name' } });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('#ReportListSort_name')
      .simulate('click', { target: { classList: { add() {} }, id: 'ReportListSort_name' } });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should sort reports by column: Date', () => {
    wrapper
      .find('#ReportListSort_date')
      .simulate('click', { target: { classList: { add() {} }, id: 'ReportListSort_date' } });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('#ReportListSort_type')
      .simulate('click', { target: { classList: { add() {} }, id: 'ReportListSort_type' } });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should have report settings data', () => {
    expect(ReportSettings).toBeDefined();
  });
  it('Should save sort by name element to reference', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(wrapper.instance(), 'sortNameRef');
    const elem = {};
    wrapper.instance().sortNameRef(elem);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().sortName).toEqual(elem);
  });
  it('Should save sort by type element to reference', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(wrapper.instance(), 'sortTypeRef');
    const elem = {};
    wrapper.instance().sortTypeRef(elem);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().sortType).toEqual(elem);
  });
  it('Should save sort by date element to reference', () => {
    jest.resetAllMocks();
    const spy = jest.spyOn(wrapper.instance(), 'sortDateRef');
    const elem = {};
    wrapper.instance().sortDateRef(elem);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().sortDate).toEqual(elem);
  });
});
