/*
 *
 * Manage Inactive Accounts reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from 'components/ManageInactiveAccounts/constants';
import { transformInactiveMembersResponse } from './transformers';

const initialState = fromJS({
  inactiveMembers: [],
  itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
  loading: true,
  paginationData: {},
});

function manageInactiveAccountsReducer(state = initialState, action) {
  const { inactiveMembersResponse, type } = action;
  switch (type) {
    case Constants.GET_INACTIVE_COHORT_MEMBERS_REQUEST:
      return state.set('loading', true);
    case Constants.GET_INACTIVE_COHORT_MEMBERS_REQUEST_SUCCESS:
      return inactiveMembersResponse
        ? state
            .set('itemCount', inactiveMembersResponse.item_count[0])
            .set('loading', false)
            .set(
              'inactiveMembers',
              fromJS(transformInactiveMembersResponse(inactiveMembersResponse))
            )
            .set('paginationData', fromJS(inactiveMembersResponse.pagination_data[0]))
        : state;
    default:
      return state;
  }
}

export default manageInactiveAccountsReducer;
