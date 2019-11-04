/**
 *
 * Read180NgAssaignmentContainer
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
import Read180NgAssaignment from 'components/Read180NgAssaignment';
import {
  getStudentDetails,
  postSaveNewAssignment,
} from 'containers/AddAssignmentContainer/actions';
import reducer from 'containers/AddAssignmentContainer/reducer';
import saga from 'containers/AddAssignmentContainer/saga';
import makeSelectRead180NgAssaignmentContainer from './selectors';

export class Read180NgAssaignmentContainer extends React.Component {
  componentDidMount() {
    this.props.getStudentDetails(this.props.data.newclassId);
  }

  addNewAssignment = assignmentData => {
    this.props.postSaveNewAssignment(assignmentData);
  };

  render() {
    const { hideModal: hideModalProp } = this.props;

    return (
      <Read180NgAssaignment
        isOpen
        hideCancel={hideModalProp}
        addNewAssignment={this.addNewAssignment}
        {...this.props}
      />
    );
  }
}

Read180NgAssaignmentContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  getStudentDetails: PropTypes.func.isRequired,
  postSaveNewAssignment: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  addread180ngassaignmentcontainer: makeSelectRead180NgAssaignmentContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal()),
    getStudentDetails: data => dispatch(getStudentDetails(data)),
    postSaveNewAssignment: data => dispatch(postSaveNewAssignment(data)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'addRead180NgAssaignmentContainer', reducer });
const withSaga = injectSaga({ key: 'addRead180NgAssaignmentContainer', saga });

export default compose(withReducer, withSaga, withConnect)(Read180NgAssaignmentContainer);
