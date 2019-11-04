import { createSelector } from 'reselect';

/**
 * Direct selector to the resourcesProgram state domain
 */
const selectResourcesPageDomain = state => state.get('resourcesPage');

/**
 * Default selector used by ResourcesProgram
 */

const makeSelectResourcesPage = () =>
  createSelector(selectResourcesPageDomain, substate => substate.get('output'));

const makeSelectSAMBuildVersion = () =>
  createSelector(selectResourcesPageDomain, substate =>
    substate.getIn(['buildInfo', 'build_info', 'build_number', 0])
  );

const makeSelectResourceQuickModalStatus = () =>
  createSelector(selectResourcesPageDomain, substate => substate.get('modalQuickStatus'));

const makeSelectQuickSearch = () =>
  createSelector(selectResourcesPageDomain, substate => substate.get('quickSearch'));

// export default ;
export {
  selectResourcesPageDomain,
  makeSelectResourcesPage,
  makeSelectSAMBuildVersion,
  makeSelectResourceQuickModalStatus,
  makeSelectQuickSearch,
};
