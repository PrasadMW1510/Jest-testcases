import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import TabSettings from 'components/MISetting/TabSettings';
import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';

describe('<TabSettings />', () => {
  let wrapper = null;
  const mockHandleCancel = jest.fn();
  const mockHandleSave = jest.fn();
  const mockHandleTabReset = jest.fn();
  const mockHandleIsolateTab = jest.fn();
  const mockShowModal = jest.fn();
  const immMockProgramSettings = fromJS({
    settings_options: [
      {
        time_between_tests: [
          {
            list: [
              {
                item: [
                  { _: 'No Minimum', $: { id: '1' } },
                  { _: '30 Days', $: { id: '2' } },
                  { _: '60 Days', $: { id: '3' } },
                  { _: '90 Days', $: { id: '4' } },
                  { _: 'Custom', $: { id: '5' } },
                ],
              },
            ],
          },
        ],
        practice_test: [
          {
            list: [
              {
                item: [
                  { _: 'First test only', $: { id: '1' } },
                  { _: 'All tests', $: { id: '2' } },
                ],
              },
            ],
          },
        ],
      },
    ],
    chosen_settings: [
      {
        active_proficiency_calculation: ['progressive'],
        time_between_tests: ['2'],
        custom_days: [''],
        practice_test: ['1'],
        show_quantile: ['1'],
        show_calculator: ['0'],
        show_reference_sheet: ['0'],
        discard_last_incomplete_test: ['0'],
      },
    ],
    default_settings: [
      {
        default_proficiency_calculation: ['progressive'],
        time_between_tests: ['2'],
        practice_test: ['1'],
        show_quantile: ['1'],
        show_calculator: ['0'],
        show_reference_sheet: ['0'],
        discard_last_incomplete_test: ['0'],
        language: ['English'],
        audio_read_aloud: ['English'],
      },
    ],
  });
  const immMockProgramSettingsWithMixedValues = fromJS({
    settings_options: [
      {
        time_between_tests: [
          {
            list: [
              {
                item: [
                  { _: 'No Minimum', $: { id: '1' } },
                  { _: '30 Days', $: { id: '2' } },
                  { _: '60 Days', $: { id: '3' } },
                  { _: '90 Days', $: { id: '4' } },
                  { _: 'Custom', $: { id: '5' } },
                ],
              },
            ],
          },
        ],
        practice_test: [
          {
            list: [
              {
                item: [
                  { _: 'First test only', $: { id: '1' } },
                  { _: 'All tests', $: { id: '2' } },
                ],
              },
            ],
          },
        ],
      },
    ],
    chosen_settings: [
      {
        active_proficiency_calculation: ['progressive'],
        time_between_tests: ['2'],
        custom_days: [''],
        practice_test: ['-2'],
        show_quantile: ['-2'],
        show_calculator: ['-2'],
        show_reference_sheet: ['-2'],
        discard_last_incomplete_test: ['0'],
      },
    ],
    default_settings: [
      {
        default_proficiency_calculation: ['progressive'],
        time_between_tests: ['2'],
        practice_test: ['1'],
        show_quantile: ['1'],
        show_calculator: ['0'],
        show_reference_sheet: ['0'],
        discard_last_incomplete_test: ['0'],
        language: ['English'],
        audio_read_aloud: ['English'],
      },
    ],
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

  // TODO: Several tests are commented out, until the implementation supports them (future stories).
  /* it('Expect handleSubmit to work correctly', () => {
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
  }); */

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
      expect(wrapper.instance().state.settingsOnScreen.chosen_settings[0].someName).toEqual([
        'some-value',
      ]);
      expect(wrapper.instance().props.handleIsolateTab).toHaveBeenCalled();
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
      expect(wrapper.instance().state.settingsOnScreen.chosen_settings[0].someName).toEqual(['0']);
      expect(wrapper.instance().props.handleIsolateTab).toHaveBeenCalled();
    });

    it('Expect handleChange to prevent non-numeric characters and length >= 3 in custom_days', () => {
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
          name: 'custom_days',
          type: 'text',
          value: 'a',
        },
      };
      wrapper.instance().state.settingsOnScreen.chosen_settings[0].custom_days[0] = '3';
      wrapper.instance().handleChange(event);
      expect(wrapper.instance().state.settingsOnScreen.chosen_settings[0].custom_days[0]).toEqual(
        '3'
      );
      const event2 = {
        target: {
          name: 'custom_days',
          type: 'text',
          value: '0',
        },
      };
      wrapper.instance().handleChange(event2);
      expect(wrapper.instance().state.settingsOnScreen.chosen_settings[0].custom_days[0]).toEqual(
        '0'
      );
      wrapper.instance().state.settingsOnScreen.chosen_settings[0].custom_days[0] = '365';
      const event3 = {
        target: {
          name: 'custom_days',
          type: 'text',
          value: '3650',
        },
      };
      wrapper.instance().handleChange(event3);
      expect(wrapper.instance().state.settingsOnScreen.chosen_settings[0].custom_days[0]).toEqual(
        '365'
      );
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
      expect(wrapper.instance().state.settingsOnScreen.chosen_settings[0].someName).toEqual(['1']);
      expect(wrapper.instance().props.handleIsolateTab).toHaveBeenCalled();
    });
  });

  /* it('Expect saveSettings to work correctly', () => {
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
  }); */

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
    wrapper.instance().state.settingsOnScreen.chosen_settings[0].time_between_tests[0] = '1';
    wrapper.instance().handleSetInitialValues();
    expect(
      wrapper.instance().state.settingsOnScreen.chosen_settings[0].time_between_tests[0]
    ).toEqual('2');
    expect(wrapper.instance().state.tabHasNoUnsavedChanges).toBeTruthy();
    expect(mockHandleTabReset).toHaveBeenCalled();
  });
});
