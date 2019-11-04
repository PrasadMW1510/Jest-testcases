/**
 *
 * System44SuccessRecordContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectProfileUserType } from 'containers/App/selectors';
import System44SuccessRecord from 'components/System44SuccessRecord';
import * as Constants from 'components/InBox/constants';

import {
  showInboxProgram,
  showSystem44SuccessRecordModal,
  hideModal,
} from 'containers/ModalController/actions';
import { getAssignmentSuccessRecordRequest, assignmentSuccessRecordSaveRequest } from './actions';
import makeSelectSystem44SuccessRecordContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export class System44SuccessRecordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.dispatchAction = this.dispatchAction.bind(this);
  }
  componentDidMount() {
    this.props.getAssignmentSuccessRecordRequest(this.props.data.rowData);
  }
  handleCloseModal() {
    this.props.clearState();
    this.props.handleCancel();
  }

  dispatchAction(rowData, currentIndex) {
    const mathvalue = [Constants.PROG_MATH_VALUE_1, Constants.PROG_MATH_VALUE_2];
    const read180Value = Constants.PROG_READ_VALUE;
    this.props.handleCancel();
    if (rowData.assignment === 'Success Recording' || rowData.assignment === 'Final Recording') {
      this.props.showSystem44SuccessRecordModal(rowData, currentIndex);
    }

    if (rowData.community_id === read180Value) {
      this.props.showRead180NgModal(rowData);
    }

    if (mathvalue.findIndex(mvalue => mvalue === rowData.communityId) > -1) {
      this.props.showInboxProgram(rowData, 'Inbox', currentIndex, this.props.data.allData);
    }
  }

  render() {
    const successData =
      this.props.system44successrecordcontainer.getAssignmentSuccessRecordData &&
      this.props.system44successrecordcontainer.getAssignmentSuccessRecordData.workItems;
    let successPassageRecWorkItem = {};
    let modalTitle = '';
    if (this.props.data.rowData.community_id === 'S44JR') {
      successPassageRecWorkItem =
        successData &&
        successData[0].iReadSuccessRecWorkItem &&
        successData[0].iReadSuccessRecWorkItem[0];
      modalTitle = 'iRead';
    } else if (this.props.data.rowData.community_id === 'S44NG') {
      successPassageRecWorkItem =
        successData &&
        successData[0].sys44SuccessPassageRecWorkItem &&
        successData[0].sys44SuccessPassageRecWorkItem[0];
      modalTitle = 'System 44 Next Generation';
    } else if (this.props.data.rowData.community_id === 'R180NG') {
      successPassageRecWorkItem =
        successData &&
        successData[0].read180FluencyRecWorkItem &&
        successData[0].read180FluencyRecWorkItem[0];
      modalTitle = 'Read 180 Next Generation';
    }
    return (
      <System44SuccessRecord
        isOpen
        closeStudentGoalModal={() => this.handleCloseModal()}
        data={this.props.data}
        tempGridData={this.props.data.allData}
        handleSaveData={this.handleSaveData}
        successPassageRecWorkItem={successPassageRecWorkItem || {}}
        assignmentSuccessRecordSaveRequest={this.props.assignmentSuccessRecordSaveRequest}
        dispatchAction={this.dispatchAction}
        modalTitle={modalTitle}
        {...this.props}
      />
    );
  }
}

System44SuccessRecordContainer.propTypes = {
  handleCancel: PropTypes.func,
  getAssignmentSuccessRecordRequest: PropTypes.func,
  clearState: PropTypes.func,
  showSystem44SuccessRecordModal: PropTypes.func,
  data: PropTypes.any,
  showRead180NgModal: PropTypes.func,
  showInboxProgram: PropTypes.func,
  system44successrecordcontainer: PropTypes.any,
  assignmentSuccessRecordSaveRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  system44successrecordcontainer: makeSelectSystem44SuccessRecordContainer(),
  profileUserType: makeSelectProfileUserType(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getAssignmentSuccessRecordRequest: data => dispatch(getAssignmentSuccessRecordRequest(data)),
    assignmentSuccessRecordSaveRequest: saveData =>
      dispatch(assignmentSuccessRecordSaveRequest(saveData)),
    handleCancel: () => dispatch(hideModal()),
    showInboxProgram: (data, page, rowIndex, allRows) =>
      dispatch(showInboxProgram(data, page, rowIndex, allRows)),
    showSystem44SuccessRecordModal: (data, rowIndex) =>
      dispatch(showSystem44SuccessRecordModal(data, rowIndex)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'system44SuccessRecordContainer', reducer });
const withSaga = injectSaga({ key: 'system44SuccessRecordContainer', saga });

export default compose(withReducer, withSaga, withConnect)(System44SuccessRecordContainer);
