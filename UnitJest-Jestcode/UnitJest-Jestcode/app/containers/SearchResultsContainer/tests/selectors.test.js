import { fromJS } from 'immutable';
import makeSelectSearchResultsContainer, { getselectedBookingResults } from '../selectors';

describe('search Results Container selector', () => {
  it('should select the search Results', () => {
    const searchResultsContainer = fromJS({
      searchResultsContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      searchResultsContainer,
    });

    expect(makeSelectSearchResultsContainer()(mockedState)).toEqual(searchResultsContainer.toJS());
    expect(getselectedBookingResults()(mockedState)).toMatchSnapshot();
  });
});
