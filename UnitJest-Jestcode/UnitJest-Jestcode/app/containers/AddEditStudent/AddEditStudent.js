/**
 *
 * AddEditStudent
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getFormValues, reduxForm, reducer as formReducer } from 'redux-form/immutable';
import { hideModal } from 'containers/ModalController/actions';
import StudentForm from 'components/StudentForm';
import { makeSelectFormErrors, makeSelectFormServerErrors } from './selectors';
import saga from './saga';
import validate from './validate';
import * as Actions from './actions';
import * as Constants from './constants';

const StudentFormEnhanced = reduxForm({
  form: Constants.FORM_STUDENT_PROFILE,
  validate,
})(StudentForm);

export class AddEditStudent extends PureComponent {
  // Include the `data` prop as arg. It has an `edit` flag.
  componentDidMount = () => this.props.initializeStudentFormRequest(this.props.data);

  render = () => {
    const {
      formData: immFormData,
      hideModal: hideModalProp,
      saveStudentRequest,
      ...props
    } = this.props;
    const title = this.props.data.edit ? Constants.FORM_TITLE_EDIT : Constants.FORM_TITLE_ADD;
    const formData = immFormData && immFormData.toJS();
    return (
      <StudentFormEnhanced
        isOpen
        // Having the selected classes & groups as immutable data
        // makes for easier updates via redux-form actions.
        formData={immFormData}
        metaData={formData.metaData}
        handleCancel={hideModalProp}
        handleSave={saveStudentRequest}
        title={title}
        {...props}
      />
    );
  };
}

AddEditStudent.defaultProps = {
  data: {},
  formData: fromJS({}),
};

AddEditStudent.propTypes = {
  data: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  initializeStudentFormRequest: PropTypes.func.isRequired,
  saveStudentRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formData: getFormValues(Constants.FORM_STUDENT_PROFILE),
  serverErrors: makeSelectFormServerErrors(),
  validationErrors: makeSelectFormErrors(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  initializeStudentFormRequest: Actions.initializeStudentFormRequest,
  saveStudentRequest: Actions.saveStudentRequest,
});
const withReducer = injectReducer({ key: 'form', reducer: formReducer });
const withSaga = injectSaga({ key: 'AddEditStudent', saga });
export default compose(withConnect, withReducer, withSaga)(AddEditStudent);
