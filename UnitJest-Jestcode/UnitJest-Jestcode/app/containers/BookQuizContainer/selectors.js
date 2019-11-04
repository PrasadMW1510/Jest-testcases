import { createSelector } from 'reselect';

/**
 * Direct selector to the BookQuizContainer state domain
 */
const selectBookQuizContainerDomain = state => state.get('bookQuizContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookQuizContainer
 */

const makeSelectBookQuizContainer = () =>
  createSelector(selectBookQuizContainerDomain, substate => substate);

const getSearchedResults = () =>
  createSelector(selectBookQuizContainerDomain, substate => substate);

export default makeSelectBookQuizContainer;
export { selectBookQuizContainerDomain, getSearchedResults };
