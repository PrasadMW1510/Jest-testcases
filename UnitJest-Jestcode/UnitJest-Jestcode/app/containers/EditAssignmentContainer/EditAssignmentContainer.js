/**
 *
 * EditAssignmentContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import EditAssignmentComponent from 'components/EditAssignmentComponent';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEditAssignmentContainer from './selectors';

import {
  getAssignmentData,
  getStudentDetails,
  saveAssignmentRequest,
  deleteAssignmentRequest,
  clearState,
  clearResponseStatus,
} from './actions';
import reducer from './reducer';
import saga from './saga';

export class EditAssignmentContainer extends React.Component {
  componentDidMount() {
    this.props.getAssignmentData(this.props.data);
    this.props.getStudentDetails(this.props.data.classId.classId);
  }

  handleCloseModal() {
    this.props.clearState();
    this.props.handleCancel();
  }

  render() {
    const { hideModal: hideModalProp } = this.props;
    return (
      <EditAssignmentComponent
        isOpen
        hideCancel={hideModalProp}
        closeStudentGoalModal={() => this.handleCloseModal()}
        data={this.props.editassignmentcontainer.respAssignmentData}
        {...this.props}
      />
    );
  }
}

EditAssignmentContainer.propTypes = {
  getAssignmentData: PropTypes.func.isRequired,
  data: PropTypes.object,
  editassignmentcontainer: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  getStudentDetails: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editassignmentcontainer: makeSelectEditAssignmentContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getAssignmentData: data => dispatch(getAssignmentData(data)),
    hideModal: () => dispatch(hideModal()),
    handleCancel: () => dispatch(hideModal()),
    getStudentDetails: data => dispatch(getStudentDetails(data)),
    saveAssignmentRequest: data => dispatch(saveAssignmentRequest(data)),
    deleteAssignmentRequest: data => dispatch(deleteAssignmentRequest(data)),
    clearState: () => dispatch(clearState()),
    clearResponseStatus: () => dispatch(clearResponseStatus()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editAssignmentContainer', reducer });
const withSaga = injectSaga({ key: 'editAssignmentContainer', saga });

export default compose(withReducer, withSaga, withConnect)(EditAssignmentContainer);
