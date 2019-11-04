/**
 *
 * ManageAdminAccountsContainer
 *
 */

import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectProfileUserId, makeSelectLoginUserOrg } from 'containers/App/selectors';
import { USER_ORG } from 'containers/App/constants';
import { showModal } from 'containers/ModalController/actions';
import { makeSelectSchoolId } from 'containers/SmartBarContainer/selectors';

import ManageAdminAccounts from 'components/ManageAdminAccounts';

import makeSelectManageAdminAccounts from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getAdminRequest, getAdminsRequest, resetAdminsList } from './actions';

export class ManageAdminAccountsContainer extends React.Component {
  componentDidMount() {
    this.props.getAdminsRequest();
  }

  componentWillUnmount() {
    this.props.resetAdminsList();
  }

  createAdminList = () => {
    const organizations = this.props.manageAdminAccountsContainer.toJS().admins;
    let adminList = [];

    organizations.forEach(org => {
      org.users.forEach(userData => {
        if (userData.user) {
          const userType = userData.$.user_type === 'Administrator' ? 'Admin' : 'Tech';
          userData.user.forEach(adminUser => {
            const adminData = {
              type: `${org.type[0]} ${userType}`,
              name: `${adminUser.last_name[0]},${adminUser.first_name[0]}`,
              district_user_id: adminUser.district_user_id[0],
              user_id: adminUser.user_id[0],
              org_id: org.org_id[0],
              remove: this.props.currentUserId !== adminUser.user_id[0],
            };
            adminList.push(adminData);
          });
        }
      });
    });

    if (this.props.selectedSchoolId !== '') {
      adminList = adminList.filter(admin => admin.org_id === this.props.selectedSchoolId);
    }

    return adminList;
  };

  render() {
    return (
      <ManageAdminAccounts
        admins={this.createAdminList()}
        currentUserId={this.props.currentUserId}
        getAdminRequest={this.props.getAdminRequest}
        isDistrictAdmin={this.props.currentUserOrg === USER_ORG.District}
        showModal={this.props.showModal}
      />
    );
  }
}

ManageAdminAccountsContainer.defaultProps = {
  manageAdminAccountsContainer: Immutable.fromJS({}),
  selectedSchoolId: '',
};

ManageAdminAccountsContainer.propTypes = {
  manageAdminAccountsContainer: PropTypes.object,
  getAdminRequest: PropTypes.func.isRequired,
  getAdminsRequest: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  selectedSchoolId: PropTypes.string.isRequired,
  resetAdminsList: PropTypes.func,
  currentUserId: PropTypes.string,
  currentUserOrg: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  manageAdminAccountsContainer: makeSelectManageAdminAccounts(),
  currentUserId: makeSelectProfileUserId(),
  currentUserOrg: makeSelectLoginUserOrg(),
  selectedSchoolId: makeSelectSchoolId(),
});

const withConnect = connect(mapStateToProps, {
  getAdminRequest,
  getAdminsRequest,
  resetAdminsList,
  showModal,
});

const withReducer = injectReducer({ key: 'manageAdminAccountsContainer', reducer });
const withSaga = injectSaga({ key: 'manageAdminAccountsContainer', saga });

export default compose(withReducer, withSaga, withConnect)(ManageAdminAccountsContainer);
