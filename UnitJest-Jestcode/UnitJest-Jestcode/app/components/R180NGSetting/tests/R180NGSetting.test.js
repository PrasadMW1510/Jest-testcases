import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import ProgramSettingsViewR180NG from 'components/R180NGSetting/ProgramSettingsViewR180NG';
import SettingsMessage from 'components/SettingsMessage';
import Programs from 'containers/App/ProgramTable';
import { COHORT_TYPE, USER_ORG, USER_TYPE } from 'containers/App/constants';

import * as Constants from 'components/R180NGSetting/constants';
import R180NGSetting from '../index';

describe('<R180NGSetting />', () => {
  let wrapper = null;
  let mockEnroll = 2;
  let mockedProgramSetting = {};
  let mockedPrograms = null;
  let onStudentLevelClick = null;
  let mockProgramData = null;
  let mockUserType = {};
  let mockIsLoading = null;
  let mockonStudentLevelClick = null;
  beforeEach(() => {
    mockEnroll = 2;
    mockIsLoading = true;
    onStudentLevelClick = jest.fn();
    mockUserType = { userType: 'Administrator', userOrg: 'District' };
    mockProgramData = {
      display_image: '/b4dced4348bdc9fa80024292c7926954.png',
      display_name: Programs[10].display_name,
    };
    mockedPrograms = { auto_level: ['1'], second_language_id: ['1'] };

    mockedProgramSetting = fromJS({
      error: false,
      programSetting: { auto_level: ['1'], second_language_id: ['1'] },
      programEnrollmentSetting: [
        {
          $: { type: 'SUBPRODUCT' },
          'application.id': ['R180NG'],
          name: 'READ 180 NG Stage B',
          students: [{ total: ['1'] }],
        },
        {
          $: { type: 'SUBPRODUCT' },
          'application.id': ['R180NG'],
          name: 'READ 180 NG Stage A Teacher',
          students: [{ total: ['1'] }],
        },
      ],
    });
    wrapper = shallow(
      <R180NGSetting
        enrollmentData={mockEnroll}
        activeTab={Constants.TAB_SETTINGS}
        isolateTab={false}
        programSettingData={mockedProgramSetting}
        onStudentLevelClick={onStudentLevelClick}
        programs={mockedPrograms}
        programName={mockProgramData}
        userType={mockUserType}
        isLoading={mockIsLoading}
      />
    );
    wrapper.setProps({ programs: mockedProgramSetting });
  });
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  describe('props.selectedProgram is empty object', () => {
    mockProgramData = {
      display_image: '/b4dced4348bdc9fa80024292c7926954.png',
      display_name: Programs[10].display_name,
    };
    mockedProgramSetting = fromJS({
      error: false,
      programSetting: { auto_level: ['1'], second_language_id: ['1'] },
      programEnrollmentSetting: [
        {
          $: { type: 'SUBPRODUCT' },
          'application.id': ['R180NG'],
          name: 'READ 180 NG Stage B',
          students: [{ total: ['1'] }],
        },
        {
          $: { type: 'SUBPRODUCT' },
          'application.id': ['R180NG'],
          name: 'READ 180 NG Stage A Teacher',
          students: [{ total: ['1'] }],
        },
      ],
    });
    it('Should render correctly', () => {
      wrapper = shallow(
        <R180NGSetting
          enrollmentData={mockEnroll}
          programName={mockProgramData}
          programSettingData={{}}
          onStudentLevelClick={onStudentLevelClick}
          programs={mockedPrograms}
          userType={mockUserType}
          isLoading={mockIsLoading}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
  describe('props.selectedProgram is r180ng with no enrollment object', () => {
    beforeEach(() => {
      mockEnroll = jest.fn();
      onStudentLevelClick = jest.fn();
      mockedProgramSetting = fromJS({
        error: false,
        programSetting: { auto_level: ['1'], second_language_id: ['1'] },
        programEnrollmentSetting: [
          {
            $: { type: 'SUBPRODUCT' },
            'application.id': ['R180NG'],
            name: 'READ 180 NG Stage B',
            students: [{ total: ['0'] }],
          },
        ],
      });
      mockProgramData = {
        display_image: '/b4dced4348bdc9fa80024292c7926954.png',
        display_name: Programs[10].display_name,
      };
    });
    it('Should render correctly', () => {
      wrapper = shallow(
        <R180NGSetting
          programSettingData={mockedProgramSetting}
          enrollmentData={mockEnroll}
          onStudentLevelClick={onStudentLevelClick}
          programs={mockedPrograms}
          programName={mockProgramData}
          userType={mockUserType}
          isLoading
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(SettingsMessage).toBeTruthy();
    });

    it('verify no enrollment message for school', () => {
      wrapper.setProps({
        smartBarSelections: 'School',
      });
      wrapper.instance().renderNoEnrollmentData();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('verify no enrollment message for school topic manager tab', () => {
      wrapper.setProps({
        smartBarSelections: 'School',
      });
      wrapper.setState({
        activeTab: Constants.TAB_TOPIC_MANAGER,
      });
      wrapper.instance().renderNoEnrollmentData();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify no enrollment message for District Admin topic manager', () => {
      wrapper.setProps({
        enrollmentData: 0,
        smartBarSelections: '',
        userType: {
          userType: '',
          userOrg: USER_ORG.District,
        },
      });
      wrapper.setState({
        activeTab: Constants.TAB_TOPIC_MANAGER,
      });
      wrapper.instance().renderNoEnrollmentData();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('verify no enrollment message for user org default', () => {
      wrapper.setProps({
        enrollmentData: 0,
        smartBarSelections: '',
        userType: {
          userType: '',
          userOrg: '',
        },
      });
      wrapper.setState({
        activeTab: Constants.TAB_TOPIC_MANAGER,
      });
      wrapper.instance().renderNoEnrollmentData();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('verify no enrollment message for Teacher topic manager tab', () => {
      wrapper.setProps({
        enrollmentData: 0,
        smartBarSelections: '',
        userType: {
          userType: 'Teacher',
          userOrg: USER_ORG.School,
        },
      });
      wrapper.setState({
        activeTab: Constants.TAB_TOPIC_MANAGER,
      });
      wrapper.instance().renderNoEnrollmentData();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('verify no enrollment message for District Admin school topic manager', () => {
      wrapper.setProps({
        enrollmentData: 0,
        smartBarSelections: '',
        userType: {
          userType: USER_TYPE.Administrator,
          userOrg: USER_ORG.School,
        },
      });
      wrapper.setState({
        activeTab: Constants.TAB_TOPIC_MANAGER,
      });
      wrapper.instance().renderNoEnrollmentData();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
  describe('props.selectedProgram is not an empty object', () => {
    beforeEach(() => {
      mockedProgramSetting = fromJS({
        error: false,
        programSetting: { auto_level: ['1'], second_language_id: ['1'] },
        programEnrollmentSetting: [
          {
            $: { type: 'SUBPRODUCT' },
            'application.id': ['R180NG'],
            name: 'READ 180 NG Stage B',
            students: [{ total: ['0'] }],
          },
        ],
      });
    });
    wrapper = shallow(
      <R180NGSetting
        onStudentLevelClick={onStudentLevelClick}
        enrollmentData={mockEnroll}
        programSettingData={mockedProgramSetting}
        programName={mockProgramData}
        programs={mockedPrograms}
        userType={mockUserType}
        isLoading
      />
    );
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when settings tab clicked', () => {
    mockedProgramSetting = { programSetting: 'Admin' };
    wrapper = shallow(
      <R180NGSetting
        enrollmentData={mockEnroll}
        onStudentLevelClick={onStudentLevelClick}
        smartBarSelections={'Teacher'}
        programSettingData={mockedProgramSetting}
        programName={mockProgramData}
        programs={mockedProgramSetting.programSetting}
        userType={mockUserType}
        isLoading
      />
    );
    wrapper
      .find('NavItem')
      .first()
      .simulate('click', {
        currentTarget: { id: Constants.TAB_SETTINGS },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when topic manager tab clicked', () => {
    wrapper = shallow(
      <R180NGSetting
        enrollmentData={mockEnroll}
        onStudentLevelClick={onStudentLevelClick}
        programSettingData={mockedProgramSetting}
        smartBarSelections={'Class'}
        programName={mockProgramData}
        programs={mockedProgramSetting.programSetting}
        userType={mockUserType}
        isLoading
      />
    );
    wrapper
      .find('NavItem')
      .last()
      .simulate('click', {
        currentTarget: { id: Constants.TAB_TOPIC_MANAGER },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it(' Cohort Type is Student', () => {
    wrapper = shallow(
      <R180NGSetting
        enrollmentData={mockEnroll}
        onStudentLevelClick={onStudentLevelClick}
        programSettingData={mockedProgramSetting}
        smartBarSelections={'Student'}
        programName={mockProgramData}
        programs={mockedPrograms}
        userType={mockUserType}
        isLoading
      />
    );
    wrapper
      .find('NavItem')
      .last()
      .simulate('click', {
        currentTarget: { id: Constants.TAB_TOPIC_MANAGER },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when tab is isolated.', () => {
    wrapper = shallow(
      <R180NGSetting
        enrollmentData={mockEnroll}
        onStudentLevelClick={onStudentLevelClick}
        programs={mockedPrograms}
        programSettingData={mockedProgramSetting}
        programName={mockProgramData}
        userType={mockUserType}
        isLoading
      />
    );
    wrapper.instance().handleTabIsolate();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when taba are reset.', () => {
    wrapper = shallow(
      <R180NGSetting
        enrollmentData={mockEnroll}
        onStudentLevelClick={onStudentLevelClick}
        programSettingData={mockedProgramSetting}
        programs={Constants.R180NG_RESTORE_DEFALUT_VALUES}
        programName={mockProgramData}
        userType={mockUserType}
        isLoading
      />
    );
    wrapper.instance().handleTabsReset();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('props.selectedProgram is r180ng and enroll count is greater than 0', () => {
    beforeEach(() => {
      mockEnroll = 0;
      mockUserType = { userType: 'Administrator', userOrg: 'District' };
      mockonStudentLevelClick = jest.fn();
      mockProgramData = {
        display_image: '/b4dced4348bdc9fa80024292c7926954.png',
        display_name: Programs[10].display_name,
      };
      mockedProgramSetting = fromJS({
        error: false,
        programSetting: { auto_level: ['1'], second_language_id: ['1'] },
        programEnrollmentSetting: [
          {
            $: { type: 'SUBPRODUCT' },
            'application.id': ['R180NG'],
            name: 'READ 180 NG Stage Blklj',
            students: [{ total: ['2'] }],
          },
          {
            $: { type: 'SUBPRODUCT' },
            'application.id': ['R180NG'],
            name: 'READ 180 NG Stage Alkjlk',
            students: [{ total: ['1'] }],
          },
        ],
      });
      wrapper = shallow(
        <R180NGSetting
          programSettingData={mockedProgramSetting}
          enrollmentData={mockEnroll}
          programName={mockProgramData}
          onStudentLevelClick={mockonStudentLevelClick}
          programs={mockedPrograms}
          smartBarSelections={'Teacher'}
          userType={mockUserType}
          isLoading
        />
      );
      wrapper
        .find('NavItem')
        .last()
        .simulate('click', {
          currentTarget: { id: Constants.TAB_SETTINGS },
          preventDefault: () => {},
        });
      expect(SettingsMessage).toHaveBeenCalledWith(
        Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_TEACHER
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('props.selectedProgram is not an empty object', () => {
    beforeEach(() => {
      mockEnroll = '2';
      mockonStudentLevelClick = jest.fn();
      mockUserType = { userType: 'Administrator', userOrg: 'District' };
      mockProgramData = {
        display_image: '/b4dced4348bdc9fa80024292c7926954.png',
        display_name: Programs[10].display_name,
      };
      mockedProgramSetting = fromJS({
        error: false,
        programSetting: { auto_level: ['1'], second_language_id: ['1'] },
        programEnrollmentSetting: [
          {
            $: { type: 'SUBPRODUCT' },
            'application.id': ['R180NG'],
            name: 'READ 180 NG Stage B',
            students: [{ total: ['1'] }],
          },
          {
            $: { type: 'SUBPRODUCT' },
            'application.id': ['R180NG'],
            name: 'READ 180 NG Stage A',
            students: [{ total: ['1'] }],
          },
        ],
      });
      wrapper = shallow(
        <R180NGSetting
          programSettingData={mockedProgramSetting}
          enrollmentData={'3'}
          onStudentLevelClick={mockonStudentLevelClick}
          programs={mockedPrograms}
          programName={mockProgramData.display_name}
          userType={mockUserType}
          isLoading
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should render correctly when topic manager tab clicked', () => {
      mockedProgramSetting = { ProgramSetting: 'Admin' };
      mockProgramData = {
        display_image: '/b4dced4348bdc9fa80024292c7926954.png',
        display_name: Programs[10].display_name,
      };
      wrapper = shallow(
        <R180NGSetting
          programSettingData={mockedProgramSetting}
          enrollmentData={'-1'}
          onStudentLevelClick={mockonStudentLevelClick}
          programs={Constants.R180NG_RESTORE_DEFALUT_VALUES}
          programName={mockProgramData.display_name}
          userType={mockUserType}
          isLoading
        />
      );
      wrapper
        .find('NavItem')
        .last()
        .simulate('click', {
          currentTarget: { id: Constants.TAB_SETTINGS },
          preventDefault: () => {},
        });
      it('Should render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
        expect(SettingsMessage(Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_ADMIN)).toBeTruthy();
      });
      it('Should render correctly when topic manager tab clicked', () => {
        wrapper = shallow(
          <R180NGSetting
            programSettingData={mockedProgramSetting}
            enrollmentData={'2'}
            programs={mockedPrograms}
            onStudentLevelClick={mockonStudentLevelClick}
            programName={mockProgramData.display_name}
            isLoading
          />
        );
        wrapper
          .find('NavItem')
          .last()
          .simulate('click', {
            currentTarget: { id: Constants.TAB_SETTINGS },
            preventDefault: () => {},
          });
        wrapper.setProps({ programs: mockedProgramSetting.programSetting });
        expect(shallowToJson(wrapper)).toMatchSnapshot();
        expect(ProgramSettingsViewR180NG)
          .toHaveBeenCalled()
          .with(mockedPrograms);
      });
      it('Should render correctly when topic manager tab clicked', () => {
        mockedProgramSetting = fromJS({
          error: false,
          programSetting: { auto_level: ['1'], second_language_id: ['1'] },
          programEnrollmentSetting: [
            {
              $: { type: 'SUBPRODUCT' },
              'application.id': ['R180EE'],
              name: 'READ 180 EE Stage B',
              students: [{ total: ['1'] }],
            },
            {
              $: { type: 'SUBPRODUCT' },
              'application.id': ['R180EE'],
              name: 'READ 180 EE Stage A',
              students: [{ total: ['1'] }],
            },
          ],
        });
        wrapper = shallow(
          <R180NGSetting
            programSettingData={mockedProgramSetting}
            enrollmentData={'-0'}
            programs={Constants.R180NG_RESTORE_DEFALUT_VALUES}
            smartBarSelections={COHORT_TYPE.Teacher}
            onStudentLevelClick={mockonStudentLevelClick}
            userType={mockUserType}
            isLoading
          />
        );
        wrapper
          .find('NavItem')
          .last()
          .simulate('click', {
            currentTarget: { id: Constants.TAB_SETTINGS },
            preventDefault: () => {},
          });
        expect(shallowToJson(wrapper)).toMatchSnapshot();
        expect(SettingsMessage(Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_TEACHER)).toBeTruthy();
      });
      it('isolateTab is false', () => {
        wrapper.setState({ isolateTab: false });
        wrapper.instance().handleTabsReset();
        expect(wrapper.state('isolateTab')).toEqual(false);
      });
      it('Should render correctly when tab is isolated.', () => {
        wrapper = shallow(
          <R180NGSetting
            enrollmentData={mockEnroll}
            programSettingData={mockedProgramSetting}
            onStudentLevelClick={mockonStudentLevelClick}
            programs={Constants.R180NG_RESTORE_DEFALUT_VALUES}
            isLoading
          />
        );
        wrapper.instance().handleTabIsolate();
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });
  });

  describe('<R180NGSetting />', () => {
    beforeEach(() => {
      mockEnroll = 0;
      mockUserType = { userType: 'Administrator', userOrg: 'District' };
      onStudentLevelClick = jest.fn();
      mockProgramData = {
        display_image: '/b4dced4348bdc9fa80024292c7926954.png',
        display_name: Programs[10].display_name,
      };
      mockedProgramSetting = fromJS({
        error: false,
        programSetting: { auto_level: ['1'], second_language_id: ['1'] },
        programEnrollmentSetting: [
          {
            $: { type: 'SUBPRODUCT' },
            'application.id': ['R180NG'],
            name: 'READ 180 NG Stage B',
            students: [{ total: ['1'] }],
          },
          {
            $: { type: 'SUBPRODUCT' },
            'application.id': ['R180NG'],
            name: 'READ 180 NG Stage A Teacher',
            students: [{ total: ['1'] }],
          },
        ],
      });
      wrapper = shallow(
        <R180NGSetting
          enrollmentData={mockEnroll}
          activeTab={Constants.TAB_SETTINGS}
          isolateTab={false}
          programSettingData={mockedProgramSetting}
          onStudentLevelClick={onStudentLevelClick}
          programs={mockedPrograms}
          programName={mockProgramData}
          userType={mockUserType}
          isLoading
        />
      );
      wrapper.setProps({
        programs: mockedPrograms,
        userType: { userType: '', userOrg: '' },
      });
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it(' Cohort Type is Teacher', () => {
      wrapper.setProps({
        smartBarSelections: COHORT_TYPE.Teacher,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it(' Cohort Type is Grade', () => {
      wrapper.setProps({
        smartBarSelections: COHORT_TYPE.Grade,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it(' Cohort Type is Group', () => {
      wrapper.setProps({
        smartBarSelections: COHORT_TYPE.Group,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it(' Cohort Type is Class', () => {
      wrapper.setProps({
        smartBarSelections: COHORT_TYPE.Class,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it(' Cohort Type is Student', () => {
      wrapper.setProps({
        smartBarSelections: COHORT_TYPE.Student,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
