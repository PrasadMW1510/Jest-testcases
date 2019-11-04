import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { shallowToJson } from 'enzyme-to-json';
import { R180NGSettingContainer } from '../R180NGSettingContainer';

describe('<R180NGSettingContainer />', () => {
  let wrapper = null;
  let mockedProgramSetting = null;
  let mockedActions = null;
  let programSettingsEnrollmentRequest = null;
  let showProgramSettingSetStudentLevelModal = null;
  let mockedSmartBarSelections = null;
  let mockIsLoading = null;
  // const mockedHandleSaveClick = null;
  describe('<R180NGSettingContainer />', () => {
    mockedProgramSetting = fromJS({
      error: false,
      loading: true,
      programSetting: { auto_level: ['1'], second_language_id: ['1'], student_level: ['1'] },
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
    mockIsLoading = false;
    mockedActions = jest.fn();
    mockedSmartBarSelections = fromJS({ selectedCohType: 'Teacher' });
    showProgramSettingSetStudentLevelModal = jest.fn();
    programSettingsEnrollmentRequest = jest.fn();
    const mockProgramAvailable = {
      selectedProgram: {
        settings: 'Settings',
        display_name: 'READ 180 Next Generation',
        display_image: '/d4d957e1b5fed309a10581d6df938d4c.png',
      },
    };
    beforeEach(() => {
      wrapper = shallow(
        <R180NGSettingContainer
          showProgramSettingSetStudentLevelModal={showProgramSettingSetStudentLevelModal}
          rosterPage={mockProgramAvailable}
          R180NGProgramSettingsRequest={mockedActions}
          R180NGProgramSettingsEnrollmentRequest={programSettingsEnrollmentRequest}
          programSettingData={mockedProgramSetting}
          programEnrollmentCount={mockedProgramSetting}
          R180NGSaveRequest={mockedActions}
          smartBarSelections={mockedSmartBarSelections}
          enrollmentData={3}
          enrollmentCount={3}
          isLoading={mockIsLoading}
        />
      );
      wrapper.setProps({
        isLoading: true,
      });
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
  describe('shouldComponentUpdate', () => {
    it('to verify the component will receive props', () => {
      programSettingsEnrollmentRequest = jest.fn();
      mockedProgramSetting = fromJS({
        programSetting: [],
        loading: true,
      });
      const mockProgramAvailable = {
        selectedProgram: {
          settings: 'Settings',
          display_name: 'READ 180 Next Generation',
          display_image: '/d4d957e1b5fed309a10581d6df938d4c.png',
        },
      };
      const mockNextProgramSettingContainer = fromJS({
        error: false,
        loading: true,
        programSetting: { auto_level: ['1'], second_language_id: ['0'], student_level: ['1'] },
        programEnrollmentSetting: [
          {
            $: 'SUBPRODUCT',
            name: 'progress space',
            'application.id': 'r180NG',
            students: [{ total: ['1'] }],
          },
        ],
      });
      showProgramSettingSetStudentLevelModal = jest.fn();
      wrapper = shallow(
        <R180NGSettingContainer
          programSettingData={mockNextProgramSettingContainer}
          items={mockNextProgramSettingContainer.programEnrollmentSetting}
          enrollmentData={['1']}
          showProgramSettingSetStudentLevelModal={showProgramSettingSetStudentLevelModal}
          rosterPage={mockProgramAvailable}
          R180NGProgramSettingsRequest={mockedActions}
          R180NGProgramSettingsEnrollmentRequest={programSettingsEnrollmentRequest}
          programEnrollmentCount={mockedProgramSetting}
          R180NGSaveRequest={mockedActions}
          smartBarSelections={mockedSmartBarSelections}
          enrollmentCount={3}
          isLoading={mockIsLoading}
        />
      );
      wrapper.setProps({
        programSetting: mockNextProgramSettingContainer,
        isLoading: true,
        R180NGSaveRequest: jest.fn(),
        showProgramSettingSetStudentLevelModal: jest.fn(),
        enrollmentData: ['1'],
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('verify handle student level change', () => {
      expect(wrapper.find('showProgramSettingSetStudentLevelModal').toBeCalled);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify handle shandleChangeOkClick', () => {
      expect(wrapper.find('handleSaveClick').toBeCalled);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render correctly', () => {
      mockedProgramSetting = fromJS({
        error: false,
        loading: true,
        programSetting: 'admin',
        programEnrollmentSetting: 'admin',
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
  describe('handleSaveClick', () => {
    it('username value has been change', () => {
      const mockedEnrollCount = '-1';
      const mockProgramAvailable = {
        selectedProgram: {
          settings: 'Settings',
          display_name: 'READ 180 Next Generation',
          display_image: '/d4d957e1b5fed309a10581d6df938d4c.png',
        },
      };
      wrapper = shallow(
        <R180NGSettingContainer
          programEnrollmentCount={mockedProgramSetting}
          showProgramSettingSetStudentLevelModal={showProgramSettingSetStudentLevelModal}
          items={mockedProgramSetting.programEnrollmentSetting}
          enrollmentData={mockedEnrollCount}
          programSettingData={mockedProgramSetting}
          rosterPage={mockProgramAvailable}
          R180NGProgramSettingsRequest={mockedActions}
          R180NGProgramSettingsEnrollmentRequest={programSettingsEnrollmentRequest}
          R180NGSaveRequest={mockedActions}
          smartBarSelections={mockedSmartBarSelections}
          enrollmentCount={3}
          isLoading={mockIsLoading}
        />
      );
      wrapper.setProps({
        showProgramSettingSetStudentLevelModal: jest.fn(),
        handleSaveClick: jest.fn(),
        R180NGSaveRequest: jest.fn(),
        programEnrollmentCount: jest.fn(),
        getEnroll: jest.fn(),
        programsSettingChanged: mockedProgramSetting,
        enrollmentData: mockedEnrollCount,
        isLoading: true,
      });
      wrapper.instance().handleSaveClick(mockedProgramSetting);
      wrapper.instance().handleSetStudentLevelClick();
      expect(shallowToJson(wrapper)).toMatchSnapshot();

      it('getEnroll to have called ', () => {
        wrapper.instance().getEnroll();
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });
  });
  describe('should call Admin enrollcount', () => {
    it('to verify the component will receive props', () => {
      let mockhandleChangeClick;
      programSettingsEnrollmentRequest = jest.fn();
      mockedSmartBarSelections = fromJS({ selectedCohType: '' });
      const mockProgramSettingContainer = fromJS({
        error: false,
        loading: true,
        programSetting: 'admin',
        programEnrollmentSetting: 'admin',
      });
      const mockedEnrollCount = jest.fn();
      const mockProgramAvailable = {
        selectedProgram: {
          settings: 'Settings',
          display_name: 'READ 180 Next Generation',
          display_image: '/d4d957e1b5fed309a10581d6df938d4c.png',
        },
      };
      showProgramSettingSetStudentLevelModal = jest.fn();
      wrapper = shallow(
        <R180NGSettingContainer
          programSettingData={mockProgramSettingContainer}
          programEnrollmentCount={mockProgramSettingContainer}
          rosterPage={mockProgramAvailable}
          items={mockProgramSettingContainer.programEnrollmentSetting}
          enrollmentData={mockedEnrollCount}
          R180NGProgramSettingsRequest={mockedActions}
          R180NGProgramSettingsEnrollmentRequest={programSettingsEnrollmentRequest}
          showProgramSettingSetStudentLevelModal={showProgramSettingSetStudentLevelModal}
          handleSaveClick={mockhandleChangeClick}
          smartBarSelections={mockedSmartBarSelections}
          enrollmentCount={3}
          isLoading={mockIsLoading}
        />
      );
      wrapper.setProps({
        programSetting: mockProgramSettingContainer,
        R180NGSaveRequest: jest.fn(),
        showProgramSettingSetStudentLevelModal: jest.fn(),
        enrollmentData: mockedEnrollCount,
        loading: true,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
