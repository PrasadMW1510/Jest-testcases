/*
 *
 * AdvancedSearchContainer reducer
 *
 */
import { fromJS } from 'immutable';
import * as AppConstants from 'containers/App/constants';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  awards: [],
  comskill: [],
  culture: [],
  genre: [],
  interestLevel: [],
  programSeries: [],
  topics: [],
  themes: [],
  installedQuizCount: {},
  bookSearchFilters: {
    title: '',
    author: '',
    booktype: '',
    lang: '',
    accessibility: '',
    lexilemax: '',
    lexilemin: '',
    readinglevelmin: '',
    readinglevelmax: '',
    guidereadinglevelmin: '',
    guidereadinglevelmax: '',
    pointsrangemin: '',
    pointsrangemax: '',
    awardsinfo: [],
    comprehensionlist: [],
    culturelist: [],
    genrelist: [],
    interestlevellist: [],
    programserieslist: [],
    topicslist: [],
    themedatalist: [],
    searchbtnvalue: '',
  },
  bookSearch: false,
  bookResult: '0',
});

function advancedSearchContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_AWARDS_REQUEST_SUCCESS:
      return state.set('awards', fromJS(action.awards.output.output_data[0].items[0].item));
    case Constants.GET_COMSKILL_REQUEST_SUCCESS:
      return state.set('comskill', fromJS(action.comskill.output.output_data[0].items[0].item));
    case Constants.GET_CULTURE_REQUEST_SUCCESS:
      return state.set('culture', fromJS(action.culture.output.output_data[0].items[0].item));
    case Constants.GET_GENRE_REQUEST_SUCCESS:
      return state.set('genre', fromJS(action.genre.output.output_data[0].items[0].item));
    case Constants.GET_INTERESTLEVEL_REQUEST_SUCCESS:
      return state.set(
        'interestLevel',
        fromJS(action.interestLevel.output.output_data[0].items[0].item)
      );
    case Constants.GET_PROGRAM_SERIES_REQUEST_SUCCESS:
      return state.set(
        'programSeries',
        fromJS(action.programSeries.output.output_data[0].items[0].item)
      );
    case Constants.GET_TOPICS_REQUEST_SUCCESS:
      return state.set('topics', fromJS(action.topics.output.output_data[0].items[0].item));
    case Constants.GET_THEMES_REQUEST_SUCCESS:
      return state.set('themes', fromJS(action.themes.output.output_data[0].items[0].item));
    case Constants.GET_INSTALLEDQUIZCOUNT_REQUEST_SUCCESS:
      return state.set(
        'installedQuizCount',
        fromJS(action.installedQuizCount.output.output_data[0].GetInstalledQuizCountResp[0])
      );
    case Constants.BOOK_SEARCH_FILTERS:
      return state.set('bookSearchFilters', action.searchfilters).set('bookSearch', true);
    case Constants.BOOK_RESULT:
      return state.set('bookResult', action.resultValue);
    case AppConstants.LOGOUT_REQUEST_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default advancedSearchContainerReducer;
