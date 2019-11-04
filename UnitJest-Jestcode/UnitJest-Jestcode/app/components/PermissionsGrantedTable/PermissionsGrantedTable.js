/**
 *
 * PermissionsGrantedTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';
import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import * as Constants from './constants';

import './PermissionsGrantedTable.scss';

class PermissionsGrantedTable extends React.Component {
  handleCheckboxChange = (checked, id) => {
    this.props.onCheckboxChange(checked, id);
  };

  createTableData = () => {
    const { permissions, userOrg } = this.props;
    let permissionsObj = null;

    switch (userOrg) {
      case USER_ORG.District:
        permissionsObj = Constants.DISTRICT_ADMIN_PERMISSIONS;
        break;
      case USER_ORG.School:
        permissionsObj = Constants.SCHOOL_ADMIN_PERMISSIONS;
        break;
      case USER_TYPE.Teacher:
        permissionsObj = Constants.TEACHER_PERMISSIONS;
        break;
      default:
        permissionsObj = {
          viewAndEdit: [],
          allow: [],
        };
        break;
    }

    const viewAndEditData = permissionsObj.viewAndEdit.map(permission => {
      const { permissionType, viewId, editId } = permission;
      return {
        permission_type: permissionType,
        view_access: permissions.findIndex(p => Number(p.id[0]) === viewId) >= 0,
        edit_access: permissions.findIndex(p => Number(p.id[0]) === editId) >= 0,
        view_id: viewId,
        edit_id: editId,
      };
    });

    const allowData = permissionsObj.allow.map(permission => {
      const { permissionType, allowId } = permission;
      return {
        permission_type: permissionType,
        allow_access: permissions.findIndex(p => Number(p.id[0]) === allowId) >= 0,
        allow_id: allowId,
      };
    });

    return {
      viewAndEditData,
      allowData,
    };
  };

  renderCheck = (access, permissionId, position) => {
    const { editMode, permissionsChecked, editingSameAccount } = this.props;
    let check = <span className={`permissions-granted-table__${position}-check`} />;

    if (!access) {
      check = <span />;
    }

    if (!editMode || !editingSameAccount) {
      const checked = permissionsChecked.findIndex(id => id === permissionId) >= 0;
      check = (
        <input
          type="checkbox"
          className="permissions-granted-table__check-mark"
          checked={checked}
          onChange={e => this.handleCheckboxChange(e.target.checked, permissionId)}
        />
      );
    }

    return check;
  };

  render() {
    const viewAndEditColumns = [
      {
        Header: '',
        accessor: 'permission_type',
        width: 200,
        Cell: row => (
          <div className="permissions-granted-table__permission-cell">
            <span className="permissions-granted-table__permission-text">
              {row.original.permission_type}
            </span>
          </div>
        ),
      },
      {
        Header: 'View',
        accessor: 'view_access',
        width: 75,
        Cell: row => this.renderCheck(row.original.view_access, row.original.view_id, 'top'),
      },
      {
        Header: 'Edit',
        accessor: 'edit_access',
        width: 75,
        Cell: row => this.renderCheck(row.original.edit_access, row.original.edit_id, 'top'),
      },
    ];

    const allowColumns = [
      {
        Header: '',
        accessor: 'permission_type',
        width: 200,
        Cell: row => (
          <div className="permissions-granted-table__permission-cell">
            <span className="permissions-granted-table__permission-text">
              {row.original.permission_type}
            </span>
          </div>
        ),
      },
      {
        Header: 'Allow',
        accessor: 'allow_access',
        width: 75,
        Cell: row => this.renderCheck(row.original.allow_access, row.original.allow_id, 'bottom'),
      },
    ];

    const tableData = this.createTableData();

    return (
      <React.Fragment>
        <SAMTable
          className="permissions-granted-table permissions-granted-table__view"
          columns={viewAndEditColumns}
          data={tableData.viewAndEditData}
          pageSize={tableData.viewAndEditData.length}
          sortable={false}
        />
        <SAMTable
          className="permissions-granted-table permissions-granted-table__allow"
          columns={allowColumns}
          data={tableData.allowData}
          pageSize={tableData.allowData.length}
          sortable={false}
        />
      </React.Fragment>
    );
  }
}

PermissionsGrantedTable.defaultProps = {
  userOrg: '',
  editMode: true,
  permissionsChecked: [],
};

PermissionsGrantedTable.propTypes = {
  permissions: PropTypes.array.isRequired,
  editMode: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func,
  permissionsChecked: PropTypes.array,
  editingSameAccount: PropTypes.bool,
  userOrg: PropTypes.string,
};

export default PermissionsGrantedTable;
