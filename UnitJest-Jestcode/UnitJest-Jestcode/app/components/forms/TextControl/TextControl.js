/**
 *
 * TextControl
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '../FormControl';
import FormLabel from '../FormLabel';

import './TextControl.scss';

function TextControl({ label, input, formatText }) {
  const formattedText = (formatText && formatText(input.value)) || input.value;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <div className="form-control__text">{formattedText}</div>
    </FormControl>
  );
}

TextControl.defaultProps = {
  label: '',
  input: {
    value: '',
  },
};

TextControl.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  formatText: PropTypes.func,
};

export default TextControl;
