import { fromJS } from 'immutable';

import studentEnrollmentTableContainerReducer from '../reducer';
import * as Constants from '../constants';
import * as Actions from '../actions';

describe('studentEnrollmentTableContainerReducer', () => {
  const initialState = fromJS({
    error: false,
    studentEnroll: [],
    studentAppsUsage: [],
    studentGetList: [],
    samCentralStatus: [],
    itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
    loading: true,
    paginationData: {},
  });
  it('returns the initial state', () => {
    expect(studentEnrollmentTableContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle Student Enroll request actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentEnrollRequest())
    ).toMatchSnapshot();
  });
  it('should handle Student Enroll request success actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentEnrollRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle Student Enroll request failure actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentEnrollRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle Student Apps Usage request actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentAppsUsageRequest())
    ).toMatchSnapshot();
  });

  it('should handle Student Apps Usage request success actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentAppsUsageRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle Student Apps Usage request failure actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(
        undefined,
        Actions.studentAppsUsageRequestFailure('err')
      )
    ).toMatchSnapshot();
  });

  it('should handle Student Enroll Save request actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentEnrollSaveRequest())
    ).toMatchSnapshot();
  });

  it('should handle Student Enroll Saverequest success actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentEnrollSaveRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle Student Enroll Save request failure actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(
        undefined,
        Actions.studentEnrollSaveRequestFailure('err')
      )
    ).toMatchSnapshot();
  });

  it('should handle Sam Central Status request actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.samCentralStatusRequest())
    ).toMatchSnapshot();
  });

  it('should handle Sam Central Status request success actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.samCentralStatusRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle Sam Central Status request failure actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(
        undefined,
        Actions.samCentralStatusRequestFailure('err')
      )
    ).toMatchSnapshot();
  });
  it('should handle Student Get List  request actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentGetListRequest())
    ).toMatchSnapshot();
  });

  it('should handle Student Get List  request success actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentGetListRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle Student Get List request failure actions', () => {
    expect(
      studentEnrollmentTableContainerReducer(undefined, Actions.studentGetListRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
