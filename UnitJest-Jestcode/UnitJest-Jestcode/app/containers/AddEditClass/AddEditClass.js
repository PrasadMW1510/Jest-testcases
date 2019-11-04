/**
 *
 * AddEditClass
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFormValues, reduxForm, reducer as formReducer } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import ClassForm from 'components/ClassForm';
import { hideModal } from 'containers/ModalController/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { initializeClassFormRequest, saveClassRequest, saveClassMIARequest } from './actions';
import {
  makeSelectFormErrors,
  makeSelectFormServerErrors,
  makeSelectFormMetaData,
} from './selectors';
import saga from './saga';
import validate from './validate';
import { FORM_CLASS_PROFILE, FORM_TITLE_ADD, FORM_TITLE_EDIT } from './constants';

// Form initial values set in saga after data fetching is complete.
const ClassFormEnhanced = reduxForm({
  form: FORM_CLASS_PROFILE,
  validate,
})(ClassForm);

// Handle any needed `Add` vs `Edit` tweaks
export class AddEditClass extends PureComponent {
  componentDidMount = () => this.props.initializeClassFormRequest(this.props.data);

  handleSave = (values, data) => {
    if (data.editClassId) {
      this.props.saveClassMIARequest(values, data);
    } else {
      this.props.saveClassRequest(values, data);
    }
  };

  render = () => {
    const {
      hideModal: hideModalProp, // Avoid dup declaration
      saveClassRequest: saveClassRequestProp, // Avoid dup declaration
      ...props
    } = this.props;
    return (
      <ClassFormEnhanced
        isOpen
        handleCancel={hideModalProp}
        handleSave={this.handleSave}
        title={this.props.data.edit ? FORM_TITLE_EDIT : FORM_TITLE_ADD}
        {...props}
      />
    );
  };
}

AddEditClass.defaultProps = {
  data: {}, // Passed-on from ModalController
};

AddEditClass.propTypes = {
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  initializeClassFormRequest: PropTypes.func.isRequired,
  saveClassRequest: PropTypes.func.isRequired,
  saveClassMIARequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  metaData: makeSelectFormMetaData(),
  formData: getFormValues(FORM_CLASS_PROFILE),
  serverErrors: makeSelectFormServerErrors(),
  validationErrors: makeSelectFormErrors(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  initializeClassFormRequest,
  saveClassRequest,
  saveClassMIARequest,
});
const withReducer = injectReducer({ key: 'form', reducer: formReducer });
const withSaga = injectSaga({ key: 'AddEditClass', saga });

export default compose(withConnect, withReducer, withSaga)(AddEditClass);
