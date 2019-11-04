/**
 *
 * R180NGTopicContainer
 *
 */

import React from 'react';
import { fromJS } from 'immutable';
import LoadingBar from 'components/LoadingBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeProgramSetting } from 'containers/R180NGSettingContainer/selectors';
import { COHORT_TYPE } from 'containers/App/constants';

import {
  makeSelectSmartBarContainer,
  selectSmartBarContainerDomain,
  makeSelectEffectiveCohortObject,
} from 'containers/SmartBarContainer/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import TopicManagerStudentViewTab from 'components/R180NGSetting/TopicManagerStudentViewTab';
import TopicManagerTab from 'components/R180NGSetting/TopicManagerTab';
import {
  showR180NGTopicsSkipModal,
  showR180NGSkipSegmentModal,
  showR180NGTopicsStageModal,
} from 'containers/ModalController/actions';

import { R180NG_ENROLLMENT_PROGRAMS } from 'containers/R180NGSettingContainer/constants';
import {
  R180NGTopicsInstalledStagesRequest,
  R180NGTopicsRequest,
  R180NGTopicsSaveRequest,
  updateR180NGTopicsSelectedStageRequestSuccess,
} from 'containers/R180NGTopicContainer/actions';
import SettingsMessage from 'components/SettingsMessage';
import { R180NGProgramSettingsRequest } from 'containers/R180NGSettingContainer/actions';
import { TOPIC_MANAGER_STUDENT_LEVEL_NOT_SET } from 'components/R180NGSetting/constants';
import { makeSelectR180NGTopicContainer, selectR180NGTopicContainerDomain } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class R180NGTopicContainer extends React.Component {
  componentDidMount() {
    this.props.R180NGTopicsRequest();
    this.props.R180NGTopicsInstalledStagesRequest();
    this.props.R180NGProgramSettingsRequest();
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.r180ngTopics.get('r180ngTopics') !== nextProps.r180ngTopics.get('r180ngTopics') ||
      this.props.programEnrollmentCount !== nextProps.programEnrollmentCount
    );
  }

  getCohortType() {
    return this.props.smartBarSelections.getIn(['selectedCohType']);
  }

  getEnrollmentCount() {
    const enrolledProducts =
      this.props.programEnrollmentCount && this.props.programEnrollmentCount.toJS();
    const enrolledProduct = enrolledProducts && enrolledProducts.programEnrollmentSetting;
    const programEnrolledCount = enrolledProduct.filter(item =>
      Object.keys(item).find(
        k =>
          item[k] !== null &&
          (item.name.includes(R180NG_ENROLLMENT_PROGRAMS[0]) ||
            item.name.toString().includes(R180NG_ENROLLMENT_PROGRAMS[1]) ||
            item.name.toString().includes(R180NG_ENROLLMENT_PROGRAMS[2])) &&
          item.students.find(t => t.total > '0')
      )
    );
    const stages = [];
    programEnrolledCount.map(data =>
      stages.push({ name: [data.name], stage_id: [data['application.id']] })
    );
    return stages;
  }

  getTopicInstalledStages() {
    const cohortType = this.getCohortType();

    if (cohortType === 'School' || cohortType === '') {
      return (
        this.props.r180ngTopics && this.props.r180ngTopics.get('r180ngTopicsInstalledStages').toJS()
      );
    }
    return this.getEnrollmentCount();
  }
  getStudentId() {
    return this.props.smartBarSelections.getIn(['selectedStudentId']);
  }

  getCohortId() {
    return this.props.effectCohortObject && this.props.effectCohortObject.id;
  }
  getStudentLevel() {
    return this.props.r180ngSettings && this.props.r180ngSettings.get('programSetting');
  }

  getSelectedTopicManager() {
    const cohortType = this.getCohortType();
    const isLoading = this.props.r180ngTopics.get('loading');
    if (isLoading || this.props.r180ngTopics.size === 0) {
      return <LoadingBar />;
    }
    switch (cohortType) {
      case COHORT_TYPE.Student: {
        const obj = this.props.r180ngTopics.get('r180ngTopics').toJS();
        if (typeof obj.student_level === 'undefined')
          return <SettingsMessage message1={TOPIC_MANAGER_STUDENT_LEVEL_NOT_SET} />;
        return (
          <TopicManagerStudentViewTab
            key={this.getStudentId()}
            r180ngTopics={this.props.r180ngTopics && this.props.r180ngTopics.get('r180ngTopics')}
            studentLevel={this.getStudentLevel()}
            isolateTab={this.props.isolateTab}
            handleTabsReset={this.props.handleTabsReset}
            handleToggle={this.props.handleToggle}
            showR180NGTopicsSkipModal={this.handleSetTopicsSkipClick}
            showR180NGSegmentSkipModal={this.handleSegmentSkipClick}
            r180ngSaveTopics={this.handleSaveClick}
          />
        );
      }
      default: {
        return (
          <TopicManagerTab
            key={this.getCohortId()}
            r180ngTopicsInstalledStages={this.getTopicInstalledStages()}
            cohortType={this.getCohortType()}
            r180ngTopics={this.props.r180ngTopics && this.props.r180ngTopics.get('r180ngTopics')}
            isolateTab={this.props.isolateTab}
            handleTabsReset={this.props.handleTabsReset}
            handleToggle={this.props.handleToggle}
            showR180NGTopicsStageModal={this.handleSetTopicsStageClick}
            r180ngSaveTopics={this.handleSaveClick}
            activeStage={
              this.props.r180ngTopics && this.props.r180ngTopics.get('r180ngActiveSelectedStage')
            }
          />
        );
      }
    }
  }
  handleSaveClick = r180ngTopics => {
    this.props.R180NGTopicsSaveRequest(r180ngTopics);
  };

  handleSetTopicsStageClick = e => {
    this.props.showR180NGTopicsStageModal(e);
  };

  handleSetTopicsSkipClick = e => {
    this.props.showR180NGTopicsSkipModal(e);
  };

  handleSegmentSkipClick = e => {
    this.props.showR180NGSkipSegmentModal(e);
  };

  render() {
    return <div>{this.getSelectedTopicManager()}</div>;
  }
}

