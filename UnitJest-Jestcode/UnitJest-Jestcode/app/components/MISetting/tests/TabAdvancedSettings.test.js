import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import TabAdvancedSettings from 'components/MISetting/TabAdvancedSettings';
import { transformScore } from 'containers/MISettingContainer/transformers';
import { COHORT_TYPE } from 'containers/App/constants';
import { WARNING_MODAL } from 'containers/ModalController/constants';
import { TAB_ADVANCED_SETTINGS } from '../constants';

describe('<TabAdvancedSettings />', () => {
  let wrapper = null;
  const mockHandleTabIsolate = jest.fn();
  const mockHandleSave = jest.fn();
  const mockHandleTabReset = jest.fn();
  const mockShowModal = jest.fn();
  const immMockProficiencyBandDataWithAsterisks = fromJS({
    bandNames: ['(no name)', 'Below Basic', 'Basic', 'Proficient', 'Advanced'],
    bandReferenceData: [
      { defaultName: 'no default', number: '5' },
      { defaultName: 'Below Basic', number: '4' },
      { defaultName: 'Basic', number: '3' },
      { defaultName: 'Proficient', number: '2' },
      { defaultName: 'Advanced', number: '1' },
    ],
    bandsEnabled: [false, true, true, true, true],
    grades: [
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: -999998, low: -999998, defaultInfo: { high: -999998, low: -999998 } },
          { high: 189, low: -999998, defaultInfo: { high: 189, low: -999998 } },
          { high: 530, low: 190, defaultInfo: { high: 530, low: 190 } },
          { high: 999998, low: 531, defaultInfo: { high: 999998, low: 531 } },
        ],
        number: '0',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: -999998, low: -999998, defaultInfo: { high: -999998, low: -999998 } },
          { high: 189, low: -999998, defaultInfo: { high: 189, low: -999998 } },
          { high: 530, low: 190, defaultInfo: { high: 530, low: 190 } },
          { high: 999998, low: 531, defaultInfo: { high: 999998, low: 531 } },
        ],
        number: '1',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 219, low: -999998, defaultInfo: { high: 219, low: -999998 } },
          { high: 419, low: 220, defaultInfo: { high: 419, low: 220 } },
          { high: 650, low: 420, defaultInfo: { high: 650, low: 420 } },
          { high: 999998, low: 651, defaultInfo: { high: 999998, low: 651 } },
        ],
        number: '2',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 329, low: -999998, defaultInfo: { high: 329, low: -999998 } },
          { high: 519, low: 330, defaultInfo: { high: 519, low: 330 } },
          { high: 820, low: 520, defaultInfo: { high: 820, low: 520 } },
          { high: 999998, low: 821, defaultInfo: { high: 999998, low: 821 } },
        ],
        number: '3',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 539, low: -999998, defaultInfo: { high: 539, low: -999998 } },
          { high: 739, low: 540, defaultInfo: { high: 739, low: 540 } },
          { high: 940, low: 740, defaultInfo: { high: 940, low: 740 } },
          { high: 999998, low: 941, defaultInfo: { high: 999998, low: 941 } },
        ],
        number: '4',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 619, low: -999998, defaultInfo: { high: 619, low: -999998 } },
          { high: 829, low: 620, defaultInfo: { high: 829, low: 620 } },
          { high: 1010, low: 830, defaultInfo: { high: 1010, low: 830 } },
          { high: 999998, low: 1011, defaultInfo: { high: 999998, low: 1011 } },
        ],
        number: '5',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 729, low: -999998, defaultInfo: { high: 729, low: -999998 } },
          { high: 924, low: 730, defaultInfo: { high: 924, low: 730 } },
          { high: 1070, low: 925, defaultInfo: { high: 1070, low: 925 } },
          { high: 999998, low: 1071, defaultInfo: { high: 999998, low: 1071 } },
        ],
        number: '6',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 769, low: -999998, defaultInfo: { high: 769, low: -999998 } },
          { high: 969, low: 770, defaultInfo: { high: 969, low: 770 } },
          { high: 1120, low: 970, defaultInfo: { high: 1120, low: 970 } },
          { high: 999998, low: 1121, defaultInfo: { high: 999998, low: 1121 } },
        ],
        number: '7',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 789, low: -999998, defaultInfo: { high: 789, low: -999998 } },
          { high: 1009, low: 790, defaultInfo: { high: 1009, low: 790 } },
          { high: 1185, low: 1010, defaultInfo: { high: 1185, low: 1010 } },
          { high: 999998, low: 1186, defaultInfo: { high: 999998, low: 1186 } },
        ],
        number: '8',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 849, low: -999998, defaultInfo: { high: 849, low: -999998 } },
          { high: 1049, low: 850, defaultInfo: { high: 1049, low: 850 } },
          { high: 1260, low: 1050, defaultInfo: { high: 1260, low: 1050 } },
          { high: 999998, low: 1261, defaultInfo: { high: 999998, low: 1261 } },
        ],
        number: '9',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 889, low: -999998, defaultInfo: { high: 889, low: -999998 } },
          { high: 1079, low: 890, defaultInfo: { high: 1079, low: 890 } },
          { high: 1335, low: 1080, defaultInfo: { high: 1335, low: 1080 } },
          { high: 999998, low: 1336, defaultInfo: { high: 999998, low: 1336 } },
        ],
        number: '10',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 984, low: -999998, defaultInfo: { high: 984, low: -999998 } },
          { high: 1184, low: 985, defaultInfo: { high: 1184, low: 985 } },
          { high: 1385, low: 1185, defaultInfo: { high: 1385, low: 1185 } },
          { high: 999998, low: 1386, defaultInfo: { high: 999998, low: 1386 } },
        ],
        number: '11',
      },
      {
        bandRanges: [
          { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
          { high: 984, low: -999998, defaultInfo: { high: 984, low: -999998 } },
          { high: 1184, low: 985, defaultInfo: { high: 1184, low: 985 } },
          { high: 1385, low: 1185, defaultInfo: { high: 1385, low: 1185 } },
          { high: 999998, low: 1386, defaultInfo: { high: 999998, low: 1386 } },
        ],
        number: '12',
      },
    ],
    proficientBandIndex: 3,
    shouldShowAsterisks: true,
  });

  it('Expect handleSubmit to work correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    jest.spyOn(wrapper.instance(), 'saveSettings').mockReturnValue(false);
    const mockPreventDefault = jest.fn();
    const fakeEvent = { preventDefault: mockPreventDefault };
    const retval = wrapper.instance().handleSubmit(fakeEvent);
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(retval).toEqual(false);
  });

  it('Expect to render non-district correctly', () => {
    const newImmPBDataWithAsterisks = immMockProficiencyBandDataWithAsterisks.set(
      'shouldShowAsterisks',
      false
    );
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={newImmPBDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render district correctly with asterisk', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('invalid highs methods', () => {
    let localWrapper = null;
    beforeEach(() => {
      localWrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.School}
          showModal={mockShowModal}
          transformScore={transformScore}
        />
      );
    });

    it('getClearedInvalidHighs method works correctly', () => {
      const { immInvalidHighs } = localWrapper.instance().state;
      immInvalidHighs.setIn([3, 2], true).setIn([5, 3], true);
      const clearedInvalidHighs = localWrapper.instance().getClearedInvalidHighs();
      expect(clearedInvalidHighs).toMatchSnapshot();
    });

    it('getScrubbedInvalidHighs method works correctly', () => {
      let { immInvalidHighs } = localWrapper.instance().state;
      immInvalidHighs = immInvalidHighs.setIn([5, 2], true).setIn([5, 3], true);
      const scrubbedInvalidHighs = localWrapper
        .instance()
        .getClearedInvalidHighs(immInvalidHighs, 5);
      expect(scrubbedInvalidHighs).toMatchSnapshot();
    });

    it('isInvalidHighsEmpty method works correctly', () => {
      let { immInvalidHighs } = localWrapper.instance().state;
      immInvalidHighs = immInvalidHighs.setIn([5, 2], true).setIn([5, 3], true);
      expect(localWrapper.instance().isInvalidHighsEmpty(immInvalidHighs)).toBeFalsy();
    });
  });

  it('changeBandsEnabled method works correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    const { immSettingsOnScreen } = wrapper.instance().state;
    const immNewSettingsOnScreen = wrapper.instance().changeBandsEnabled(immSettingsOnScreen, 3);
    expect(immNewSettingsOnScreen).toMatchSnapshot();
  });

  it('handleCancelChanges method works correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    wrapper.instance().handleCancelChanges();
    expect(wrapper.instance().state).toMatchSnapshot();
    expect(mockHandleTabReset).toHaveBeenCalled();
  });

  it('handleBlurBandHighValue method works correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    const immSettingsOnScreen = wrapper.instance().state.immSettingsOnScreen;
    const immInvalidHighs = wrapper.instance().state.immInvalidHighs;
    const invalidateBlanks = wrapper.instance().state.saveAttempted;
    const mockValidateBandValuesParam = {
      immSettingsOnScreen,
      immInvalidHighs,
      invalidateBlanks,
      gradeIndex: 5,
      targetBandIndex: 2,
      targetNewValue: 250,
    };
    const mockValidateBandValuesReturnValue = {
      immSettingsOnScreen: immSettingsOnScreen.setIn(['grades', 5, 'bandRanges', 3, 'high'], 251),
      immInvalidHighs,
    };
    jest
      .spyOn(wrapper.instance(), 'validateBandValues')
      .mockReturnValue(mockValidateBandValuesReturnValue);
    wrapper.instance().handleBlurBandHighValue({ bandIndex: 2, gradeNumber: '5', value: 250 });
    expect(wrapper.instance().validateBandValues).toHaveBeenCalledWith(mockValidateBandValuesParam);
    expect(wrapper.instance().state).toMatchSnapshot();
  });

  describe('saveSettings method', () => {
    let localWrapper = null;
    beforeEach(() => {
      localWrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.District}
          showModal={mockShowModal}
          transformScore={transformScore}
        />
      );
    });

    it('completely valid works correctly', () => {
      expect(localWrapper.instance().saveSettings()).toBeTruthy();
      expect(mockHandleSave).toHaveBeenCalledWith(
        TAB_ADVANCED_SETTINGS,
        localWrapper.instance().state.immSettingsOnScreen
      );
      expect(localWrapper.instance().state).toMatchSnapshot();
      expect(mockHandleTabReset).toHaveBeenCalled();
    });

    it('empty band name works correctly', () => {
      const immSettingsOnScreen = localWrapper
        .instance()
        .state.immSettingsOnScreen.setIn(['bandNames', 2], '    ');
      localWrapper.instance().setState({ immSettingsOnScreen });
      expect(localWrapper.instance().saveSettings()).toBeFalsy();
      expect(mockShowModal).toHaveBeenCalledWith(WARNING_MODAL, {
        message: 'Please enter a name for each Performance Level.',
      });
      expect(localWrapper.instance().state).toMatchSnapshot();
    });

    it('invalid band range value works correctly', () => {
      const immSettingsOnScreen = localWrapper
        .instance()
        .state.immSettingsOnScreen.setIn(['grades', 3, 'bandRanges', 2, 'high'], 830);
      localWrapper.instance().setState({ immSettingsOnScreen });
      expect(localWrapper.instance().saveSettings()).toBeFalsy();
      expect(mockShowModal).toHaveBeenCalledWith(WARNING_MODAL, {
        message: 'Please correct the highlighted entries.',
      });
      expect(localWrapper.instance().state).toMatchSnapshot();
    });
  });

  it('clearAll method works correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    const { immSettingsOnScreen } = wrapper.instance().state;
    const immNewSettingsOnScreen = wrapper.instance().clearAll(immSettingsOnScreen);
    expect(immNewSettingsOnScreen).toMatchSnapshot();
  });

  it('handleChangeBandName method works correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    wrapper.instance().handleChangeBandName({ bandIndex: 0, value: 'Band 1' });
    expect(wrapper.instance().state.immSettingsOnScreen.getIn(['bandNames', 0])).toEqual('Band 1');
  });

  it('handleChangeProficientBand method works correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    wrapper.instance().handleChangeProficientBand(1);
    expect(wrapper.instance().state).toMatchSnapshot();
    expect(mockHandleTabIsolate).toHaveBeenCalled();
  });

  describe('validateBandValues method', () => {
    let localWrapper = null;
    beforeEach(() => {
      localWrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.District}
          showModal={mockShowModal}
          transformScore={transformScore}
        />
      );
    });

    it('out-of-order highs work correctly', () => {
      let { immSettingsOnScreen } = localWrapper.instance().state;
      immSettingsOnScreen = immSettingsOnScreen.setIn(['grades', 2, 'bandRanges', 3, 'high'], 230);
      const newState = localWrapper.instance().validateBandValues({
        immSettingsOnScreen,
        immInvalidHighs: localWrapper.instance().state.immInvalidHighs,
        gradeIndex: 2,
        targetBandIndex: 4,
        targetNewValue: 220,
      });
      expect(newState).toMatchSnapshot();
    });

    it('middle of band range change work correctly', () => {
      let { immSettingsOnScreen } = localWrapper.instance().state;
      immSettingsOnScreen = immSettingsOnScreen.setIn(['grades', 2, 'bandRanges', 2, 'high'], 210);
      const newState = localWrapper.instance().validateBandValues({
        immSettingsOnScreen,
        immInvalidHighs: localWrapper.instance().state.immInvalidHighs,
        gradeIndex: 2,
        targetBandIndex: 3,
        targetNewValue: 220,
      });
      expect(newState).toMatchSnapshot();
    });

    it('blank value works correctly', () => {
      let { immSettingsOnScreen } = localWrapper.instance().state;
      immSettingsOnScreen = immSettingsOnScreen.setIn(['grades', 2, 'bandRanges', 3, 'high'], NaN);
      const newState = localWrapper.instance().validateBandValues({
        immSettingsOnScreen,
        immInvalidHighs: localWrapper.instance().state.immInvalidHighs,
        gradeIndex: 2,
        targetBandIndex: 4,
        targetNewValue: 220,
      });
      expect(newState).toMatchSnapshot();
    });

    it('invalidateBlanks=true works correctly', () => {
      let { immSettingsOnScreen } = localWrapper.instance().state;
      immSettingsOnScreen = immSettingsOnScreen.setIn(['grades', 2, 'bandRanges', 3, 'high'], 230);
      const newState = localWrapper.instance().validateBandValues({
        immSettingsOnScreen,
        immInvalidHighs: localWrapper.instance().state.immInvalidHighs,
        invalidateBlanks: true,
        gradeIndex: 2,
        targetBandIndex: 4,
        targetNewValue: 220,
      });
      expect(newState).toMatchSnapshot();
    });
  });

  it('handleRestoreDefault method works correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    wrapper.instance().handleRestoreDefault();
    expect(mockHandleTabIsolate).toHaveBeenCalled();
    expect(wrapper.instance().state).toMatchSnapshot();
  });

  describe('shouldBandShowAsterisk method', () => {
    it('should work correctly with prop = true', () => {
      wrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.District}
          showModal={mockShowModal}
          transformScore={transformScore}
        />
      );
      let immBandReferenceInfo = wrapper
        .instance()
        .state.immSettingsOnScreen.getIn(['bandReferenceData', 3]);
      expect(wrapper.instance().shouldBandShowAsterisk(immBandReferenceInfo)).toBeTruthy();
      immBandReferenceInfo = wrapper
        .instance()
        .state.immSettingsOnScreen.getIn(['bandReferenceData', 2]);
      expect(wrapper.instance().shouldBandShowAsterisk(immBandReferenceInfo)).toBeFalsy();
    });

    it('should work correctly with prop = false', () => {
      wrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks.set(
            'shouldShowAsterisks',
            false
          )}
          selectedCohortType={COHORT_TYPE.District}
          showModal={mockShowModal}
          transformScore={transformScore}
        />
      );
      const immBandReferenceInfo = wrapper
        .instance()
        .state.immSettingsOnScreen.getIn(['bandReferenceData', 3]);
      expect(wrapper.instance().shouldBandShowAsterisk(immBandReferenceInfo)).toBeFalsy();
    });
  });

  it('handleClearAll method works correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    const mockPreventDefault = jest.fn();
    const event = {
      preventDefault: mockPreventDefault,
    };
    wrapper.instance().handleClearAll(event);
    expect(mockHandleTabIsolate).toHaveBeenCalled();
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(wrapper.instance().state).toMatchSnapshot();
  });

  it('handleChangeBandHighValue works correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    wrapper.instance().handleChangeBandHighValue({ bandIndex: 2, gradeNumber: 5, value: 500 });
    expect(wrapper.instance().state).toMatchSnapshot();
    expect(mockHandleTabIsolate).toHaveBeenCalled();
  });

  describe('handleChangeNumberOfBands', () => {
    let mockChangedEnabledBandSettings = null;
    let mockClearedInvalidHighs = null;
    let spyChangeBandsEnabled = null;
    let spyClearAll = null;
    let spyGetClearedInvalidHighs = null;
    beforeAll(() => {
      wrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.District}
          showModal={mockShowModal}
          transformScore={transformScore}
        />
      );
      mockChangedEnabledBandSettings = { value: 'value' };
      mockClearedInvalidHighs = { value1: 'value1' };
      spyChangeBandsEnabled = jest
        .spyOn(wrapper.instance(), 'changeBandsEnabled')
        .mockReturnValue(mockChangedEnabledBandSettings);
      spyClearAll = jest
        .spyOn(wrapper.instance(), 'clearAll')
        .mockReturnValue(immMockProficiencyBandDataWithAsterisks);
      spyGetClearedInvalidHighs = jest
        .spyOn(wrapper.instance(), 'getClearedInvalidHighs')
        .mockReturnValue(mockClearedInvalidHighs);
    });

    it('should handle change to 5 bands correctly', () => {
      const ev = {
        target: {
          value: '5',
        },
      };
      const mockResultingState = {
        immInvalidHighs: mockClearedInvalidHighs,
        immSettingsOnScreen: immMockProficiencyBandDataWithAsterisks.set('proficientBandIndex', 2),
        saveAttempted: false,
        tabHasNoUnsavedChanges: false,
      };
      const immStartingSettings = wrapper.instance().state.immSettingsOnScreen;
      wrapper.instance().handleChangeNumberOfBands(ev);
      expect(spyChangeBandsEnabled).toHaveBeenCalledWith(immStartingSettings, '5');
      expect(spyClearAll).toHaveBeenCalledWith(mockChangedEnabledBandSettings);
      expect(spyGetClearedInvalidHighs).toHaveBeenCalled();
      expect(wrapper.instance().state).toEqual(mockResultingState);
      expect(mockHandleTabIsolate).toHaveBeenCalled();
    });

    it('should handle change to 3 bands correctly', () => {
      const ev = {
        target: {
          value: '3',
        },
      };
      const mockResultingState = {
        immInvalidHighs: mockClearedInvalidHighs,
        immSettingsOnScreen: immMockProficiencyBandDataWithAsterisks.set('proficientBandIndex', 3),
        saveAttempted: false,
        tabHasNoUnsavedChanges: false,
      };
      const immStartingSettings = wrapper.instance().state.immSettingsOnScreen;
      wrapper.instance().handleChangeNumberOfBands(ev);
      expect(spyChangeBandsEnabled).toHaveBeenCalledWith(immStartingSettings, '3');
      expect(spyClearAll).toHaveBeenCalledWith(mockChangedEnabledBandSettings);
      expect(spyGetClearedInvalidHighs).toHaveBeenCalled();
      expect(wrapper.instance().state).toEqual(mockResultingState);
      expect(mockHandleTabIsolate).toHaveBeenCalled();
    });
  });

  it('countEnabledBands method should work correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.District}
        showModal={mockShowModal}
        transformScore={transformScore}
      />
    );
    const numberOfEnabledBands = [false, true, true, false, false].reduce(
      wrapper.instance().countEnabledBands
    );
    expect(numberOfEnabledBands).toEqual(2);
  });
});
