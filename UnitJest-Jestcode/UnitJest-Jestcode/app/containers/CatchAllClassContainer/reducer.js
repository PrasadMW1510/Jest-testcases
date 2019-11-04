/*
 *
 * CatchAllClassContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  studentDetails: [],
  postnewAssignment: {},
});

function catchAllClassContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_STUDENTDETAIL_SUCCESS:
      return state.set('studentDetails', action.data.output_data[0]);
    case Constants.POST_NEW_ASSIGNMENT_SUCCESS:
      return state.set('postnewAssignment', action.data.output_data[0]);
    case Constants.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default catchAllClassContainerReducer;
