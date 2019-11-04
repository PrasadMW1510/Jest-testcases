/**
 * Test  sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { hideModal } from 'containers/ModalController/actions';
import { getInactiveCohortMembersRequest } from 'containers/ManageInactiveAccountsContainer/actions';
import * as AppActions from 'containers/App/actions';
import defaultSaga, * as Saga from '../saga';
import * as Constants from '../constants';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Selectors from '../../App/selectors';

describe('ReactivateSchoolModalContainer Saga', () => {
  let generator = null;

  let profileSessionIdSelector = null;
  let mockStore = null;
  const err = 'mock error';

  beforeEach(() => {
    profileSessionIdSelector = jest.fn();

    mockStore = fromJS({
      loginData: {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
        user_org_id: ['district9'],
      },
    });
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
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
        takeLatest(Constants.POST_REACTIVATE_SCHOOL_REQUEST, Saga.postReactivateSchoolRequest)
      );
    });
  });

  describe('postReactivateSchoolRequest saga flow', () => {
    const reactivateSchoolPayload = {
      searchOpts: {},
      accounts: {
        input: {
          users: [{ user_id: [] }],
        },
      },
    };
    const reactivateSchoolAction = {
      type: Constants.POST_REACTIVATE_SCHOOL_REQUEST,
      payload: reactivateSchoolPayload,
    };
    beforeEach(() => {
      generator = Saga.postReactivateSchoolRequest(reactivateSchoolAction);
    });

    it('should successfully run', () => {
      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(
        call(Request.postReactivateSchool, sessionId, reactivateSchoolAction.payload.accounts)
      );
      expect(generator.next().value).toEqual(put(AppActions.updateUserData()));
      expect(generator.next().value).toEqual(
        put(getInactiveCohortMembersRequest(reactivateSchoolAction.payload.searchOpts))
      );
      expect(generator.next().value).toEqual(put(Actions.postReactivateSchoolRequestSuccess()));
      expect(generator.next().value).toEqual(put(hideModal()));
    });

    it('should fail when there is an error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.postReactivateSchoolRequestFailure(err))
      );
    });
  });
});
