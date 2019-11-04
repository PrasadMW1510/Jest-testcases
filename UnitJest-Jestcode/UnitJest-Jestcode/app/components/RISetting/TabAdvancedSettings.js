/**
 *
 * TabAdvancedSettings
 *
 */

import React, { Component, Fragment } from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { COHORT_TYPE } from 'containers/App/constants';
import { WARNING_MODAL } from 'containers/ModalController/constants';
import ProficiencyBandPanel from 'components/ProficiencyBandPanel';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SAMLinkButton from 'components/SAMLinkButton';
import {
  STARTING_GRADE_INDEX,
  TAB_ADVANCED_SETTINGS,
  TAB_ADVANCED_SETTINGS_EDITABLE_INSTRUCTIONS,
  TAB_ADVANCED_SETTINGS_READ_ONLY_INSTRUCTIONS,
} from './constants';

class TabAdvancedSettings extends Component {
  constructor(props) {
    super(props);
    const { immProficiencyBandData } = props;
    const numberOfBands = immProficiencyBandData.get('bandsEnabled').size;
    const invalidHighs = Array(immProficiencyBandData.get('grades').size).fill(
      Array(numberOfBands).fill(false)
    );
    this.state = {
      immInvalidHighs: fromJS(invalidHighs),
      immSettingsOnScreen: immProficiencyBandData,
      saveAttempted: false,
      tabHasNoUnsavedChanges: true,
    };
  }

  getClearedInvalidHighs = () =>
    fromJS(Array(this.numberOfGrades).fill(Array(this.numberOfBands).fill(false)));

  getScrubbedInvalidHighs = (immInvalidHighs, gradeIndex) =>
    immInvalidHighs.withMutations(mutableInvalidHighs => {
      for (let bandIndex = 0; bandIndex < this.numberOfBands; bandIndex += 1) {
        mutableInvalidHighs.setIn([gradeIndex, bandIndex], false);
      }
    });

  isInvalidHighsEmpty = immInvalidHighs => immInvalidHighs.flatten().indexOf(true) === -1;

  numberOfBands = this.props.immProficiencyBandData.get('bandsEnabled').size;
  numberOfGrades = this.props.immProficiencyBandData.get('grades').size;

  changeBandsEnabled = (immSettingsOnScreen, newValue) => {
    const immBandsEnabled = immSettingsOnScreen.get('bandsEnabled');
    let newImmBandsEnabled = immBandsEnabled;
    let newValueIndex = immBandsEnabled.size - newValue;
    immBandsEnabled.forEach((immBandEnabled, bandIndex) => {
      newImmBandsEnabled =
        newValueIndex > 0
          ? newImmBandsEnabled.set(bandIndex, false)
          : newImmBandsEnabled.set(bandIndex, true);
      newValueIndex -= 1;
    });
    return immSettingsOnScreen.set('bandsEnabled', newImmBandsEnabled);
  };

  countEnabledBands = (accumulator, currentValue) => accumulator + (currentValue ? 1 : 0);

  clearAll = immSettingsOnScreen => {
    const immBandsEnabled = immSettingsOnScreen.get('bandsEnabled');
    const firstEnabledBandIndex = immBandsEnabled.findIndex(immBandEnabled => immBandEnabled);
    const numberOfBands = immBandsEnabled.size;
    // several operations on the immutable data involved here, so use the 'withMutations' wrapper
    const newImmSettingsOnScreen = immSettingsOnScreen.withMutations(mutableImmSettingsOnScreen => {
      // clear the band names
      const immClearedBandNames = mutableImmSettingsOnScreen
        .get('bandNames')
        .map(() => '(no name)');
      mutableImmSettingsOnScreen.set('bandNames', immClearedBandNames);
      // clear the appropriate band range values
      mutableImmSettingsOnScreen.get('grades').forEach((immGrade, gradeIndex) => {
        if (gradeIndex >= STARTING_GRADE_INDEX) {
          immGrade.get('bandRanges').forEach((immBandRange, bandIndex) => {
            let clearedLow = 0;
            let clearedHigh = NaN;
            // if the band is enabled
            if (mutableImmSettingsOnScreen.getIn(['bandsEnabled', bandIndex])) {
              // if the current band is the first enabled one, set its low value to -999998
              if (bandIndex === firstEnabledBandIndex) {
                clearedLow = -999998;
                // otherwise, if the band is the last one, set its cleared high value to 999998
              } else if (bandIndex === numberOfBands - 1) {
                clearedHigh = 999998;
              }
              // otherwise, the band is disabled, so the lows/highs should be 0
            } else {
              clearedLow = 0;
              clearedHigh = 0;
            }
            mutableImmSettingsOnScreen.setIn(
              ['grades', gradeIndex, 'bandRanges', bandIndex, 'low'],
              clearedLow
            );
            mutableImmSettingsOnScreen.setIn(
              ['grades', gradeIndex, 'bandRanges', bandIndex, 'high'],
              clearedHigh
            );
          });
        }
      });
      // finally address the first two coordinates of enabled bands, which
      // should have low values of -999998, and the first one should have
      // a high value of -999998
      mutableImmSettingsOnScreen.setIn(
        ['grades', STARTING_GRADE_INDEX, 'bandRanges', firstEnabledBandIndex, 'high'],
        -999998
      );
      mutableImmSettingsOnScreen.setIn(
        ['grades', STARTING_GRADE_INDEX, 'bandRanges', firstEnabledBandIndex + 1, 'low'],
        -999998
      );
    });
    return newImmSettingsOnScreen;
  };

