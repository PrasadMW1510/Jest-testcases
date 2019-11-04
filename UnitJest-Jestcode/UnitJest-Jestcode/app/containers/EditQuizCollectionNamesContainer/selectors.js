import { createSelector } from 'reselect';

/**
 * Direct selector to the editQuizCollectionNamesContainer state domain
 */
const selectEditQuizCollectionNamesContainerDomain = state =>
  state.get('editQuizCollectionNamesContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditQuizCollectionNamesContainer
 */

const makeSelectEditQuizCollectionNamesContainer = () =>
  createSelector(selectEditQuizCollectionNamesContainerDomain, substate => substate.toJS());

export default makeSelectEditQuizCollectionNamesContainer;
export { selectEditQuizCollectionNamesContainerDomain };
