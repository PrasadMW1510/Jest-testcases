/**
 *
 * SystemRecordingPopUp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './SystemRecordingPopUp.scss';

class SystemRecordingPopUp extends React.Component {
  render() {
    const { tableData, popUpType, scoreToggleClose } = this.props;
    let popUpTypeClassName;
    if (popUpType === 'Success Recording') {
      popUpTypeClassName = 'simulation-program__col-sm--12';
    }
    if (tableData[popUpType].length === 4) {
      popUpTypeClassName = 'simulation-program__col-sm--3';
    }
    if (tableData[popUpType].length === 3) {
      popUpTypeClassName = 'simulation-program__col-sm--4';
    }
    return (
      <div
        className={
          tableData[popUpType].length === 4
            ? 'simulation-program__overall-respond--score'
            : 'simulation-program__overall--score'
        }
      >
        <div className="simulation-program__overall-score--head">
          <h3 className="simulation-program__overall-score--heading">Overall Score</h3>
          <button className="inbox-program__close--pop" onClick={scoreToggleClose}>
            x
          </button>
        </div>
        <div className="simulation-program__overall-score--info">
          {tableData &&
            tableData[popUpType].map(item => (
              <div key={`maindiv${item.title}`} className={popUpTypeClassName}>
                {item.title && <h4 className="simulation-program__col--body">{item.title}</h4>}
                {item.title ? (
                  <p key={`content${item.title}`} className="simulation-program__col--p">
                    {item.content}
                  </p>
                ) : (
                  <ul key={item.title} className="simulation-program__col--ul">
                    {item.content
                      .split('.')
                      .map(
                        sample =>
                          sample.length > 0 && <li key={`sample${item.title}`}>{sample}.</li>
                      )}
                  </ul>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

SystemRecordingPopUp.propTypes = {
  tableData: PropTypes.any,
  popUpType: PropTypes.string,
  scoreToggleClose: PropTypes.func,
};

export default SystemRecordingPopUp;
