/**
 *
 * CatchAllClassContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import CatchAllClass from 'components/CatchAllClass';
import { getStudentsSubmissionMetadata } from 'containers/PortfolioPageContainer/actions';

import { getStudentDetails, postSaveNewAssignment, setRead180ngAssignmentRequest } from './actions';
import makeSelectCatchAllClassContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export class CatchAllClassContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getStudentDetails(this.props.data.newclassId);
  }

  addNewAssignment = assignmentData => {
    this.props.postSaveNewAssignment(assignmentData);
  };

  savePostData = data => {
    this.props.setRead180ngAssignmentRequest(data);
    this.props.getStudentsSubmissionMetadata();
  };

  render() {
    const { hideModal: hideModalProp } = this.props;
    return (
      <div>
        <CatchAllClass
          isOpen
          handleCancel={hideModalProp}
          addNewAssignment={this.addNewAssignment}
          postSavedData={this.savePostData}
          getStudentDetails={this.props.getStudentDetails}
          {...this.props}
        />
      </div>
    );
  }
}

CatchAllClassContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  getStudentDetails: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  postSaveNewAssignment: PropTypes.func.isRequired,
  getStudentsSubmissionMetadata: PropTypes.func.isRequired,
  setRead180ngAssignmentRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  catchallclasscontainer: makeSelectCatchAllClassContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal()),
    getStudentDetails: data => dispatch(getStudentDetails(data)),
    postSaveNewAssignment: data => dispatch(postSaveNewAssignment(data)),
    getStudentsSubmissionMetadata: value => dispatch(getStudentsSubmissionMetadata(value)),
    setRead180ngAssignmentRequest: data => dispatch(setRead180ngAssignmentRequest(data)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'catchAllClassContainer', reducer });
const withSaga = injectSaga({ key: 'catchAllClassContainer', saga });

export default compose(withReducer, withSaga, withConnect)(CatchAllClassContainer);
