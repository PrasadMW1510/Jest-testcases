/*
 *
 * StudentWorkProgramsContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  iReadStudentWorkData: [],
  openSaveSuccessModal: false,
  showDeleteModal: false,
});

function studentWorkProgramsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_IREAD_STUDENT_WORK_DATA:
      return state.set('openSaveSuccessModal', false).set('showDeleteModal', false);
    case Constants.GET_IREAD_STUDENT_WORK_DATA_SUCCESS:
      return state
        .set(
          'iReadStudentWorkData',
          fromJS(
            action.data.output_data[0].workItems[0].classAssignmentWorkItem[0]
              .classAssignmentGroup[0].classAssignment[0].studentAssignments[0].student[0]
          )
        )
        .set('openSaveSuccessModal', true)
        .set('showDeleteModal', false);
    case Constants.POST_IREAD_STUDENT_WORK_DATA:
      return state.set('openSaveSuccessModal', false);
    case Constants.SAVE_IREAD_STUDENT_WORK_DATA_REQUEST_SUCCESS:
      return state.set('openSaveSuccessModal', true);
    case Constants.SAVE_IREAD_STUDENT_WORK_DATA_REQUEST_FAILURE:
      return state.set('openSaveSuccessModal', false);
    case Constants.SHOW_DELETE_MODAL:
      return state.set('showDeleteModal', true);
    case Constants.DELETE_IREAD_STUDENT_WORK_SUCCESS:
      return state.set('showDeleteModal', false);
    default:
      return state;
  }
}

export default studentWorkProgramsContainerReducer;
