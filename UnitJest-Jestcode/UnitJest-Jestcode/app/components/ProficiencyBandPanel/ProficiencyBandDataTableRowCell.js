import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ProficiencyBandDataTableRowCell extends PureComponent {
  handleBlurBandHighValue = ev => {
    const { bandIndex, gradeNumber } = this.props;
    this.props.handleBlurBandHighValue({
      bandIndex,
      gradeNumber,
      value: parseInt(ev.target.value, 10),
    });
  };

  handleChangeBandHighValue = ev => {
    const { bandIndex, gradeNumber } = this.props;
    this.props.handleChangeBandHighValue({
      bandIndex,
      gradeNumber,
      value: parseInt(ev.target.value, 10),
    });
  };

  render() {
    const {
      bandName,
      bandValueTranslator,
      high,
      highIsValid,
      isCellEditable,
      isTableEditable,
      low,
    } = this.props;
    let translatedHigh = high;
    let translatedLow = low;
    if (bandValueTranslator) {
      translatedLow = bandValueTranslator(low, 0, bandName);
      translatedHigh = bandValueTranslator(high, 1, bandName);
    }
    if (!isCellEditable && translatedLow === translatedHigh) {
      return (
        <td className="pb-data-table__cell" key={bandName}>
          <div className="pb-data-table__cell-single-value">{translatedLow}</div>
        </td>
      );
    }
    if (isCellEditable) {
      return (
        <td
          className={`pb-data-table__cell ${!highIsValid ? 'pb-data-table__cell--invalid' : ''}`}
          key={bandName}
        >
          <div className="pb-data-table-editable-cell__low">{translatedLow}</div>
          <div className="pb-data-table-editable-cell__dash">-</div>
          <div className="pb-data-table-editable-cell__high">
            <input
              className="pb-data-table-editable-high__input"
              onBlur={this.handleBlurBandHighValue}
              onChange={this.handleChangeBandHighValue}
              type="text"
              value={isNaN(high) ? '' : high}
            />
          </div>
          <div className="pb-data-table-cell__icon">
            {!highIsValid && <div className="icon-circle">!</div>}
          </div>
        </td>
      );
    }
    // (otherwise, the cell is not editable)..
    return (
      <td className="pb-data-table__cell" key={bandName}>
        <div className="pb-data-table-cell__low">{translatedLow}</div>
        <div className="pb-data-table-cell__dash">-</div>
        <div className="pb-data-table-cell__high">{translatedHigh}</div>
        {isTableEditable && <div className="pb-data-table-cell__icon">&nbsp;</div>}
      </td>
    );
  }
}

ProficiencyBandDataTableRowCell.defaultProps = {
  highIsValid: true,
  isCellEditable: false,
  isTableEditable: false,
};

ProficiencyBandDataTableRowCell.propTypes = {
  bandIndex: PropTypes.number.isRequired,
  bandName: PropTypes.string.isRequired,
  bandValueTranslator: PropTypes.func,
  gradeNumber: PropTypes.string.isRequired,
  handleBlurBandHighValue: PropTypes.func,
  handleChangeBandHighValue: PropTypes.func.isRequired,
  high: PropTypes.number.isRequired,
  highIsValid: PropTypes.bool,
  isCellEditable: PropTypes.bool.isRequired,
  isTableEditable: PropTypes.bool.isRequired,
  low: PropTypes.number.isRequired,
};

export default ProficiencyBandDataTableRowCell;
