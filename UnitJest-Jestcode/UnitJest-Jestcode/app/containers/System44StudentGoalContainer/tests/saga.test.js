/**
 * Test  sagas
 */

import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */

describe('Advanced Search Container Saga', () => {
  let generator = null;
  let loginDataSelector = null;
  let profileSessionIdSelector = null;
  let profileUserIdSelector = null;
  const err = 'mock error';
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    loginDataSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });
  describe('getCombinedStudentGoalsRequest', () => {
    let store = null;
    const action = {
      studentId: '_2r555',
    };
    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });
      generator = Saga.getCombinedStudentGoalsRequest(action);
    });

    it('getCombinedStudentGoalsRequestSuccess', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(Request.getCombinedStudentGoalsData, action.studentId, store.getIn(['session_id', 0]))
      );
      expect(generator.next().value).toEqual(put(Actions.getCombinedStudentGoalsRequestSuccess()));
    });

    it('getCombinedStudentGoalsRequestFailure', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getCombinedStudentGoalsRequestFailure(err))
      );
    });
  });
  describe('getAllStudentGoalsRequest', () => {
    let store = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });
      generator = Saga.getAllStudentGoalsRequest();
    });

    it('getCombinedStudentGoalsRequestSuccess', () => {
      expect(generator.next().value).toEqual(select(profileUserIdSelector));
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(
          Request.getAllStudentGoalsData,
          store.getIn(['session_id', 0]),
          store.getIn(['user_id', 0])
        )
      );
      expect(generator.next().value).toEqual(put(Actions.getAllStudentGoalsRequestSuccess()));
    });

    it('getAllStudentGoalsRequestFailure', () => {
      expect(generator.next().value).toEqual(select(profileUserIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getAllStudentGoalsRequestFailure(err))
      );
    });
  });
  describe('setStudentAcademicGoals saga flow', () => {
    const action = {
      value: '2',
      studentId: '555_yyy',
    };
    beforeEach(() => {
      generator = Saga.setStudentAcademicGoals(action);
    });
    it('should successfully run', () => {
      const ServiceResponse = {
        output_data: [{}],
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('goalID').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(
        put(Actions.setStudentAcademicGoalsSuccess(ServiceResponse.output_data[0]))
      );
    });
    it('getCombinedStudentGoalsRequestFailure', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.setStudentAcademicGoalsError(err)));
    });
  });
  describe('setStudentBehaviourGoals saga flow', () => {
    const action = {
      value: '2',
      studentId: '555_yyy',
      isUpdate: 'true',
    };
    beforeEach(() => {
      generator = Saga.setStudentBehaviourGoals(action);
    });
    it('should successfully run', () => {
      const ServiceResponse = {
        output_data: [{}],
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('goalID').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.next('isupdate').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(
        put(Actions.setStudentBehaviourGoalsSuccess(ServiceResponse.output_data[0]))
      );
    });
    it('setStudentBehaviourGoalsError', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.setStudentBehaviourGoalsError(err)));
    });
  });
  describe('updateStudentBehaviourGoals saga flow', () => {
    const action = {
      value: '2',
      studentId: '555_yyy',
      isUpdate: 'true',
      workItemId: 'skdkdjjbbckjd_skjsxbjh',
    };
    beforeEach(() => {
      generator = Saga.updateStudentBehaviourGoals(action);
    });
    it('should successfully run', () => {
      const ServiceResponse = {
        output_data: [{}],
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('goalID').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.next('isupdate').value).toMatchSnapshot();
      expect(generator.next('workId').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(
        put(Actions.updateStudentBehaviourGoalsSuccess(ServiceResponse.output_data[0]))
      );
    });
    it('updateStudentBehaviourGoalsError', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.updateStudentBehaviourGoalsError(err))
      );
    });
  });
  describe('getStudentSubmissionsRequest saga flow', () => {
    const action = {
      payload: {
        selectedIndex: 0,
        metaData: [
          {
            workItemId: 'work_hjs',
            communityId: 'comm_id',
            id: 'ksja',
            assignment: 'assign',
            kind: 'kind',
          },
        ],
      },
    };
    beforeEach(() => {
      generator = Saga.getStudentSubmissionsRequest(action);
    });
    it('should successfully run', () => {
      const ServiceResponse = {
        output_data: [{}],
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('goalID').value).toMatchSnapshot();
      expect(generator.next('R180NG,S44NG,S44JR,M180,M180Y2').value).toMatchSnapshot();
      expect(generator.next('teacher').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getStudentSubmissionsRequestSuccess(ServiceResponse))
      );
    });
    it('updateStudentBehaviourGoalsError', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getStudentSubmissionsRequestError(err))
      );
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            Constants.GET_COMBINED_STUDENT_GOALS_REQUEST,
            Saga.getCombinedStudentGoalsRequest
          ),
          takeLatest(Constants.GET_ALL_STUDENT_GOALS_REQUEST, Saga.getAllStudentGoalsRequest),
          takeLatest(Constants.SET_STUDENT_ACADEMIC_GOALS, Saga.setStudentAcademicGoals),
          takeLatest(Constants.SET_STUDENT_BEHAVIOURAL_GOALS, Saga.setStudentBehaviourGoals),
          takeLatest(Constants.UPDATE_STUDENT_BEHAVIOURAL_GOALS, Saga.updateStudentBehaviourGoals),
          takeLatest(Constants.GET_STUDENT_SUBMISSIONS_REQUEST, Saga.getStudentSubmissionsRequest),
        ])
      );
    });
  });
});
