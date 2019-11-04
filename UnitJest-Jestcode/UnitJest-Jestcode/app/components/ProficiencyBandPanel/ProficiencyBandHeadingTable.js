import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-array-index-key */
class ProficiencyBandHeadingTable extends PureComponent {
  handleChangeBandName = ev => {
    const bandIndex = ev.target.getAttribute('data-bandindex');
    this.props.handleChangeBandName({ bandIndex, value: ev.target.value });
  };

  shouldBandShowAsterisk = immBandReferenceInfo =>
    this.props.shouldShowAsterisks &&
    (immBandReferenceInfo.get('defaultName') === 'Proficient' ||
      immBandReferenceInfo.get('defaultName') === 'Advanced');

  render() {
    const {
      immBandNames,
      immBandReferenceData,
      immBandsEnabled,
      isEditable,
      numberOfTrailingColumns,
    } = this.props;
    const trailingColumns = [];
    for (let i = 0; i < numberOfTrailingColumns; i += 1) {
      trailingColumns.push(
        <th className="pb-table__band-column pb-table__header pb-table__header--gray" key={i}>
          &nbsp;
        </th>
      );
    }
    return (
      <table className="pb-heading-table">
        <tbody>
          <tr>
            <th className="pb-table__first-column pb-table__header pb-table__header--gray">
              Grade
            </th>
            {immBandReferenceData.map(
              (immBandReferenceInfo, bandIndex) =>
                immBandsEnabled.get(bandIndex) && (
                  <th
                    className={`pb-table__header pb-table__band-column pb-table__band-column--${bandIndex +
                      1}`}
                    key={immBandReferenceInfo.get('defaultName')}
                  >
                    {isEditable ? (
                      <input
                        className="pb-table-header__input"
                        data-bandindex={bandIndex}
                        onChange={this.handleChangeBandName}
                        type="text"
                        value={immBandNames.get(bandIndex)}
                      />
                    ) : (
                      immBandNames.get(bandIndex)
                    )}
                    <div className="pb-table-header__asterisk">
                      {this.shouldBandShowAsterisk(immBandReferenceInfo) ? '  *' : ' '}
                    </div>
                  </th>
                )
            )}
            {trailingColumns}
          </tr>
        </tbody>
      </table>
    );
  }
}
/* eslint-enable react/no-array-index-key */

ProficiencyBandHeadingTable.defaultProps = {
  isEditable: false,
  shouldShowAsterisks: false,
};

ProficiencyBandHeadingTable.propTypes = {
  handleChangeBandName: PropTypes.func.isRequired,
  immBandNames: PropTypes.object.isRequired,
  immBandReferenceData: PropTypes.object.isRequired,
  immBandsEnabled: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  numberOfTrailingColumns: PropTypes.number.isRequired,
  shouldShowAsterisks: PropTypes.bool.isRequired,
};

export default ProficiencyBandHeadingTable;
