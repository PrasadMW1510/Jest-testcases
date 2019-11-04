/*
 *
 * ManageAdminAccounts reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  admins: [],
  adminToEdit: {},
  loading: true,
});

function manageAdminAccountsReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_ADMIN_REQUEST_SUCCESS:
      return state.set('adminToEdit', fromJS(action.admin));
    case Constants.GET_ADMIN_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.GET_ADMINS_REQUEST:
      return state.set('loading', true);
    case Constants.GET_ADMINS_REQUEST_SUCCESS:
      return state.set('admins', fromJS(action.admins)).set('loading', false);
    case Constants.GET_ADMINS_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.RESET_ADMINS_LIST:
      return state
        .set('loading', true)
        .set('admins', [])
        .set(('adminToEdit', {}));
    default:
      return state;
  }
}

export default manageAdminAccountsReducer;
