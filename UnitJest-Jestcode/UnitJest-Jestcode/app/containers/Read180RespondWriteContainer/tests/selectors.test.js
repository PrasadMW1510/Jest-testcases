import { fromJS } from 'immutable';
import makeSelectRead180RespondWriteContainer from '../selectors';
describe('make Select Search Result Details Container', () => {
  it('should select the makeSelect makeSelectRead180RespondWriteContainer ', () => {
    const read180RespondWriteContainer = fromJS({
      advancedSearchContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      read180RespondWriteContainer,
    });

    expect(makeSelectRead180RespondWriteContainer()(mockedState)).toEqual(
      read180RespondWriteContainer.toJS()
    );
  });
});
