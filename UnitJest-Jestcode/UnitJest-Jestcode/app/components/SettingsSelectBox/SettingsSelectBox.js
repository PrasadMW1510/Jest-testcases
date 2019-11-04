/**
 *
 * SettingsSelectBox
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import './SettingsSelectBox.scss';

function SettingsSelectBox({
  children,
  disabled,
  fieldName,
  fieldValue,
  id,
  label,
  labelClass: labelClassProp,
  labelPosition,
  onChange,
  mixedValue,
  fieldClass: fieldClassProp,
}) {
  let fieldClass = `settings-select-box ${fieldClassProp}`;
  if (disabled) {
    fieldClass = fieldClass.concat('settings-select-box--grey');
  }
  const labelClass =
    fieldValue === mixedValue
      ? labelClassProp.concat(' settings-select-box-label--grey')
      : labelClassProp;
  return (
    <span className="settings-select-box-wrapper">
      {label &&
        labelPosition === 'left' && (
          <span className={`settings-select-box-label--left ${labelClass}`}>{label}</span>
        )}
      <select
        className={fieldClass}
        disabled={disabled}
        id={id}
        name={fieldName}
        onChange={onChange}
        value={fieldValue}
      >
        {fieldValue === mixedValue && <option disabled key={mixedValue} value={mixedValue} />}
        {children}
      </select>
      {label &&
        labelPosition === 'right' && (
          <span className={`settings-select-box-label--right ${labelClass}`}>{label}</span>
        )}
    </span>
  );
}

SettingsSelectBox.defaultProps = {
  children: [],
  disabled: false,
  id: '',
  mixedValue: '2',
  fieldClass: '',
  fieldName: 'settingsSelectBox',
  labelClass: '',
  labelPosition: 'left',
};

SettingsSelectBox.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  fieldClass: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  fieldValue: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  labelPosition: PropTypes.string,
  mixedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default SettingsSelectBox;
