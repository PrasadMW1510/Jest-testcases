/*
 *
 * SearchModalContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  loading: true,
  metaDataInitialized: false,
  searchMeta: {
    apps: [],
    classes: [],
    grades: [],
    schools: [],
    teachers: [],
  },
  searchResults: {
    loading: false,
    students: [],
    teachers: [],
    itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
    paginationData: {},
  },
});

/**
 * Utility method to parse student data
 */
function resultsStudentParser(data) {
  if (data.students && data.students[0]) {
    return data.students[0].student;
  }
  return [];
}

/**
 * Utility method to parse teacher data
 */
function resultsTeacherParser(data) {
  if (data.teachers && data.teachers[0]) {
    return data.teachers[0].teacher;
  }
  return [];
}

function searchModalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.RESET_SEARCH_META_DATA_REQUEST:
      return initialState;
    case Constants.RESET_FOR_SEARCH_BY_CHANGE_REQUEST:
      return state
        .setIn(['searchResults', 'students'], fromJS([]))
        .setIn(['searchResults', 'teachers'], fromJS([]))
        .setIn(['searchResults', 'loading'], false)
        .setIn(['searchResults', 'itemCount'], Constants.UNINITIALIZED_ITEM_COUNT)
        .setIn(['searchResults', 'paginationData'], fromJS({}));
    case Constants.RESET_SEARCH_RESULTS_REQUEST:
      return state
        .setIn(['searchResults', 'students'], fromJS([]))
        .setIn(['searchResults', 'teachers'], fromJS([]))
        .setIn(['searchResults', 'loading'], true)
        .setIn(['searchResults', 'itemCount'], Constants.UNINITIALIZED_ITEM_COUNT)
        .setIn(['searchResults', 'paginationData'], fromJS({}));
    case Constants.GET_SEARCH_META_DATA_REQUEST:
      return state.set('loading', true);
    case Constants.GET_SEARCH_META_DATA_REQUEST_SUCCESS:
      return state.set('loading', false).set('metaDataInitialized', true);
    case Constants.GET_APPS_FOR_SEARCH_REQUEST_SUCCESS:
      return state.setIn(['searchMeta', 'apps'], fromJS(action.appsForSearch.application));
    case Constants.GET_CLASSES_FOR_SEARCH_REQUEST_SUCCESS:
      return state.setIn(['searchMeta', 'classes'], fromJS(action.classesForSearch.class));
    case Constants.GET_GRADES_FOR_SEARCH_REQUEST_SUCCESS:
      return state.setIn(['searchMeta', 'grades'], fromJS(action.gradesForSearch.grade));
    case Constants.GET_SCHOOLS_FOR_SEARCH_REQUEST_SUCCESS:
      return state.setIn(['searchMeta', 'schools'], fromJS(action.schoolsForSearch.school));
    case Constants.GET_TEACHERS_FOR_SEARCH_REQUEST_SUCCESS:
      return state.setIn(['searchMeta', 'teachers'], fromJS(action.teachersForSearch.teacher));
    case Constants.GET_APPS_FOR_SEARCH_REQUEST_FAILURE:
    case Constants.GET_CLASSES_FOR_SEARCH_REQUEST_FAILURE:
    case Constants.GET_GRADES_FOR_SEARCH_REQUEST_FAILURE:
    case Constants.GET_SCHOOLS_FOR_SEARCH_REQUEST_FAILURE:
    case Constants.GET_TEACHERS_FOR_SEARCH_REQUEST_FAILURE:
      return state.set('error', `${action.error}`);
    case Constants.GET_SEARCH_META_DATA_REQUEST_FAILURE:
      return state.set('error', `${action.error}`).set('loading', true);
    case Constants.GET_SEARCH_RESULTS_REQUEST_SUCCESS: {
      return state
        .setIn(['searchResults', 'loading'], false)
        .setIn(['searchResults', 'itemCount'], fromJS(action.searchResults.item_count[0]))
        .setIn(
          ['searchResults', 'students'],
          fromJS(resultsStudentParser(action.searchResults.output_data[0].search_results[0]))
        )
        .setIn(
          ['searchResults', 'teachers'],
          fromJS(resultsTeacherParser(action.searchResults.output_data[0].search_results[0]))
        )
        .setIn(
          ['searchResults', 'paginationData'],
          fromJS(action.searchResults.pagination_data[0])
        );
    }
    default:
      return state;
  }
}

export default searchModalContainerReducer;
