import { fromJS } from 'immutable';

import classAssignModalContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('classAssignModal reducer', () => {
  const initialState = fromJS({
    classesAndGroups: [],
    showModal: false,
  });
  it('returns the initial state', () => {
    expect(classAssignModalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle GET_CLASSES_AND_GROUPS_REQUEST_SUCCESS', () => {
    expect(
      classAssignModalContainerReducer(
        undefined,
        Actions.getClassesAndGroupsRequestSuccess(['test'])
      )
    ).toMatchSnapshot();
  });

  it('should handle GET_CLASSES_AND_GROUPS_REQUEST_FAILURE', () => {
    expect(
      classAssignModalContainerReducer(undefined, Actions.getClassesAndGroupsRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle OPEN_CLASS_ASSIGN_MODAL', () => {
    expect(
      classAssignModalContainerReducer(undefined, Actions.openClassAssignModal())
    ).toMatchSnapshot();
  });

  it('should handle CLOSE_CLASS_ASSIGN_MODAL', () => {
    expect(
      classAssignModalContainerReducer(undefined, Actions.closeClassAssignModal())
    ).toMatchSnapshot();
  });
});
