import { createSelector } from 'reselect';

/**
 * Direct selector to the reportsPage state domain
 */
const selectReportsPageDomain = state => state.get('reportsPage');
/**
 * Default selector used by ReportsPage
 */

const makeSelectReportsPage = () => createSelector(selectReportsPageDomain, substate => substate);

export default makeSelectReportsPage;
export { selectReportsPageDomain };
