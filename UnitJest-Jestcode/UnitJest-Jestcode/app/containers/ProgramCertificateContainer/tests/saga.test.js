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

describe('CertificateInfo Saga', () => {
  let generator = null;
  let loginSelector = null;

  beforeEach(() => {
    loginSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginSelector);
  });

  describe('certificateInfoRequest', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_type: ['teacher'],
        },
        profile: {
          school_id: ['my_school'],
        },
      });

      err = 'mock error';

      generator = Saga.CertificateInfoFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getCertificateInfo,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0]),
          store.getIn(['login', 'user_type', 0])
        )
      );
      expect(generator.next().value).toEqual(put(Actions.certificateInfoRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.certificateInfoRequestFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('CERTIFICATE_INFO_REQUEST IS CALLED', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.CERTIFICATE_INFO_REQUEST, Saga.CertificateInfoFlow)
      );
    });
  });
});
