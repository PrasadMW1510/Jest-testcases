/**
 *
 * ProgramAvailableBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import 'components/ProgramAvailableBar/ProgramAvailableBar.scss';
import programConstant from 'components/ProgramAvailableBar/constants';
// noinspection JSAnnotator
/**
 * @return {boolean}
 */

function ProgramAvailableBar(props) {
  function handleDisplayImage(product) {
    return programConstant[product];
  }

  function renderItems() {
    return props.items.map(i => (
      <img
        key={i.array}
        className="program-available-bar__image"
        src={handleDisplayImage(i.array)}
        alt={i.array}
        height="20"
        width="20"
      />
    ));
  }

  return (
    <div className="program-available-bar">
      <div className="program-available-bar__message">
        You have these programs available:
        {renderItems()}
      </div>
    </div>
  );
}

ProgramAvailableBar.propTypes = {
  items: PropTypes.array,
};

export default ProgramAvailableBar;
