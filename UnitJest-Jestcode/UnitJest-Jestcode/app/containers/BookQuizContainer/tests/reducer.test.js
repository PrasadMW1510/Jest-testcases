import { fromJS } from 'immutable';

import bookQuizContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('bookQuizContainerReducer reducer', () => {
  const initialState = fromJS({
    error: false,
    searchResults: [],
    searchOpts: {},
    searchTerm: '',
  });

  it('returns the initial state', () => {
    expect(bookQuizContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should return initialState when resetSearchMetaData', () => {
    expect(bookQuizContainerReducer(undefined, Actions.resetSearchResultsData())).toEqual(
      initialState
    );
  });
  it('should return initialState when resetSearchMetaData', () => {
    expect(bookQuizContainerReducer(undefined, Actions.setSearchTerm())).toMatchSnapshot();
  });
  it('should return initialState when resetSearchMetaData', () => {
    expect(bookQuizContainerReducer(undefined, Actions.clearSearchTerm())).toMatchSnapshot();
  });
  it('should handle GET_SEARCH_RESULTS_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const searchResultsObj = {
      SrcSearchResp: [{ Book: updatedVal }, { b: 'b' }],
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      searchResults: updatedVal,
      searchOpts: {},
      searchTerm: '',
    });
    expect(
      bookQuizContainerReducer(undefined, Actions.getSearchResultsRequestSuccess(searchResultsObj))
    ).toEqual(updatedState);
  });
});
