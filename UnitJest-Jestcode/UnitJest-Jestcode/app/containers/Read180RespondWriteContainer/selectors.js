import { createSelector } from 'reselect';

/**
 * Direct selector to the read180RespondWriteContainer state domain
 */
const selectRead180RespondWriteContainerDomain = state => state.get('read180RespondWriteContainer');

/**
 * Other specific selectors
 */
/**
 * Default selector used by Read180RespondWriteContainer
 */

const makeSelectRead180RespondWriteContainer = () =>
  createSelector(selectRead180RespondWriteContainerDomain, substate => substate.toJS());

export default makeSelectRead180RespondWriteContainer;
export { selectRead180RespondWriteContainerDomain };
