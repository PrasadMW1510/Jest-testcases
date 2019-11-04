/**
 *
 * AccountDeleteModalContainer
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
import AccountDeleteModal from 'components/AccountDeleteModal';
import { COHORT_TYPE } from 'containers/App/constants';
import makeSelectAccountDeleteModalContainer from './selectors';
import {
  postAccountDeleteRequest,
  postAccountDeleteMIARequest,
  postAccountUnenrollRequest,
} from './actions';
import reducer from './reducer';
import saga from './saga';

export class AccountDeleteModalContainer extends React.Component {
  handleYes = () => {
    if (this.props.data.isUnenroll) {
      this.props.postAccountUnenrollRequest(this.createAccountPayload());
    } else if (this.props.data.miaDelete) {
      this.props.postAccountDeleteMIARequest(this.createAccountPayload());
    } else {
      this.props.postAccountDeleteRequest(this.createAccountPayload());
    }
  };

  handleNo = () => {
    this.props.hideModal();
  };

  /*
  creates the request payload that is sent with the API call
  to accountDelete. includes account info and the searchOpts for refresh.
  e.g { searchOpts: {}, accounts: { input { users: [{user_id: [] } ] } } }
   */
  createAccountPayload = () => {
    const accountPayload = {};
    accountPayload.accounts = {};
    accountPayload.accounts.input = {};
    if (this.props.data.isUnenroll) {
      accountPayload.accounts.input.users = [{ user_id: [] }];
      this.props.data.cohortsToUnenroll.forEach(cohort => {
        accountPayload.accounts.input.users[0].user_id.push(cohort[0]);
      });
    } else if (this.props.data.miaDelete) {
      if (
        this.props.data.searchOpts.cohortType === COHORT_TYPE.Student ||
        this.props.data.searchOpts.cohortType === COHORT_TYPE.Teacher
      ) {
        accountPayload.accounts.input.users = [{ user_id: [] }];
        this.props.data.cohortsToDelete.forEach(cohort => {
          accountPayload.accounts.input.users[0].user_id.push(cohort[0]);
        });
      } else if (this.props.data.searchOpts.cohortType === COHORT_TYPE.School) {
        accountPayload.accounts.input.schools = [{ school_id: [] }];
        this.props.data.cohortsToDelete.forEach(cohort => {
          accountPayload.accounts.input.schools[0].school_id.push(cohort[0]);
        });
      } else {
        accountPayload.accounts.input.classes = [{ class_id: [] }];
        this.props.data.cohortsToDelete.forEach(cohort => {
          accountPayload.accounts.input.classes[0].class_id.push(cohort[0]);
        });
      }
    } else {
      accountPayload.accounts.input.users = [{ user_id: [] }];
      this.props.data.cohortsToDelete.forEach(cohort => {
        accountPayload.accounts.input.users[0].user_id.push(cohort[0]);
      });
    }
    accountPayload.searchOpts = this.props.data.searchOpts;
    return accountPayload;
  };

  render() {
    return (
      <AccountDeleteModal
        isOpen
        onYes={this.handleYes}
        onNo={this.handleNo}
        itemCount={
          this.props.data.isUnenroll
            ? this.props.data.cohortsToUnenroll.length
            : this.props.data.cohortsToDelete.length
        }
        isAccountDelete={!this.props.data.isUnenroll}
      />
    );
  }
}

AccountDeleteModalContainer.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
  postAccountDeleteRequest: PropTypes.func,
  postAccountDeleteMIARequest: PropTypes.func,
  postAccountUnenrollRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  accountdeletemodalcontainer: makeSelectAccountDeleteModalContainer(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  postAccountDeleteRequest,
  postAccountDeleteMIARequest,
  postAccountUnenrollRequest,
});

const withReducer = injectReducer({ key: 'accountDeleteModalContainer', reducer });
const withSaga = injectSaga({ key: 'accountDeleteModalContainer', saga });

export default compose(withReducer, withSaga, withConnect)(AccountDeleteModalContainer);
