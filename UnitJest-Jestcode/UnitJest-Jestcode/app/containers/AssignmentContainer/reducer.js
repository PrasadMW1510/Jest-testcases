/*
 *
 * AssignmentContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  classData: [],
  selectedClassAssignments: [],
  classAssignmentForClass: [],
  selectedClass: false,
  communityId: '',
  classId: '',
  programList: [],
});

function assignmentContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_PORTFOLIO_ASSIGNMENT_CLASSES:
      return state.set('classData', fromJS(action.updTeacherObj));
    case Constants.SET_PORTFOLIO_ASSIGNMENT_CLASSES_ASS_LIST:
      return state
        .set('selectedClassAssignments', fromJS(action.newData))
        .set('selectedClass', true);
    case Constants.GET_PORTFOLIO_ASSIGNMENT_CLASSES_ASS_LIST_TEMP:
      return state
        .set('communityId', action.communityId)
        .set('classId', action.data)
        .set('classAssignmentForClass', fromJS(action.newGrid));
    default:
      return state;
  }
}

export default assignmentContainerReducer;
