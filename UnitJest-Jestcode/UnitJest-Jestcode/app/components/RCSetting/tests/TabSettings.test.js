import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';
import * as ModalConstants from 'containers/ModalController/constants';
import TabSettings from 'components/RCSetting/TabSettings';
import * as Constants from '../constants';

describe('RC <TabSettings />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockCohortObj = {
    cohortType: COHORT_TYPE.District,
  };
  const mockHandleSave = jest.fn();
  let mockSetIsolateTab = null;
  const mockShowModal = jest.fn();
  const mockImmSettings = fromJS({
    StudentSettings: [
      {
        StudentDefaults: [
          {
            DisplayCongratulations: ['2'],
            DisplayWrongAnswers: ['3'],
            AllowPrint: ['4'],
          },
        ],
        DisplayCongratulations: ['1'],
        DisplayWrongAnswers: ['1'],
        AllowPrint: ['1'],
      },
    ],
    QuizSettings: [
      {
        QuizDefaults: [
          {
            QuizAttemptsAllowed: ['5'],
            NumQuestionsPerQuiz: ['6'],
            NumQuestionsPerEReads: ['7'],
            PercentRequired: ['8'],
            DaysBetweenRetake: ['9'],
            AllowOffLineScores: ['10'],
          },
        ],
        QuizAttemptsAllowed: ['3'],
        NumQuestionsPerQuiz: ['10'],
        NumQuestionsPerEReads: ['5'],
        PercentRequired: ['70'],
        DaysBetweenRetake: ['1'],
        AllowOffLineScores: ['1'],
      },
    ],
    AwardSettings: [
      {
        PointDefaults: [
          {
            Gold: ['11'],
            Silver: ['12'],
            Bronze: ['13'],
            Red: ['14'],
            Blue: ['15'],
          },
        ],
        BookDefaults: [
          {
            Gold: ['16'],
            Silver: ['17'],
            Bronze: ['18'],
            Red: ['19'],
            Blue: ['20'],
          },
        ],
        AwardDefaults: [
          {
            StudentGoal: ['21'],
            PointsMultiplier: ['22'],
          },
        ],
        AllowChangeGoals: ['-1'],
        Goals: ['-1'],
        StudentGoal: [],
        PointsMultiplier: [],
        Gold: [],
        Silver: [],
        Bronze: [],
        Red: [],
        Blue: [],
      },
    ],
  });

  const mockImmDefaultSettings = fromJS({
    StudentSettings: [
      {
        StudentDefaults: [
          {
            DisplayCongratulations: ['2'],
            DisplayWrongAnswers: ['3'],
            AllowPrint: ['4'],
          },
        ],
        DisplayCongratulations: ['2'],
        DisplayWrongAnswers: ['3'],
        AllowPrint: ['4'],
      },
    ],
    QuizSettings: [
      {
        QuizDefaults: [
          {
            QuizAttemptsAllowed: ['5'],
            NumQuestionsPerQuiz: ['6'],
            NumQuestionsPerEReads: ['7'],
            PercentRequired: ['8'],
            DaysBetweenRetake: ['9'],
            AllowOffLineScores: ['10'],
          },
        ],
        QuizAttemptsAllowed: ['5'],
        NumQuestionsPerQuiz: ['6'],
        NumQuestionsPerEReads: ['7'],
        PercentRequired: ['8'],
        DaysBetweenRetake: ['9'],
        AllowOffLineScores: ['10'],
      },
    ],
    AwardSettings: [
      {
        PointDefaults: [
          {
            Gold: ['11'],
            Silver: ['12'],
            Bronze: ['13'],
            Red: ['14'],
            Blue: ['15'],
          },
        ],
        BookDefaults: [
          {
            Gold: ['16'],
            Silver: ['17'],
            Bronze: ['18'],
            Red: ['19'],
            Blue: ['20'],
          },
        ],
        AwardDefaults: [
          {
            StudentGoal: ['21'],
            PointsMultiplier: ['22'],
          },
        ],
        AllowChangeGoals: ['-1'],
        Goals: ['-1'],
        StudentGoal: ['21'],
        PointsMultiplier: ['22'],
        Gold: ['11'],
        Silver: ['12'],
        Bronze: ['13'],
        Red: ['14'],
        Blue: ['15'],
      },
    ],
  });

  beforeEach(() => {
    mockSetIsolateTab = jest.fn();
    wrapper = shallow(
      <TabSettings
        cohortObj={mockCohortObj}
        handleSave={mockHandleSave}
        isTabIsolated={false}
        loggedInUserType={USER_TYPE.Administrator}
        programName="Reading Counts!"
        setIsolateTab={mockSetIsolateTab}
        immSettings={mockImmSettings}
        showModal={mockShowModal}
      />
    );
    wrapperInstance = wrapper.instance();
  });

  it('Expect to render as logged-in Admin user correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render student-level cohort correctly', () => {
    const localMockCohortObj = {
      cohortType: COHORT_TYPE.Student,
    };
    const localWrapper = shallow(
      <TabSettings
        cohortObj={localMockCohortObj}
        handleSave={mockHandleSave}
        isTabIsolated={false}
        loggedInUserType={USER_TYPE.Administrator}
        programName="Reading Counts!"
        setIsolateTab={mockSetIsolateTab}
        immSettings={mockImmSettings}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(localWrapper)).toMatchSnapshot();
  });

  describe('getNewValue method', () => {
    it('checked checkbox returns correct value', () => {
      const mockEvent = {
        target: {
          checked: true,
          type: 'checkbox',
        },
      };
      expect(wrapperInstance.getNewValue(mockEvent)).toEqual('1');
    });

    it('unchecked checkbox returns correct value', () => {
      const mockEvent = {
        target: {
          checked: false,
          type: 'checkbox',
        },
      };
      expect(wrapperInstance.getNewValue(mockEvent)).toEqual('0');
    });

    it('non-checkbox field returns correct value', () => {
      const mockEvent = {
        target: {
          type: 'text',
          value: '5',
        },
      };
      expect(wrapperInstance.getNewValue(mockEvent)).toEqual('5');
    });
  });

  it('getNumericTextFieldInvalidMessage method returns correct value', () => {
    expect(
      wrapperInstance.getNumericTextFieldInvalidMessage('some description', '1', '7')
    ).toMatchSnapshot();
  });

  it('handleSetInitialValues method works correctly', () => {
    wrapperInstance.handleSetInitialValues();
    const wrapperSettingsState = wrapper.state('immSettings');
    expect(wrapperSettingsState).toEqual(mockImmSettings);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('handleRestoreDefault method works correctly', () => {
    wrapperInstance.handleRestoreDefault();
    expect(wrapperInstance.state.immSettings).toEqual(mockImmDefaultSettings);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
  });

  it('Expect to render as logged-in Teacher user correctly', () => {
    const localWrapper = shallow(
      <TabSettings
        cohortObj={mockCohortObj}
        handleSave={mockHandleSave}
        isTabIsolated
        loggedInUserType={USER_TYPE.Teacher}
        programName="Reading Counts!"
        setIsolateTab={mockSetIsolateTab}
        immSettings={mockImmSettings}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(localWrapper)).toMatchSnapshot();
  });

  describe('handleBlurAwardSettings method', () => {
    it('out of range on numeric text field (StudentGoal) works correctly', () => {
      const mockEvent = {
        target: {
          name: 'StudentGoal',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('10000');
      const spyGetNumericTextFieldInvalidMessage = jest
        .spyOn(wrapperInstance, 'getNumericTextFieldInvalidMessage')
        .mockReturnValue('someMessage');
      wrapperInstance.handleBlurAwardSettings(mockEvent);
      const newImmSettings = wrapperInstance.state.immSettings.setIn(
        ['AwardSettings', 0, 'StudentGoal', 0],
        '0'
      );
      expect(wrapperInstance.state.immSettings).toEqual(newImmSettings);
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, {
        message: 'someMessage',
      });
      const textFieldNumericRange = Constants.TEXT_FIELD_NUMERIC_RANGES.StudentGoal;
      expect(spyGetNumericTextFieldInvalidMessage).toHaveBeenCalledWith(
        textFieldNumericRange[2],
        textFieldNumericRange[0],
        textFieldNumericRange[1]
      );
    });

    it('empty PointsMultiplier works correctly', () => {
      const mockEvent = {
        target: {
          name: 'PointsMultiplier',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('');
      const spyGetNumericTextFieldInvalidMessage = jest
        .spyOn(wrapperInstance, 'getNumericTextFieldInvalidMessage')
        .mockReturnValue('someMessage');
      wrapperInstance.handleBlurAwardSettings(mockEvent);
      const newImmSettings = wrapperInstance.state.immSettings.setIn(
        ['AwardSettings', 0, 'PointsMultiplier', 0],
        ''
      );
      const textFieldNumericRange = Constants.TEXT_FIELD_NUMERIC_RANGES.PointsMultiplier;
      expect(wrapperInstance.state.immSettings).toEqual(newImmSettings);
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, {
        message: 'someMessage',
      });
      expect(spyGetNumericTextFieldInvalidMessage).toHaveBeenCalledWith(
        textFieldNumericRange[2],
        textFieldNumericRange[0],
        textFieldNumericRange[1]
      );
    });
  });

  describe('handleBlurQuizSettings method', () => {
    it('out of range on numeric text field (QuizAttemptsAllowed) works correctly', () => {
      const mockEvent = {
        target: {
          name: 'QuizAttemptsAllowed',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('7');
      jest
        .spyOn(wrapperInstance, 'getNumericTextFieldInvalidMessage')
        .mockReturnValue('someMessage');
      wrapperInstance.handleBlurQuizSettings(mockEvent);
      const newImmSettings = wrapperInstance.state.immSettings.setIn(
        ['QuizSettings', 0, 'QuizAttemptsAllowed', 0],
        ''
      );
      expect(wrapperInstance.state.immSettings).toEqual(newImmSettings);
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, {
        message: 'someMessage',
      });
    });

    it('out of range on default revert-value field (PercentRequired) works correctly', () => {
      const mockEvent = {
        target: {
          name: 'PercentRequired',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('400');
      jest
        .spyOn(wrapperInstance, 'getNumericTextFieldInvalidMessage')
        .mockReturnValue('someMessage');
      wrapperInstance.handleBlurQuizSettings(mockEvent);
      const newImmSettings = wrapperInstance.state.immSettings.setIn(
        ['QuizSettings', 0, 'PercentRequired', 0],
        '70'
      );
      expect(wrapperInstance.state.immSettings).toEqual(newImmSettings);
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, {
        message: 'someMessage',
      });
    });

    it('empty DaysBetweenRetake works correctly', () => {
      const mockEvent = {
        target: {
          name: 'DaysBetweenRetake',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('');
      const spyGetNumericTextFieldInvalidMessage = jest
        .spyOn(wrapperInstance, 'getNumericTextFieldInvalidMessage')
        .mockReturnValue('someMessage');
      wrapperInstance.handleBlurQuizSettings(mockEvent);
      const newImmSettings = wrapperInstance.state.immSettings.setIn(
        ['QuizSettings', 0, 'DaysBetweenRetake', 0],
        '0'
      );
      const textFieldNumericRange = Constants.TEXT_FIELD_NUMERIC_RANGES.DaysBetweenRetake;
      expect(wrapperInstance.state.immSettings).toEqual(newImmSettings);
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, {
        message: 'someMessage',
      });
      expect(spyGetNumericTextFieldInvalidMessage).toHaveBeenCalledWith(
        textFieldNumericRange[2],
        textFieldNumericRange[0],
        textFieldNumericRange[1]
      );
    });
  });

  describe('handleChangeStudentSettings method', () => {
    it('correct functionality', () => {
      const mockEvent = {
        target: {
          checked: true,
          name: 'DisplayCongratulations',
          type: 'checkbox',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('1');
      wrapperInstance.handleChangeStudentSettings(mockEvent);
      const newImmSettings = wrapperInstance.state.immSettings.setIn(
        ['StudentSettings', 0, 'DisplayCongratulations', 0],
        '1'
      );
      expect(wrapperInstance.state.immSettings).toEqual(newImmSettings);
    });
  });

  describe('handleChangeQuizSettings method', () => {
    it('normal change for for QuizAttemptsAllowed', () => {
      const mockEvent = {
        target: {
          name: 'QuizAttemptsAllowed',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('5');
      wrapperInstance.handleChangeQuizSettings(mockEvent);
      const newImmSettings = wrapperInstance.state.immSettings.setIn(
        ['QuizSettings', 0, 'QuizAttemptsAllowed', 0],
        '5'
      );
      expect(wrapperInstance.state.immSettings).toEqual(newImmSettings);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('beyond numeric length for QuizAttemptsAllowed', () => {
      const mockEvent = {
        target: {
          name: 'QuizAttemptsAllowed',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('10');
      wrapperInstance.handleChangeQuizSettings(mockEvent);
      // we expect no changes to the component's immSettings state
      expect(wrapperInstance.state.immSettings).toEqual(mockImmSettings);
      expect(mockSetIsolateTab).toHaveBeenCalledTimes(0);
    });

    it('prevent non-numeric characters for QuizAttemptsAllowed', () => {
      const mockEvent = {
        target: {
          name: 'QuizAttemptsAllowed',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('3@$');
      wrapperInstance.handleChangeQuizSettings(mockEvent);
      // we expect no changes to the component's immSettings state
      expect(wrapperInstance.state.immSettings).toEqual(mockImmSettings);
      expect(mockSetIsolateTab).toHaveBeenCalledTimes(0);
    });
  });

  describe('handleChangeAwardSettings method', () => {
    it('normal change for StudentGoal', () => {
      const mockEvent = {
        target: {
          name: 'StudentGoal',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('9999');
      wrapperInstance.handleChangeAwardSettings(mockEvent);
      const newImmSettings = wrapperInstance.state.immSettings.setIn(
        ['AwardSettings', 0, 'StudentGoal', 0],
        '9999'
      );
      expect(wrapperInstance.state.immSettings).toEqual(newImmSettings);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('beyond numeric length for StudentGoal', () => {
      const mockEvent = {
        target: {
          name: 'StudentGoal',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('10000');
      wrapperInstance.handleChangeAwardSettings(mockEvent);
      // we expect no changes to the component's immSettings state
      expect(wrapperInstance.state.immSettings).toEqual(mockImmSettings);
      expect(mockSetIsolateTab).toHaveBeenCalledTimes(0);
    });

    it('prevent alphabetic characters for StudentGoal', () => {
      const mockEvent = {
        target: {
          name: 'StudentGoal',
          type: 'text',
        },
      };
      jest.spyOn(wrapperInstance, 'getNewValue').mockReturnValue('abc');
      wrapperInstance.handleChangeAwardSettings(mockEvent);
      // we expect no changes to the component's immSettings state
      expect(wrapperInstance.state.immSettings).toEqual(mockImmSettings);
      expect(mockSetIsolateTab).toHaveBeenCalledTimes(0);
    });
  });

  it('handleSave method works correctly', () => {
    wrapperInstance.handleSave();
    expect(mockHandleSave).toHaveBeenCalledWith(wrapperInstance.state.immSettings, true);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('handleSubmit method works correctly', () => {
    const mockPreventDefault = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
    };
    const spyHandleSave = jest.spyOn(wrapperInstance, 'handleSave');
    wrapperInstance.handleSubmit(mockEvent);
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(spyHandleSave).toHaveBeenCalled();
  });
});
