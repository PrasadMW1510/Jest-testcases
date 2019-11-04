import { fromJS } from 'immutable';
import makeSelectPrintQuizAndAnswerKeyContainer from '../selectors';
describe('make Select Search Result Details Container', () => {
  it('should select the makeSelect makeSelectCustomListContainer', () => {
    const printQuizAndAnswerKeyContainer = fromJS({
      advancedSearchContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      printQuizAndAnswerKeyContainer,
    });

    expect(makeSelectPrintQuizAndAnswerKeyContainer()(mockedState)).toEqual(
      printQuizAndAnswerKeyContainer.toJS()
    );
  });
});
