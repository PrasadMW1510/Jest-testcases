/**
 *
 * SRCGradingToolsContainer
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import SRCGradingTool from 'components/SRCGradingTool';
import makeSelectProfilePageData from 'containers/ProfilePageContainer/selectors';
import SettingsMessage from 'components/SettingsMessage';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import { COHORT_TYPE } from 'containers/App/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import {
  SRCGradingToolsRequest,
  SRCQuizzesForTeacherRequest,
  SRCClearSearchedQuizzes,
  SRCSaveRemovedQuizzesRequest,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectGradingToolsScoreData,
  makeSelectQuizSearchResults,
  makeSelectQuizSearchPaginationData,
  makeSelectQuizSearchItemCount,
  makeSelectIsLoading,
  makeSelectGradingToolsPointsData,
} from './selectors';
import * as Constants from './constants';

export class SRCGradingToolsContainer extends React.Component {
  componentDidMount() {
    this.props.SRCGradingToolsRequest();
  }

  componentDidUpdate = prevProps => {
    if (this.props.selectedCohort !== prevProps.selectedCohort) {
      this.props.SRCGradingToolsRequest();
    }
  };

  searchForQuizzesToAdd = (term, order, name, curPg) => {
    this.props.SRCQuizzesForTeacherRequest(term, order, name, curPg);
  };

  clearSearchedQuizzes = () => {
    this.props.SRCClearSearchedQuizzes();
  };

  saveRemovedQuizzesRequest = quizInfo => {
    this.props.SRCSaveRemovedQuizzesRequest(quizInfo);
  };

  renderInvalidCohortTab = () => <SettingsMessage message1={Constants.INVALID_COHORT_MESSAGE} />;

  render() {
    const {
      enrollmentCount,
      profilePage,
      gradingToolScoreData,
      gradingToolsPointsData,
      quizSearchData,
      paginationData,
      itemCount,
      isLoading,
      selectedCohort,
    } = this.props;
    if (selectedCohort.cohortType !== COHORT_TYPE.Student) {
      const tabs = [
        {
          renderFunction: this.renderInvalidCohortTab,
          ...Constants.TAB_SETTINGS,
        },
      ];
      return (
        <div className="src-grading-tools-invalid-cohort">
          <ProgramSettingsNavBar tabs={tabs} />
        </div>
      );
    }
    return (
      <div className="src-grading-tools__container">
        <SRCGradingTool
          enrollmentCount={enrollmentCount}
          profileInfo={profilePage.toJS().profileDetails}
          scoreData={gradingToolScoreData}
          pointsData={gradingToolsPointsData}
          quizSearchData={quizSearchData}
          paginationData={paginationData}
          itemCount={itemCount}
          searchForQuizzesToAdd={this.searchForQuizzesToAdd}
          clearSearchedQuizzes={this.clearSearchedQuizzes}
          saveRemovedQuizzesRequest={this.saveRemovedQuizzesRequest}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

SRCGradingToolsContainer.propTypes = {
  enrollmentCount: PropTypes.number,
  profilePage: PropTypes.object.isRequired,
  SRCGradingToolsRequest: PropTypes.func.isRequired,
  gradingToolScoreData: PropTypes.array,
  gradingToolsPointsData: PropTypes.object,
  quizSearchData: PropTypes.array,
  SRCQuizzesForTeacherRequest: PropTypes.func.isRequired,
  SRCClearSearchedQuizzes: PropTypes.func.isRequired,
  paginationData: PropTypes.object,
  itemCount: PropTypes.string,
  SRCSaveRemovedQuizzesRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectedCohort: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePageData(),
  gradingToolScoreData: makeSelectGradingToolsScoreData(),
  gradingToolsPointsData: makeSelectGradingToolsPointsData(),
  quizSearchData: makeSelectQuizSearchResults(),
  paginationData: makeSelectQuizSearchPaginationData(),
  itemCount: makeSelectQuizSearchItemCount(),
  isLoading: makeSelectIsLoading(),
  selectedCohort: makeSelectEffectiveCohortObject(),
});

const withConnect = connect(mapStateToProps, {
  SRCGradingToolsRequest,
  SRCQuizzesForTeacherRequest,
  SRCClearSearchedQuizzes,
  SRCSaveRemovedQuizzesRequest,
});

const withReducer = injectReducer({ key: 'srcGradingToolsData', reducer });
const withSaga = injectSaga({ key: 'srcGradingToolsData', saga });

export default compose(withRouter, withReducer, withSaga, withConnect)(SRCGradingToolsContainer);
