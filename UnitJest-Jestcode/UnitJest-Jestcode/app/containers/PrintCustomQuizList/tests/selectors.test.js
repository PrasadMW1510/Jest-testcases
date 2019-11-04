import { fromJS } from 'immutable';
import makeSelectPrintCustomQuizList from '../selectors';
describe('make Select Search Result Details Container', () => {
  it('should select the makeSelect makeSelectCustomListContainer', () => {
    const printCustomQuizList = fromJS({
      advancedSearchContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      printCustomQuizList,
    });

    expect(makeSelectPrintCustomQuizList()(mockedState)).toEqual(printCustomQuizList.toJS());
  });
});
