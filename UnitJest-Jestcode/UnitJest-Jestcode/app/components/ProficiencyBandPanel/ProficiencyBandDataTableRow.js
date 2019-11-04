import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProficiencyBandDataTableRowCell from './ProficiencyBandDataTableRowCell';

/* eslint-disable react/no-array-index-key */
class ProficiencyBandDataTableRow extends PureComponent {
  // a cell high value is editable if all these criteria are met:
  // -  the proficiency band row as a whole is editable
  // -  the cell is not in the final band
  // -  the cell's high value is either not set (NaN) OR is >= 0
  isCellEditable = (bandIndex, numberOfBandRanges, highValue) =>
    this.props.isEditable &&
    bandIndex !== numberOfBandRanges - 1 &&
    (isNaN(highValue) || highValue >= 0);

  render = () => {
    const {
      bandValueTranslator,
      gradeNumber,
      handleBlurBandHighValue,
      handleChangeBandHighValue,
      immBandRanges,
      immBandReferenceData,
      immBandsEnabled,
      immInvalidHighsForGrade,
      isEditable,
      numberOfTrailingColumns,
    } = this.props;
    const fillers = Array(numberOfTrailingColumns).fill();
    const numberOfBandRanges = immBandRanges.size;
    return (
      <tr key={gradeNumber}>
        <td className="pb-data-table__cell">{gradeNumber === '0' ? 'K' : gradeNumber}</td>
        {immBandRanges.map(
          (immBandRange, bandIndex) =>
            immBandsEnabled.get(bandIndex) && (
              <ProficiencyBandDataTableRowCell
                bandIndex={bandIndex}
                bandName={immBandReferenceData.getIn([bandIndex, 'defaultName'])}
                bandValueTranslator={bandValueTranslator}
                gradeNumber={gradeNumber}
                handleBlurBandHighValue={handleBlurBandHighValue}
                handleChangeBandHighValue={handleChangeBandHighValue}
                high={immBandRange.get('high')}
                highIsValid={!immInvalidHighsForGrade.get(bandIndex)}
                isCellEditable={this.isCellEditable(
                  bandIndex,
                  numberOfBandRanges,
                  immBandRange.get('high')
                )}
                isTableEditable={isEditable}
                key={immBandReferenceData.getIn([bandIndex, 'defaultName'])}
                low={immBandRange.get('low')}
              />
            )
        )}
        {fillers.map((_, j) => (
          <td className="pb-data-table__cell pb-data-table__cell--filler" key={`filler-${j}`}>
            &nbsp;
          </td>
        ))}
      </tr>
    );
  };
}
/* eslint-enable react/no-array-index-key */

ProficiencyBandDataTableRow.defaultProps = {
  isEditable: false,
};

ProficiencyBandDataTableRow.propTypes = {
  handleBlurBandHighValue: PropTypes.func,
  handleChangeBandHighValue: PropTypes.func.isRequired,
  immBandRanges: PropTypes.object.isRequired,
  immBandReferenceData: PropTypes.object.isRequired,
  immBandsEnabled: PropTypes.object.isRequired,
  immInvalidHighsForGrade: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  bandValueTranslator: PropTypes.func,
  gradeNumber: PropTypes.string.isRequired,
  numberOfTrailingColumns: PropTypes.number.isRequired,
};

export default ProficiencyBandDataTableRow;
