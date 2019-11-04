import { fromJS } from 'immutable';
import searchResultsContainerReducer from '../reducer';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('SearchResultsContainer reducer', () => {
  const initialState = fromJS({
    error: false,
    searchResults: {
      loading: false,
      results: [],
      itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
      paginationData: {},
    },
    collectionName: [],
    selectedItems: [],
    searchResultsIdsChecked: [],
    searchOpts: {},
  });

  it('returns the initial state', () => {
    expect(searchResultsContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle GET_COLLECTIONSNAME_REQUEST_SUCCESS', () => {
    const updatedVal = {};
    const collectionNameObj = {
      output: {
        output_data: [
          {
            GetQuizCollectionNamesResp: [{ Collections: [{ Collection: updatedVal }] }, { b: 'b' }],
          },
        ],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      collectionName: updatedVal,
    });
    expect(
      searchResultsContainerReducer(
        undefined,
        Actions.getCollectionsNameRequestSuccess(collectionNameObj)
      )
    ).toEqual(updatedState);
  });

  it('should handle GET_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST_SUCCESS', () => {
    const updatedVal = [];
    const searchResultsobj = {
      output_data: [
        {
          SrcSearchResp: [{ Book: updatedVal }, { b: 'b' }],
        },
      ],
      pagination_data: [{}],
      item_count: [-1],
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
    });
    expect(
      searchResultsContainerReducer(
        undefined,
        Actions.getAllTeacherMadeQuizDataRequestSuccess(searchResultsobj)
      )
    ).toEqual(updatedState);
  });
  it('should handle DELETE_SELECTED_ROWS', () => {
    expect(
      searchResultsContainerReducer(undefined, Actions.clearSelectedCustomList())
    ).toMatchSnapshot();
  });
  it('should handle PUT_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST', () => {
    expect(
      searchResultsContainerReducer(undefined, Actions.putAllTeacherMadeQuizDataRequest())
    ).toMatchSnapshot();
  });
  it('should handle BOOK_SELECTED_ROWS', () => {
    expect(
      searchResultsContainerReducer(undefined, Actions.makeSelectedbookresults())
    ).toMatchSnapshot();
  });
  it('should handle CLEAR_SEARCH_OPTIONS', () => {
    expect(
      searchResultsContainerReducer(undefined, Actions.clearSearchOptions())
    ).toMatchSnapshot();
  });
});
