/**
 *
 * SelectClassMessage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './SelectClassMessage.scss';

export class SelectClassMessage extends React.Component {
  render = () => {
    const message = this.props.visible ? 'Please select a class' : null;
    return <div className="class-assign-modal__select-class-message">{message}</div>;
  };
}

SelectClassMessage.defaultProps = {
  visible: false,
};

SelectClassMessage.propTypes = {
  visible: PropTypes.bool,
};

export default SelectClassMessage;
