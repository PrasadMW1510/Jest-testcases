/**
 *
 * PSSettingContainer
 *
 */

import React from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import PSSettings from 'components/PSSettings';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectPSSettingContainer } from './selectors';
import { psSettingsContainerRequest, psSettingsSave, psTestAssignmentRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export class PSSettingContainer extends React.Component {
  componentDidMount() {
    this.props.psSettingsContainerRequest();
  }
  // TODO hadle save
  handleSave = updatedSettings => {
    this.props.psSettingsSave(updatedSettings);
  };

  render() {
    return (
      <PSSettings
        cohortObj={this.props.cohortObj}
        enrollmentCount={this.props.enrollmentCount}
        handleSave={this.handleSave}
        isLoading={this.props.psSettingData.get('loading')}
        settings={this.props.psSettingData.get('settings')}
        psTestAssignmentRequest={this.props.psTestAssignmentRequest}
        testAssignmentData={this.props.psSettingData}
      />
    );
  }
}

PSSettingContainer.defaultProps = {
  psSettingData: fromJS({
    loading: false,
    settings: {},
    testassignment: {},
    dtmModulesObj: {},
    subProductObj: {},
    dtmTestsObj: {},
  }),
  enrollmentCount: 0,
};

PSSettingContainer.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  psSettingsContainerRequest: PropTypes.func.isRequired,
  psSettingsSave: PropTypes.func.isRequired,
  enrollmentCount: PropTypes.number,
  psTestAssignmentRequest: PropTypes.func,
  psSettingData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  psSettingData: makeSelectPSSettingContainer(),
  cohortObj: makeSelectEffectiveCohortObject(),
});
//
const withConnect = connect(mapStateToProps, {
  psSettingsContainerRequest,
  psSettingsSave,
  psTestAssignmentRequest,
});

const withReducer = injectReducer({ key: 'psSettingContainer', reducer });
const withSaga = injectSaga({ key: 'psSettingContainer', saga });

export default compose(withReducer, withSaga, withConnect)(PSSettingContainer);
