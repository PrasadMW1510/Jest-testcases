import * as Actions from '../actions';

describe('BookQuizContainer actions', () => {});
describe('All actions', () => {
  it('should return the correct constant for resetSearchResultsData', () => {
    expect(Actions.resetSearchResultsData()).toMatchSnapshot();
  });
  it('should return the correct constant for getSearchResultsRequest', () => {
    expect(Actions.getSearchResultsRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for getSearchResultsRequestSuccess', () => {
    const searchResults = [{ name: 'award 1' }];
    expect(Actions.getSearchResultsRequestSuccess(searchResults)).toMatchSnapshot();
  });
  it('should return the correct constant for getSearchResultsRequestSuccess', () => {
    expect(Actions.getSearchResultsRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getSearchResultsRequestFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.getSearchResultsRequestFailure(error)).toMatchSnapshot();
  });
});
