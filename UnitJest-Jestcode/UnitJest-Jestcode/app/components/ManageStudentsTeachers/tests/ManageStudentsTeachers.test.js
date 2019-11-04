import React from 'react';
import Immutable from 'immutable';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme/build/index';
import ManageStudentsTeachers from '../ManageStudentsTeachers';
import { TAB } from '../constants';

describe('<ManageStudentsTeachers />', () => {
  let wrapper = null;
  let smartBarSelections = null;
  let loginData = null;

  beforeEach(() => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: '',
    });

    loginData = Immutable.fromJS({});
  });

  it('Expect to render correctly when StudentLicensing tab clicked', () => {
    wrapper = shallow(
      <ManageStudentsTeachers smartBarSelections={smartBarSelections} loginData={loginData} />
    );
    wrapper
      .find('NavItem')
      .at(0)
      .simulate('click', { currentTarget: { id: TAB.StudentLicensing }, preventDefault: () => {} });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly when StudentEnrollment tab clicked', () => {
    wrapper = shallow(
      <ManageStudentsTeachers smartBarSelections={smartBarSelections} loginData={loginData} />
    );
    wrapper
      .find('NavItem')
      .at(1)
      .simulate('click', {
        currentTarget: { id: TAB.StudentEnrollment },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('<TeacherLicensing />', () => {
  let wrapper = null;
  let smartBarSelections = null;
  let loginData = null;

  beforeEach(() => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: '',
    });

    loginData = Immutable.fromJS({});
  });

  it('Expect to render correctly when TeacherLicensing tab clicked', () => {
    wrapper = shallow(
      <ManageStudentsTeachers smartBarSelections={smartBarSelections} loginData={loginData} />
    );
    wrapper
      .find('NavItem')
      .at(0)
      .simulate('click', { currentTarget: { id: TAB.TeacherLicensing }, preventDefault: () => {} });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly when TeacherAccess tab clicked', () => {
    wrapper = shallow(
      <ManageStudentsTeachers smartBarSelections={smartBarSelections} loginData={loginData} />
    );
    wrapper
      .find('NavItem')
      .at(1)
      .simulate('click', {
        currentTarget: { id: TAB.TeacherAccess },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('<HandeTabReset />', () => {
  let wrapper = null;
  let smartBarSelections = null;
  let loginData = null;

  beforeEach(() => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: '',
    });

    loginData = Immutable.fromJS({
      user_org: ['School'],
      user_type: ['Administrator'],
    });

    wrapper = shallow(
      <ManageStudentsTeachers smartBarSelections={smartBarSelections} loginData={loginData} />
    );
  });

  it('should handle tab reset', () => {
    wrapper.instance().handleTabReset();
    expect(wrapper.instance().state.isolateTab).toBeFalsy();
    wrapper.instance().handleTabIsolate();
    expect(wrapper.instance().state.isolateTab).toBeTruthy();
  });
});

describe('orgType === USER_ORG.District', () => {
  let wrapper = null;
  let smartBarSelections = null;
  let loginData = null;

  beforeEach(() => {
    smartBarSelections = Immutable.fromJS({});

    loginData = Immutable.fromJS({
      user_org: ['District'],
    });
    wrapper = shallow(
      <ManageStudentsTeachers smartBarSelections={smartBarSelections} loginData={loginData} />
    );
  });

  it('cohortType === COHORT_TYPE.School', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'School',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('cohortType === COHORT_TYPE.Grade', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'Grade',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('cohortType === COHORT_TYPE.Teacher', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'Teacher',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohortType === COHORT_TYPE.Class', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'School',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohortType === COHORT_TYPE.Group', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'School',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohortType === COHORT_TYPE.Student', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'Student',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('orgType === USER_ORG.School', () => {
  let wrapper = null;
  let smartBarSelections = null;
  let loginData = null;

  beforeEach(() => {
    smartBarSelections = Immutable.fromJS({});

    loginData = Immutable.fromJS({
      user_org: ['School'],
    });
    wrapper = shallow(
      <ManageStudentsTeachers smartBarSelections={smartBarSelections} loginData={loginData} />
    );
  });

  it('cohortType === COHORT_TYPE.Grade', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'Grade',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('cohortType === COHORT_TYPE.Teacher', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'Teacher',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohortType === COHORT_TYPE.Class', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'School',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohortType === COHORT_TYPE.Group', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'School',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohortType === COHORT_TYPE.Student', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'Student',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('orgType === USER_ORG.Teacher', () => {
  let wrapper = null;
  let smartBarSelections = null;
  let loginData = null;

  beforeEach(() => {
    smartBarSelections = Immutable.fromJS({});

    loginData = Immutable.fromJS({
      user_org: ['Teacher'],
    });
    wrapper = shallow(
      <ManageStudentsTeachers smartBarSelections={smartBarSelections} loginData={loginData} />
    );
  });

  it('cohortType === COHORT_TYPE.School', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'School',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohortType === COHORT_TYPE.Class', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'School',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohortType === COHORT_TYPE.Group', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'School',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohortType === COHORT_TYPE.Student', () => {
    smartBarSelections = Immutable.fromJS({
      selectedCohType: 'Student',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
