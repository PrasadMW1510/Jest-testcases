/**
 * Test sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as AppSelectors from 'containers/App/selectors';
import * as Constants from 'components/ManageInactiveAccounts/constants';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { push } from 'react-router-redux';

import { getInactiveCohortMembers } from '../request';
import * as Actions from '../actions';
import defaultSaga, * as Saga from '../saga';

describe('ManageInactiveAccountsContainer Saga', () => {
  const sessionId = 'session-123';
  const currentlyLoggedInUserId = 'user-123';
  const error = 'an error';

  let generator = null;

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            [
              SmartBarConstants.GRADE_SELECTION_SUCCESS,
              SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
              SmartBarConstants.TEACHER_SELECTION_SUCCESS,
              SmartBarConstants.CLASS_SELECTION_SUCCESS,
              SmartBarConstants.GROUP_SELECTION_SUCCESS,
              SmartBarConstants.STUDENT_SELECTION_SUCCESS,
            ],
            Saga.redirectToRosterFlow
          ),
          takeLatest(Constants.GET_INACTIVE_COHORT_MEMBERS_REQUEST, Saga.loadInactiveCohortMembers),
        ])
      );
    });
  });

  describe('getLoginData', () => {
    let mockProfileSessionIdSelector = null;
    let mockProfileUserIdSelector = null;

    beforeEach(() => {
      generator = Saga.getLoginData();
      mockProfileSessionIdSelector = jest.fn();
      mockProfileUserIdSelector = jest.fn();
      jest
        .spyOn(AppSelectors, 'makeSelectProfileSessionId')
        .mockReturnValue(mockProfileSessionIdSelector);
      jest
        .spyOn(AppSelectors, 'makeSelectProfileUserId')
        .mockReturnValue(mockProfileUserIdSelector);
    });

    it('Should handle returning login data', () => {
      expect(generator.next().value).toEqual(select(mockProfileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(select(mockProfileUserIdSelector));
      const finalNext = generator.next(currentlyLoggedInUserId);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual({ sessionId, currentlyLoggedInUserId });
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('loadInactiveCohortMembers', () => {
    const action = {
      payload: {
        apiParamKey: 'apiParamValue',
      },
    };
    const inactiveMembersResponse = {
      apiResponseKey: 'apiResponseValue',
    };
    beforeEach(() => {
      generator = Saga.loadInactiveCohortMembers(action);
    });

    it('Should handle the loading flow successfully', () => {
      expect(generator.next().value).toEqual(call(Saga.getLoginData));
      expect(generator.next({ sessionId, currentlyLoggedInUserId }).value).toEqual(
        call(getInactiveCohortMembers, sessionId, currentlyLoggedInUserId, action.payload)
      );
      expect(generator.next(inactiveMembersResponse).value).toEqual(
        put(Actions.getInactiveCohortMembersRequestSuccess(inactiveMembersResponse))
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle the loading flow when failure', () => {
      expect(generator.next().value).toEqual(call(Saga.getLoginData));
      expect(generator.throw(error).value).toEqual(
        put(Actions.getInactiveCohortMembersRequestFailure(error))
      );
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('redirectToRosterFlow', () => {
    beforeEach(() => {
      generator = Saga.redirectToRosterFlow();
    });

    it('Should redirect to roster on smartbar selections', () => {
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
  });
});
