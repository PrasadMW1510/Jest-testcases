import { createSelector } from 'reselect';

/**
 * Direct selector to the booksPage state domain
 */
const selectBooksPageDomain = state => state.get('booksPage');

/**
 * Other specific selectors
 */

/**
 * Default selector used by BooksPage
 */

const makeSelectBooksPage = () =>
  createSelector(selectBooksPageDomain, substate => substate.toJS());

export default makeSelectBooksPage;
export { selectBooksPageDomain };
