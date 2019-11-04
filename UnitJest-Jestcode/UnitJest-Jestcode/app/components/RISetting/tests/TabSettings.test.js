import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import TabSettings from 'components/RISetting/TabSettings';
import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';
import * as ModalConstants from 'containers/ModalController/constants';
import * as Constants from '../constants';

describe('<TabSettings />', () => {
  let wrapper = null;
  const mockHandleCancel = jest.fn();
  const mockHandleSave = jest.fn();
  const mockHandleTabReset = jest.fn();
  const mockHandleIsolateTab = jest.fn();
  const mockShowModal = jest.fn();
  const immMockProgramSettings = fromJS({
    limit_reading_to_installed_quizzes: ['0'],
    allow_min_days_between_tests: ['1'],
    play_sound_effects: ['0'],
    choose_reading_interests: ['1'],
    min_days_between_tests: ['0'],
    show_lexile_after_test: ['1'],
    est_reading_level: ['1'],
    max_books_in_reading_list: ['30'],
    require_practice_test: ['1'],
    see_reading_list: ['-1'],
  });
  const immMockProgramSettingsWithMixedValues = fromJS({
    limit_reading_to_installed_quizzes: ['-1'],
    allow_min_days_between_tests: ['-1'],
    play_sound_effects: ['-1'],
    choose_reading_interests: ['-1'],
    min_days_between_tests: ['-1'],
    show_lexile_after_test: ['-1'],
    est_reading_level: ['-1'],
    max_books_in_reading_list: ['-1'],
    require_practice_test: ['-1'],
    see_reading_list: ['-1'],
  });

  it('Expect to render non-existent cohort correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render mixed/enabled minDaysBetweenTests correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettingsWithMixedValues.setIn(
          ['allow_min_days_between_tests', 0],
          '1'
        )}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render mixed/disabled minDaysBetweenTests correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettingsWithMixedValues}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render mixed values correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettingsWithMixedValues}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect estimated reading level to render correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettingsWithMixedValues}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Group}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render no-enrollments correctly for Student', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={0}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Student}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render no-enrollments correctly for Non-Student', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={0}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Class}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render positive enrollments correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Student}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect handleSubmit to work correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Student}
        showModal={mockShowModal}
      />
    );
    const mockPreventDefault = jest.fn();
    const event = {
      preventDefault: mockPreventDefault,
    };
    wrapper.instance().handleSubmit(event);
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockHandleSave).toHaveBeenCalledWith(
      Constants.TAB_SETTINGS,
      wrapper.instance().state.settingsOnScreen
    );
    expect(mockHandleTabReset).toHaveBeenCalled();
    expect(wrapper.instance().state.tabHasNoUnsavedChanges).toBeTruthy();
  });

  it('Expect handleSubmit with minDaysBetweenTests out-of-bounds to work correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Student}
        showModal={mockShowModal}
      />
    );
    const mockPreventDefault = jest.fn();
    const event = {
      preventDefault: mockPreventDefault,
    };
    wrapper.instance().state.settingsOnScreen.min_days_between_tests = '366';
    wrapper.instance().handleSubmit(event);
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, {
      message: Constants.MINIMUM_TIME_BETWEEN_TESTS_OUT_OF_RANGE_MESSAGE,
    });
  });

  it('Expect setEstimatedReadingLevel to work correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Student}
        showModal={mockShowModal}
      />
    );
    const mockIsolateTab = jest.spyOn(wrapper.instance(), 'isolateTab');
    wrapper.instance().setEstimatedReadingLevel('5');
    expect(wrapper.instance().state.settingsOnScreen.est_reading_level[0]).toEqual('5');
    expect(mockIsolateTab).toHaveBeenCalled();
  });

  describe('fromApiToCheckboxValue method', () => {
    let localWrapper = null;
    beforeAll(() => {
      localWrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
    });

    it('Expect to work correctly when param not provided', () => {
      expect(localWrapper.instance().fromApiToCheckboxValue(null)).toEqual('0');
    });

    it('Expect to work correctly when param provided', () => {
      expect(localWrapper.instance().fromApiToCheckboxValue(['1'])).toEqual('1');
    });
  });

  describe('handleChange', () => {
    it('Expect handleChange to work correctly on text field', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      const event = {
        target: {
          checked: false,
          name: 'someName',
          type: 'text',
          value: 'some-value',
        },
      };
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.tabHasNoUnsavedChanges).toBeFalsy();
      expect(wrapper.instance().state.settingsOnScreen.someName).toEqual(['some-value']);
      expect(wrapper.instance().props.handleIsolateTab).toHaveBeenCalled();
    });

    it('Expect minDaysBetweenTests change to change correctly', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      wrapper.instance().state.settingsOnScreen.min_days_between_tests[0] = '3';
      const event = {
        target: {
          name: 'min_days_between_tests',
          type: 'text',
          value: 'some-value',
        },
      };
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.settingsOnScreen.min_days_between_tests[0]).toEqual('3');
      event.target.value = '0';
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.settingsOnScreen.min_days_between_tests[0]).toEqual('3');
      event.target.value = '3650';
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.settingsOnScreen.min_days_between_tests[0]).toEqual('3');
      event.target.value = '365';
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.settingsOnScreen.min_days_between_tests[0]).toEqual('365');
    });

    it('Expect estimated reading level change to work correctly', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortName="John Smith"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      const mockSetEstimatedReadingLevel = jest.spyOn(
        wrapper.instance(),
        'setEstimatedReadingLevel'
      );
      const event = {
        target: {
          checked: false,
          name: 'est_reading_level',
          value: 'new-value',
        },
      };
      wrapper.instance().handleChange(event);
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.OK_CANCEL_MODAL, {
        heading: 'Set Estimated Reading Level',
        message:
          'The Estimated Reading Level for John Smith has been changed to new-value.  This change will only affect the first Reading Inventory test taken by the student(s).',
        onOk: mockSetEstimatedReadingLevel,
        onOkParam: 'new-value',
      });
    });

    it('Expect handleChange to toggle checkbox off correctly', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      const event = {
        target: {
          checked: false,
          name: 'someName',
          type: 'checkbox',
        },
      };
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.tabHasNoUnsavedChanges).toBeFalsy();
      expect(wrapper.instance().state.settingsOnScreen.someName).toEqual(['0']);
      expect(wrapper.instance().props.handleIsolateTab).toHaveBeenCalled();
    });

    it('Expect handleChange to prevent non-numeric characters in min_days_between_tests', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      const event = {
        target: {
          name: 'min_days_between_tests',
          type: 'text',
          value: 'a',
        },
      };
      wrapper.instance().state.settingsOnScreen.min_days_between_tests = '3';
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.settingsOnScreen.min_days_between_tests).toEqual('3');
      const event2 = {
        target: {
          name: 'min_days_between_tests',
          type: 'text',
          value: '0',
        },
      };
      wrapper.instance().handleChange(event2);
      expect(wrapper.instance().state.settingsOnScreen.min_days_between_tests).toEqual('3');
    });

    it('Expect handleChange to toggle checkbox on correctly', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      const event = {
        target: {
          checked: true,
          name: 'someName',
          type: 'checkbox',
        },
      };
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.tabHasNoUnsavedChanges).toBeFalsy();
      expect(wrapper.instance().state.settingsOnScreen.someName).toEqual(['1']);
      expect(wrapper.instance().props.handleIsolateTab).toHaveBeenCalled();
    });

    it('Expect handleChange to disable peer text-box correctly', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      const event = {
        target: {
          checked: true,
          name: 'allow_min_days_between_tests',
          type: 'checkbox',
        },
      };
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.minDaysBetweenTestsIsDisabled).toBeFalsy();
    });
  });

  describe('saveSettings', () => {
    it('Expect valid minDaysBetweenTests to work correctly', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      wrapper.instance().saveSettings();
      expect(mockHandleSave).toHaveBeenCalledWith(
        Constants.TAB_SETTINGS,
        wrapper.instance().state.settingsOnScreen
      );
      expect(mockHandleTabReset).toHaveBeenCalled();
    });

    it('Expect minDaysBetweenTests > 365 to work correctly', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      wrapper.instance().state.settingsOnScreen.min_days_between_tests = '366';
      wrapper.instance().saveSettings();
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, {
        message: Constants.MINIMUM_TIME_BETWEEN_TESTS_OUT_OF_RANGE_MESSAGE,
      });
    });

    it('Expect minDaysBetweenTests as NaN to work correctly', () => {
      wrapper = shallow(
        <TabSettings
          enrollmentCount={1}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          handleIsolateTab={mockHandleIsolateTab}
          immSettings={immMockProgramSettings}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Student}
          showModal={mockShowModal}
        />
      );
      wrapper.instance().state.settingsOnScreen.min_days_between_tests = '';
      wrapper.instance().saveSettings();
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, {
        message: Constants.MINIMUM_TIME_BETWEEN_TESTS_BLANK_MESSAGE,
      });
    });
  });

  it('Expect handleRestoreDefault to work correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Student}
        showModal={mockShowModal}
      />
    );
    wrapper.instance().handleRestoreDefault();
    expect(mockHandleIsolateTab).toHaveBeenCalled();
  });

  it('Expect handleRestoreDefault to work correctly when est_reading_level is not editable', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
      />
    );
    wrapper.instance().state.settingsOnScreen.est_reading_level[0] = '3';
    wrapper.instance().handleRestoreDefault();
    expect(mockHandleIsolateTab).toHaveBeenCalled();
    expect(wrapper.instance().state.settingsOnScreen.est_reading_level[0]).toEqual('3');
  });

  it('Expect handleRestoreDefault to work correctly when logged-in user is a teacher', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Teacher}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Class}
        showModal={mockShowModal}
      />
    );
    wrapper.instance().state.settingsOnScreen.allow_min_days_between_tests[0] = '0';
    wrapper.instance().state.settingsOnScreen.min_days_between_tests[0] = '29';
    wrapper.instance().handleRestoreDefault();
    expect(mockHandleIsolateTab).toHaveBeenCalled();
    expect(wrapper.instance().state.settingsOnScreen.allow_min_days_between_tests[0]).toEqual('0');
    expect(wrapper.instance().state.settingsOnScreen.min_days_between_tests[0]).toEqual('29');
  });

  it('Expect renderNoSettingsAvailableContent to work correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={fromJS({})}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Student}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect handleSetInitialValues to work correctly', () => {
    wrapper = shallow(
      <TabSettings
        enrollmentCount={1}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        handleIsolateTab={mockHandleIsolateTab}
        immSettings={immMockProgramSettings}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Student}
        showModal={mockShowModal}
      />
    );
    wrapper.instance().state.settingsOnScreen.limit_reading_to_installed_quizzes = ['1'];
    wrapper.instance().handleSetInitialValues();
    expect(wrapper.instance().state.settingsOnScreen.limit_reading_to_installed_quizzes).toEqual([
      '0',
    ]);
    expect(wrapper.instance().state.tabHasNoUnsavedChanges).toBeTruthy();
    expect(mockHandleTabReset).toHaveBeenCalled();
  });
});
