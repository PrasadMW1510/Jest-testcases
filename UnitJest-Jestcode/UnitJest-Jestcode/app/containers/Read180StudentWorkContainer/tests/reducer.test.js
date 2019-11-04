import { fromJS } from 'immutable';
import read180StudentWorkContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('search Result Details Container Reducer', () => {
  const initialState = fromJS({});
  it('returns the initial state', () => {
    expect(read180StudentWorkContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle DEFAULT_ACTION', () => {
    expect(
      read180StudentWorkContainerReducer(undefined, Actions.defaultAction())
    ).toMatchSnapshot();
  });
  it('should handle READ_180_STUDENT_WORK_REQUEST_SUCCESS', () => {
    const comskillObj = {
      item_count: ['1'],
      output_data: [{ items: [{}, {}] }],
      pagination_data: ['3'],
    };
    expect(
      read180StudentWorkContainerReducer(
        undefined,
        Actions.getRead180StudentWorkRequestSuccess(comskillObj)
      )
    ).toMatchSnapshot();
  });
});
