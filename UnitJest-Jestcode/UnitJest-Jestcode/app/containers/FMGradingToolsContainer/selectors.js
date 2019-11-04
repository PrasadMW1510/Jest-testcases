import { createSelector } from 'reselect';

/**
 * Direct selector to the state domain
 */
const selectFMGradingTools = state => state.get('fmGradingTools');

const makeSelectFMStudentOperations = () =>
  createSelector(selectFMGradingTools, fmGradingToolsState =>
    fmGradingToolsState.get('studentOperations').toJS()
  );

export { selectFMGradingTools, makeSelectFMStudentOperations };
