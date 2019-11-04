/**
 * Test  sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as Selectors from 'containers/App/selectors';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';
import * as Request from '../request';
import * as Actions from '../actions';

describe('ManageSma Saga', () => {
  let generator = null;
  let sessionIdSelector = null;
  let districtIdSelector = null;

  beforeEach(() => {
    sessionIdSelector = jest.fn();
    districtIdSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileDistrictId').mockReturnValue(districtIdSelector);
  });

  beforeEach(() => {
    sessionIdSelector = jest.fn();
    districtIdSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileDistrictId').mockReturnValue(districtIdSelector);
  });

  describe('defaultSage', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([takeLatest(Constants.GET_MEDIA_SERVERS_REQUEST, Saga.handleMediaServersRequestFlow)])
      );
    });

    describe('handleMediaServersRequestFlow', () => {
      let store = null;
      let err = null;

      beforeEach(() => {
        store = fromJS({
          login: {
            session_id: ['adsfadsf'],
            district_id: ['id1'],
          },
        });

        err = 'mock error';

        generator = Saga.handleMediaServersRequestFlow();
      });

      it('All calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next().value).toEqual(select(districtIdSelector));
        expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
          call(
            Request.getMediaServers,
            store.getIn(['session_id', 0]),
            store.getIn(['district_id', 0])
          )
        );
        expect(generator.next().value).toEqual(put(Actions.handleMediaServersRequestSuccess()));
      });

      it('calls fail', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next().value).toEqual(select(districtIdSelector));
        expect(generator.throw(err).value).toEqual(
          put(Actions.handleMediaServersRequestFailure(err))
        );
      });
    });
  });
});
