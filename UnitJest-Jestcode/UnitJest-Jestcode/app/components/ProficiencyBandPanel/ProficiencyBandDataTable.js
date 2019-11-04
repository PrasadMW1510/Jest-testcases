import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProficiencyBandDataTableRow from './ProficiencyBandDataTableRow';

class ProficiencyBandDataTable extends PureComponent {
  render = () => {
    const {
      bandValueTranslator,
      handleBlurBandHighValue,
      handleChangeBandHighValue,
      immBandReferenceData,
      immBandsEnabled,
      immGrades,
      immInvalidHighs,
      isEditable,
      numberOfTrailingColumns,
      startingGradeIndex,
    } = this.props;
    const tableRows = [];
    for (let gradeIndex = startingGradeIndex; gradeIndex < immGrades.size; gradeIndex += 1) {
      const immGrade = immGrades.get(gradeIndex);
      tableRows.push(
        <ProficiencyBandDataTableRow
          bandValueTranslator={bandValueTranslator}
          gradeNumber={immGrade.get('number')}
          handleBlurBandHighValue={handleBlurBandHighValue}
          handleChangeBandHighValue={handleChangeBandHighValue}
          immBandReferenceData={immBandReferenceData}
          immBandsEnabled={immBandsEnabled}
          immBandRanges={immGrade.get('bandRanges')}
          immInvalidHighsForGrade={immInvalidHighs.get(gradeIndex)}
          isEditable={isEditable}
          key={immGrade.get('number')}
          numberOfTrailingColumns={numberOfTrailingColumns}
          startingGradeIndex={startingGradeIndex}
        />
      );
    }
    const trailingColumns = [];
    for (let i = 0; i < numberOfTrailingColumns; i += 1) {
      trailingColumns.push(<col className="pb-table__band-column" key={i} />);
    }
    return (
      <div className="pb-data-table-container">
        <table className="pb-data-table">
          <colgroup className="pb-table__column-group">
            <col className="pb-table__first-column" />
            {immBandReferenceData.map(
              (immBandReferenceInfo, bandIndex) =>
                immBandsEnabled.get(bandIndex) && (
                  <col
                    className={`pb-table__band-column pb-table__band-column--${bandIndex + 1}`}
                    key={immBandReferenceInfo.get('defaultName')}
                  />
                )
            )}
            {trailingColumns}
          </colgroup>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  };
}

ProficiencyBandDataTable.defaultProps = {
  isEditable: false,
  startingGradeIndex: 0,
};

ProficiencyBandDataTable.propTypes = {
  bandValueTranslator: PropTypes.func,
  handleBlurBandHighValue: PropTypes.func,
  handleChangeBandHighValue: PropTypes.func.isRequired,
  immBandReferenceData: PropTypes.object.isRequired,
  immBandsEnabled: PropTypes.object.isRequired,
  immGrades: PropTypes.object.isRequired,
  immInvalidHighs: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  numberOfTrailingColumns: PropTypes.number.isRequired,
  startingGradeIndex: PropTypes.number.isRequired,
};

export default ProficiencyBandDataTable;
