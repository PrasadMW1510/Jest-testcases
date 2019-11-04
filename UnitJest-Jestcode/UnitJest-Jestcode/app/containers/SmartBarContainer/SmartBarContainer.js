/**
 *
 * SmartBarContainer
 *
 */

import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SmartBar from 'components/SmartBar';
import { makeSelectLoginUserOrg } from 'containers/App/selectors';
import { updateUserData } from 'containers/App/actions';
import { usageSummaryRequest } from 'containers/UsageSummaryContainer/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { resetSelections, resetConstantId } from './actions';

export const SmartBarContainer = props => {
  const handleTitleClick = () => {
    props.resetSelections();
    props.resetConstantId();
    props.updateUserData();
    if (props.location.pathname === '/roster/manageStudentEnrollment') {
      props.history.push('/roster/manageStudentEnrollment');
    } else if (props.location.pathname === '/roster/manageTeacherAccess') {
      props.history.push('/roster/manageTeacherAccess');
    } else if (props.location.pathname === '/roster/programSettings') {
      props.history.push('/roster/programSettings');
    } else {
      props.updateUserData();
      props.usageSummaryRequest();
      props.history.push('/roster');
    }
  };

  return <SmartBar onTitleClick={handleTitleClick} userOrgType={props.loginUserOrg} />;
};

SmartBarContainer.propTypes = {
  resetSelections: PropTypes.func.isRequired,
  usageSummaryRequest: PropTypes.func.isRequired,
  resetConstantId: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loginUserOrg: PropTypes.string,
  location: PropTypes.object,
};

const withReducer = injectReducer({ key: 'smartBar', reducer });
const withSaga = injectSaga({ key: 'smartBar', saga });

const mapStateToProps = createStructuredSelector({
  loginUserOrg: makeSelectLoginUserOrg(),
});

const withConnect = connect(mapStateToProps, {
  resetSelections,
  resetConstantId,
  updateUserData,
  usageSummaryRequest,
});

export default compose(withRouter, withReducer, withSaga, withConnect)(SmartBarContainer);
