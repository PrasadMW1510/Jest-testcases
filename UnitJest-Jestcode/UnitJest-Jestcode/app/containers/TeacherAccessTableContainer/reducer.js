/*
 *
 * TeacherAccessTableContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  teacherEnroll: [],
  teacherAppsUsage: [],
  itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
  loading: true,
  paginationData: {},
  saveSuccess: false,
  loadingApps: true,
});

function teacherAccessTableContainerReducer(state = initialState, action) {
  const { teacherEnroll, type, teacherAppsUsage } = action;
  switch (type) {
    case Constants.TEACHER_ENROLL_REQUEST:
      return state
        .set('error', false) // reset on pagination prev/next
        .set('loading', true)
        .set('loadingTeachers', true);
    case Constants.TEACHER_APPS_USAGE_REQUEST:
      return state.set('loadingApps', true);
    case Constants.TEACHER_ACCESS_SAVE_REQUEST:
    case Constants.TEACHER_ACCESS_LOADING:
      return state.set('loading', true).set('saveSuccess', false);
    case Constants.TEACHER_ACCESS_SAVE_REQUEST_SUCCESS:
      return state.set('loading', false).set('saveSuccess', true);
    case Constants.TEACHER_ENROLL_REQUEST_SUCCESS:
      return teacherEnroll
        ? state
            .set(
              'itemCount',
              teacherEnroll && teacherEnroll.item_count && fromJS(teacherEnroll.item_count[0])
            )
            .set(
              'teacherEnroll',
              teacherEnroll &&
                teacherEnroll.output_data &&
                fromJS(teacherEnroll.output_data[0].teachers[0].teacher)
            )
            .set('loading', false)
            .set('loadingTeachers', false)
            .set(
              'paginationData',
              fromJS(
                teacherEnroll &&
                  teacherEnroll.pagination_data &&
                  fromJS(teacherEnroll.pagination_data[0])
              )
            )
        : state;
    case Constants.TEACHER_APPS_USAGE_REQUEST_SUCCESS:
      return state.set('teacherAppsUsage', fromJS(teacherAppsUsage)).set('loadingApps', false);
    case Constants.TEACHER_ENROLL_REQUEST_FAILURE:
    case Constants.TEACHER_APPS_USAGE_REQUEST_FAILURE:
    case Constants.TEACHER_ACCESS_SAVE_REQUEST_FAILURE:
    case Constants.TEACHER_ACCESS_LOADING_SUCCESS:
    case Constants.TEACHER_ACCESS_LOADING_FAILURE:
      return state
        .set('error', action.error)
        .set('loadingTeachers', false)
        .set('loadingApps', false)
        .set('loading', false);
    default:
      return state;
  }
}

export default teacherAccessTableContainerReducer;
