import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import TabAdvancedSettings from 'components/RISetting/TabAdvancedSettings';
import { transformLexile } from 'containers/RISettingContainer/transformers';
import { COHORT_TYPE } from 'containers/App/constants';
import * as ModalConstants from 'containers/ModalController/constants';

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
        transformLexile={transformLexile}
      />
    );
    jest.spyOn(wrapper.instance(), 'saveSettings').mockReturnValue(false);
    const mockPreventDefault = jest.fn();
    const fakeEvent = { preventDefault: mockPreventDefault };
    const retval = wrapper.instance().handleSubmit(fakeEvent);
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(retval).toEqual(false);
  });

  describe('handleRestoreDefault', () => {
    it('Expect to execute correctly', () => {
      wrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.School}
          showModal={mockShowModal}
          transformLexile={transformLexile}
        />
      );
      wrapper.instance().handleRestoreDefault();
      const newState = wrapper.instance().state;
      expect(newState.immInvalidHighs).toMatchSnapshot();
      expect(newState.immSettingsOnScreen).toMatchSnapshot();
      expect(newState.saveAttempted).toBeFalsy();
      expect(newState.tabHasNoUnsavedChanges).toBeFalsy();
      expect(mockHandleTabIsolate).toHaveBeenCalled();
    });
  });

  it('Expect handleChangeBandHighValue to work correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
        transformLexile={transformLexile}
      />
    );
    const param = {
      bandIndex: 2,
      gradeNumber: 3,
      value: '100',
    };
    wrapper.instance().handleChangeBandHighValue(param);
    const newValue = wrapper
      .instance()
      .state.immSettingsOnScreen.getIn(['grades', 3, 'bandRanges', 2, 'high']);
    expect(newValue).toEqual('100');
    expect(mockHandleTabIsolate).toHaveBeenCalled();
    expect(wrapper.instance().state.tabHasNoUnsavedChanges).toBeFalsy();
  });

  it('Expect handleChangeProficientBand to work correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
        transformLexile={transformLexile}
      />
    );
    wrapper.instance().handleChangeProficientBand(1);
    const newState = wrapper.instance().state;
    expect(newState.immSettingsOnScreen.get('proficientBandIndex')).toEqual(1);
    expect(newState.tabHasNoUnsavedChanges).toBeFalsy();
    expect(mockHandleTabIsolate).toHaveBeenCalled();
  });

  describe('saveSettings', () => {
    it('Expect all valid conditions to work correctly', () => {
      wrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.School}
          showModal={mockShowModal}
          transformLexile={transformLexile}
        />
      );
      const isValid = wrapper.instance().saveSettings();
      expect(isValid).toBeTruthy();
    });

    it('Expect non-empty invalid highs to work correctly', () => {
      wrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.School}
          showModal={mockShowModal}
          transformLexile={transformLexile}
        />
      );
      const messageObj = {
        message: 'Please correct the highlighted entries.',
      };
      const mockImmInvalidHighs = fromJS([[false, true, false, false, false]]);
      const mockValidateResult = {
        immSettingsOnScreen: immMockProficiencyBandDataWithAsterisks,
        immInvalidHighs: mockImmInvalidHighs,
      };
      jest
        .spyOn(wrapper.instance(), 'validateSubmittedProficiencyBands')
        .mockReturnValue(mockValidateResult);
      const isValid = wrapper.instance().saveSettings();
      const state = wrapper.instance().state;
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, messageObj);
      expect(state.immInvalidHighs).toEqual(mockImmInvalidHighs);
      expect(state.immSettingsOnScreen).toEqual(immMockProficiencyBandDataWithAsterisks);
      expect(state.saveAttempted).toBeTruthy();
      expect(isValid).toBeFalsy();
    });

    it('Expect empty band names to work correctly', () => {
      wrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.School}
          showModal={mockShowModal}
          transformLexile={transformLexile}
        />
      );
      const messageObj = {
        message: 'Please enter a name for each Proficiency Band.',
      };
      const mockImmInvalidHighs = fromJS([[false, false, false, false, false]]);
      const mockImmBandData = immMockProficiencyBandDataWithAsterisks.setIn(
        ['bandNames', 0],
        '   '
      );
      const mockValidateResult = {
        immSettingsOnScreen: mockImmBandData,
        immInvalidHighs: mockImmInvalidHighs,
      };
      jest
        .spyOn(wrapper.instance(), 'validateSubmittedProficiencyBands')
        .mockReturnValue(mockValidateResult);
      const isValid = wrapper.instance().saveSettings();
      const state = wrapper.instance().state;
      expect(mockShowModal).toHaveBeenCalledWith(ModalConstants.WARNING_MODAL, messageObj);
      expect(state.immInvalidHighs).toEqual(mockImmInvalidHighs);
      expect(state.immSettingsOnScreen).toEqual(mockImmBandData);
      expect(state.saveAttempted).toBeTruthy();
      expect(isValid).toBeFalsy();
    });
  });

  it('Expect handleCancelChanges to work correctly', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
        transformLexile={transformLexile}
      />
    );
    const mockImmInvalidHighs = fromJS([]);
    jest.spyOn(wrapper.instance(), 'getClearedInvalidHighs').mockReturnValue(mockImmInvalidHighs);
    wrapper.instance().handleCancelChanges();
    const state = wrapper.instance().state;
    expect(state.immInvalidHighs).toEqual(mockImmInvalidHighs);
    expect(state.immSettingsOnScreen).toEqual(immMockProficiencyBandDataWithAsterisks);
    expect(state.saveAttempted).toBeFalsy();
    expect(state.tabHasNoUnsavedChanges).toBeTruthy();
    expect(mockHandleTabReset).toHaveBeenCalled();
  });

  it('Expect shouldBandShowAsterisk to work correctly when positive', () => {
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
        transformLexile={transformLexile}
      />
    );
    const mockImmBandReferenceInfo = fromJS({
      defaultName: 'Advanced',
    });
    const showAsterisk = wrapper.instance().shouldBandShowAsterisk(mockImmBandReferenceInfo);
    expect(showAsterisk).toBeTruthy();
  });

  it('Expect shouldBandShowAsterisk to work correctly when negative', () => {
    const mockImmProfBandDataWithoutAsterisks = immMockProficiencyBandDataWithAsterisks.set(
      'shouldShowAsterisks',
      false
    );
    wrapper = shallow(
      <TabAdvancedSettings
        handleIsolateTab={mockHandleTabIsolate}
        handleSave={mockHandleSave}
        handleTabReset={mockHandleTabReset}
        immProficiencyBandData={mockImmProfBandDataWithoutAsterisks}
        selectedCohortType={COHORT_TYPE.School}
        showModal={mockShowModal}
        transformLexile={transformLexile}
      />
    );
    const mockImmBandReferenceInfo = fromJS({
      defaultName: 'Advanced',
    });
    const showAsterisk = wrapper.instance().shouldBandShowAsterisk(mockImmBandReferenceInfo);
    expect(showAsterisk).toBeFalsy();
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
        transformLexile={transformLexile}
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
        transformLexile={transformLexile}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('handleClearAll', () => {
    it('Expect to work correctly', () => {
      const mockClearedInvalidHighs = fromJS([[]]);
      const mockEvent = {
        preventDefault: () => true,
      };
      wrapper = shallow(
        <TabAdvancedSettings
          handleIsolateTab={mockHandleTabIsolate}
          handleSave={mockHandleSave}
          handleTabReset={mockHandleTabReset}
          immProficiencyBandData={immMockProficiencyBandDataWithAsterisks}
          selectedCohortType={COHORT_TYPE.District}
          showModal={mockShowModal}
          transformLexile={transformLexile}
        />
      );
      wrapper
        .instance()
        .state.immSettingsOnScreen.setIn(['grades', 4, 'bandRanges', 2, 'high'], 200);
      jest
        .spyOn(wrapper.instance(), 'clearAll')
        .mockReturnValue(immMockProficiencyBandDataWithAsterisks);
      jest
        .spyOn(wrapper.instance(), 'getClearedInvalidHighs')
        .mockReturnValue(mockClearedInvalidHighs);
      wrapper.instance().handleClearAll(mockEvent);
      const newState = wrapper.instance().state;
      expect(newState.immInvalidHighs).toEqual(mockClearedInvalidHighs);
      expect(newState.immSettingsOnScreen).toEqual(immMockProficiencyBandDataWithAsterisks);
      expect(newState.saveAttempted).toBeFalsy();
      expect(newState.tabHasNoUnsavedChanges).toBeFalsy();
      expect(mockHandleTabIsolate).toHaveBeenCalled();
    });
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
          transformLexile={transformLexile}
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
      const newSettingsOnScreen = immMockProficiencyBandDataWithAsterisks
        .set('proficientBandIndex', 2)
        .set('shouldShowAsterisks', false);
      const mockResultingState = {
        immInvalidHighs: mockClearedInvalidHighs,
        immSettingsOnScreen: newSettingsOnScreen,
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
      const newSettingsOnScreen = immMockProficiencyBandDataWithAsterisks
        .set('proficientBandIndex', 3)
        .set('shouldShowAsterisks', false);
      const mockResultingState = {
        immInvalidHighs: mockClearedInvalidHighs,
        immSettingsOnScreen: newSettingsOnScreen,
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
});
