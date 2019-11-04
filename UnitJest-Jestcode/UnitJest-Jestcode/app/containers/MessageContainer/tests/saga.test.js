/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';

describe('MessageContainer Saga', () => {
  let generator = null;
  let sessionIdSelector = null;
  let userIdSelector = null;
  let store = null;
  let err = null;
  let messageIdsChecked = null;

  beforeEach(() => {
    sessionIdSelector = jest.fn();
    userIdSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(userIdSelector);

    store = fromJS({
      login: {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
      },
    });

    err = 'mock error';
  });

  describe('getMessageRequest', () => {
    beforeEach(() => {
      generator = Saga.getMessageRequest();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        select(userIdSelector)
      );
      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toEqual(
        call(
          Request.getMessageData,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0])
        )
      );
      expect(generator.next().value).toEqual(put(Actions.getMessagesRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.getMessagesRequestFailure(err)));
    });
  });

  describe('postDeleteRequest', () => {
    beforeEach(() => {
      messageIdsChecked = [123, 25];

      const actions = { messageIdsChecked };

      generator = Saga.postDeleteRequest(actions);
    });

    it('All calls pass', () => {
      const messageIdsCheckedArray = messageIdsChecked.map(messageId => ({
        message_id: messageId,
      }));

      const messageObj = {
        messages: {
          message: messageIdsCheckedArray,
        },
      };

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        call(Request.postDeleteMessages, store.getIn(['login', 'session_id', 0]), messageObj)
      );
      expect(generator.next().value).toEqual(put(Actions.postDeleteRequestSuccess()));
      expect(generator.next().value).toEqual(put(Actions.getMessageRequest()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.postDeleteRequestFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_MESSAGES_REQUEST, Saga.getMessageRequest)
      );

      expect(generator.next().value).toEqual(
        takeLatest(Constants.POST_DELETE_REQUEST, Saga.postDeleteRequest)
      );
    });
  });
});
