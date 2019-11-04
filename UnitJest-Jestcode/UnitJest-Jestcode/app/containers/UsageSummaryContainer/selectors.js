/**
 * Created by nairs on 1/14/18.
 */
import { createSelector } from 'reselect';

/**
 * Direct selector to the usageSummaryData state domain
 */
const selectUsageSummaryData = state => state.get('usageSummary');

/**
 * Default selector used by UsageSummaryContainer
 */
const makeSelectUsageSummaryData = () =>
  createSelector(selectUsageSummaryData, substate => substate);

const isUsageSummaryLoading = () =>
  createSelector(
    selectUsageSummaryData,
    usageState => (usageState ? usageState.get('loading') : true)
  );

export default makeSelectUsageSummaryData;
export { selectUsageSummaryData, isUsageSummaryLoading };
