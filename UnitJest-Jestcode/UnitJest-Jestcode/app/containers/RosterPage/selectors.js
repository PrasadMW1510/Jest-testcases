import { createSelector } from 'reselect';

/**
 * Direct selector to the rosterPage state domain
 */
const selectRosterPageDomain = state => state.get('rosterPage');
const selectProgramDisplayName = state =>
  state.getIn(['rosterPage', 'selectedProgram']).display_name;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RosterPage
 */

const makeSelectRosterPage = () =>
  createSelector(selectRosterPageDomain, substate => substate.toJS());

const makeSelectProgramDisplayName = () =>
  createSelector(selectProgramDisplayName, displayName => displayName);

export default makeSelectRosterPage;
export { makeSelectProgramDisplayName, selectRosterPageDomain };