  handleChangeBandName = ({ bandIndex, value }) => {
    const newImmSettingsOnScreen = this.state.immSettingsOnScreen
      .setIn(['bandNames', bandIndex], value)
      .set('shouldShowAsterisks', false);
    this.setState({
      immSettingsOnScreen: newImmSettingsOnScreen,
      tabHasNoUnsavedChanges: false,
    });
    this.props.handleIsolateTab();
  };

  validateBandValues = ({
    immSettingsOnScreen,
    immInvalidHighs,
    gradeIndex,
    invalidateBlanks = false,
    targetBandIndex,
    targetNewValue,
  }) => {
    // the general algorithm is:  iterate over the band values for the grade,
    // keeping track of the highest value that is in ascending order:
    // any subsequent values that are lower than that high value are invalid.
    const immBandRanges = immSettingsOnScreen.getIn(['grades', gradeIndex, 'bandRanges']);
    const immBandsEnabled = immSettingsOnScreen.get('bandsEnabled');
    const numberOfBands = immBandsEnabled.size;
    let newImmInvalidHighs = this.getScrubbedInvalidHighs(immInvalidHighs, gradeIndex);
    let newImmSettingsOnScreen = immSettingsOnScreen;
    // initialize our highest-value tracker to the lowest possible, to start out.
    let highestValue = -999998;
    immBandRanges.forEach((immBandRange, bandIndex) => {
      // we only process the entry if the band is enabled and it's not the very last one
      // (the user doesn't have any control over the last band's high value.)
      if (immBandsEnabled.get(bandIndex) && bandIndex !== numberOfBands - 1) {
        const value = bandIndex === targetBandIndex ? targetNewValue : immBandRange.get('high');
        const isValid =
          (isNaN(value) && !invalidateBlanks) ||
          value === -999998 ||
          (value > highestValue + 1 && value < 1700);
        // if the current value is valid..
        if (isValid) {
          // if the current value is populated (and valid), bump the latest
          // high value to the current value, and also adjust the next low value
          if (!isNaN(value)) {
            highestValue = value;
            const nextLowValue = value === -999998 ? -999998 : value + 1;
            newImmSettingsOnScreen = newImmSettingsOnScreen.setIn(
              ['grades', gradeIndex, 'bandRanges', bandIndex + 1, 'low'],
              nextLowValue
            );
          }
          // otherwise, the current value is invalid, so add it to the invalid high list
        } else {
          newImmInvalidHighs = newImmInvalidHighs.setIn([gradeIndex, bandIndex], true);
        }
      }
    });
    return {
      immInvalidHighs: newImmInvalidHighs,
      immSettingsOnScreen: newImmSettingsOnScreen,
    };
  };

  handleBlurBandHighValue = ({ bandIndex, gradeNumber, value }) => {
    const gradeIndex = parseInt(gradeNumber, 10);
    const { immSettingsOnScreen, immInvalidHighs } = this.validateBandValues({
      immSettingsOnScreen: this.state.immSettingsOnScreen,
      immInvalidHighs: this.state.immInvalidHighs,
      invalidateBlanks: this.state.saveAttempted,
      gradeIndex,
      targetBandIndex: bandIndex,
      targetNewValue: value,
    });
    this.setState({ immSettingsOnScreen, immInvalidHighs });
  };

