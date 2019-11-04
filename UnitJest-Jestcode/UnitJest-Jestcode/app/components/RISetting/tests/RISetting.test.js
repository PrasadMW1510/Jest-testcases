import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';
import * as Selectors from 'containers/RISettingContainer/selectors';
import * as Constants from '../constants';
import RISetting from '../index';

describe('<RISetting />', () => {
  let wrapper = null;
  const mockHandleCancel = jest.fn();
  const mockHandleSaveClick = jest.fn();
  const mockShowModal = jest.fn();
  const mockTransformLexile = jest.fn();
  const mockSettingsData = fromJS({
    error: false,
    proficiencyBandData: {
      bands: [
        {
          defaultName: 'no default',
          isEnabled: false,
          name: '(no name)',
          rangesForGrades: [
            {
              high: '0',
              low: '0',
            },
            {
              high: '0',
              low: '0',
            },
            {
              high: '0',
              low: '0',
            },
            {
              high: '0',
              low: '0',
            },
          ],
        },
        {
          defaultName: 'Below Basic',
          isEnabled: true,
          name: 'Level 1',
          rangesForGrades: [
            {
              high: 'BR',
              low: 'BR',
            },
            {
              high: 'BR',
              low: 'BR',
            },
            {
              high: '219',
              low: 'BR',
            },
            {
              high: '329',
              low: 'BR',
            },
          ],
        },
        {
          defaultName: 'Basic',
          isEnabled: true,
          name: 'Level 2',
          rangesForGrades: [
            {
              high: '189',
              low: 'BR',
            },
            {
              high: '189',
              low: 'BR',
            },
            {
              high: '419',
              low: '220',
            },
            {
              high: '519',
              low: '330',
            },
          ],
        },
        {
          defaultName: 'Proficient',
          isEnabled: true,
          name: 'Proficient',
          rangesForGrades: [
            {
              high: '530',
              low: '190',
            },
            {
              high: '530',
              low: '190',
            },
            {
              high: '650',
              low: '420',
            },
            {
              high: '820',
              low: '520',
            },
          ],
        },
        {
          defaultName: 'Advanced',
          isEnabled: true,
          name: 'Level 4',
          rangesForGrades: [
            {
              high: '1700+',
              low: '531',
            },
            {
              high: '1700+',
              low: '531',
            },
            {
              high: '1700+',
              low: '651',
            },
            {
              high: '1700+',
              low: '821',
            },
          ],
        },
      ],
      numberOfGrades: 4,
      proficientBandIndex: 3,
      shouldShowAsterisks: false,
    },
    programSetting: {
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
    },
    programEnrollmentSetting: [],
  });

  beforeEach(() => {
    jest.spyOn(Selectors, 'selectImmProgramSettingsObj').mockReturnValue(mockSettingsData);
    jest.spyOn(Selectors, 'selectIsLoading').mockReturnValue(false);
  });

  it('Expect to render correctly', () => {
    wrapper = shallow(
      <RISetting
        enrollmentCount={3}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSaveClick}
        immSettingData={mockSettingsData}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Class}
        showModal={mockShowModal}
        transformLexile={mockTransformLexile}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect handleTabReset to work correctly', () => {
    wrapper = shallow(
      <RISetting
        enrollmentCount={3}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSaveClick}
        immSettingData={mockSettingsData}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Class}
        showModal={mockShowModal}
        transformLexile={mockTransformLexile}
      />
    );
    wrapper.instance().handleTabReset();
    expect(wrapper.instance().state.isolateTab).toBeFalsy();
  });

  it('Expect handleTabClick to work correctly', () => {
    wrapper = shallow(
      <RISetting
        enrollmentCount={3}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSaveClick}
        immSettingData={mockSettingsData}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Class}
        showModal={mockShowModal}
        transformLexile={mockTransformLexile}
      />
    );
    const ev = {
      currentTarget: {
        id: 'some-id',
      },
    };
    wrapper.instance().handleTabClick(ev);
    expect(wrapper.instance().state.activeTab).toEqual('some-id');
  });

  it('Expect handleTabIsolate to work correctly', () => {
    wrapper = shallow(
      <RISetting
        enrollmentCount={3}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSaveClick}
        immSettingData={mockSettingsData}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Class}
        showModal={mockShowModal}
        transformLexile={mockTransformLexile}
      />
    );
    wrapper.instance().handleTabIsolate();
    expect(wrapper.instance().state.isolateTab).toBeTruthy();
  });

  it('Expect AdvancedSettings tab to render correctly', () => {
    wrapper = shallow(
      <RISetting
        enrollmentCount={3}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSaveClick}
        immSettingData={mockSettingsData}
        loggedInUserType={USER_TYPE.Administrator}
        programName="The Reading Inventory"
        selectedCohortType={COHORT_TYPE.Class}
        showModal={mockShowModal}
        transformLexile={mockTransformLexile}
      />
    );
    wrapper.instance().setState({ activeTab: Constants.TAB_ADVANCED_SETTINGS });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('renderSettingsTab', () => {
    it('Expect isLoading=false to render correctly', () => {
      jest.spyOn(Selectors, 'selectIsLoading').mockReturnValue(false);
      wrapper = shallow(
        <RISetting
          enrollmentCount={3}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSaveClick}
          immSettingData={mockSettingsData}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Class}
          showModal={mockShowModal}
          transformLexile={mockTransformLexile}
        />
      );
      expect(wrapper.instance().renderSettingsTab()).toMatchSnapshot();
    });

    it('Expect enrollmentCount=0 to render correctly', () => {
      jest.spyOn(Selectors, 'selectIsLoading').mockReturnValue(false);
      wrapper = shallow(
        <RISetting
          enrollmentCount={0}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSaveClick}
          immSettingData={mockSettingsData}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Class}
          showModal={mockShowModal}
          transformLexile={mockTransformLexile}
        />
      );
      expect(wrapper.instance().renderSettingsTab()).toMatchSnapshot();
    });

    it('Expect isLoading=true to render correctly', () => {
      jest.spyOn(Selectors, 'selectIsLoading').mockReturnValue(true);
      wrapper = shallow(
        <RISetting
          enrollmentCount={3}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSaveClick}
          immSettingData={mockSettingsData}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Class}
          showModal={mockShowModal}
          transformLexile={mockTransformLexile}
        />
      );
      expect(wrapper.instance().renderSettingsTab()).toMatchSnapshot();
    });
  });

  describe('renderAdvancedSettings', () => {
    it('Expect isLoading=false to render correctly', () => {
      jest.spyOn(Selectors, 'selectIsLoading').mockReturnValue(false);
      wrapper = shallow(
        <RISetting
          enrollmentCount={3}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSaveClick}
          immSettingData={mockSettingsData}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Class}
          showModal={mockShowModal}
          transformLexile={mockTransformLexile}
        />
      );
      expect(wrapper.instance().renderAdvancedSettingsTab()).toMatchSnapshot();
    });

    it('Expect isLoading=true to render correctly', () => {
      jest.spyOn(Selectors, 'selectIsLoading').mockReturnValue(true);
      wrapper = shallow(
        <RISetting
          enrollmentCount={3}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSaveClick}
          immSettingData={mockSettingsData}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Class}
          showModal={mockShowModal}
          transformLexile={mockTransformLexile}
        />
      );
      expect(wrapper.instance().renderAdvancedSettingsTab()).toMatchSnapshot();
    });

    it('Expect enrollmentCount=0 to render correctly', () => {
      jest.spyOn(Selectors, 'selectIsLoading').mockReturnValue(true);
      wrapper = shallow(
        <RISetting
          enrollmentCount={0}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSaveClick}
          immSettingData={mockSettingsData}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.Class}
          showModal={mockShowModal}
          transformLexile={mockTransformLexile}
        />
      );
      expect(wrapper.instance().renderAdvancedSettingsTab()).toMatchSnapshot();
    });

    it('Expect isLoading=true to render district settings correctly', () => {
      jest.spyOn(Selectors, 'selectIsLoading').mockReturnValue(true);
      wrapper = shallow(
        <RISetting
          enrollmentCount={3}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSaveClick}
          immSettingData={mockSettingsData}
          loggedInUserType={USER_TYPE.Administrator}
          programName="The Reading Inventory"
          selectedCohortType={COHORT_TYPE.District}
          showModal={mockShowModal}
          transformLexile={mockTransformLexile}
        />
      );
      expect(wrapper.instance().renderAdvancedSettingsTab()).toMatchSnapshot();
    });
  });
});
