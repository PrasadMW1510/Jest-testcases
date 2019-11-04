import { fromJS } from 'immutable';

import teacherAccessTableContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('teacherAccessTableContainerReducer', () => {
  const initialState = fromJS({
    error: false,
    teacherEnroll: [],
    teacherAppsUsage: [],
    itemCount: -1,
    loading: true,
    paginationData: {},
    saveSuccess: false,
    loadingApps: true,
  });

  it('returns the initial state', () => {
    expect(teacherAccessTableContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle teacher Enroll request actions', () => {
    expect(
      teacherAccessTableContainerReducer(undefined, Actions.teacherEnrollRequest())
    ).toMatchSnapshot();
  });
  it('should handle teacher Enroll request success actions', () => {
    expect(
      teacherAccessTableContainerReducer(undefined, Actions.teacherEnrollRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle teacher Enroll request failure actions', () => {
    expect(
      teacherAccessTableContainerReducer(undefined, Actions.teacherEnrollRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle teacher Apps Usage request actions', () => {
    expect(
      teacherAccessTableContainerReducer(undefined, Actions.teacherAppsUsageRequest())
    ).toMatchSnapshot();
  });

  it('should handle teacher Apps Usage request success actions', () => {
    expect(
      teacherAccessTableContainerReducer(undefined, Actions.teacherAppsUsageRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle teacher Apps Usage request failure actions', () => {
    expect(
      teacherAccessTableContainerReducer(undefined, Actions.teacherAppsUsageRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle teacher Access Save request actions', () => {
    expect(
      teacherAccessTableContainerReducer(undefined, Actions.teacherAccessSaveRequest())
    ).toMatchSnapshot();
  });

  it('should handle teacher Access Saverequest success actions', () => {
    expect(
      teacherAccessTableContainerReducer(undefined, Actions.teacherAccessSaveRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle teacher Access Save request failure actions', () => {
    expect(
      teacherAccessTableContainerReducer(undefined, Actions.teacherAccessSaveRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
