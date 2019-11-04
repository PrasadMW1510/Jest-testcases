/*
 *
 * SearchResultsContainer reducer
 *
 */
import { fromJS } from 'immutable';
import * as AppConstants from 'containers/App/constants';
import * as Constants from './constants';

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

function searchResultsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST_SUCCESS:
      return state
        .setIn(['searchResults', 'loading'], false)
        .setIn(['searchResults', 'itemCount'], fromJS(action.searchResults.item_count[0]))
        .setIn(
          ['searchResults', 'results'],
          fromJS(action.searchResults.output_data[0].SrcSearchResp[0].Book)
        )
        .setIn(
          ['searchResults', 'paginationData'],
          fromJS(action.searchResults.pagination_data[0])
        );
    case Constants.GET_COLLECTIONSNAME_REQUEST_SUCCESS:
      return state.set(
        'collectionName',
        fromJS(
          action.collectionName.output.output_data[0].GetQuizCollectionNamesResp[0].Collections[0]
            .Collection
        )
      );
    case Constants.BOOK_SELECTED_ROWS:
      return state
        .set('selectedItems', fromJS(action.selectedrows))
        .set('searchResultsIdsChecked', fromJS(action.selectedIds));
    case Constants.DELETE_SELECTED_ROWS:
      return state.set('selectedItems', []).set('searchResultsIdsChecked', []);
    case Constants.PUT_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST:
      return state.set('searchOpts', action.searchOpts);
    case Constants.CLEAR_SEARCH_OPTIONS:
      return state.set('searchOpts', {});
    case AppConstants.LOGOUT_REQUEST_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default searchResultsContainerReducer;
