/**
 *
 * ProgramCertificateView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ProgramCertificateList from 'components/ProgramCertificateList';

import './ProgramCertificateView.scss';

export class ProgramCertificateView extends React.Component {
  renderCertificateList = list => {
    if (list && list.length > 0) {
      return list.map(item => (
        <option key={item.certificate_id[0]} value={item.certificate_id[0]}>
          {item.certificate_name[0]}
        </option>
      ));
    }
    return null;
  };

  renderCertificates = certificateInfo => {
    if (certificateInfo && !Array.isArray(certificateInfo)) {
      return this.renderCertificateList(certificateInfo.certificates[0].certificate);
    }
    return null;
  };

  render() {
    const {
      certificateInfo,
      selectedCertificate,
      lineOne,
      lineTwo,
      lineThree,
      lineFour,
      selectedClasses,
      toggleRowSelection,
      toggleRowsSelection,
    } = this.props;
    return (
      <div className="certinfo">
        <span className="certinfo__header">Certificate Manager</span>
        <div className="awardselect">
          <span className="awardselect__header"> Select a Certificate </span>
          <div className="awardselect__cont">
            <span className="awardselect__label">Select a program certificate:</span>
            <select
              className="awardselectbox"
              name="selectedCertificate"
              onChange={this.props.handleChange}
              value={selectedCertificate}
            >
              <option> -- Certificate Name -- </option>
              {this.renderCertificates(certificateInfo)}
            </select>
          </div>
          <div className="messagecont">
            <span className="messagecont__header">Enter a custom message:</span>
            <ul className="customlines">
              <li className="customlines__item">
                <span className="customlines__text">Line 1:</span>
                <input
                  className="customlines__input"
                  id="line1"
                  type="text"
                  autoComplete="off"
                  name="lineOne"
                  value={lineOne}
                  onChange={this.props.handleChange}
                />
              </li>
              <li className="customlines__item">
                <span className="customlines__text">Line 2:</span>
                <input
                  className="customlines__input"
                  id="line2"
                  type="text"
                  autoComplete="off"
                  name="lineTwo"
                  value={lineTwo}
                  onChange={this.props.handleChange}
                />
              </li>
              <li className="customlines__item">
                <span className="customlines__text">Line 3:</span>
                <input
                  className="customlines__input"
                  id="line3"
                  type="text"
                  autoComplete="off"
                  name="lineThree"
                  value={lineThree}
                  onChange={this.props.handleChange}
                />
              </li>
              <li className="customlines__item">
                <span className="customlines__text">Line 4:</span>
                <input
                  className="customlines__input"
                  id="line4"
                  type="text"
                  autoComplete="off"
                  name="lineFour"
                  value={lineFour}
                  onChange={this.props.handleChange}
                />
              </li>
            </ul>
          </div>
        </div>
        <ProgramCertificateList
          certificateInfo={certificateInfo}
          selectedCertificate={this.props.selectedCertificate}
          toggleRowSelection={toggleRowSelection}
          selectedClasses={selectedClasses}
          toggleRowsSelection={toggleRowsSelection}
        />
      </div>
    );
  }
}

ProgramCertificateView.propTypes = {
  certificateInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  handleChange: PropTypes.func,
  selectedCertificate: PropTypes.string,
  lineOne: PropTypes.string,
  lineTwo: PropTypes.string,
  lineThree: PropTypes.string,
  lineFour: PropTypes.string,
  selectedClasses: PropTypes.array,
  toggleRowSelection: PropTypes.func,
  toggleRowsSelection: PropTypes.func,
};

export default ProgramCertificateView;