R180NGTopicContainer.defaultProps = {
  r180ngTopics: fromJS({
    loading: false,
    r180ngTopics: [],
    r180ngActiveSelectedStage: '',
  }),
};

R180NGTopicContainer.propTypes = {
  smartBarSelections: PropTypes.any,
  showR180NGTopicsStageModal: PropTypes.func.isRequired,
  handleTabsReset: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  isolateTab: PropTypes.bool.isRequired,
  R180NGTopicsRequest: PropTypes.func.isRequired,
  R180NGTopicsInstalledStagesRequest: PropTypes.any,
  r180ngTopics: PropTypes.any.isRequired,
  programEnrollmentCount: PropTypes.any,
  R180NGTopicsSaveRequest: PropTypes.any,
  r180ngSettings: PropTypes.any,
  R180NGProgramSettingsRequest: PropTypes.any,
  showR180NGTopicsSkipModal: PropTypes.func.isRequired,
  showR180NGSkipSegmentModal: PropTypes.func.isRequired,
  effectCohortObject: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  r180ngTopics: makeSelectR180NGTopicContainer(),
  smartBarSelections: makeSelectSmartBarContainer(),
  effectCohortObject: makeSelectEffectiveCohortObject(),
  programEnrollmentCount: makeProgramSetting(),
  r180ngSettings: makeProgramSetting(),
});

const withConnect = connect(mapStateToProps, {
  selectSmartBarContainerDomain,
  selectR180NGTopicContainerDomain,
  R180NGTopicsRequest,
  R180NGTopicsInstalledStagesRequest,
  showR180NGTopicsStageModal,
  showR180NGTopicsSkipModal,
  showR180NGSkipSegmentModal,
  updateR180NGTopicsSelectedStageRequestSuccess,
  R180NGTopicsSaveRequest,
  R180NGProgramSettingsRequest,
});

const withReducer = injectReducer({ key: 'r180NGTopicsData', reducer });
const withSaga = injectSaga({ key: 'r180NGTopicsData', saga });

export default compose(withReducer, withSaga, withConnect)(R180NGTopicContainer);
