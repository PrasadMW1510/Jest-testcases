/*
 *
 * Read180NgAssaignmentContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  studentDetails: [],
  postNewAssignment: {},
});

function addRead180NgAssaignmentContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_STUDENTDETAIL_SUCCESS:
      return state.set('studentDetails', action.data.output_data[0]);
    case Constants.POST_NEW_ASSIGNMENT_SUCCESS:
      return state.set('postNewAssignment', action.data.output_data[0]);
    case Constants.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default addRead180NgAssaignmentContainerReducer;
