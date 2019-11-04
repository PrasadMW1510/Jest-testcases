/**
 *
 * ReactivateSchoolModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactivateSchoolModal from 'components/ReactivateSchoolModal/ReactivateSchoolModal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { COHORT_TYPE } from 'containers/App/constants';
import { makeSelectProfileDistrictId } from 'containers/App/selectors';
import makeSelectReactivateSchoolModalContainer from './selectors';
import { postReactivateSchoolRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export class ReactivateSchoolModalContainer extends React.Component {
  handleSave = () => {
    this.props.postReactivateSchoolRequest(this.createReactivateSchoolPayload());
  };

  handleCancel = () => {
    this.props.hideModal();
  };

  /*
  creates the request payload that is sent with the API call
  to accountDelete. includes account info and the searchOpts for refresh.
  e.g { searchOpts: {}, accounts: { input { users: [{user_id: [] } ] } } }
   */
  createReactivateSchoolPayload = () => {
    const accountDeletePayload = {};
    accountDeletePayload.accounts = {};
    accountDeletePayload.accounts.input = {};
    if (this.props.data.searchOpts.cohortType === COHORT_TYPE.School) {
      accountDeletePayload.accounts.input.district_id = this.props.districtId;
      accountDeletePayload.accounts.input.schools = [{ school_id: [] }];
      this.props.data.cohortsToReactivate.forEach(cohort => {
        accountDeletePayload.accounts.input.schools[0].school_id.push(cohort[0]);
      });
    }
    accountDeletePayload.searchOpts = this.props.data.searchOpts;
    return accountDeletePayload;
  };

  render() {
    return (
      <ReactivateSchoolModal
        isOpen
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        toReactivateCount={this.props.data.cohortsToReactivate.length}
      />
    );
  }
}

ReactivateSchoolModalContainer.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
  postReactivateSchoolRequest: PropTypes.func.isRequired,
  districtId: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reactivateSchoolModalcontainer: makeSelectReactivateSchoolModalContainer(),
  districtId: makeSelectProfileDistrictId(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  postReactivateSchoolRequest,
});

const withReducer = injectReducer({ key: 'reactivateSchoolModalContainer', reducer });
const withSaga = injectSaga({ key: 'reactivateSchoolModalContainer', saga });

export default compose(withReducer, withSaga, withConnect)(ReactivateSchoolModalContainer);
