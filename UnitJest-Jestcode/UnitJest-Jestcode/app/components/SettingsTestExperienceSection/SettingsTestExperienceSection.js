/**
 *
 * SettingsTestExperienceSection
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import './SettingsTestExperienceSection.scss';

class SettingsTestExperienceSection extends React.Component {
  fromApiToCheckboxValue = apiValue => (apiValue ? apiValue[0] : '0');

  generateCheckbox = (label, apiProperty) => {
    const checkboxValue = this.fromApiToCheckboxValue(this.props.settingsOnScreen[apiProperty]);
    const result = (
      <div className="test-experience__checkbox" key={apiProperty}>
        <SettingsFourStateCheckbox
          checkboxName={apiProperty}
          checkboxText={label}
          currentCheckboxValue={checkboxValue}
          handleChangeCheckboxValue={this.props.handleChange}
          statusMap={this.props.checkBoxStatusMap}
        />
      </div>
    );
    return result;
  };

  createUICheckboxes = () =>
    this.props.settingValues.map(item => this.generateCheckbox(item.label, item.apiProperty));

  render() {
    const { overrideClassName } = this.props;
    const classTestExperienceName = `test-experience-container ${overrideClassName}`;
    return (
      <div className={classTestExperienceName}>
        <span className="test-experience-title">Test Experience</span>
        {this.createUICheckboxes()}
      </div>
    );
  }
}

SettingsTestExperienceSection.defaultProps = {
  overrideClassName: '',
};

SettingsTestExperienceSection.propTypes = {
  handleChange: PropTypes.func.isRequired,
  checkBoxStatusMap: PropTypes.object.isRequired,
  overrideClassName: PropTypes.string,
  settingsOnScreen: PropTypes.object.isRequired,
  settingValues: PropTypes.array.isRequired,
};

export default SettingsTestExperienceSection;
