/*
 *
 * System44SuccessRecordContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  getAssignmentSuccessRecordData: {},
});

function system44SuccessRecordContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_ASSIGNMENT_SUCCESS_RECORD_SUCCESS:
      return state.set(
        'getAssignmentSuccessRecordData',
        fromJS(action.getAssignmentSuccessRecordData.output_data[0])
      );
    case Constants.GET_ASSIGNMENT_SUCCESS_RECORD_FAILURE:
      return state.set('getAssignmentSuccessRecordData', fromJS(action.error));
    default:
      return state;
  }
}

export default system44SuccessRecordContainerReducer;
