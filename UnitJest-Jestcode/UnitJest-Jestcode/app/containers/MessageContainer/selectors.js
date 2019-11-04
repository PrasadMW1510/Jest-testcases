import { createSelector } from 'reselect';

/**
 * Direct selector to the messageContainer state domain
 */
const selectMessageContainerDomain = state => state.get('messageContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by MessageContainer
 */

const makeSelectMessageContainer = () =>
  createSelector(selectMessageContainerDomain, substate => substate);

const isMessageContainerLoading = () =>
  createSelector(
    selectMessageContainerDomain,
    messageState => (messageState ? messageState.get('loading') : true)
  );

export default makeSelectMessageContainer;
export { selectMessageContainerDomain, isMessageContainerLoading };
