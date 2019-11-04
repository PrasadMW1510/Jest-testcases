/**
 *
 * InboxContainer module
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import InBox from 'components/InBox';
import PortfolioTreeMenu from 'components/PortfolioTreeMenu';
import {
  showSystem44SuccessRecordModal,
  showRead180RespondWriteModal,
  showInboxProgram,
  showIreadModal,
} from 'containers/ModalController/actions';
import makeSelectInboxContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getInboxClassesDataRequest,
  getStudentsSubmissionMetadata,
  getClassStudentList,
  setGridData,
  setInBoxGridRequestSuccess,
  setTempGridData,
  setInboxTreeData,
  setInboxTreeDataWithTreeList,
} from './actions';

export class InboxContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submissionCount: 0,
      inboxTree: [],
      dataGrid: [],
      originalGrid: [],
      dataUpdated: false,
      treeUpdated: false,
      assCountObj: 0,
      inBoxcountObj: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    let gridData = [];
    if (nextProps.gridData.length > 0) {
      gridData = this.setDefaultGridData(nextProps);
    }
    const inboxTree = this.setTreeStructure(nextProps);

    if (nextProps.showAssignment === true && this.state.treeUpdated === false) {
      const inboxTreeChanged = this.setTreeStructure(nextProps);
      this.props.setInBoxGridRequestSuccess(inboxTreeChanged);
      this.setState({ treeUpdated: true });
    } else if (
      (inboxTree &&
        inboxTree.length > 0 &&
        JSON.stringify(nextProps.inBoxcount) !== JSON.stringify(this.state.inBoxcountObj)) ||
      JSON.stringify(nextProps.assignmentCount) !== JSON.stringify(this.state.assCountObj)
    ) {
      this.props.setInBoxGridRequestSuccess(inboxTree);
      if (gridData.length > 0) {
        this.props.setTempGridData(gridData);
      }

      this.setState({
        dataUpdated: true,
        assCountObj: nextProps.assignmentCount,
        inBoxcountObj: nextProps.inBoxcount,
      });
    }
  }
  setDefaultGridData = newProps => {
    const gridData = newProps.gridData;
    const filteredDataProgram = [];
    if (gridData.length > 0) {
      gridData.map(item => {
        if (item.graded === 'false' && item.kind === 'SoftwareSubmission') {
          filteredDataProgram.push(item);
        }
        return item;
      });
    }
    return filteredDataProgram;
  };
  setTreeStructure = newProps => {
    const treeList = [
      {
        name: `Software Submissions (${newProps.inBoxcount.submissionCount})`,
        children: [
          {
            name: `Unread (${newProps.inBoxcount.unReadCount})`,
            type: 'ssUnread',
            data: newProps.gridData,
            kind: 'SoftwareSubmission',
          },
          {
            name: `New This Week (${newProps.inBoxcount.newCount})`,
            type: 'ssnewThisWeek',
            data: newProps.gridData,
            kind: 'SoftwareSubmission',
          },
        ],
        toggled: true,
      },
    ];
    const assignmentTree = {
      name: `Assignments (${newProps.assignmentCount.submissionCount})`,
      children: [
        {
          name: `Unread (${newProps.assignmentCount.unReadCount})`,
          data: newProps.baseData,
          type: 'ssUnread',
          kind: 'ClassAssignment',
        },
        {
          name: `New This Week (${newProps.assignmentCount.newCount})`,
          data: newProps.baseData,
          type: 'ssnewThisWeek',
          kind: 'ClassAssignment',
        },
      ],
    };
    if (newProps.showAssignment) {
      treeList.push(assignmentTree);
    }
    if (newProps.treeList && newProps.treeList.length > 0) {
      newProps.treeList.forEach(item => {
        const chItem = item;
        chItem.type = 'teacher-inbox-sf';
        chItem.kind = 'SoftwareSubmission';
        chItem.data = newProps.gridData;

        treeList[0].children.push(item);
        const newItem = JSON.parse(JSON.stringify(item));
        newItem.kind = 'ClassAssignment';
        newItem.type = 'teacher-inbox-sf';
        newItem.data = newProps.baseData;
        if (newProps.showAssignment) {
          treeList[1].children.push(newItem);
        }
      });
    }
    return treeList;
  };

  render() {
    return (
      <div className="student-work-page">
        <div className="student-work-leftpanel-container">
          <div className="student-work-header-block">
            <PortfolioTreeMenu
              {...this.props}
              classData={this.props.inboxContainer.inBoxClassData}
            />
          </div>
        </div>
        <div className="student-work-rightpanel-container">
          <InBox
            data={this.props.inboxContainer.tempGridData}
            showInboxProgram={this.props.showInboxProgram}
            showIreadModal={this.props.showIreadModal}
            showSystem44SuccessRecordModal={this.props.showSystem44SuccessRecordModal}
            showRead180RespondWriteModal={this.props.showRead180RespondWriteModal}
          />
        </div>
      </div>
    );
  }
}

InboxContainer.propTypes = {
  showInboxProgram: PropTypes.func.isRequired,
  gridData: PropTypes.array,
  inBoxcount: PropTypes.object,
  assignmentCount: PropTypes.object,
  setTempGridData: PropTypes.func,
  setInBoxGridRequestSuccess: PropTypes.func,
  showAssignment: PropTypes.bool,
  inboxContainer: PropTypes.object,
  showIreadModal: PropTypes.func.isRequired,
  showRead180RespondWriteModal: PropTypes.func,
  showSystem44SuccessRecordModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  inboxContainer: makeSelectInboxContainer(),
});
export function mapDispatchToProps(dispatch) {
  return {
    getInboxClassesDataRequest: () => dispatch(getInboxClassesDataRequest()),
    getClassStudentList: () => dispatch(getClassStudentList()),
    getStudentsSubmissionMetadata: value => dispatch(getStudentsSubmissionMetadata(value)),
    setGridData: value => dispatch(setGridData(value)),
    setInBoxGridRequestSuccess: value => dispatch(setInBoxGridRequestSuccess(value)),
    setTempGridData: value => dispatch(setTempGridData(value)),
    setInboxTreeData: treeData => dispatch(setInboxTreeData(treeData)),
    setInboxTreeDataWithTreeList: treeData => dispatch(setInboxTreeDataWithTreeList(treeData)),
    showInboxProgram: (data, page, rowIndex, allRows) =>
      dispatch(showInboxProgram(data, page, rowIndex, allRows)),
    showIreadModal: data => dispatch(showIreadModal(data)),
    showRead180RespondWriteModal: (data, page, rowIndex, allRows) =>
      dispatch(showRead180RespondWriteModal(data, page, rowIndex, allRows)),
    showSystem44SuccessRecordModal: (data, rowIndex) =>
      dispatch(showSystem44SuccessRecordModal(data, rowIndex)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'inboxContainer', reducer });
const withSaga = injectSaga({ key: 'inboxContainer', saga });

export default compose(withReducer, withSaga, withConnect)(InboxContainer);
