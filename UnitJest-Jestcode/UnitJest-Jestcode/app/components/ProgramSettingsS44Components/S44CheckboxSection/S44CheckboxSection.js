/**
 *
 * S44CheckboxSection
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';

import '../ProgramSettingsS44Components.scss';

function S44CheckboxSection({
  sectionTitle,
  checkboxText,
  checkboxValue,
  handleChangeCheckboxValue,
  isHalfHeight,
  isHalfWidth,
}) {
  const getHeightClassName = () =>
    isHalfHeight ? 's44ng-settings__section--half-height' : 's44ng-settings__section--full-height';

  const getWidthClassName = () =>
    isHalfWidth ? 's44ng-settings__section--half-width' : 's44ng-settings__section--full-width';

  return (
    <div className={`s44ng-settings__section ${getHeightClassName()} ${getWidthClassName()}`}>
      <div className="s44ng-settings__section-title">{sectionTitle}</div>
      <div className="s44ng-settings__section-content">
        <SettingsFourStateCheckbox
          checkboxText={checkboxText}
          currentCheckboxValue={checkboxValue}
          handleChangeCheckboxValue={handleChangeCheckboxValue}
        />
      </div>
    </div>
  );
}

S44CheckboxSection.defaultProps = {
  isHalfHeight: true,
  isHalfWidth: true,
};

S44CheckboxSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  checkboxText: PropTypes.string.isRequired,
  checkboxValue: PropTypes.string.isRequired,
  handleChangeCheckboxValue: PropTypes.func.isRequired,
  isHalfHeight: PropTypes.bool,
  isHalfWidth: PropTypes.bool,
};

export default S44CheckboxSection;
