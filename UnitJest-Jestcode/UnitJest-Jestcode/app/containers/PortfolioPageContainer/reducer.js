/*
 *
 * PortfolioPageContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  classData: [],
  selectedSchoolId: '',
  selectedGradeId: '',
  selectedClassAssignments: [],
  baseAssignmentData: [],
  programList: [],
  programListforTabs: [],
  rubricDefenitions: [],
  unReadPrograms: 0,
  submissionsCount: 0,
  newThisWeekCount: 0,
  assunReadPrograms: 0,
  asssubmissionsCount: 0,
  assnewThisWeekCount: 0,
  studentSubmissions: {
    loading: false,
    results: [],
    itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
    paginationData: {},
  },
  communityClasses: {
    loading: false,
    results: [],
    itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
    paginationData: {},
  },
});

function portfolioPageContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_PORTFOLIO_TEACHERS_DATA:
      return state.set('classData', fromJS(action.teacherObj));
    case Constants.SET_STUDENT_SUBMISSION_META_DATA:
      return state.set('selectedClassAssignments', fromJS(action.data));
    case Constants.SET_PORTFOLIO_PROGRAM_LIST:
      return state.set('programList', fromJS(action.data));
    case Constants.SET_PORTFOLIO_PROGRAM_LIST_FOR_TABS:
      return state.set('programListforTabs', fromJS(action.data));
    case Constants.GET_STUDENT_SUBMISSION_META_DATA_COUNT:
      return state
        .set('unReadPrograms', action.data.unreadCount)
        .set('submissionsCount', action.data.submissions)
        .set('newThisWeekCount', action.data.newThisWeek)
        .set('assunReadPrograms', action.data.assunreadCount)
        .set('asssubmissionsCount', action.data.asssubmissions)
        .set('assnewThisWeekCount', action.data.assnewThisWeek);
    case Constants.SET_ASSIGNMENT_COUNT:
      return state
        .set('assunReadPrograms', action.data.assUnreadCount)
        .set('asssubmissionsCount', action.data.assSubmissions)
        .set('assnewThisWeekCount', action.data.assNewThisWeek);
    case Constants.SET_ASSIGNMENT_META_DATA:
      return state.set('baseAssignmentData', fromJS(action.data));
    case Constants.GET_STUDENT_SUBMISSION_SUCCESS:
      return state
        .setIn(['studentSubmissions', 'loading'], false)
        .setIn(['studentSubmissions', 'itemCount'], fromJS(action.resultsData.item_count[0]))
        .setIn(
          ['studentSubmissions', 'results'],
          fromJS(action.resultsData.output_data[0].workItemsMetadata[0].workItemMetadata)
        )
        .setIn(
          ['studentSubmissions', 'paginationData'],
          fromJS(action.resultsData.pagination_data[0])
        );
    case Constants.GET_CLASS_COMMUNITY_SUCCESS:
      return state
        .setIn(['communityClasses', 'loading'], false)
        .setIn(['communityClasses', 'itemCount'], fromJS(action.resultsData.item_count[0]))
        .setIn(
          ['communityClasses', 'results'],
          fromJS(action.resultsData.output_data[0].classes[0].class)
        )
        .setIn(
          ['communityClasses', 'paginationData'],
          fromJS(action.resultsData.pagination_data[0])
        );
    case Constants.SET_RUBRIC_DEFENITIONS:
      return state.set('rubricDefenitions', action.data.output_data[0].rubrics[0].rubric);
    default:
      return state;
  }
}

export default portfolioPageContainerReducer;
