import { fromJS } from 'immutable';
import makeSelectExportTeacherMadeQuizzesContainer from '../selectors';
describe('make Select Search Result Details Container', () => {
  it('should select the makeSelect makeSelectDeactivateQuizContainer', () => {
    const exportTeacherMadeQuizzesContainer = fromJS({
      advancedSearchContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      exportTeacherMadeQuizzesContainer,
    });

    expect(makeSelectExportTeacherMadeQuizzesContainer()(mockedState)).toEqual(
      exportTeacherMadeQuizzesContainer.toJS()
    );
  });
});
