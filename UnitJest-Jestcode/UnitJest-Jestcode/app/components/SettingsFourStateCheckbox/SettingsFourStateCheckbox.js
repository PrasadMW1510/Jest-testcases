/**
 *
 * SettingsFourStateCheckbox
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import './SettingsFourStateCheckbox.scss';
import { CHECKBOX_STATE } from './constants';

class SettingsFourStateCheckbox extends React.Component {
  getCheckboxState = () => {
    const { currentCheckboxValue, statusMap } = this.props;
    let checkboxState = CHECKBOX_STATE.UncheckedEnabled;
    Object.entries(statusMap).forEach(statusMapEntry => {
      if (
        typeof currentCheckboxValue !== 'undefined' &&
        statusMapEntry[1].includes(currentCheckboxValue.toString())
      ) {
        checkboxState = statusMapEntry[0];
      }
    });
    return checkboxState;
  };

  getCheckboxValue = checkboxState => {
    switch (checkboxState) {
      case CHECKBOX_STATE.UncheckedDisabled:
      case CHECKBOX_STATE.UncheckedEnabled:
        return 0;
      default:
        return 1;
    }
  };

  isCheckboxDisabled = checkboxState =>
    this.props.disabled ||
    checkboxState === CHECKBOX_STATE.CheckedDisabled ||
    checkboxState === CHECKBOX_STATE.MixedDisabled ||
    checkboxState === CHECKBOX_STATE.UncheckedDisabled;

  render() {
    let textClass = `settings-four-state-checkbox__text ${this.props.textClass}`;
    let checkboxClass = this.props.checkboxClass;
    const checkboxState = this.getCheckboxState();
    if (
      checkboxState === CHECKBOX_STATE.MixedEnabled ||
      checkboxState === CHECKBOX_STATE.MixedDisabled
    ) {
      textClass = `settings-four-state-checkbox__text-grey ${this.props.textClass}`;
      checkboxClass = checkboxClass.concat(' settings-four-state-checkbox__checkbox-grey');
    }
    return (
      <span>
        <input
          name={this.props.checkboxName}
          onChange={this.props.handleChangeCheckboxValue}
          id={this.props.checkboxId}
          type="checkbox"
          checked={this.getCheckboxValue(checkboxState)}
          disabled={this.isCheckboxDisabled(checkboxState)}
          className={checkboxClass}
        />
        <span className={textClass}>{this.props.checkboxText}</span>
      </span>
    );
  }
}

SettingsFourStateCheckbox.defaultProps = {
  checkboxClass: '',
  checkboxName: 'settingsFourStateCheckbox',
  disabled: false,
  statusMap: {
    [CHECKBOX_STATE.UncheckedDisabled]: ['-1'],
    [CHECKBOX_STATE.UncheckedEnabled]: ['0'],
    [CHECKBOX_STATE.CheckedDisabled]: [],
    [CHECKBOX_STATE.CheckedEnabled]: ['1'],
    [CHECKBOX_STATE.MixedDisabled]: [],
    [CHECKBOX_STATE.MixedEnabled]: ['-2', '2'],
  },
  textClass: '',
};

SettingsFourStateCheckbox.propTypes = {
  handleChangeCheckboxValue: PropTypes.func,
  currentCheckboxValue: PropTypes.string,
  checkboxClass: PropTypes.string.isRequired,
  checkboxName: PropTypes.string.isRequired,
  checkboxText: PropTypes.string,
  checkboxId: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  statusMap: PropTypes.object.isRequired,
  textClass: PropTypes.string.isRequired,
};

export default SettingsFourStateCheckbox;
