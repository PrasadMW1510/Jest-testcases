/**
 *
 * ReactivateClassModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactivateClassModal from 'components/ReactivateClassModal/ReactivateClassModal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { hideModal, showClassFormModal } from 'containers/ModalController/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { COHORT_TYPE } from 'containers/App/constants';
import { makeSelectSchoolsData, makeSelectProfileOrganizationData } from 'containers/App/selectors';
import makeSelectReactivateClassModalContainer from './selectors';
import { postReactivateClassRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export class ReactivateClassModalContainer extends React.Component {
  getSchools() {
    if (this.props.schools) {
      return this.props.schools && this.props.schools.toJS();
    }

    return this.props.activeSchools && this.props.activeSchools.getIn([0, 'organization']).toJS();
  }

  handleSave = values => {
    if (values.editClassId) {
      this.props.hideModal();
      this.props.showClassFormModal({
        edit: true,
        editClassId: values.editClassId,
        schoolIdForClass: values.selectedSchoolId,
        searchOpts: this.props.data.searchOpts,
      });
    } else {
      this.props.postReactivateClassRequest(
        this.createReactivateClassPayload(values.selectedSchoolId)
      );
    }
  };

  handleCancel = () => {
    this.props.hideModal();
  };

  /*
   creates the request payload that is sent with the API call
   to accountDelete. includes account info and the searchOpts for refresh.
   e.g { searchOpts: {}, accounts: { input { users: [{user_id: [] } ] } } }
   */
  createReactivateClassPayload = selectedSchoolId => {
    const accountDeletePayload = {};
    accountDeletePayload.accounts = {};
    accountDeletePayload.accounts.input = {};
    if (this.props.data.searchOpts.cohortType === COHORT_TYPE.Class) {
      accountDeletePayload.accounts.input.school_id = selectedSchoolId;
      accountDeletePayload.accounts.input.classes = [{ class_id: [] }];
      this.props.data.cohortsToReactivate.forEach(cohort => {
        accountDeletePayload.accounts.input.classes[0].class_id.push(cohort[0]);
      });
    }
    accountDeletePayload.searchOpts = this.props.data.searchOpts;
    return accountDeletePayload;
  };

  render() {
    return (
      <ReactivateClassModal
        isOpen
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        toReactivateCount={this.props.data.cohortsToReactivate.length}
        schoolsData={this.getSchools()}
        editClassId={this.props.data.editClassId}
        showClassFormModal={this.props.showClassFormModal}
      />
    );
  }
}

ReactivateClassModalContainer.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
  postReactivateClassRequest: PropTypes.func.isRequired,
  schools: PropTypes.object,
  activeSchools: PropTypes.object,
  showClassFormModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  reactivateClassModalContainer: makeSelectReactivateClassModalContainer(),
  schools: makeSelectSchoolsData(),
  activeSchools: makeSelectProfileOrganizationData(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  postReactivateClassRequest,
  showClassFormModal,
});

const withReducer = injectReducer({ key: 'reactivateClassModalContainer', reducer });
const withSaga = injectSaga({ key: 'reactivateClassModalContainer', saga });

export default compose(withReducer, withSaga, withConnect)(ReactivateClassModalContainer);
