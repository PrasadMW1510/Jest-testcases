import { fromJS } from 'immutable';
import customListContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('search Result Details Container Reducer', () => {
  const initialState = fromJS({
    openSuccessModal: false,
  });
  it('returns the initial state', () => {
    expect(customListContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle EXPORT_TEACHER_MADE_QUIZZES_LIST_SUCCESS', () => {
    expect(
      customListContainerReducer(undefined, Actions.postExportTeacherMadeQuizRequestSuccess())
    ).toMatchSnapshot();
  });
});
