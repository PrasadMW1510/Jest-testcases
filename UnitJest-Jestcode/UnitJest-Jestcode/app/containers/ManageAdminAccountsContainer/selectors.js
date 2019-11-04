import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the searchModalContainer state domain
 */
export const selectManageAdminAccountsContainerDomain = state =>
  state.get('manageAdminAccountsContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClassAssignModal
 */

const makeSelectManageAdminAccountsContainer = () =>
  createSelector(selectManageAdminAccountsContainerDomain, substate => substate);

export const makeSelectAdminToEditData = () =>
  createSelector(
    selectManageAdminAccountsContainerDomain,
    manageAdminState => (manageAdminState ? manageAdminState.get('adminToEdit') : null)
  );

export const isManageAdminAccountsLoading = () =>
  createSelector(
    selectManageAdminAccountsContainerDomain,
    manageAdminState => (manageAdminState ? manageAdminState.get('loading') : true)
  );

export const makeSelectAdminToEditUserId = () =>
  createSelector(makeSelectAdminToEditData(), adminData => adminData.getIn(['user_id', 0]));

const makeSelectAdminToEditOrganizationData = () =>
  createSelector(
    makeSelectAdminToEditData(),
    adminData => adminData && adminData.get('organizations')
  );

export const makeSelectAdminToEditUserOrg = () =>
  createSelector(makeSelectAdminToEditOrganizationData(), orgList => {
    const firstOrg = orgList && orgList.getIn([0, 'organization', 0]);
    return firstOrg && _.capitalize(firstOrg.getIn(['type', 0]));
  });

export const makeSelectAdminToEditUserOrgId = () =>
  createSelector(makeSelectAdminToEditOrganizationData(), orgList => {
    const firstOrg = orgList && orgList.getIn([0, 'organization', 0]);
    return firstOrg && firstOrg.getIn(['org_id', 0]);
  });

export default makeSelectManageAdminAccountsContainer;
