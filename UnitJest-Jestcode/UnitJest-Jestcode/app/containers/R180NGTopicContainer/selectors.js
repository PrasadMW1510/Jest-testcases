import { createSelector } from 'reselect';

const selectR180NGTopicContainerDomain = state => state.get('r180NGTopicsData');

const makeSelectR180NGTopicContainer = () =>
  createSelector(selectR180NGTopicContainerDomain, substate => substate);

export default makeSelectR180NGTopicContainer;
export { selectR180NGTopicContainerDomain, makeSelectR180NGTopicContainer };
