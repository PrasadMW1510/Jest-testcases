import { createSelector } from 'reselect';

/**
 * Direct selector to the printCustomQuizList state domain
 */
const selectPrintCustomQuizListDomain = state => state.get('printCustomQuizList');

/**
 * Other specific selectors
 */

/**
 * Default selector used by PrintCustomQuizList
 */

const makeSelectPrintCustomQuizList = () =>
  createSelector(selectPrintCustomQuizListDomain, substate => substate.toJS());

export default makeSelectPrintCustomQuizList;
export { selectPrintCustomQuizListDomain };
