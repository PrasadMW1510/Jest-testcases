/**
 *
 * EditAdminForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import SAMButton from 'components/SAMButton';
import SAMModal from 'components/SAMModal';
import NavBar, { NavItem } from 'components/NavBar';
import { USER_ORG } from 'containers/App/constants';
import { FormSection, FormErrors } from 'components/forms';
import SAMAccountForm from 'components/SAMAccountForm';
import PermissionsGrantedTable from 'components/PermissionsGrantedTable';
import * as AdminConstants from 'components/ManageAdminAccounts/constants';
import { TABS, TAB_1, TAB_2, DA_PERMISSIONS } from './constants';
import './EditAdminForm.scss';

class EditAdminForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: TAB_1.id,
      // TO-Do logic for other admins
      permissionsChecked: DA_PERMISSIONS,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { adminToEditData } = this.props;

    let permissionIds;

    if (adminToEditData !== nextProps.adminToEditData) {
      const { permissions } = nextProps.adminToEditData.toJS();
      if (permissions && permissions.length) {
        // TO-DO Make this a selector
        permissionIds = permissions[0].permission.map(p => Number(p.id[0]));
      } else {
        permissionIds = [];
      }
      this.setState({ permissionsChecked: permissionIds });
    }
  }

  handleTabClick = ev => this.setState({ activeTab: ev.currentTarget.id });

  handleSave = values => this.props.handleSave(values, this.state.permissionsChecked);

  createNavBar = () =>
    TABS.map(({ label, ...tab }) => (
      <NavItem
        key={tab.id}
        {...tab}
        onClick={this.handleTabClick}
        hasErrors={this.showNavBarError(tab.id)}
      >
        {label}
      </NavItem>
    ));

  filterPermissions = (checked, selectedId) => {
    if (checked) {
      this.setState({
        permissionsChecked: this.state.permissionsChecked.concat(selectedId),
      });
    } else {
      this.setState({
        permissionsChecked: this.state.permissionsChecked.filter(id => id !== selectedId),
      });
    }
  };

  showSection = tabId => ({ display: this.state.activeTab === tabId ? 'block' : 'none' });

  showNavBarError = tabId => this.props.submitFailed && tabId === TAB_1.id;

  renderHeading = () => {
    const { data } = this.props;
    let heading;

    heading = (
      <h2 className="edit-admin__heading">Edit {this.props.userOrg} Administrator Profile</h2>
    );

    if (!data.editMode) {
      heading = <h2 className="edit-admin__heading">Add a {data.adminType} Administrator</h2>;
    }

    if (data.editMode && !data.editingSameAccount) {
      heading = <h2 className="edit-admin__heading">Edit {data.adminType} Administrator</h2>;
    }

    return heading;
  };

  render() {
    const { activeTab } = this.state;
    const { submitErrors, submitFailed, validationErrors, data } = this.props;

    const hasErrorsOnSave = submitFailed && !!(validationErrors || submitErrors);

    const editOrEnter = data.editMode ? 'Edit' : 'Enter';
    const isSchoolAdminForm =
      data.adminType === AdminConstants.SCHOOL ||
      data.adminType === AdminConstants.SCHOOL_TECHNICAL;

    let permissionOrgType = this.props.userOrg;
    let schools = this.props.schools.toJS();

    if (!data.editMode || !data.editingSameAccount) {
      permissionOrgType = isSchoolAdminForm ? USER_ORG.School : USER_ORG.District;

      // School Admins can add only to a single school

      if (this.props.userOrg === USER_ORG.School) {
        schools = [this.props.school.toJS()];
      }
    }

    return (
      <SAMModal isOpen={this.props.isOpen} modalClassModifier="modal--edit-admin">
        <div className="edit-admin edit-admin--orange">
          {this.renderHeading()}
          <div className="edit-admin__intro">
            {editOrEnter} information about this administrative account on the Profile and
            Permissions tabs. Items marked with an asterisk (*) are required. When you are done,
            click Save to finish.
          </div>
          <div className="edit-admin__navbar-bg">
            <NavBar activeItemId={activeTab} theme="tabs" palette="orange" inset>
              {this.createNavBar()}
            </NavBar>
          </div>
          <form onSubmit={this.props.handleSubmit(this.handleSave)}>
            <div className="edit-admin__body">
              <main className="edit-admin__body-main">
                <div className="edit-admin__error-message">
                  {hasErrorsOnSave && 'Please correct your entries as indicated.'}
                </div>
                <FormSection
                  sectionClassModifier="edit-admin__section"
                  headerText={TAB_1.sectionHeaderText}
                  sectionStyle={this.showSection(TAB_1.id)}
                >
                  <SAMAccountForm
                    accountType={this.props.data.accountType}
                    editMode={this.props.data.editMode}
                    editingSameAccount={this.props.editingSameAccount}
                    passwordConfigsArray={this.props.passwordConfigsArray}
                    userOrg={this.props.userOrg}
                    schools={schools}
                    isSchoolAdminForm={isSchoolAdminForm}
                  />
                </FormSection>
                <FormSection
                  sectionClassModifier="edit-admin__permissions-section"
                  headerText={TAB_2.sectionHeaderText}
                  sectionStyle={this.showSection(TAB_2.id)}
                >
                  <PermissionsGrantedTable
                    permissions={this.props.permissions.toJS()}
                    editMode={this.props.data.editMode}
                    editingSameAccount={this.props.editingSameAccount}
                    userOrg={permissionOrgType}
                    permissionsChecked={this.state.permissionsChecked}
                    onCheckboxChange={this.filterPermissions}
                  />
                </FormSection>
              </main>
              <aside className="edit-admin__body-aside">
                <FormErrors
                  shouldShowErrors={hasErrorsOnSave}
                  submitErrors={submitErrors.toJS()}
                  validationErrors={validationErrors}
                />
                <div>
                  <SAMButton onClickHandler={this.props.handleCancel}>Cancel</SAMButton>
                  <SAMButton isPrimaryButton buttonType="submit">
                    Save
                  </SAMButton>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </SAMModal>
    );
  }
}

EditAdminForm.defaultProps = {
  adminToEditData: fromJS({
    permissions: [],
  }),
  isOpen: false,
  submitErrors: fromJS({}),
  submitFailed: false,
  validationErrors: null,
  userOrg: '',
  schools: fromJS({}),
};

EditAdminForm.propTypes = {
  data: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  passwordConfigsArray: PropTypes.array.isRequired,
  permissions: PropTypes.object.isRequired,
  schools: PropTypes.object.isRequired,
  school: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  adminToEditData: PropTypes.object,
  editingSameAccount: PropTypes.bool,
  submitErrors: PropTypes.object,
  submitFailed: PropTypes.bool,
  validationErrors: PropTypes.object,
  userOrg: PropTypes.string,
};

export default EditAdminForm;
