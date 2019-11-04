import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import r180NgsettingContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('r180NgsettingContainerReducer', () => {
  const initialState = fromJS({
    error: false,
    loading: false,
    programSetting: {},
    programEnrollmentSetting: [],
  });
  it('returns the initial state', () => {
    expect(r180NgsettingContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle R180NGProgramSettingsRequestSuccess request success actions', () => {
    expect(
      r180NgsettingContainerReducer(undefined, Actions.R180NGProgramSettingsRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle R180NGProgramSettings request failure actions', () => {
    expect(
      r180NgsettingContainerReducer(undefined, Actions.R180NGProgramSettingsRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle Program Settings Enrollment request success actions', () => {
    expect(
      r180NgsettingContainerReducer(
        undefined,
        Actions.R180NGProgramSettingsEnrollmentRequestSuccess()
      )
    ).toMatchSnapshot();
  });

  it('should handle Program Settings Enrollment request failure actions', () => {
    expect(
      r180NgsettingContainerReducer(
        undefined,
        Actions.R180NGProgramSettingsEnrollmentRequestFailure('err')
      )
    ).toMatchSnapshot();
  });
  it('should handle Program Settings update R180NG Setting RequestSuccess', () => {
    expect(
      r180NgsettingContainerReducer(
        undefined,
        Actions.updateR180NGSettingRequestSuccess('settings')
      )
    ).toMatchSnapshot();
  });
  it('should handle post change  request failure actions', () => {
    expect(
      r180NgsettingContainerReducer(undefined, Actions.R180NGSaveRequestFailure('err'))
    ).toMatchSnapshot();
  });
  it('should handle transition to home tab', () => {
    expect(
      r180NgsettingContainerReducer(initialState, {
        type: LOCATION_CHANGE,
        payload: { pathname: '/' },
      })
    ).toMatchSnapshot();
  });

  it('should handle transition to none-home tab', () => {
    expect(
      r180NgsettingContainerReducer(initialState, {
        type: LOCATION_CHANGE,
        payload: { pathname: '/roster' },
      })
    ).toMatchSnapshot();
  });
});
