import { fromJS } from 'immutable';

import deactivateSchoolModalContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('deactivateSchoolModalContainerReducer', () => {
  const initialState = fromJS({
    error: false,
    deactivateSchool: [],
  });
  it('returns the initial state', () => {
    expect(deactivateSchoolModalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle deactivate school request success actions', () => {
    expect(
      deactivateSchoolModalContainerReducer(undefined, Actions.deactivateSchoolRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle deactivate school request failure actions', () => {
    expect(
      deactivateSchoolModalContainerReducer(
        undefined,
        Actions.deactivateSchoolRequestFailure('err')
      )
    ).toMatchSnapshot();
  });
});
