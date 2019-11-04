/**
 *
 * StudentWorkProgramsContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import IReadStudentWork from 'components/IReadStudentWork';
import { hideModal } from 'containers/ModalController/actions';
import makeSelectStudentWorkProgramsContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getIreadStudentWorkData,
  postIReadStudentWorkData,
  delIReadStudentWorkData,
  showDeleteModal,
} from './actions';

export class StudentWorkProgramsContainer extends React.Component {
  componentDidMount() {
    const { data } = this.props;
    this.props.getIreadStudentWorkData(data);
  }

  render() {
    const {
      hideModal: hideModalProp, // Avoid dup declaration
    } = this.props;
    return (
      <div>
        <IReadStudentWork
          isOpen
          handleCancel={hideModalProp}
          handleSave={this.props.handleSave}
          handleDelete={this.props.handleDelete}
          showDeleteModal={this.props.showDeleteModal}
          {...this.props}
        />
      </div>
    );
  }
}

StudentWorkProgramsContainer.propTypes = {
  data: PropTypes.array.isRequired,
  getIreadStudentWorkData: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentworkprogramscontainer: makeSelectStudentWorkProgramsContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal()),
    getIreadStudentWorkData: data => dispatch(getIreadStudentWorkData(data)),
    handleSave: (formData, data) => dispatch(postIReadStudentWorkData(formData, data)),
    handleDelete: data => dispatch(delIReadStudentWorkData(data)),
    showDeleteModal: () => dispatch(showDeleteModal()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'studentWorkProgramsContainer', reducer });
const withSaga = injectSaga({ key: 'studentWorkProgramsContainer', saga });

export default compose(withReducer, withSaga, withConnect)(StudentWorkProgramsContainer);
