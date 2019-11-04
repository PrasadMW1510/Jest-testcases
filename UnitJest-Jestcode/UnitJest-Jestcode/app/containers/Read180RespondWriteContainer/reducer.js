/*
 *
 * Read180RespondWriteContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  respondWrite: [],
  stundentName: '',
  assignmentName: '',
  studentId: '',
  workItemId: '',
  community_id: '',
});

function read180RespondWriteContainerReducer(state = initialState, action) {
  const workItems =
    action.data &&
    action.data.output_data &&
    action.data.output_data[0].workItems &&
    action.data.output_data[0].workItems[0];
  switch (action.type) {
    case Constants.SET_RESPOND_WRITE_REQUEST:
      return state
        .set('respondWrite', fromJS(workItems.read180RespondWriteWorkItem[0]))
        .set('stundentName', fromJS(action.rowItem.student))
        .set('assignmentName', fromJS(action.rowItem.assignment))
        .set('workItemId', fromJS(action.rowItem.workItemId))
        .set('studentId', fromJS(action.rowItem.studentId))
        .set('community_id', fromJS(action.rowItem.community_id));
    case Constants.SET_RESPOND_WRITE_REQUEST_S44:
      return state
        .set('respondWrite', fromJS(workItems.sys44WritingActivityWorkItem[0]))
        .set('stundentName', fromJS(action.rowItem.student))
        .set('assignmentName', fromJS(action.rowItem.assignment))
        .set('workItemId', fromJS(action.rowItem.workItemId))
        .set('studentId', fromJS(action.rowItem.studentId))
        .set('community_id', fromJS(action.rowItem.community_id));
    default:
      return state;
  }
}

export default read180RespondWriteContainerReducer;
