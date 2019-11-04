/**
 *
 * R180EESettingContainer
 *
 */

import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import R180EESettings from 'components/R180EESettings';
import { showModal } from 'containers/ModalController/actions';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  r180EESetSelectedStage,
  r180EESettingsContainerRequest,
  r180EESettingsSave,
  r180EETopicSave,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectR180EESettingContainer } from './selectors';

export class R180EESettingContainer extends React.Component {
  componentDidMount() {
    this.props.r180EESettingsContainerRequest();
  }

  setStage = selectedStage => {
    this.props.r180EESetSelectedStage(selectedStage);
  };

  handleSave = updatedSettings => {
    this.props.r180EESettingsSave(updatedSettings);
  };

  handleTopicSave = updatedTopics => {
    this.props.r180EETopicSave(updatedTopics);
  };

  render() {
    return (
      <R180EESettings
        cohortObj={this.props.cohortObj}
        enrollmentCount={this.props.enrollmentCount}
        enrollmentDetails={this.props.enrollmentDetails}
        handleSave={this.handleSave}
        handleTopicSave={this.handleTopicSave}
        isLoading={this.props.r180EESettingData.get('loading')}
        r180EESettingsContainerRequest={this.props.r180EESettingsContainerRequest}
        setStage={this.setStage}
        settings={this.props.r180EESettingData.get('settings')}
        showModal={this.props.showModal}
        topicManager={this.props.r180EESettingData.get('topicManager')}
      />
    );
  }
}

R180EESettingContainer.defaultProps = {
  enrollmentCount: 0,
  r180EESettingData: fromJS({
    loading: false,
    settings: {},
    topicManager: {},
  }),
};

R180EESettingContainer.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentDetails: PropTypes.array.isRequired,
  r180EESetSelectedStage: PropTypes.func.isRequired,
  r180EESettingsContainerRequest: PropTypes.func.isRequired,
  r180EESettingsSave: PropTypes.func.isRequired,
  r180EETopicSave: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  enrollmentCount: PropTypes.number,
  r180EESettingData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cohortObj: makeSelectEffectiveCohortObject(),
  r180EESettingData: makeSelectR180EESettingContainer(),
});

const withConnect = connect(mapStateToProps, {
  r180EESetSelectedStage,
  r180EESettingsContainerRequest,
  r180EESettingsSave,
  r180EETopicSave,
  showModal,
});

const withReducer = injectReducer({ key: 'r180EESettingContainer', reducer });
const withSaga = injectSaga({ key: 'r180EESettingContainer', saga });

export default compose(withReducer, withSaga, withConnect)(R180EESettingContainer);
