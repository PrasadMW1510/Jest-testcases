/**
 *
 * TeacherMadeQuizContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TeacherMadeQuiz from 'components/TeacherMadeQuiz';
import { fromJS } from 'immutable';
import { hideModal } from 'containers/ModalController/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectProfileUserType } from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getInstalledQuizDataRequest,
  postTeacherMadeQuizRequest,
  getTeacherMadeQuizDetailsRequest,
  deleteQuiz,
  clearTeacherMadeOldQuestions,
} from './actions';
import makeSelectTeacherMadeQuizContainer from './selectors';

export class TeacherMadeQuizContainer extends React.Component {
  componentWillMount() {
    this.props.getInstalledQuizDataRequest();
  }

  render() {
    const { hideModal: hideModalProp } = this.props;
    return (
      <div>
        <TeacherMadeQuiz
          isOpen
          handleCancel={hideModalProp}
          installedQuizData={this.props.teacherMadeQuizContainer.installedQuizData}
          profileUserType={this.props.profileUserType}
          {...this.props}
        />
      </div>
    );
  }
}

TeacherMadeQuizContainer.defaultProps = {
  teacherMadeQuizContainer: fromJS({}),
};

TeacherMadeQuizContainer.propTypes = {
  teacherMadeQuizContainer: PropTypes.object.isRequired,
  getInstalledQuizDataRequest: PropTypes.func.isRequired,
  hideModal: PropTypes.func,
  profileUserType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  teacherMadeQuizContainer: makeSelectTeacherMadeQuizContainer(),
  profileUserType: makeSelectProfileUserType(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getInstalledQuizDataRequest: () => dispatch(getInstalledQuizDataRequest()),
    handleCancel: () => dispatch(hideModal()),
    handleSave: values => dispatch(postTeacherMadeQuizRequest(values)),
    loadQuizDetails: values => dispatch(getTeacherMadeQuizDetailsRequest(values)),
    deleteQuiz: values => dispatch(deleteQuiz(values)),
    clearTeacherMadeOldQuestions: () => dispatch(clearTeacherMadeOldQuestions()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'teacherMadeQuizContainer', reducer });
const withSaga = injectSaga({ key: 'teacherMadeQuizContainer', saga });
export default compose(withReducer, withSaga, withConnect)(TeacherMadeQuizContainer);
