/**
 *
 * InboxModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { hideModal } from 'containers/ModalController/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import InboxProgram from 'components/InboxProgram';
import makeSelectPortfolioPageContainer from 'containers/PortfolioPageContainer/selectors';
import { makeSelectProfileUserId } from 'containers/App/selectors';
import makeSelectInboxModalContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getStudentProgramDetailsDataRequest, getQuestion, storeEvaluationUpdate } from './actions';

export class InboxModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetch: false,
      detailsData: {},
      studentName: '',
      assignment: '',
      currentIndex: 0,
      prevDisable: 'previous',
      nextDisable: 'previous',
    };
  }

  componentDidMount() {
    if (this.props && this.props.data) {
      this.studentProgramRequest(this.props.data.row);
    }
  }

  componentWillReceiveProps(nextProps) {
    const detailsData =
      (nextProps.portfolioPageContainer &&
        nextProps.portfolioPageContainer.searchResultDetailsData) ||
      {};
    if (!this.state.isFetch) {
      const currentIndex = this.getDataArrayIndex();
      this.setState({
        currentIndex,
        isFetch: true,
        detailsData,
      });
    }
    this.setState({
      detailsData,
    });
  }

  getDataArrayIndex = () => {
    const matchingID = this.props.data.currentIndex;

    this.setState({
      studentName: this.props.data.row.student,
      assignment: this.props.data.row.assignment,
    });
    if (matchingID === 0) {
      this.setState({ prevDisable: 'disable', nextDisable: 'previous' });
    }
    if (matchingID === this.props.data.allData.length - 1) {
      this.setState({ nextDisable: 'disable', prevDisable: 'previous' });
    }

    return matchingID;
  };
  studentProgramRequest = currentRow => {
    let xmlinput = '';
    let studentId = currentRow.id;

    if (currentRow.studentId !== undefined) {
      studentId = currentRow.studentId;
    }
    xmlinput = `<workItemsSubset>
    <workItemInfo 
    workItemId="${currentRow.workItemId}"  
    communityId="${currentRow.communityId}"
    studentId="${studentId}"
    assignment="${currentRow.assignment}"
    kind="${currentRow.kind}"
    /></workItemsSubset>`;

    this.props.getStudentProgramDetailsDataRequest(xmlinput);
  };
  nextSerd = () => {
    if (this.state.currentIndex === this.props.data.allData.length - 1) {
      this.setState({ nextDisable: 'disable', prevDisable: 'previous' });
      return;
    }
    const nextInd = this.state.currentIndex + 1 || null;
    const nextRow =
      nextInd && this.props.data && this.props.data.allData && this.props.data.allData[nextInd];
    this.studentProgramRequest(nextRow);
    this.setState({
      studentName: nextRow.student,
      assignment: nextRow.assignment,
      currentIndex: nextInd,
      nextDisable: 'previous',
      prevDisable: 'previous',
    });
    if (nextInd === this.props.data.allData.length - 1) {
      this.setState({ nextDisable: 'disable', prevDisable: 'previous' });
    }
  };

  prevSerd = () => {
    if (this.state.currentIndex === 0) {
      this.setState({ prevDisable: 'disable', nextDisable: 'previous' });
    }
    const prevInd = this.state.currentIndex - 1;
    const prevRow = this.props.data.allData[prevInd];
    this.studentProgramRequest(prevRow);
    this.setState({
      nextDisable: 'previous',
      studentName: prevRow.student,
      assignment: prevRow.assignment,
      currentIndex: prevInd,
      prevDisable: 'previous',
    });
    if (prevInd === 0) {
      this.setState({ prevDisable: 'disable', nextDisable: 'previous' });
    }
  };

  saveQuestion = evaluationData => {
    let xmlinput = '';
    xmlinput = `<evaluationUpdate submissionType="${evaluationData.submissionType}" studentId="${
      evaluationData.studentID
    }" teacherId="${evaluationData.teacherID}" rubricType="${
      evaluationData.rubicType
    }" workItemId="${evaluationData.workItemID}">
      <questionNum>${evaluationData.questionNum}</questionNum>`;

    if (evaluationData.comment !== undefined && evaluationData.comment !== '') {
      xmlinput = `${xmlinput} 
      <comment>${evaluationData.comment}</comment>`;
    }
    if (evaluationData.score !== undefined && evaluationData.score !== '') {
      xmlinput = `${xmlinput}
      <grade>0</grade>
      <rubricScores>
       <score rubricOrder="1">
         <teacherScore>${evaluationData.score}</teacherScore>
       </score>
     </rubricScores>`;
    }

    xmlinput = `${xmlinput} 
    </evaluationUpdate>`;
    this.props.storeEvaluationUpdate(xmlinput, evaluationData);
    this.studentProgramRequest(this.props.data.allData[this.state.currentIndex]);
  };

  render() {
    const { hideModal: hideModalProp } = this.props;

    return (
      <InboxProgram
        isOpen
        handleCancel={hideModalProp}
        onPreview={this.handlePreview}
        currIndex={this.state.currentIndex}
        sName={this.state.studentName}
        assignment={this.state.assignment}
        saveQuestion={this.saveQuestion}
        evaluationData={this.state.evaluationData}
        studentProgramRequest={this.studentProgramRequest}
        prevSerd={this.prevSerd}
        nextSerd={this.nextSerd}
        previousDisable={this.state.prevDisable}
        nextDisable={this.state.nextDisable}
        {...this.props}
      />
    );
  }
}
InboxModalContainer.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
  getStudentProgramDetailsDataRequest: PropTypes.func.isRequired,
  portfolioPageContainer: PropTypes.object.isRequired,
  storeEvaluationUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  inboxmodalcontainer: makeSelectInboxModalContainer(),
  portfolioPageContainer: makeSelectPortfolioPageContainer(),
  profileUserId: makeSelectProfileUserId(),
});

InboxModalContainer.defaultProps = {
  inboxModalContainer: fromJS({}),
};

const withConnect = connect(mapStateToProps, {
  hideModal,
  getStudentProgramDetailsDataRequest,
  getQuestion,
  storeEvaluationUpdate,
});

const withReducer = injectReducer({ key: 'inboxModalContainer', reducer });
const withSaga = injectSaga({ key: 'inboxModalContainer', saga });

export default compose(withReducer, withSaga, withConnect)(InboxModalContainer);
