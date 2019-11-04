/*
 *
 * ClassAssignModal reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  classesAndGroups: [],
  showModal: false,
});

function classAssignModalContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_CLASSES_AND_GROUPS_REQUEST_SUCCESS:
      return state.set('classesAndGroups', fromJS(action.classesAndGroups));
    case Constants.OPEN_CLASS_ASSIGN_MODAL:
      return state.set('showModal', true);
    case Constants.CLOSE_CLASS_ASSIGN_MODAL:
      return state.set('showModal', false);

    case Constants.GET_CLASSES_AND_GROUPS_REQUEST_FAILURE:
      return state.set('error', `${action.error}`);
    default:
      return state;
  }
}

export default classAssignModalContainerReducer;
