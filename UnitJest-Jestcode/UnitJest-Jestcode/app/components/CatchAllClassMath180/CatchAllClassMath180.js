/**
 *
 * CatchAllClassMath180
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

class CatchAllClassMath180 extends React.Component {
  render() {
    return (
      <div>
        <div className="print-catchallclass-modal-title">
          Students :
          <span className="print-catchallclass-modal-title-span"> </span>{' '}
          <span className="print-catchallclass-modal-title-span">
            {' '}
            <select
              name="communityId"
              onChange={this.props.handleDatachange}
              className="assignment-passage-select"
            >
              <option value="">Select Program</option>
              <option value="M180Y2">Math 180 Year 2</option>
              <option value="S44JR">iRead</option>
              <option value="S44NG,R180NG">System 44 Next Generation</option>
            </select>
          </span>{' '}
        </div>
        <div className="print-catchallclass-modal-center-content">
          <div className="print-catchallclass-modal-center-content-text">
            In the Students drop down, please select program for this assignment.
          </div>
        </div>
      </div>
    );
  }
}

CatchAllClassMath180.propTypes = {
  handleDatachange: PropTypes.func.isRequired,
};

export default CatchAllClassMath180;
