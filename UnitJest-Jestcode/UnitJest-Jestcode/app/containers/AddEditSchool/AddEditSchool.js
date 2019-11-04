/**
 *
 * AddEditSchool
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFormValues, reduxForm, reducer as formReducer } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import SchoolForm from 'components/SchoolForm';
import { hideModal, showModal } from 'containers/ModalController/actions';
import { WARNING_MODAL } from 'containers/ModalController/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { initializeSchoolFormRequest, saveSchoolRequest, saveSchoolMIARequest } from './actions';
import {
  makeSelectAllFormMetaData,
  makeSelectFormErrors,
  makeSelectGradesForDistrict,
  makeSelectSubmitErrors,
} from './selectors';
import saga from './saga';
import validate from './validate';
import { FORM_SCHOOL_PROFILE, FORM_TITLE_ADD, FORM_TITLE_EDIT } from './constants';

// Form initial values set in saga after data fetching is complete.
const SchoolFormEnhanced = reduxForm({
  form: FORM_SCHOOL_PROFILE,
  validate,
})(SchoolForm);

export class AddEditSchool extends React.Component {
  componentDidMount = () => this.props.initializeSchoolFormRequest(this.props.data);

  handleSubmitFail = () => {
    const { validationErrors, showWarningModal } = this.props;
    if (validationErrors.popupErrorFieldName) {
      showWarningModal(validationErrors[validationErrors.popupErrorFieldName]);
    }
  };

  render() {
    // we pick out the props defined via connect(..) method to prevent
    // duplicate properties in the child component.
    const { handleCancel: handleCancelProp, handleSave: handleSaveProp, ...props } = this.props;
    return (
      <SchoolFormEnhanced
        handleCancel={handleCancelProp}
        handleSave={handleSaveProp}
        isOpen
        onSubmitFail={this.handleSubmitFail}
        title={this.props.data.edit ? FORM_TITLE_EDIT : FORM_TITLE_ADD}
        {...props}
      />
    );
  }
}

AddEditSchool.defaultProps = {
  data: {}, // passed-on from ModalController
  validationErrors: {},
};

AddEditSchool.propTypes = {
  data: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  initializeSchoolFormRequest: PropTypes.func.isRequired,
  showWarningModal: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formData: getFormValues(FORM_SCHOOL_PROFILE),
  formMeta: makeSelectAllFormMetaData(),
  grades: makeSelectGradesForDistrict(),
  submitErrors: makeSelectSubmitErrors(),
  validationErrors: makeSelectFormErrors(),
});

// TODO: Eliminate the 'mapDispatchToProps' in favor of direct function list in connect(..)
export function mapDispatchToProps(dispatch) {
  return {
    handleCancel: () => dispatch(hideModal()),
    handleSave: (values, data) =>
      dispatch(
        data.editSchoolId ? saveSchoolMIARequest(values, data) : saveSchoolRequest(values, data)
      ),
    initializeSchoolFormRequest: data => dispatch(initializeSchoolFormRequest(data)),
    showWarningModal: message => dispatch(showModal(WARNING_MODAL, { message })),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withFormReducer = injectReducer({ key: 'form', reducer: formReducer });
const withSaga = injectSaga({ key: 'AddEditSchool', saga });

export default compose(withConnect, withFormReducer, withSaga)(AddEditSchool);
