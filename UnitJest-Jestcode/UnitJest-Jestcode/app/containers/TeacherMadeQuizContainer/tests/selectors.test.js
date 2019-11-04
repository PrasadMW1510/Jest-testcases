import { fromJS } from 'immutable';
import makeSelectTeacherMadeQuizContainer from '../selectors';
describe('make Select Teacher Made Quiz Container selector', () => {
  it('should select the makeSelect TeacherMadeQuiz', () => {
    const teacherMadeQuizContainer = fromJS({
      advancedSearchContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      teacherMadeQuizContainer,
    });

    expect(makeSelectTeacherMadeQuizContainer()(mockedState)).toEqual(
      teacherMadeQuizContainer.toJS()
    );
  });
});
