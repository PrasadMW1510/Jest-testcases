import { createSelector } from 'reselect';

/**
 * Direct selector to the inboxModalContainer state domain
 */
const selectInboxModalContainerDomain = state => state.get('inboxModalContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by InboxModalContainer
 */

const makeSelectInboxModalContainer = () =>
  createSelector(selectInboxModalContainerDomain, substate => substate.toJS());

export default makeSelectInboxModalContainer;
export { selectInboxModalContainerDomain };
