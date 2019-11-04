/**
 *
 * RCSettingContainer
 *
 */

import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import RCSettings from 'components/RCSetting';
import { showModal } from 'containers/ModalController/actions';
import { makeSelectProfileUserType } from 'containers/App/selectors';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import { makeSelectProgramDisplayName } from 'containers/RosterPage/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// TODO: Uncomment import when working on second tab
import {
  rcSettingsContainerRequest,
  rcSettingsSave,
  // rcTopicSave,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectRCSettingContainer } from './selectors';

export class RCSettingContainer extends React.Component {
  componentDidMount() {
    this.props.rcSettingsContainerRequest();
  }

  handleSave = (updatedSettings, shouldRedirect = false) => {
    this.props.rcSettingsSave(updatedSettings, shouldRedirect);
  };

  // TODO: Uncomment and edit this block when working on second tab
  /* handleTopicSave = updatedTopics => {
    this.props.rcTopicSave(updatedTopics);
  }; */

  render() {
    // TODO: Uncomment props for second tab, when working on it
    return (
      <RCSettings
        cohortObj={this.props.cohortObj}
        enrollmentCount={this.props.enrollmentCount}
        handleSave={this.handleSave}
        // handleTopicSave={this.handleTopicSave}
        immSettings={this.props.immRcSettingData.get('immSettings')}
        isLoading={this.props.immRcSettingData.get('loading')}
        loggedInUserType={this.props.loggedInUserType}
        programName={this.props.programName}
        showModal={this.props.showModal}
        // topicManager={this.props.rcSettingData.get('topicManager')}
      />
    );
  }
}

// TODO: Uncomment props for second tab, when working on it
RCSettingContainer.defaultProps = {
  enrollmentCount: 0,
  immRcSettingData: fromJS({
    loading: false,
    immSettings: {},
    // topicManager: {},
  }),
};

// TODO: Uncomment and rename accordingly, when working on second tab
RCSettingContainer.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number,
  immRcSettingData: PropTypes.object,
  loggedInUserType: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  rcSettingsContainerRequest: PropTypes.func.isRequired,
  rcSettingsSave: PropTypes.func.isRequired,
  // rcTopicSave: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cohortObj: makeSelectEffectiveCohortObject(),
  immRcSettingData: makeSelectRCSettingContainer(),
  loggedInUserType: makeSelectProfileUserType(),
  programName: makeSelectProgramDisplayName(),
});

// TODO: Uncomment and rename accordingly, when working on second tab
const withConnect = connect(mapStateToProps, {
  rcSettingsContainerRequest,
  rcSettingsSave,
  // rcTopicSave,
  showModal,
});

const withReducer = injectReducer({ key: 'rcSettingContainer', reducer });
const withSaga = injectSaga({ key: 'rcSettingContainer', saga });

export default compose(withReducer, withSaga, withConnect)(RCSettingContainer);
