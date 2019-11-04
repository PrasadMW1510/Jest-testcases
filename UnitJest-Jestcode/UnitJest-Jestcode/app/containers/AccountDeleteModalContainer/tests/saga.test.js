/**
 * Test  sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { hideModal } from 'containers/ModalController/actions';
import { getSearchResultsRequest } from 'containers/SearchModalContainer/actions';
import defaultSaga, * as Saga from '../saga';
import * as Constants from '../constants';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Selectors from '../../App/selectors';

describe('AccountDeleteModalContainer Saga', () => {
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
        takeLatest(Constants.POST_ACCOUNT_DELETE_REQUEST, Saga.postAccountDeleteRequest)
      );
      expect(generator.next().value).toEqual(
        takeLatest(Constants.POST_ACCOUNT_DELETE_MIA_REQUEST, Saga.postAccountDeleteMIARequest)
      );
      expect(generator.next().value).toEqual(
        takeLatest(Constants.POST_ACCOUNT_UNENROLL_REQUEST, Saga.postAccountUnenrollRequest)
      );
    });
  });

  describe('postAccountDeleteRequest saga flow', () => {
    const accountDeletePayload = {
      searchOpts: {},
      accounts: {
        input: {
          users: [{ user_id: [] }],
        },
      },
    };
    const accountDeleteAction = {
      type: Constants.POST_ACCOUNT_DELETE_REQUEST,
      payload: accountDeletePayload,
      searchPage: true,
    };
    beforeEach(() => {
      generator = Saga.postAccountDeleteRequest(accountDeleteAction);
    });

    it('should successfully run', () => {
      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(
        call(Request.postAccountsDelete, sessionId, accountDeleteAction.payload.accounts)
      );
      expect(generator.next().value).toEqual(put(Actions.postAccountDeleteRequestSuccess()));
      expect(generator.next().value).toEqual(
        put(getSearchResultsRequest(accountDeleteAction.payload.searchOpts))
      );
      expect(generator.next().value).toEqual(put(hideModal()));
    });

    it('should fail when there is an error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.postAccountDeleteRequestFailure(err)));
    });
  });
});
