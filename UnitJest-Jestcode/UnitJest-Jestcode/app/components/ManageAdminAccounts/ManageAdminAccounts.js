/**
 *
 * ManageAdminAccounts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as ModalConstants from 'containers/ModalController/constants';
import SAMTable from 'components/SAMTable';
import * as Constants from './constants';
import './ManageAdminAccounts.scss';

class ManageAdminAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.firstColumn = null;
  }

  componentDidMount() {
    if (this.firstColumn) {
      this.firstColumn.click();
    }
  }

  handleAddDistrictAdmin = () => {
    this.props.showModal(ModalConstants.EDIT_ADMIN_MODAL, {
      editMode: false,
      adminType: Constants.DISTRICT,
      accountType: Constants.DISTRICT_ADMINISTRATOR,
    });
  };

  handleAddDistrictTech = () => {
    this.props.showModal(ModalConstants.EDIT_ADMIN_MODAL, {
      editMode: false,
      adminType: Constants.DISTRICT_TECHNICAL,
      accountType: Constants.DISTRICT_TECH,
    });
  };

  handleAddSchoolAdmin = () => {
    this.props.showModal(ModalConstants.EDIT_ADMIN_MODAL, {
      editMode: false,
      adminType: Constants.SCHOOL,
      accountType: Constants.SCHOOL_ADMINISTRATOR,
    });
  };

  handleAddSchoolTech = () => {
    this.props.showModal(ModalConstants.EDIT_ADMIN_MODAL, {
      editMode: false,
      adminType: Constants.SCHOOL_TECHNICAL,
      accountType: Constants.SCHOOL_TECH,
    });
  };

  handleEditAccount = (userId, userType) => {
    this.props.getAdminRequest(userId);
    const { ADMIN_TABLE_TYPE } = Constants;
    let adminType;
    let accountType;

    switch (userType) {
      case ADMIN_TABLE_TYPE.DistrictAdmin:
        adminType = Constants.DISTRICT;
        accountType = Constants.DISTRICT_ADMINISTRATOR;
        break;

      case ADMIN_TABLE_TYPE.DistrictTech:
        adminType = Constants.DISTRICT_TECHNICAL;
        accountType = Constants.DISTRICT_TECH;
        break;

      case ADMIN_TABLE_TYPE.SchoolAdmin:
        adminType = Constants.SCHOOL;
        accountType = Constants.SCHOOL_ADMINISTRATOR;
        break;

      case ADMIN_TABLE_TYPE.SchoolTech:
        adminType = Constants.SCHOOL_TECHNICAL;
        accountType = Constants.SCHOOL_TECH;
        break;

      default:
        adminType = Constants.SCHOOL_TECHNICAL;
        accountType = Constants.SCHOOL_TECH;
    }

    this.props.showModal(ModalConstants.EDIT_ADMIN_MODAL, {
      editMode: true,
      accountType,
      adminType,
      editingSameAccount: userId === this.props.currentUserId,
    });
  };

  handleRemoveAdmin = adminId => {
    this.props.showModal(ModalConstants.REMOVE_ADMIN_MODAL, {
      adminId,
    });
  };

  renderEmptyTable = () => (
    <div className="manage-topic-table__no-data">
      <div className="manage-topic-table__no-data-text" />
    </div>
  );

  renderTableData = () =>
    this.props.admins.map(rowData => ({
      _id: rowData.user_id,
      ...rowData,
    }));

  render() {
    const columns = [
      {
        Header: () => <span ref={node => (this.firstColumn = node)}>Name</span>,
        id: 'name',
        width: 260,
        accessor: 'name',
        Cell: row => (
          <span
            role="link"
            className="manage-admin-accounts__table-link"
            tabIndex={0} // eslint-disable-next-line no-underscore-dangle
            onClick={() => this.handleEditAccount(row.original._id, row.original.type)}
          >
            {row.original.name}
          </span>
        ),
      },
      { Header: 'District User Id', accessor: 'district_user_id', width: 260 },
      { Header: 'Type', accessor: 'type', width: 120 },
      {
        Header: '',
        sortable: false,
        width: 100,
        Cell: row =>
          row.original.remove && (
            <span
              role="link"
              className="manage-admin-accounts__table-link"
              tabIndex={0} // eslint-disable-next-line no-underscore-dangle
              onClick={() => this.handleRemoveAdmin(row.original._id)}
            >
              Remove
            </span>
          ),
      },
    ];
    return (
      <div className="roster-content-panel roster-content-panel--white">
        <h4 className="manage-admin-accounts__header-text">Manage Administrative Accounts</h4>
        <span className="manage-admin-accounts__text-direction">
          Click a link to add or edit an account.
        </span>
        <div className="manage-admin-accounts__link-container">
          <span className="manage-admin-accounts__link-section"> Add an Account:</span>
          <div className="manage-admin-accounts__link-section">
            <span
              role="link"
              tabIndex="0"
              onClick={this.handleAddSchoolAdmin}
              className="manage-admin-accounts__link"
            >
              School Administrator
            </span>
            {this.props.isDistrictAdmin && (
              <span
                role="link"
                tabIndex="0"
                onClick={this.handleAddDistrictAdmin}
                className="manage-admin-accounts__link"
              >
                District Administrator
              </span>
            )}
          </div>
          <div className="manage-admin-accounts__link-section">
            <span
              role="link"
              tabIndex="0"
              onClick={this.handleAddSchoolTech}
              className="manage-admin-accounts__link"
            >
              School Technical Adminstrator
            </span>
            {this.props.isDistrictAdmin && (
              <span
                className="manage-admin-accounts__link"
                role="link"
                tabIndex="0"
                onClick={this.handleAddDistrictTech}
              >
                District Technical Adminstrator
              </span>
            )}
          </div>
        </div>

        <SAMTable
          className="manage-admin-accounts-table"
          columns={columns}
          data={this.renderTableData()}
          renderEmptyTable={this.renderEmptyTable}
          pageSize={this.props.admins.length}
        />
      </div>
    );
  }
}

ManageAdminAccounts.defaultProps = {
  admins: [],
};

ManageAdminAccounts.propTypes = {
  admins: PropTypes.array,
  getAdminRequest: PropTypes.func,
  currentUserId: PropTypes.string.isRequired,
  isDistrictAdmin: PropTypes.bool,
  showModal: PropTypes.func.isRequired,
};

export default ManageAdminAccounts;
