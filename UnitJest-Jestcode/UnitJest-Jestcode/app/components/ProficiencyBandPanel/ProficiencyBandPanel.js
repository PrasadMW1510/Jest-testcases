/**
 *
 * ProficiencyBandPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './ProficiencyBandPanel.scss';
import ProficiencyBandHeadingTable from './ProficiencyBandHeadingTable';
import ProficiencyBandDataTable from './ProficiencyBandDataTable';

class ProficiencyBandPanel extends React.PureComponent {
  getTotalNumberOfBands = () => this.props.immProficiencyBandData.get('bandsEnabled').size;

  handleChangeProficientBand = ev => {
    const newProficientBandIndex =
      parseInt(ev.target.value, 10) -
      (this.props.numberOfEnabledBands - this.getTotalNumberOfBands() + 1);
    this.props.handleChangeProficientBand(newProficientBandIndex);
  };

  /* eslint-disable react/no-array-index-key */
  renderProficientBandSelectorOptions = () =>
    Array(this.props.numberOfEnabledBands)
      .fill()
      .map((_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1}
        </option>
      ));
  /* eslint-enable react/no-array-index-key */

  renderBottomOptions = (proficientBandIndex, totalNumberOfBands) => {
    const {
      handleChangeNumberOfBands,
      handleClearAll,
      labelNumberOfBands,
      labelSelectProficientBand,
      numberOfEnabledBands,
    } = this.props;
    return (
      <Fragment>
        <div className="pb-container__select-boxes">
          <div className="pb-container__select-box-wrapper">
            {labelNumberOfBands}
            <select
              className="pb-container__select-box"
              onChange={handleChangeNumberOfBands}
              value={numberOfEnabledBands}
            >
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="pb-container__select-box-wrapper">
            {labelSelectProficientBand}
            <select
              className="pb-container__select-box"
              onChange={this.handleChangeProficientBand}
              value={proficientBandIndex + (numberOfEnabledBands - totalNumberOfBands + 1)}
            >
              {this.renderProficientBandSelectorOptions()}
            </select>
          </div>
        </div>
        <div className="pb-container__clear-link-container">
          <a href="" onClick={handleClearAll}>
            Clear all
          </a>
        </div>
      </Fragment>
    );
  };

  render() {
    const {
      bandValueTranslator,
      firstActiveCellIsEditable,
      handleBlurBandHighValue,
      handleChangeBandName,
      handleChangeBandHighValue,
      heading,
      immInvalidHighs,
      immProficiencyBandData,
      isEditable,
      numberOfEnabledBands,
      startingGradeIndex,
    } = this.props;
    const proficientBandIndex = immProficiencyBandData.get('proficientBandIndex');
    const shouldShowAsterisks = immProficiencyBandData.get('shouldShowAsterisks');
    const immBandNames = immProficiencyBandData.get('bandNames');
    const immBandReferenceData = immProficiencyBandData.get('bandReferenceData');
    const immBandsEnabled = immProficiencyBandData.get('bandsEnabled');
    const immGrades = immProficiencyBandData.get('grades');
    const numberOfBands = this.getTotalNumberOfBands();
    if (numberOfBands > 0) {
      const numberOfTrailingColumns = numberOfBands - numberOfEnabledBands;
      return (
        <div className="program-settings__pb-container">
          <div className="pb-container__tabular-content">
            <span className="pb-tabular-content__caption">{heading}</span>
            <ProficiencyBandHeadingTable
              handleChangeBandName={handleChangeBandName}
              immBandNames={immBandNames}
              immBandReferenceData={immBandReferenceData}
              immBandsEnabled={immBandsEnabled}
              isEditable={isEditable}
              numberOfTrailingColumns={numberOfTrailingColumns}
              shouldShowAsterisks={shouldShowAsterisks}
            />
            <ProficiencyBandDataTable
              bandValueTranslator={bandValueTranslator}
              firstActiveCellIsEditable={firstActiveCellIsEditable}
              handleBlurBandHighValue={handleBlurBandHighValue}
              handleChangeBandHighValue={handleChangeBandHighValue}
              immBandReferenceData={immBandReferenceData}
              immBandsEnabled={immBandsEnabled}
              immGrades={immGrades}
              immInvalidHighs={immInvalidHighs}
              isEditable={isEditable}
              numberOfTrailingColumns={numberOfTrailingColumns}
              startingGradeIndex={startingGradeIndex}
            />
          </div>
          {isEditable && this.renderBottomOptions(proficientBandIndex, numberOfBands)}
        </div>
      );
    }
    return null;
  }
}

ProficiencyBandPanel.defaultProps = {
  firstActiveCellIsEditable: false,
  isEditable: false,
  labelNumberOfBands: 'Number of performance level bands:',
  labelSelectProficientBand: 'Select "proficient" band:',
  startingGradeIndex: 0,
};

ProficiencyBandPanel.propTypes = {
  bandValueTranslator: PropTypes.func,
  firstActiveCellIsEditable: PropTypes.bool.isRequired,
  handleBlurBandHighValue: PropTypes.func,
  handleChangeBandName: PropTypes.func.isRequired,
  handleChangeBandHighValue: PropTypes.func.isRequired,
  handleChangeNumberOfBands: PropTypes.func.isRequired,
  handleChangeProficientBand: PropTypes.func.isRequired,
  handleClearAll: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  immInvalidHighs: PropTypes.object.isRequired,
  immProficiencyBandData: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  labelNumberOfBands: PropTypes.string.isRequired,
  labelSelectProficientBand: PropTypes.string.isRequired,
  numberOfEnabledBands: PropTypes.number.isRequired,
  startingGradeIndex: PropTypes.number.isRequired,
};

export default ProficiencyBandPanel;
