/**
 * Test  sagas
 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
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
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    loginDataSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });
  describe('getRead180DataRequest', () => {
    let store = null;
    const read180ninfo = {
      read180nData: [],
    };
    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });
      generator = Saga.getRead180DataRequest(read180ninfo);
    });

    it('getRead180DataRequestSuccess', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next().value).toEqual(select(profileUserIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(
          Request.getRead180DataRequestAction,
          read180ninfo.read180nData,
          store.getIn(['session_id', 0]),
          store.getIn(['user_id', 0])
        )
      );
      expect(generator.next().value).toEqual(put(Actions.getRead180DataRequestSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });

  describe('setRead180Data', () => {
    let store = null;
    const read180ninfo = {
      read180nData: [],
      workItemId: '555_3',
    };
    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });
      generator = Saga.setRead180Data(read180ninfo);
    });

    it('setRead180DataRequestSuccess', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(
          Request.setRead180DataRequestAction,
          undefined,
          store.getIn(['session_id', 0]),
          read180ninfo.workItemId
        )
      );
      expect(generator.next().value).toEqual(put(Actions.setRead180DataRequestSuccess()));
    });
  });
  describe('deleteAssignmentData', () => {
    let store = null;
    const workItemId = {
      Data: [],
    };
    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });
      generator = Saga.deleteAssignmentData(workItemId);
    });

    it('setRead180DataRequestSuccess', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(
          Request.deleteRead180DataRequestAction,
          '<>',
          store.getIn(['session_id', 0]),
          workItemId.Data
        )
      );
      expect(generator.next().value).toEqual(put(Actions.setRead180DataRequestSuccess()));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.READ_180_NG_DATA_REQUEST, Saga.getRead180DataRequest)
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.SET_READ_180_NG_DATA, Saga.setRead180Data)
      );
    });
    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.DELETE_ASSIGNMENT_DATA, Saga.deleteAssignmentData)
      );
    });
  });
});
