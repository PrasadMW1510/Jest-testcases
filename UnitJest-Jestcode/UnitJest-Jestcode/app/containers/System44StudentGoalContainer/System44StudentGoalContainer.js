/**
 *
 * System44StudentGoalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { fromJS } from 'immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { hideModal } from 'containers/ModalController/actions';
import System44StudentGoal from 'components/System44StudentGoal';
import makeSelectSystem44StudentGoalContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getCombinedStudentGoalsRequest,
  getAllStudentGoalsRequest,
  setStudentAcademicGoals,
  setStudentBehaviourGoals,
  updateStudentBehaviourGoals,
  clearResponseStatus,
  getStudentSubmissionsRequest,
  clearState,
} from './actions';

export class System44StudentGoalContainer extends React.Component {
  componentDidMount() {
    if (this.props.data.location.pathname === '/portfolio/studentWorks') {
      this.props.getStudentSubmissionsRequest(this.props.data);
    } else if (this.props.data.location.pathname === '/portfolio/studentGoals') {
      this.props.getCombinedStudentGoalsRequest(this.props.data.studentId);
    }
    this.props.getAllStudentGoalsRequest();
  }

  getCombinedData = () => {
    let combinedGoalsData;
    if (this.props.data.location.pathname === '/portfolio/studentWorks') {
      combinedGoalsData = this.props.system44studentgoalcontainer.studentWorkData;
    } else {
      combinedGoalsData = this.props.system44studentgoalcontainer.getCombinedStudentGoalsData;
    }
    return combinedGoalsData;
  };

  handlePagination = identifier => {
    this.props.clearResponseStatus();
    if (this.props.data.location.pathname === '/portfolio/studentWorks') {
      this.props.getStudentSubmissionsRequest({ ...this.props.data, selectedIndex: identifier });
    } else if (this.props.data.location.pathname === '/portfolio/studentGoals') {
      this.props.getCombinedStudentGoalsRequest(identifier);
    }
  };

  handleCloseModal = () => {
    this.props.clearState();
    this.props.handleCancel();
  };

  handlePreview = opts => {
    this.props.system44StudentGoalRequest(opts);
  };

  render() {
    return (
      <System44StudentGoal
        isOpen
        closeStudentGoalModal={() => this.handleCloseModal()}
        onPreview={() => this.handlePreview()}
        handleSaveGoals={this.props.handleSaveGoals}
        handleSaveBehaviourGoals={this.props.handleSaveBehaviourGoals}
        handleUpdateStudentBehaviourGoals={this.props.handleUpdateStudentBehaviourGoals}
        handlePagination={data => this.handlePagination(data)}
        combinedGoalsData={this.getCombinedData()}
        defaultGoalsData={this.props.system44studentgoalcontainer.getAllStudentGoalsData}
        {...this.props}
      />
    );
  }
}

System44StudentGoalContainer.defaultProps = {
  System44StudentGoalContainer: fromJS({}),
};

System44StudentGoalContainer.propTypes = {
  getCombinedStudentGoalsRequest: PropTypes.func.isRequired,
  getStudentSubmissionsRequest: PropTypes.func.isRequired,
  handleSaveGoals: PropTypes.func.isRequired,
  handleSaveBehaviourGoals: PropTypes.func.isRequired,
  getAllStudentGoalsRequest: PropTypes.func.isRequired,
  handleUpdateStudentBehaviourGoals: PropTypes.func.isRequired,
  clearResponseStatus: PropTypes.func.isRequired,
  data: PropTypes.object,
  handleCancel: PropTypes.func.isRequired,
  system44studentgoalcontainer: PropTypes.object,
  system44StudentGoalRequest: PropTypes.func,
  clearState: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  system44studentgoalcontainer: makeSelectSystem44StudentGoalContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getCombinedStudentGoalsRequest: studentId =>
      dispatch(getCombinedStudentGoalsRequest(studentId)),
    handleCancel: () => dispatch(hideModal()),
    handleSaveGoals: (values, studentId) => dispatch(setStudentAcademicGoals(values, studentId)),
    handleSaveBehaviourGoals: (values, studentId, isUpdate) =>
      dispatch(setStudentBehaviourGoals(values, studentId, isUpdate)),
    getAllStudentGoalsRequest: () => dispatch(getAllStudentGoalsRequest()),
    handleUpdateStudentBehaviourGoals: (values, studentId, isUpdate, workItemId) =>
      dispatch(updateStudentBehaviourGoals(values, studentId, isUpdate, workItemId)),
    clearResponseStatus: () => dispatch(clearResponseStatus()),
    getStudentSubmissionsRequest: data => dispatch(getStudentSubmissionsRequest(data)),
    clearState: () => dispatch(clearState()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'system44StudentGoalContainer', reducer });
const withSaga = injectSaga({ key: 'system44StudentGoalContainer', saga });

export default compose(withReducer, withSaga, withConnect)(System44StudentGoalContainer);
