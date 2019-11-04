/**
 *
 * ProgramCertificateList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './ProgramCertificateList.scss';

class ProgramCertificateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleRows: false,
    };
  }

  toggleRows = () => {
    this.setState(
      {
        toggleRows: !this.state.toggleRows,
      },
      () => this.props.toggleRowsSelection(this.state.toggleRows)
    );
  };

  isChecked = id => {
    const index = this.props.selectedClasses.findIndex(item => item.id === id[0]);
    return index !== -1;
  };

  isHeaderCheckboxChecked = certificateInfo =>
    !!(
      certificateInfo &&
      this.props.selectedClasses &&
      !Array.isArray(certificateInfo) &&
      this.props.selectedClasses.length === certificateInfo.recipients[0].recipient.length
    );

  handleChange = item => () =>
    this.props.toggleRowSelection({ id: item.id[0], type: item.type[0], name: item.name[0] });

  renderRecepient = certificateInfo => {
    if (certificateInfo && !Array.isArray(certificateInfo)) {
      return this.renderRecepientRows(certificateInfo.recipients[0].recipient);
    }
    return null;
  };

  renderRecepientRows = list => {
    if (list && list.length > 0) {
      return list.map(item => {
        if (
          this.props.selectedCertificate !== 'fmng_11' &&
          this.props.selectedCertificate !== 'fm_11'
        ) {
          return (
            <tr key={item.id}>
              <td className="recipients-table__checkinput">
                <input
                  id="checkBox"
                  type="checkbox"
                  checked={this.isChecked(item.id)}
                  onChange={this.handleChange(item)}
                />
              </td>
              <td className="recipients-table__classdata">{item.name[0]}</td>
              <td className="recipients-table__gradedata">{item.grade[0]}</td>
              <td className="recipients-table__lexiledata">
                {item.lexile_level[0] ? item.lexile_level[0] : 'N/A'}
              </td>
              <td className="recipients-table__r180leveldata">
                {item.R180_level[0] ? item.R180_level[0] : 'N/A'}
              </td>
              <td className="recipients-table__booksdata">
                {item.books_read[0] ? item.R180_level[0] : 'N/A'}
              </td>
              <td className="recipients-table__pointsdata">
                {item.points_earned[0] ? item.R180_level[0] : 'N/A'}
              </td>
            </tr>
          );
        }
        return (
          <tr key={item.id}>
            <td className="recipients-table__checkinput">
              <input
                id="checkBox"
                type="checkbox"
                checked={this.isChecked(item.id)}
                onChange={this.handleChange(item)}
              />
            </td>
            <td className="recipients-table__classdata">{item.name[0]}</td>
          </tr>
        );
      });
    }
    return null;
  };

  render() {
    const { certificateInfo, selectedCertificate } = this.props;
    const isFMCertificate = selectedCertificate !== 'fmng_11' && selectedCertificate !== 'fm_11';
    return (
      <div className="recipients">
        <span className="recepient__title">
          Check the appropriate box or boxes to create the desired number of certificates. To create
          a certificate with no printed name, leave all boxes unchecked.
        </span>
        <div className="recipients-table-cont">
          <table className="recipients-table">
            <thead>
              {isFMCertificate && (
                <tr>
                  <th className="recipients-table__checkbox">
                    <input
                      id="checkBoxHeader"
                      type="checkbox"
                      checked={this.isHeaderCheckboxChecked(certificateInfo)}
                      onChange={this.toggleRows}
                    />
                  </th>
                  <th className="recipients-table__class">Classes/Students</th>
                  <th className="recipients-table__grade">Grade</th>
                  <th className="recipients-table__lexile">Lexile</th>
                  <th className="recipients-table__r180level">READ 180 Level</th>
                  <th className="recipients-table__books">Books Read</th>
                  <th className="recipients-table__points">Points Earned</th>
                </tr>
              )}
              {!isFMCertificate && (
                <tr>
                  <th className="recipients-table__checkbox">
                    <input
                      id="checkBoxHeader"
                      type="checkbox"
                      checked={this.isHeaderCheckboxChecked(certificateInfo)}
                      onChange={this.toggleRows}
                    />
                  </th>
                  <th className="recipients-table__class">Classes/Students</th>
                </tr>
              )}
            </thead>
            <tbody className="recipients-table__body">
              {this.renderRecepient(certificateInfo)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ProgramCertificateList.propTypes = {
  certificateInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedCertificate: PropTypes.string,
  toggleRowSelection: PropTypes.func,
  toggleRowsSelection: PropTypes.func,
  selectedClasses: PropTypes.array,
};

export default ProgramCertificateList;
