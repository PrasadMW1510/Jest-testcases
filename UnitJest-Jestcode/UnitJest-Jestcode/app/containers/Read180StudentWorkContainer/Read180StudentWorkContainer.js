/**
 *
 * Read180StudentWorkContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Read180StudentWork from 'components/Read180StudentWork';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { getRead180StudentWorkRequest, setRead180StudentWorkData } from './actions';

import makeSelectRead180StudentWorkContainer from './selectors';

import reducer from './reducer';
import saga from './saga';

export class Read180StudentWorkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetch: false,
      moveForward: false,
      readStudentWork180Data: {},
      isEditable: true,
      selectedItemData: {},
    };
  }

  componentDidMount() {
    const { data } = this.props;
    if (data.row.communityId === 'RTNG') {
      let xmlinput = '';
      let studentId = data.row.id;
      if (data.row.studentId !== undefined) {
        studentId = data.row.studentId;
      }
      xmlinput = `<workItemsSubset>
    <workItemInfo 
    workItemId="${data.row.workItemId}"
     communityId="${data.row.communityId}" 
      studentId="${studentId}" 
      assignment="${data.row.assignment}" kind="${data.row.kind}" />
  </workItemsSubset>`;
      this.props.getRead180StudentWorkRequest(xmlinput);
    }
  }

  componentWillReceiveProps(nextProps) {
    const readStudentWork180Data =
      (nextProps.read180studentworkcontainer &&
        nextProps.read180studentworkcontainer.read180Program) ||
      {};
    if (!this.state.isFetch) {
      this.setState({
        isFetch: true,
        readStudentWork180Data,
      });
    }
    this.setState({
      readStudentWork180Data,
    });
  }

  savePostAssesment = (type, rubricType, comment, score) => {
    const postxmlInput = `<evaluationUpdate submissionType="${type}" studentId="${
      this.props.data.row.id
    }" teacherId="j107e7hc6rru0b9tql34mira_2efa7f0" rubricType="${rubricType}" workItemId="${
      this.props.data.row.workItemId
    }">
<questionNum>NaN</questionNum>
<comment>${comment}</comment>
<rubricScores>
  <score rubricOrder="${score}">
    <teacherScore>${score}</teacherScore>
  </score>
</rubricScores>
</evaluationUpdate>`;
    this.props.setRead180StudentWorkData(postxmlInput);
  };

  handlePreview = opts => {
    this.props.getRead180StudentWorkRequest(opts);
  };

  render() {
    return (
      <div>
        <meta name="description" content="Description of Read180StudentWorkContainer" />
        <Read180StudentWork
          readStudentWork180Data={this.state.readStudentWork180Data}
          savePostAssesment={this.savePostAssesment}
          {...this.props}
        />
      </div>
    );
  }
}

Read180StudentWorkContainer.propTypes = {
  getRead180StudentWorkRequest: PropTypes.func.isRequired,
  setRead180StudentWorkData: PropTypes.func.isRequired,
  read180studentworkcontainer: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  read180studentworkcontainer: makeSelectRead180StudentWorkContainer(),
});

const withConnect = connect(mapStateToProps, {
  getRead180StudentWorkRequest,
  setRead180StudentWorkData,
});

const withReducer = injectReducer({ key: 'read180StudentWorkContainer', reducer });
const withSaga = injectSaga({ key: 'read180StudentWorkContainer', saga });

export default compose(withReducer, withSaga, withConnect)(Read180StudentWorkContainer);
