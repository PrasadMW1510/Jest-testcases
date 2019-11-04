/**
 *
 * AddAssignmentContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { hideModal } from 'containers/ModalController/actions';
import AddAssignmentComponent from 'components/AddAssignmentComponent';
import { getStudentsSubmissionMetadata } from 'containers/PortfolioPageContainer/actions';
import { getStudentDetails, postSaveNewAssignment } from './actions';
import makeSelectAddAssignmentContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export class AddAssignmentContainer extends React.Component {
  componentDidMount() {
    this.props.getStudentDetails(this.props.data.newclassId);
  }

  addNewAssignment = assignmentData => {
    this.props.postSaveNewAssignment(assignmentData);
  };

  render() {
    const { hideModal: hideModalProp } = this.props;

    return (
      <AddAssignmentComponent
        isOpen
        hideCancel={hideModalProp}
        addNewAssignment={this.addNewAssignment}
        {...this.props}
      />
    );
  }
}

AddAssignmentContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  getStudentDetails: PropTypes.func.isRequired,
  postSaveNewAssignment: PropTypes.func.isRequired,
  data: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  addassignmentcontainer: makeSelectAddAssignmentContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal()),
    getStudentDetails: data => dispatch(getStudentDetails(data)),
    postSaveNewAssignment: data => dispatch(postSaveNewAssignment(data)),
    getStudentsSubmissionMetadata: value => dispatch(getStudentsSubmissionMetadata(value)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'addAssignmentContainer', reducer });
const withSaga = injectSaga({ key: 'addAssignmentContainer', saga });

export default compose(withReducer, withSaga, withConnect)(AddAssignmentContainer);
