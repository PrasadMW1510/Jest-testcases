import { createSelector } from 'reselect';
import { MIA_OPTIONS } from 'components/ManageInactiveAccounts/constants';

/**
 * Direct selector to the manageInactiveAccounts state domain
 */
const selectManageInactiveAccountsDomain = state => state.get('manageInactiveAccounts');

/**
 * Other specific selectors
 */

const selectInactiveMembers = immInactiveAccountInfo =>
  immInactiveAccountInfo.get('inactiveMembers').toJS();

const selectLoading = immInactiveAccountInfo => immInactiveAccountInfo.get('loading');

const selectPaginationData = immInactiveAccountInfo => ({
  itemCount: immInactiveAccountInfo.get('itemCount'),
  ...immInactiveAccountInfo.get('paginationData').toJS(),
});

const indexMiaOptionColumnsByAccessor = () => {
  const index = {};
  Object.entries(MIA_OPTIONS).forEach(entry => {
    const columns = entry[1].Columns;
    index[entry[0]] = {};
    columns.forEach(column => {
      index[entry[0]][column.accessor] = column;
      if (column.defaultSort) {
        index[entry[0]].defaultSortColumn = column.queryParam;
      }
    });
  });
  return index;
};

const selectMiaOptionColumns = createSelector(indexMiaOptionColumnsByAccessor);

const makeSelectInactiveAccountInfo = () =>
  createSelector(selectManageInactiveAccountsDomain, substate => substate);

export {
  makeSelectInactiveAccountInfo,
  selectInactiveMembers,
  selectLoading,
  selectMiaOptionColumns,
  selectPaginationData,
};
