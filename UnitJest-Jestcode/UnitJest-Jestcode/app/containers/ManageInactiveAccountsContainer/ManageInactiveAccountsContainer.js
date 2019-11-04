/**
 *
 * ManageInactiveAccountsContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ManageInactiveAccounts from 'components/ManageInactiveAccounts';
import {
  showAccountDeleteModal,
  showSearchClassAssignModal,
  showReactivateSchoolModal,
  showReactivateClassModal,
  showModal,
  showClassFormModal,
} from 'containers/ModalController/actions';

import { createStructuredSelector } from 'reselect';
import * as AppSelectors from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getInactiveCohortMembersRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import * as Selectors from './selectors';

export class ManageInactiveAccountsContainer extends React.Component {
  getId = rowData => {
    // eslint-disable-next-line no-underscore-dangle
    let id = rowData._id;
    if (rowData.user_id) {
      id = rowData.user_id;
    } else if (rowData.org_id) {
      id = rowData.org_id;
    } else {
      id = rowData.class_id;
    }
    return id;
  };

  renderTableData = resultsData =>
    resultsData.map(rowData => ({
      ...rowData,
      // _id: rowData.user_id ? rowData.user_id : rowData.org_id ? rowData.org_id : rowData.class_id,
      _id: this.getId(rowData),
    }));

  render() {
    const { immInactiveAccountInfo, userOrgAndType: { userOrg, userType } } = this.props;
    const isDataLoading = Selectors.selectLoading(immInactiveAccountInfo);
    const paginationData = Selectors.selectPaginationData(immInactiveAccountInfo);
    const tempRowData = Selectors.selectInactiveMembers(immInactiveAccountInfo);
    const rowData = this.renderTableData(tempRowData);
    return (
      <ManageInactiveAccounts
        getInactiveCohortMembersRequest={this.props.getInactiveCohortMembersRequest}
        isDataLoading={isDataLoading}
        paginationData={paginationData}
        rowData={rowData}
        userOrg={userOrg}
        userType={userType}
        showAccountDeleteModal={this.props.showAccountDeleteModal}
        showSearchClassAssignModal={this.props.showSearchClassAssignModal}
        showReactivateSchoolModal={this.props.showReactivateSchoolModal}
        showReactivateClassModal={this.props.showReactivateClassModal}
        showModal={this.props.showModal}
        showClassFormModal={this.props.showClassFormModal}
      />
    );
  }
}

ManageInactiveAccountsContainer.propTypes = {
  getInactiveCohortMembersRequest: PropTypes.func.isRequired,
  immInactiveAccountInfo: PropTypes.object,
  userOrgAndType: PropTypes.object.isRequired,
  showAccountDeleteModal: PropTypes.func,
  showSearchClassAssignModal: PropTypes.func,
  showReactivateSchoolModal: PropTypes.func,
  showReactivateClassModal: PropTypes.func,
  showClassFormModal: PropTypes.func,
  showModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  immInactiveAccountInfo: Selectors.makeSelectInactiveAccountInfo(),
  userOrgAndType: AppSelectors.makeSelectUserOrgUserType(),
});

const withReducer = injectReducer({ key: 'manageInactiveAccounts', reducer });
const withSaga = injectSaga({ key: 'manageInactiveAccounts', saga });

const withConnect = connect(mapStateToProps, {
  getInactiveCohortMembersRequest,
  showAccountDeleteModal,
  showSearchClassAssignModal,
  showReactivateSchoolModal,
  showReactivateClassModal,
  showClassFormModal,
  showModal,
});
export default compose(withSaga, withReducer, withConnect)(ManageInactiveAccountsContainer);
