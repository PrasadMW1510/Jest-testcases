/*
 *
 * DeactivateStudentModalContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  deactivateStudent: [],
});

function DeactivateStudentModalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.DEACTIVATE_STUDENT_REQUEST_SUCCESS:
      return state.set('deactivateStudent', fromJS(action.deactivateStudent));
    case Constants.DEACTIVATE_STUDENT_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default DeactivateStudentModalContainerReducer;
