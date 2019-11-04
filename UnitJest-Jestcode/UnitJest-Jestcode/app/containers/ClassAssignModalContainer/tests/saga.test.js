/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { hideModal } from 'containers/ModalController/actions';
import defaultSaga, * as Saga from '../saga';
import * as Constants from '../constants';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Selectors from '../../App/selectors';

describe('ClassAssignModalContainer Saga tests', () => {
  let generator = null;

  let loginDataSelector = null;
  let profileDistrictIdSelector = null;
  let profileSessionIdSelector = null;
  let profileUserIdSelector = null;
  let mockStore = null;
  const err = 'mock error';
  beforeEach(() => {
    loginDataSelector = jest.fn();
    profileDistrictIdSelector = jest.fn();
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();

    mockStore = fromJS({
      loginData: {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
        user_org_id: ['district9'],
      },
    });
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileDistrictId').mockReturnValue(profileDistrictIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('defaultSaga', () => {
    beforeEach(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called ', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_CLASSES_AND_GROUPS_REQUEST, Saga.getClassesAndGroupsRequest),
          takeLatest(Constants.POST_ASSIGN_TO_CLASS_REQUEST, Saga.postAssignToClassRequest),
          takeLatest(Constants.POST_ASSIGN_TO_CLASS_MIA_REQUEST, Saga.postAssignToClassMIARequest),
        ])
      );
    });
  });

  describe('getClassesAndGroupsRequest saga flow', () => {
    beforeEach(() => {
      generator = Saga.getClassesAndGroupsRequest();
    });

    it('should successfully run', () => {
      const mockClasses = [];
      const districtId = mockStore.getIn(['loginData', 'user_org_id', 0]);
      const userId = mockStore.getIn(['loginData', 'user_id', 0]);

      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);

      expect(generator.next().value).toEqual(select(profileDistrictIdSelector));
      expect(generator.next(districtId).value).toEqual(select(profileUserIdSelector));
      expect(generator.next(userId).value).toEqual(select(profileSessionIdSelector));

      expect(generator.next(sessionId).value).toEqual(
        call(
          Request.getClassesAndGroupForSearch,
          mockStore.getIn(['loginData', 'user_org_id', 0]),
          mockStore.getIn(['loginData', 'user_id', 0]),
          mockStore.getIn(['loginData', 'session_id', 0])
        )
      );

      expect(generator.next().value).toEqual(
        put(Actions.getClassesAndGroupsRequestSuccess(mockClasses))
      );
    });

    it('should throw error', () => {
      expect(generator.next().value).toEqual(select(profileDistrictIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getClassesAndGroupsRequestFailure(err))
      );
    });
  });

  describe('postAssignToClassRequest saga flow', () => {
    const assignPayload = {
      input: {
        users: [{ user_id: [] }],
        classes: [{ class_id: [] }],
        groups: [{ group_id: [] }],
      },
    };
    const assignAction = {
      type: Constants.POST_ASSIGN_TO_CLASS_REQUEST,
      payload: assignPayload,
    };
    beforeEach(() => {
      generator = Saga.postAssignToClassRequest(assignAction);
    });
    it('should successfully run', () => {
      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(
        call(Request.postAssignToClass, sessionId, assignAction.payload)
      );
      expect(generator.next().value).toEqual(put(Actions.postAssignToClassRequestSuccess()));
      expect(generator.next().value).toEqual(put(hideModal()));
    });

    it('should throw error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.postAssignToClassRequestFailure(err)));
    });
  });
});