  validateSubmittedProficiencyBands = () => {
    const numberOfGrades = this.state.immSettingsOnScreen.get('grades').size;
    let immSettingsOnScreen = this.state.immSettingsOnScreen;
    let immInvalidHighs = this.state.immInvalidHighs;
    for (let gradeIndex = STARTING_GRADE_INDEX; gradeIndex < numberOfGrades; gradeIndex += 1) {
      ({ immSettingsOnScreen, immInvalidHighs } = this.validateBandValues({
        immSettingsOnScreen,
        immInvalidHighs,
        invalidateBlanks: true,
        gradeIndex,
      }));
    }
    return {
      immSettingsOnScreen,
      immInvalidHighs,
    };
  };

  handleChangeBandHighValue = ({ bandIndex, gradeNumber, value }) => {
    const newImmSettingsOnScreen = this.state.immSettingsOnScreen
      .setIn(['grades', gradeNumber, 'bandRanges', bandIndex, 'high'], value)
      .set('shouldShowAsterisks', false);
    this.setState({
      immSettingsOnScreen: newImmSettingsOnScreen,
      tabHasNoUnsavedChanges: false,
    });
    this.props.handleIsolateTab();
  };

  handleChangeNumberOfBands = event => {
    const newValue = event.target.value;
    let newImmSettingsOnScreen = this.changeBandsEnabled(this.state.immSettingsOnScreen, newValue);
    newImmSettingsOnScreen = this.clearAll(newImmSettingsOnScreen);
    const proficientBandIndex = newValue === '5' ? 2 : 3;
    newImmSettingsOnScreen = newImmSettingsOnScreen
      .set('proficientBandIndex', proficientBandIndex)
      .set('shouldShowAsterisks', false);
    this.setState({
      immInvalidHighs: this.getClearedInvalidHighs(),
      immSettingsOnScreen: newImmSettingsOnScreen,
      saveAttempted: false,
      tabHasNoUnsavedChanges: false,
    });
    this.props.handleIsolateTab();
  };

  handleChangeProficientBand = newProficientBandIndex => {
    const immSettingsOnScreen = this.state.immSettingsOnScreen
      .set('proficientBandIndex', newProficientBandIndex)
      .set('shouldShowAsterisks', false);
    this.setState({
      immSettingsOnScreen,
      tabHasNoUnsavedChanges: false,
    });
    this.props.handleIsolateTab();
  };

  handleClearAll = event => {
    event.preventDefault();
    const immSettingsOnScreen = this.clearAll(this.state.immSettingsOnScreen);
    this.setState({
      immInvalidHighs: this.getClearedInvalidHighs(),
      immSettingsOnScreen,
      saveAttempted: false,
      tabHasNoUnsavedChanges: false,
    });
    this.props.handleIsolateTab();
  };

  handleRestoreDefault = () => {
    const { immSettingsOnScreen } = this.state;
    // set the defaults for the band values
    const newImmGrades = immSettingsOnScreen.get('grades').withMutations(mutableImmGrades => {
      mutableImmGrades.forEach((immGrade, gradeIndex) => {
        immGrade.get('bandRanges').forEach((immBandRange, bandIndex) => {
          const defaultLow = immBandRange.getIn(['defaultInfo', 'low']);
          const defaultHigh = immBandRange.getIn(['defaultInfo', 'high']);
          mutableImmGrades.setIn([gradeIndex, 'bandRanges', bandIndex, 'low'], defaultLow);
          mutableImmGrades.setIn([gradeIndex, 'bandRanges', bandIndex, 'high'], defaultHigh);
        });
      });
    });
    // set the defaults for the band names
    const immBandNames = immSettingsOnScreen.get('bandNames').withMutations(mutableImmBandNames => {
      immSettingsOnScreen.get('bandReferenceData').forEach((immBandReferenceInfo, bandIndex) => {
        mutableImmBandNames.set(bandIndex, immBandReferenceInfo.get('defaultName'));
      });
    });
    let newImmSettingsOnScreen = immSettingsOnScreen
      .set('bandNames', immBandNames)
      .set('grades', newImmGrades)
      .set('proficientBandIndex', 3)
      .set('shouldShowAsterisks', true);
    // set the default number of bands
    newImmSettingsOnScreen = this.changeBandsEnabled(newImmSettingsOnScreen, 4);
    this.setState({
      immInvalidHighs: this.getClearedInvalidHighs(),
      immSettingsOnScreen: newImmSettingsOnScreen,
      saveAttempted: false,
      tabHasNoUnsavedChanges: false,
    });
    this.props.handleIsolateTab();
  };

