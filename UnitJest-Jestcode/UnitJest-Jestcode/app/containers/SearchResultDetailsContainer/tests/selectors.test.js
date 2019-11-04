import { fromJS } from 'immutable';
import makeSelectSearchResultDetailsContainer from '../selectors';
describe('make Select Search Result Details Container', () => {
  it('should select the makeSelect makeSelectSearchResultDetailsContainer', () => {
    const searchResultDetailsContainer = fromJS({
      advancedSearchContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      searchResultDetailsContainer,
    });

    expect(makeSelectSearchResultDetailsContainer()(mockedState)).toEqual(
      searchResultDetailsContainer.toJS()
    );
  });
});
