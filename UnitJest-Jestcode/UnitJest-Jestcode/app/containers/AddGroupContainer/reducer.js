/*
 *
 * AddGroupContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  classesWithStudents: {},
  errorClassesWithStudents: false,
  postGroupId: {},
  errorPostGroupId: {},
  getGroupInfoSuccess: {},
  getGroupInfoFailure: {},
});

function addGroupContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_CLASSES_WITH_STUDENT_INFO_SUCCESS:
      return state.set('classesWithStudents', fromJS(action.classInfo));
    case Constants.GET_CLASSES_WITH_STUDENT_INFO_FAILURE:
      return state.set('errorClassesWithStudents', action.error);
    case Constants.POST_GROUP_SUCCESS:
      return state.set('postGroupId', fromJS(action.groupInfo));
    case Constants.POST_GROUP_FAILURE:
      return state.set('errorPostGroupId', fromJS(action.error));
    case Constants.GET_GROUP_INFO_SUCCESS:
      return state.set('getGroupInfoSuccess', fromJS(action.groupDetails));
    case Constants.GET_GROUP_INFO_FAILURE:
      return state.set('getGroupInfoFailure', fromJS(action.error));
    case Constants.RESET_GROUP_STATUS:
      return initialState;
    default:
      return state;
  }
}

export default addGroupContainerReducer;
