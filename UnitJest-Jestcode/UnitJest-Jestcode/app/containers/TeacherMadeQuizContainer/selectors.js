import { createSelector } from 'reselect';

const selectTeacherMadeQuizContainerDomain = state => state.get('teacherMadeQuizContainer');
/**
 * Default selector used by TeacherMadeQuizContainer
 */
const makeSelectTeacherMadeQuizContainer = () =>
  createSelector(selectTeacherMadeQuizContainerDomain, substate => substate.toJS());

export default makeSelectTeacherMadeQuizContainer;
export { selectTeacherMadeQuizContainerDomain };
