/**
 *
 * AddGroupContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AddGroupView from 'components/AddGroupView/AddGroupView';
import { hideModal } from 'containers/ModalController/actions';
import { getClassesWithStudentInfo, postGroup, resetGroupStatus, getGroupInfo } from './actions';
import {
  makeSelectClassInfoWithStudent,
  makeSelectPostGroupFailure,
  makeSelectGroupInfo,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { GROUP_TITLE } from './constants';

export class AddGroupContainer extends React.Component {
  componentDidMount() {
    this.props.getClassesWithStudentInfo();
    if (this.props.data.edit) {
      this.props.getGroupInfo();
    }
  }

  render() {
    let title = GROUP_TITLE.add;
    if (this.props.data.edit) {
      title = GROUP_TITLE.edit;
    }
    return (
      <AddGroupView
        classesWithStudents={this.props.classesWithStudents}
        hideModal={this.props.hideModal}
        postGroup={this.props.postGroup}
        groupPostFailure={this.props.groupPostFailure}
        resetGroupStatus={this.props.resetGroupStatus}
        title={title}
        groupInfo={this.props.groupInfo}
      />
    );
  }
}

AddGroupContainer.propTypes = {
  classesWithStudents: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getClassesWithStudentInfo: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  postGroup: PropTypes.func.isRequired,
  groupPostFailure: PropTypes.object.isRequired,
  resetGroupStatus: PropTypes.func.isRequired,
  getGroupInfo: PropTypes.func.isRequired,
  groupInfo: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  classesWithStudents: makeSelectClassInfoWithStudent(),
  groupPostFailure: makeSelectPostGroupFailure(),
  groupInfo: makeSelectGroupInfo(),
});

const withConnect = connect(mapStateToProps, {
  getClassesWithStudentInfo,
  hideModal,
  postGroup,
  resetGroupStatus,
  getGroupInfo,
});

const withReducer = injectReducer({ key: 'addGroupContainer', reducer });
const withSaga = injectSaga({ key: 'addGroupContainer', saga });

export default compose(withReducer, withSaga, withConnect)(AddGroupContainer);
