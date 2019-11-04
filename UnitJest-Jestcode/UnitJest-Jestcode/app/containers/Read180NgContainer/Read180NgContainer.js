/**
 *
 * Read180NgContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import makeSelectPortfolioPageContainer from 'containers/PortfolioPageContainer/selectors';
import { hideModal } from 'containers/ModalController/actions';
import Read180Ng from 'components/Read180Ng';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  read180ngRequest,
  getRead180DataRequest,
  setRead180NgData,
  deleteAssignmentData,
} from './actions';

import makeSelectRead180NgContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export class Read180NgContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetch: false, detailsData: {}, isEditable: true, selectedItemData: {} };
  }

  componentDidMount() {
    const { data } = this.props;
    if (data.row.communityId === 'R180NG') {
      let xmlinput = '';
      let studentId = data.row.id;
      if (data.row.studentId !== undefined) {
        studentId = data.row.studentId;
      }
      xmlinput = `<workItemsSubset> <workItemInfo workItemId="${
        data.row.workItemId
      }" communityId="${data.row.communityId}" studentId="${studentId}"
     assignment="${data.row.assignment}" kind="${data.row.kind}"/> </workItemsSubset>`;
      this.props.getRead180DataRequest(xmlinput);
    }
  }

  componentWillReceiveProps(nextProps) {
    const detailsData =
      (nextProps.read180ngcontainer && nextProps.read180ngcontainer.read180Program) || {};
    if (!this.state.isFetch) {
      this.setState({
        isFetch: true,
        detailsData,
      });
    }
    this.setState({
      detailsData,
    });
  }

  deleteAssignment = () => {
    const { data } = this.props;

    this.props.deleteAssignmentData(data.row.workItemId);
  };

  handlePreview = opts => {
    this.props.read180ngRequest(opts);
  };

  postRead180NgDataSubmit = read180Data => {
    let postXML = '';

    postXML = `<classAssignmentGroup wholeClass="${read180Data.wholeClass}">
    <assignmentName>${read180Data.assignmentName}</assignmentName>
    <assignmentType>${read180Data.assignmentType}</assignmentType>
    <dueDate>${read180Data.dueDate}</dueDate>
    <description>${read180Data.description}</description>
    <classAssignment communityId="${read180Data.communityId}">
      <studentAssignments>
        <student>
          <userId>${read180Data.userId}</userId>
          <score>${read180Data.score}</score>
          <total>${read180Data.total}</total>
          <average>${read180Data.average}</average>
          <comment>${read180Data.comment}</comment>
        </student>
      </studentAssignments>
    </classAssignment>
  </classAssignmentGroup>`;

    this.props.setRead180NgData(postXML, read180Data.workItemId);
  };

  render() {
    const { hideModal: hideModalProp } = this.props;
    return (
      <div>
        <Helmet>
          <title>Read180NgContainer</title>
          <meta name="description" content="Description of Read180NgContainer" />
        </Helmet>
        <Read180Ng
          isOpen
          handleCancel={hideModalProp}
          onPreview={this.handlePreview}
          detailsData={this.state.detailsData}
          postRead180NgDataSubmit={this.postRead180NgDataSubmit}
          deleteAssignment={this.deleteAssignment}
          {...this.props}
        />
      </div>
    );
  }
}

Read180NgContainer.defaultProps = {
  read180NgContainer: fromJS({}),
};

Read180NgContainer.propTypes = {
  getRead180DataRequest: PropTypes.func.isRequired,
  read180ngcontainer: PropTypes.object,
  data: PropTypes.object.isRequired,
  read180ngRequest: PropTypes.func.isRequired,
  setRead180NgData: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  deleteAssignmentData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  read180ngcontainer: makeSelectRead180NgContainer(),
  portfolioPageContainer: makeSelectPortfolioPageContainer(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  read180ngRequest,
  getRead180DataRequest,
  setRead180NgData,
  deleteAssignmentData,
});

const withReducer = injectReducer({ key: 'read180NgContainer', reducer });
const withSaga = injectSaga({ key: 'read180NgContainer', saga });

export default compose(withReducer, withSaga, withConnect)(Read180NgContainer);
