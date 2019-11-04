import { createSelector } from 'reselect';
/**
 * Direct selector to the resourcesSelector state domain
 */
const selectSamResource = state => state.get('resourcesActivity');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ResourcesSelector
 */

const makeSamResourceAppInfo = () =>
  createSelector(selectSamResource, resourcesActivitystate =>
    resourcesActivitystate.get('SamResources')
  );

const makeITSAppInfo = () =>
  createSelector(selectSamResource, resourcesActivitystate =>
    resourcesActivitystate.get('ITSApps')
  );

const makeSelectAppSelected = () =>
  createSelector(selectSamResource, resourcesActivitystate => resourcesActivitystate.get('AppId'));

const makeSelectResourcesModal = () =>
  createSelector(selectSamResource, resourcesActivitystate =>
    resourcesActivitystate.get('resourcesObject')
  );

const makeSelectModalSearchStatus = () =>
  createSelector(selectSamResource, resourcesActivitystate =>
    resourcesActivitystate.get('modalSearchStatus')
  );

// export default makeSelectResourcesSelector;
export {
  makeSamResourceAppInfo,
  makeITSAppInfo,
  makeSelectAppSelected,
  makeSelectResourcesModal,
  makeSelectModalSearchStatus,
};
