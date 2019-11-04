import { fromJS } from 'immutable';

import { LOCATION_CHANGE } from 'react-router-redux';
import usageSummaryReducer from '../reducer';
import * as Actions from '../actions';

describe('usageSummaryReducer', () => {
  const initialState = fromJS({
    error: false,
    loading: false,
    usageSummary: [],
  });

  it('returns the initial state', () => {
    expect(usageSummaryReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle usage summary request action', () => {
    expect(usageSummaryReducer(undefined, Actions.usageSummaryRequest())).toMatchSnapshot();
  });

  it('should handle usage summary request success actions', () => {
    expect(usageSummaryReducer(undefined, Actions.usageSummaryRequestSuccess())).toMatchSnapshot();
  });

  it('should handle usage summary request failure actions', () => {
    expect(
      usageSummaryReducer(undefined, Actions.usageSummaryRequestFailure('err'))
    ).toMatchSnapshot();
  });
});

describe('Routes', () => {
  const mockedState = fromJS({
    error: false,
    usageSummary: [
      {
        name: ['CA S44 Stage A Standalone'],
      },
    ],
  });

  it('should handle transition to home tab', () => {
    expect(
      usageSummaryReducer(mockedState, { type: LOCATION_CHANGE, payload: { pathname: '/' } })
    ).toMatchSnapshot();
  });

  it('should handle transition to none-home tab', () => {
    expect(
      usageSummaryReducer(mockedState, { type: LOCATION_CHANGE, payload: { pathname: '/roster' } })
    ).toMatchSnapshot();
  });
});