  saveSettings = () => {
    const { immInvalidHighs, immSettingsOnScreen } = this.validateSubmittedProficiencyBands();
    let errorMessage = 'Please correct the highlighted entries.';
    // if there is nothing invalid, go through with the API request
    let isAllValid = this.isInvalidHighsEmpty(immInvalidHighs);
    if (isAllValid) {
      // next, check if any band names are blank; if so, pop up an error message
      let isBandNameBlank = false;
      immSettingsOnScreen.get('bandNames').forEach(bandName => {
        isBandNameBlank = isBandNameBlank || bandName.trim() === '';
      });
      if (isBandNameBlank) {
        errorMessage = 'Please enter a name for each Proficiency Band.';
        isAllValid = false;
      } else {
        this.props.handleSave(TAB_ADVANCED_SETTINGS, immSettingsOnScreen);
        this.setState({
          immInvalidHighs,
          immSettingsOnScreen,
          saveAttempted: true,
          tabHasNoUnsavedChanges: true,
        });
        this.props.handleTabReset();
      }
      // otherwise, don't save.
    }
    if (!isAllValid) {
      this.props.showModal(WARNING_MODAL, {
        message: errorMessage,
      });
      this.setState({
        immInvalidHighs,
        immSettingsOnScreen,
        saveAttempted: true,
      });
    }
    return isAllValid;
  };

  handleCancelChanges = () => {
    this.setState({
      immInvalidHighs: this.getClearedInvalidHighs(),
      immSettingsOnScreen: this.props.immProficiencyBandData,
      saveAttempted: false,
      tabHasNoUnsavedChanges: true,
    });
    this.props.handleTabReset();
  };

  handleSubmit = event => {
    event.preventDefault();
    return this.saveSettings();
  };

  shouldBandShowAsterisk = immBandReferenceInfo =>
    this.state.immSettingsOnScreen.get('shouldShowAsterisks') &&
    (immBandReferenceInfo.get('defaultName') === 'Proficient' ||
      immBandReferenceInfo.get('defaultName') === 'Advanced');

  render() {
    const { selectedCohortType, transformLexile } = this.props;
    const { immInvalidHighs, immSettingsOnScreen, tabHasNoUnsavedChanges } = this.state;
    const numberOfEnabledBands = immSettingsOnScreen
      .get('bandsEnabled')
      .reduce(this.countEnabledBands);
    const isEditable = selectedCohortType === COHORT_TYPE.District;
    return (
      <Fragment>
        <div className="ri-settings__instruction-text">
          {isEditable
            ? TAB_ADVANCED_SETTINGS_EDITABLE_INSTRUCTIONS
            : TAB_ADVANCED_SETTINGS_READ_ONLY_INSTRUCTIONS}
        </div>
        <div className="ri-settings__legend-text">
          {immSettingsOnScreen.get('shouldShowAsterisks')
            ? '* Indicates College and Career readiness'
            : ' '}
        </div>
        <form onSubmit={this.handleSubmit}>
          <ProficiencyBandPanel
            bandValueTranslator={transformLexile}
            handleBlurBandHighValue={this.handleBlurBandHighValue}
            handleChangeBandHighValue={this.handleChangeBandHighValue}
            handleChangeBandName={this.handleChangeBandName}
            handleChangeNumberOfBands={this.handleChangeNumberOfBands}
            handleChangeProficientBand={this.handleChangeProficientBand}
            handleClearAll={this.handleClearAll}
            heading="Set Proficiency Band Names and Ranges"
            immInvalidHighs={immInvalidHighs}
            immProficiencyBandData={immSettingsOnScreen}
            isEditable={isEditable}
            numberOfEnabledBands={numberOfEnabledBands}
            shouldBandShowAsterisk={this.shouldBandShowAsterisk}
            startingGradeIndex={STARTING_GRADE_INDEX}
          />
          {isEditable ? (
            <ProgramSettingsButtons
              restoreDefaultHandler={this.handleRestoreDefault}
              saveAndReturnHandler={this.saveSettings}
              setInitialValuesHandler={this.handleCancelChanges}
              stateResult={tabHasNoUnsavedChanges}
            />
          ) : (
            <div className="ri-settings__only-button-container">
              <SAMLinkButton to="/roster" buttonClassModifier="settings-message__btn">
                Return to Profile
              </SAMLinkButton>
            </div>
          )}
        </form>
      </Fragment>
    );
  }
}

TabAdvancedSettings.defaultProps = {
  isolateTab: false,
};

TabAdvancedSettings.propTypes = {
  handleIsolateTab: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleTabReset: PropTypes.func.isRequired,
  immProficiencyBandData: PropTypes.object.isRequired,
  selectedCohortType: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  transformLexile: PropTypes.func.isRequired,
};

export default TabAdvancedSettings;
