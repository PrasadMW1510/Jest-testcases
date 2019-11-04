import { fromJS } from 'immutable';
import inboxContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('assignmentContainerReducer reducer', () => {
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
  it('returns the initial state', () => {
    expect(inboxContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle SET_INBOX_CLASS_TREELIST', () => {
    expect(
      inboxContainerReducer(undefined, Actions.setInBoxGridRequestSuccess([]))
    ).toMatchSnapshot();
  });
  it('should handle SET_INBOX_CLASS_TREELIST', () => {
    expect(inboxContainerReducer(undefined, Actions.setGridData([]))).toMatchSnapshot();
  });
  it('should handle SET_INBOX_CLASS_TREELIST', () => {
    expect(
      inboxContainerReducer(undefined, Actions.setAssignmentClassSuccess([]))
    ).toMatchSnapshot();
  });
  it('should handle SET_TEMP_GRIDDATA', () => {
    expect(inboxContainerReducer(undefined, Actions.setTempGridData([]))).toMatchSnapshot();
  });
});
