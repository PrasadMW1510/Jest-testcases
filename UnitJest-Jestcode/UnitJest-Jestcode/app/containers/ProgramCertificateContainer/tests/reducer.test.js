import { fromJS } from 'immutable';

import certificateInfoReducer from '../reducer';
import * as Actions from '../actions';

describe('certificateInfoReducer', () => {
  const initialState = fromJS({
    error: false,
    certificateInfo: [],
  });
  it('returns the initial state', () => {
    expect(certificateInfoReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle certificate Info request success actions', () => {
    expect(
      certificateInfoReducer(undefined, Actions.certificateInfoRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle certificate Info request failure actions', () => {
    expect(
      certificateInfoReducer(undefined, Actions.certificateInfoRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
