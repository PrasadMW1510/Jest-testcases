/*
 *
 * StudentEnrollmentTableContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  studentEnroll: [],
  studentAppsUsage: [],
  studentGetList: [],
  samCentralStatus: [],
  itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
  loading: true,
  paginationData: {},
});

function studentEnrollmentTableContainerReducer(state = initialState, action) {
  const { studentEnroll, type, studentAppsUsage, studentGetList, samCentralStatus } = action;
  switch (type) {
    case Constants.STUDENT_ENROLL_REQUEST:
      return state
        .set('loading', true)
        .set('loadingApps', true)
        .set('loadingStudents', true);
    case Constants.STUDENT_ENROLL_SAVE_REQUEST:
    case Constants.STUDENT_ENROLL_LOADING:
      return state.set('loading', true);
    case Constants.STUDENT_GET_LIST_REQUEST:
      return state.set('loading', true);
    case Constants.SAM_CENTRAL_STATUS_REQUEST:
      return state.set('loading', true);
    case Constants.STUDENT_ENROLL_SAVE_REQUEST_SUCCESS:
    case Constants.STUDENT_ENROLL_LOADING_SUCCESS:
    case Constants.STUDENT_ENROLL_LOADING_FAILURE:
      return state.set('loading', false);
    case Constants.STUDENT_ENROLL_REQUEST_SUCCESS:
      return studentEnroll
        ? state
            .set(
              'itemCount',
              studentEnroll && studentEnroll.item_count && fromJS(studentEnroll.item_count[0])
            )
            .set(
              'studentEnroll',
              studentEnroll &&
                studentEnroll.output_data &&
                ((studentEnroll.output_data[0].students &&
                  fromJS(studentEnroll.output_data[0].students[0].student)) ||
                  (studentEnroll.output_data[0].teachers &&
                    fromJS(studentEnroll.output_data[0].teachers[0].student)))
            )
            .set('loading', false)
            .set('loadingStudents', false)
            .set(
              'paginationData',
              fromJS(
                studentEnroll &&
                  studentEnroll.pagination_data &&
                  fromJS(studentEnroll.pagination_data[0])
              )
            )
        : state;
    case Constants.STUDENT_APPS_USAGE_REQUEST_SUCCESS:
      return state.set('studentAppsUsage', fromJS(studentAppsUsage)).set('loadingApps', false);
    case Constants.STUDENT_GET_LIST_REQUEST_SUCCESS:
      return state.set('studentGetList', fromJS(studentGetList)).set('loadingApps', false);
    case Constants.SAM_CENTRAL_STATUS_REQUEST_SUCCESS:
      return state.set('samCentralStatus', fromJS(samCentralStatus)).set('loadingApps', false);
    case Constants.STUDENT_ENROLL_REQUEST_FAILURE:
    case Constants.STUDENT_APPS_USAGE_REQUEST_FAILURE:
    case Constants.STUDENT_ENROLL_SAVE_REQUEST_FAILURE:
    case Constants.STUDENT_GET_LIST_REQUEST_FAILURE:
    case Constants.SAM_CENTRAL_STATUS_REQUEST_FAILURE:
      return state
        .set('error', action.error)
        .set('loadingStudents', false)
        .set('loadingApps', false)
        .set('loading', false);
    default:
      return state;
  }
}

export default studentEnrollmentTableContainerReducer;
