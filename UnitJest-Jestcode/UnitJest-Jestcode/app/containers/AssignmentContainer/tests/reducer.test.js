import { fromJS } from 'immutable';

import assignmentContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('assignmentContainerReducer reducer', () => {
  const initialState = fromJS({
    classData: [],
    selectedClassAssignments: [],
    classAssignmentForClass: [],
    selectedClass: false,
    communityId: '',
    classId: '',
    programList: [],
  });
  it('returns the initial state', () => {
    expect(assignmentContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle SET_PORTFOLIO_ASSIGNMENT_CLASSES', () => {
    expect(
      assignmentContainerReducer(undefined, Actions.setClassRequestSuccess([]))
    ).toMatchSnapshot();
  });
  it('should handle GET_PORTFOLIO_ASSIGNMENT_CLASSES_ASS_LIST_TEMP', () => {
    const data = 'jjj_ii';
    const node = [
      [
        {
          classId: 'jjj_ii',
          createdForClass: 'jjj_ii',
        },
      ],
    ];
    expect(
      assignmentContainerReducer(undefined, Actions.getClassAssignmentRequest(data, node))
    ).toMatchSnapshot();
  });
  it('should handle SET_PORTFOLIO_ASSIGNMENT_CLASSES_ASS_LIST', () => {
    expect(
      assignmentContainerReducer(undefined, Actions.setClassGridRequestSuccess([]))
    ).toMatchSnapshot();
  });
});
