/**
 *
 * SettingsTextField
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import './SettingsTextField.scss';

function SettingsTextField({
  disabled,
  fieldClass: fieldClassProp,
  fieldName,
  fieldValue,
  key,
  label,
  labelClass: labelClassProp,
  labelPosition,
  mixedValue,
  onBlur,
  onChange,
}) {
  let fieldClass = `settings-text-field ${fieldClassProp}`;
  if (disabled) {
    fieldClass = fieldClass.concat(' settings-text-field--grey');
  }
  const labelClass =
    fieldValue === mixedValue
      ? labelClassProp.concat(' settings-text-field-label--grey')
      : labelClassProp;
  const keyValue = key || label;
  return (
    <span className="settings-text-field-wrapper" key={keyValue}>
      {label &&
        labelPosition === 'left' && (
          <span className={`settings-text-field-label--left ${labelClass}`}>{label}</span>
        )}
      <input
        className={fieldClass}
        disabled={disabled}
        name={fieldName}
        onBlur={onBlur}
        onChange={onChange}
        type="text"
        value={fieldValue === mixedValue ? '' : fieldValue}
      />
      {label &&
        labelPosition === 'right' && (
          <span className={`settings-text-field-label--right ${labelClass}`}>{label}</span>
        )}
    </span>
  );
}

SettingsTextField.defaultProps = {
  disabled: false,
  fieldClass: '',
  fieldName: 'settingsTextField',
  key: '',
  labelClass: '',
  labelPosition: 'left',
  mixedValue: '2',
};

SettingsTextField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  fieldClass: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldValue: PropTypes.string,
  key: PropTypes.any,
  label: PropTypes.string,
  labelClass: PropTypes.string.isRequired,
  labelPosition: PropTypes.string,
  mixedValue: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

export default SettingsTextField;
