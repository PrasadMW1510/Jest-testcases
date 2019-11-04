/**
 *
 * AssignmentContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PortfolioTreeMenu from 'components/PortfolioTreeMenu';
import Assignments from 'components/Assignments';
import {
  showIreadModal,
  showIreadAddModal,
  showRead180NgAssaignmentModal,
  showCatchAllClassModal,
} from 'containers/ModalController/actions';
import makeSelectAssignmentContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getClassesDataRequest,
  getClassAssignmentRequest,
  setClassGridRequestSuccess,
  setClassRequestSuccess,
  setInboxDataByCommunityId,
} from './actions';

export class AssignmentContainer extends React.PureComponent {
  componentDidMount() {
    // this.props.getClassesDataRequest();
    this.props.setClassGridRequestSuccess(this.props.gridData);
    const treeList = this.props.treeList.map(item => {
      const newItem = item;
      newItem.children = [];
      return item;
    });
    this.props.setClassRequestSuccess(treeList, this.props.gridData);
  }
  render() {
    return (
      <div className="student-work-page">
        <div className="student-work-leftpanel-container">
          <div className="sideBar-title">Select Class to Create/Modify Class Assignments</div>
          <div className="student-work-header-block assignment-left-menu">
            <PortfolioTreeMenu
              {...this.props}
              classData={this.props.assignmentcontainer.classData}
            />
          </div>
        </div>
        <div className="student-work-rightpanel-container">
          <Assignments
            data={this.props.assignmentcontainer.classAssignmentForClass}
            selectedClass={this.props.assignmentcontainer.selectedClass}
            programList={this.props.assignmentcontainer.programList}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

AssignmentContainer.propTypes = {
  assignmentcontainer: PropTypes.object,
  setClassGridRequestSuccess: PropTypes.func,
  gridData: PropTypes.array,
  treeList: PropTypes.array,
  setClassRequestSuccess: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  assignmentcontainer: makeSelectAssignmentContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getClassesDataRequest: () => dispatch(getClassesDataRequest()),
    getClassAssignmentRequest: (value, data, CommunityId, classId) =>
      dispatch(getClassAssignmentRequest(value, data, CommunityId, classId)),
    showIreadModal: data => dispatch(showIreadModal(data)),
    setClassGridRequestSuccess: value => dispatch(setClassGridRequestSuccess(value)),
    setClassRequestSuccess: (value, data) => dispatch(setClassRequestSuccess(value, data)),
    setInboxDataByCommunityId: (value, id, kind) =>
      dispatch(setInboxDataByCommunityId(value, id, kind)),
    showIreadAddModal: data => dispatch(showIreadAddModal(data)),
    showRead180NgAssaignmentModal: data => dispatch(showRead180NgAssaignmentModal(data)),
    showCatchAllClassModal: data => dispatch(showCatchAllClassModal(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'assignmentContainer', reducer });
const withSaga = injectSaga({ key: 'assignmentContainer', saga });

export default compose(withReducer, withSaga, withConnect)(AssignmentContainer);
