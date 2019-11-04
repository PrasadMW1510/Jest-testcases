/*
 *
 * InboxContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  inBoxClassData: [
    {
      name: 'Software Submissions (0)',
      children: [
        {
          name: 'Unread (0)',
        },
        {
          name: 'New This Week (0)',
        },
      ],
      toggled: true,
    },
    {
      name: 'Assignments (0)',
      children: [
        {
          name: 'Unread (0)',
        },
        {
          name: 'New This Week (0)',
        },
      ],
    },
  ],
  selectedInBoxClassGoals: [],
  tempGridData: [],
});

function inboxContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_INBOX_CLASS_TREELIST:
      return state.set('inBoxClassData', fromJS(action.newGridData));
    case Constants.SET_STUDENT_SUBMISSION_META_DATA:
      return state.set('selectedInBoxClassGoals', fromJS(action.data));
    case Constants.SET_TEMP_GRIDDATA:
      return state.set('tempGridData', fromJS(action.newGridData));
    case Constants.SET_ASSIGNMENT_LIST_AND_TREE:
      return state
        .set('inBoxClassData', fromJS(action.treeData))
        .set('tempGridData', fromJS(action.gridData));
    default:
      return state;
  }
}

export default inboxContainerReducer;
