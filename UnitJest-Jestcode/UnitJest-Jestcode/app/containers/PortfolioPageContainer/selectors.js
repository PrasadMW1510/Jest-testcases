import { createSelector } from 'reselect';

/**
 * Direct selector to the portfolioPageContainer state domain
 */
const selectPortfolioPageContainerDomain = state => state.get('portfolioPageContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by PortfolioPageContainer
 */

const schoolList = () =>
  createSelector(selectPortfolioPageContainerDomain, substate => substate.toJS());

const makeSelectPortfolioPageContainer = () =>
  createSelector(selectPortfolioPageContainerDomain, substate => substate.toJS());

export default makeSelectPortfolioPageContainer;
export { selectPortfolioPageContainerDomain, schoolList };
