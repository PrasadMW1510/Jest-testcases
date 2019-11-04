/**
 * Test  sagas
 */

import { takeLatest, all } from 'redux-saga/effects';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */

describe('Read 180 Respond Write Container Saga', () => {
  let generator = null;
  let profileSessionIdSelector = null;
  let profileUserIdSelector = null;
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.SET_RESPOND_WRITE_DATA_REQUEST, Saga.setRespondWriteDataRequest),
          takeLatest(Constants.GET_RESPOND_WRITE_REQUEST, Saga.getRespondWriteRequest),
        ])
      );
    });
  });
});
