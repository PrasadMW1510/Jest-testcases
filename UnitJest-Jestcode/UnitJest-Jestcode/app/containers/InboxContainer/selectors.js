import { createSelector } from 'reselect';

/**
 * Direct selector to the inboxContainer state domain
 */
const selectInboxContainerDomain = state => state.get('inboxContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by InboxContainer
 */

const makeSelectInboxContainer = () =>
  createSelector(selectInboxContainerDomain, substate => substate.toJS());

export default makeSelectInboxContainer;
export { selectInboxContainerDomain };
