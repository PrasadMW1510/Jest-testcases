/**
 *
 * PortfolioPageContainer
 *
 */

import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PortfolioTabBar from 'components/PortfolioTabBar';
import StudentWorksContainer from 'containers/StudentWorksContainer';
import AssignmentContainer from 'containers/AssignmentContainer';
import StudentGoalContainer from 'containers/StudentGoalContainer';
import InboxContainer from 'containers/InboxContainer';
import {
  makeSelectProfileData,
  makeSelectProfileUserType,
  makeSelectLoginUserOrg,
} from 'containers/App/selectors';
import { USER_TYPE } from 'containers/App/constants';
import { showInboxProgram } from 'containers/ModalController/actions';

import reducer from './reducer';
import saga from './saga';
import makeSelectPortfolioPageContainer from './selectors';
import {
  getClassDetailsRequest,
  getPortfolioClassDetailsRequest,
  getStudentsSubmissionMetadata,
  getStudentSubmissions,
  getInboxClassByCommunityId,
  getAssignmentMetaData,
  getRubricDefenitions,
} from './actions';

export class PortfolioPageContainer extends React.Component {
  componentWillMount() {
    this.props.getStudentSubmissions();
    if (this.props.profileUserType === USER_TYPE.Teacher) {
      this.props.getClassDetailsRequest();
      this.props.getInboxClassByCommunityId();
      this.props.getStudentsSubmissionMetadata();
      this.props.getAssignmentMetaData();
      this.props.getRubricDefenitions();
    }
  }
  showAssignment = () => {
    if (
      this.props.portfoliopagecontainer.programListforTabs.indexOf('S44NG') === -1 &&
      this.props.portfoliopagecontainer.programListforTabs.indexOf('r180u_B') === -1 &&
      this.props.portfoliopagecontainer.programListforTabs.indexOf('r180ng_A') === -1 &&
      this.props.portfoliopagecontainer.programListforTabs.indexOf('r180ng_B') === -1 &&
      this.props.portfoliopagecontainer.programListforTabs.indexOf('r180ng_C') === -1 &&
      this.props.portfoliopagecontainer.programListforTabs.indexOf('S44JR') === -1
    ) {
      return false;
    }
    return true;
  };
  render() {
    const { path } = this.props.match;
    const { profileUserType } = this.props;
    const inBoxcount = {
      submissionCount: this.props.portfoliopagecontainer.submissionsCount,
      unReadCount: this.props.portfoliopagecontainer.unReadPrograms,
      newCount: this.props.portfoliopagecontainer.newThisWeekCount,
    };
    const assignmentCount = {
      submissionCount: this.props.portfoliopagecontainer.asssubmissionsCount,
      unReadCount: this.props.portfoliopagecontainer.assunReadPrograms,
      newCount: this.props.portfoliopagecontainer.assnewThisWeekCount,
    };
    return (
      <div className="portfolio-content-panel">
        <PortfolioTabBar
          usertype={profileUserType}
          programList={this.props.portfoliopagecontainer.programListforTabs}
        />
        <div className="portfolio-tab-panel">
          <div className="portfolio-left-panel" />
          <div className="portfolio-right-panel">
            {
              <Switch>
                {}
                <Route
                  path={`${path}/inbox`}
                  render={() => (
                    <InboxContainer
                      assignmentCount={assignmentCount}
                      inBoxcount={inBoxcount}
                      treeList={this.props.portfoliopagecontainer.classData}
                      showAssignment={this.showAssignment()}
                      gridData={this.props.portfoliopagecontainer.selectedClassAssignments}
                      baseData={this.props.portfoliopagecontainer.baseAssignmentData}
                    />
                  )}
                />
                <Route
                  path={`${path}/studentGoals`}
                  render={() => (
                    <StudentGoalContainer treeList={this.props.portfoliopagecontainer.classData} />
                  )}
                />
                <Route
                  path={`${path}/assignments`}
                  render={() => (
                    <AssignmentContainer
                      treeList={this.props.portfoliopagecontainer.classData}
                      gridData={this.props.portfoliopagecontainer.baseAssignmentData}
                      programList={this.props.portfoliopagecontainer.programList}
                    />
                  )}
                />
                <Route
                  path={`${path}/studentWorks`}
                  render={() => <StudentWorksContainer {...this.props} />}
                />
                {profileUserType === USER_TYPE.Teacher && <Redirect to={`${path}/inbox`} />}
                {profileUserType !== USER_TYPE.Teacher && <Redirect to={`${path}/studentWorks`} />}
              </Switch>
            }
          </div>
        </div>
      </div>
    );
  }
}

PortfolioPageContainer.propTypes = {
  profileUserType: PropTypes.string,
  match: PropTypes.object,
  getClassDetailsRequest: PropTypes.func,
  getInboxClassByCommunityId: PropTypes.func.isRequired,
  getStudentsSubmissionMetadata: PropTypes.func.isRequired,
  getAssignmentMetaData: PropTypes.func.isRequired,
  portfoliopagecontainer: PropTypes.object,
  getStudentSubmissions: PropTypes.func.isRequired,
  getRubricDefenitions: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  portfoliopagecontainer: makeSelectPortfolioPageContainer(),
  profile: makeSelectProfileData(),
  profileUserType: makeSelectProfileUserType(),
  profileOrgType: makeSelectLoginUserOrg(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getClassDetailsRequest: () => dispatch(getClassDetailsRequest()),
    getPortfolioClassDetailsRequest: value => dispatch(getPortfolioClassDetailsRequest(value)),
    getStudentsSubmissionMetadata: value => dispatch(getStudentsSubmissionMetadata(value)),
    showInboxProgram: () => dispatch(showInboxProgram()),
    getInboxClassByCommunityId: () => dispatch(getInboxClassByCommunityId()),
    getAssignmentMetaData: () => dispatch(getAssignmentMetaData()),
    getStudentSubmissions: () => dispatch(getStudentSubmissions()),
    getRubricDefenitions: () => dispatch(getRubricDefenitions()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'portfolioPageContainer', reducer });
const withSaga = injectSaga({ key: 'portfolioPageContainer', saga });

export default compose(withReducer, withSaga, withConnect)(PortfolioPageContainer);
