/**
 *
 * XSkillSettingContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import XSkillSettings from 'components/XSkillsSettings/XSkillsSettings';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  xSkillsSettingsRequest,
  xSkillsSettingsSaveRequest,
  xSkillsTestAssignmentRequest,
  xSkillsTestAssignmentSaveRequest,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectXSkillsSettingContainer } from './selectors';

export class XSkillsSettingContainer extends React.Component {
  componentDidMount() {
    this.props.xSkillsTestAssignmentRequest();
    this.props.xSkillsSettingsRequest();
  }

  // calls the save request with both the POST data and the redirectToRoster flag
  handleTestAssignmentSave = (testNumber, redirectToRoster) => {
    const data = {
      redirectToRoster,
      postPayload: {
        output: {
          output_data: {
            cohort_type: this.props.cohortObj.cohortType.toLowerCase(),
            cohort_id: this.props.cohortObj.id,
            test_number: testNumber,
          },
        },
      },
    };
    this.props.xSkillsTestAssignmentSaveRequest(data);
  };

  handleSettingsSave = () => {
    // TODO  implement this during the save story
    // handleSettingsSave = settingsData => {
  };

  render() {
    return (
      <XSkillSettings
        cohortObj={this.props.cohortObj}
        enrollmentCount={this.props.enrollmentCount}
        handleSettingsSave={this.handleSettingsSave}
        handleTestAssignmentSave={this.handleTestAssignmentSave}
        highestEnrolledCourse={this.props.highestEnrolledCourse}
        isLoadingSettings={this.props.xSkillsSettingData.get('loadingSettings')}
        isLoadingTestAssignment={this.props.xSkillsSettingData.get('loadingTestAssignment')}
        settings={this.props.xSkillsSettingData.get('settings')}
        testsMeta={this.props.xSkillsSettingData.get('testsMeta')}
      />
    );
  }
}

XSkillsSettingContainer.defaultProps = {
  enrollmentCount: 0,
};

XSkillsSettingContainer.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number,
  highestEnrolledCourse: PropTypes.string.isRequired,
  xSkillsSettingsRequest: PropTypes.func.isRequired,
  xSkillsTestAssignmentRequest: PropTypes.func.isRequired,
  xSkillsTestAssignmentSaveRequest: PropTypes.func.isRequired,
  xSkillsSettingData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cohortObj: makeSelectEffectiveCohortObject(),
  xSkillsSettingData: makeSelectXSkillsSettingContainer(),
});

const withConnect = connect(mapStateToProps, {
  xSkillsSettingsRequest,
  xSkillsSettingsSaveRequest,
  xSkillsTestAssignmentRequest,
  xSkillsTestAssignmentSaveRequest,
});

const withReducer = injectReducer({ key: 'xSkillsSettingContainer', reducer });
const withSaga = injectSaga({ key: 'xSkillsSettingContainer', saga });

export default compose(withReducer, withSaga, withConnect)(XSkillsSettingContainer);
