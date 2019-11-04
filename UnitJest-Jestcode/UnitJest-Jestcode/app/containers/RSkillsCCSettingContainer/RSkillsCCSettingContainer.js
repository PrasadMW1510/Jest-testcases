/**
 *
 * RSkillsCCSettingContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import RSkillsCCSetting from 'components/RSkillsCCSetting';
import { PROGRAM_LIST } from 'containers/App/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  rSkillsCCDefaultSettingsRequest,
  rSkillsCCSettingsSaveRequest,
  rSkillsCCSettingsTestAssignmentRequest,
  rSkillsCCTestAssignmentSaveRequest,
} from './actions';
import {
  makeDefaultProgramSetting,
  makeProgramSetting,
  makeSelectTestAssignmentStages,
  makeSelectRSkillsCCSettingDefaultProgramSettingsLoading,
  makeSelectRSkillsCCSettingContainerLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class RSkillsCCSettingContainer extends React.Component {
  componentDidMount() {
    this.props.rSkillsCCSettingsTestAssignmentRequest();
  }

  handleRSkillsCCGetDefaultSettings = () => {
    this.props.rSkillsCCDefaultSettingsRequest();
  };

  handleTestAssignmentSave = testAssignmentData => {
    this.props.rSkillsCCTestAssignmentSaveRequest(testAssignmentData);
  };

  handleSettingsSave = settingsData => {
    this.props.rSkillsCCSettingsSaveRequest(settingsData);
  };

  render() {
    const {
      effectiveCohortObject,
      enrollmentCount,
      testAssignmentStages,
      immDefaultProgramSettingData,
      immProgramSettingData,
      rSkillsCCSettingDefaultProgramSettingsLoading,
      rSkillsSettingContainerLoading,
    } = this.props;
    return (
      <RSkillsCCSetting
        effectiveCohortObject={effectiveCohortObject}
        enrollmentCount={enrollmentCount}
        handleRSkillsCCGetDefaultSettings={this.handleRSkillsCCGetDefaultSettings}
        handleRSkillsCCSettingsSave={this.handleSettingsSave}
        handleRSkillsCCTestAssignmentSave={this.handleTestAssignmentSave}
        programMeta={PROGRAM_LIST.RTNG}
        immDefaultProgramSettings={immDefaultProgramSettingData}
        immProgramSettings={immProgramSettingData}
        testAssignmentStages={testAssignmentStages.toJS()}
        isDefaultProgramSettingsLoading={rSkillsCCSettingDefaultProgramSettingsLoading}
        isLoading={rSkillsSettingContainerLoading}
      />
    );
  }
}

RSkillsCCSettingContainer.defaultProps = {
  enrollmentCount: 0,
};

RSkillsCCSettingContainer.propTypes = {
  enrollmentCount: PropTypes.number,
  effectiveCohortObject: PropTypes.object,
  immDefaultProgramSettingData: PropTypes.object.isRequired,
  immProgramSettingData: PropTypes.object.isRequired,
  rSkillsCCDefaultSettingsRequest: PropTypes.func.isRequired,
  rSkillsCCSettingsSaveRequest: PropTypes.func.isRequired,
  rSkillsCCSettingsTestAssignmentRequest: PropTypes.func.isRequired,
  rSkillsCCTestAssignmentSaveRequest: PropTypes.func.isRequired,
  testAssignmentStages: PropTypes.object.isRequired,
  rSkillsCCSettingDefaultProgramSettingsLoading: PropTypes.bool,
  rSkillsSettingContainerLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  effectiveCohortObject: makeSelectEffectiveCohortObject(),
  immDefaultProgramSettingData: makeDefaultProgramSetting(),
  immProgramSettingData: makeProgramSetting(),
  testAssignmentStages: makeSelectTestAssignmentStages(),
  rSkillsSettingContainerLoading: makeSelectRSkillsCCSettingContainerLoading(),
  rSkillsCCSettingDefaultProgramSettingsLoading: makeSelectRSkillsCCSettingDefaultProgramSettingsLoading(),
});

const withConnect = connect(mapStateToProps, {
  rSkillsCCDefaultSettingsRequest,
  rSkillsCCSettingsSaveRequest,
  rSkillsCCSettingsTestAssignmentRequest,
  rSkillsCCTestAssignmentSaveRequest,
});

const withReducer = injectReducer({ key: 'rSkillsCCSettingContainer', reducer });
const withSaga = injectSaga({ key: 'rSkillsCCSettingContainer', saga });

export default compose(withReducer, withSaga, withConnect)(RSkillsCCSettingContainer);
