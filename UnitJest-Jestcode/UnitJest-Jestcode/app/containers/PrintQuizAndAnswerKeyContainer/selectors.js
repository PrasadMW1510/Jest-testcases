import { createSelector } from 'reselect';

/**
 * Direct selector to the printQuizAndAnswerKeyContainer state domain
 */
const selectPrintQuizAndAnswerKeyContainerDomain = state =>
  state.get('printQuizAndAnswerKeyContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by PrintQuizAndAnswerKeyContainer
 */

const makeSelectPrintQuizAndAnswerKeyContainer = () =>
  createSelector(selectPrintQuizAndAnswerKeyContainerDomain, substate => substate.toJS());

export default makeSelectPrintQuizAndAnswerKeyContainer;
export { selectPrintQuizAndAnswerKeyContainerDomain };
