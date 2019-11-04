/*
 *
 * EditAssignmentContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  respAssignmentData: null,
  studentDetails: [],
  saveAssignmentSuccess: null,
  deleteAssignmentSucess: null,
});

function editAssignmentContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_ASSIGNMENT_SUCCESS:
      return state.set(
        'respAssignmentData',
        fromJS(
          action.data.output_data[0].workItems[0].classAssignmentWorkItem[0].classAssignmentGroup[0]
        )
      );
    case Constants.GET_STUDENTDETAIL_SUCCESS:
      return state.set('studentDetails', action.data.output_data[0]);
    case Constants.SAVE_ASSGINMENT_REQUEST_SUCCESS:
      return state.set('saveAssignmentSuccess', action.data.output_data[0]);
    case Constants.DELETE_ASSIGNMENT_REQUEST_SUCCESS:
      return state.set('deleteAssignmentSucess', action.data.output_data[0]);
    case Constants.CLEAR_RESPONSE_STATUS:
      return state.set('saveAssignmentSuccess', null).set('deleteAssignmentSucess', null);
    case Constants.CLEAR_STATE:
      return state
        .set('studentDetails', [])
        .set('respAssignmentData', null)
        .set('saveAssignmentSuccess', null)
        .set('deleteAssignmentSucess', null);
    default:
      return state;
  }
}

export default editAssignmentContainerReducer;
