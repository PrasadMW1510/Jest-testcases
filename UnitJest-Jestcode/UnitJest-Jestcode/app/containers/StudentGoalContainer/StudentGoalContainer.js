/**
 *
 * StudentGoalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PortfolioTreeMenu from 'components/PortfolioTreeMenu';
import StudentGoals from 'components/StudentGoals';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { showSystem44StudentGoalsModal } from 'containers/ModalController/actions';
import makeSelectStudentGoalContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getSGClassesDataRequest,
  getClassStudentGoalRequest,
  setSGClassRequestSuccess,
} from './actions';

export class StudentGoalContainer extends React.PureComponent {
  componentDidMount() {
    this.props.setSGClassRequestSuccess(this.props.treeList);
  }

  render() {
    return (
      <div className="student-work-page">
        <div className="student-work-leftpanel-container">
          <div>Select Class to Access Student Goals</div>
          <div className="student-work-header-block student-goal-lefttree">
            <PortfolioTreeMenu
              {...this.props}
              schoolData={this.props.studentGoalContainer.sGClassData}
            />
          </div>
        </div>
        <div className="student-work-rightpanel-container">
          <div>Select student to adjust academic goals or assess behavioral goals.</div>
          <StudentGoals
            {...this.props}
            data={this.props.studentGoalContainer.selectedSGClassGoals}
          />
        </div>
      </div>
    );
  }
}

StudentGoalContainer.propTypes = {
  setSGClassRequestSuccess: PropTypes.func.isRequired,
  treeList: PropTypes.array,
  studentGoalContainer: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  studentGoalContainer: makeSelectStudentGoalContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSGClassesDataRequest: () => dispatch(getSGClassesDataRequest()),
    getClassStudentGoalRequest: value => dispatch(getClassStudentGoalRequest(value)),
    showSystem44StudentGoalsModal: data => dispatch(showSystem44StudentGoalsModal(data)),
    setSGClassRequestSuccess: value => dispatch(setSGClassRequestSuccess(value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'studentGoalContainer', reducer });
const withSaga = injectSaga({ key: 'studentGoalContainer', saga });

export default compose(withRouter, withReducer, withSaga, withConnect)(StudentGoalContainer);
