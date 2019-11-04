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
    let requestParams = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
        },
        requestParams: {
          requestParams: [
            {
              certificate_info: {
                certificate_id: 'R180_29',
                custom_message1: '1',
                recipients: [
                  {
                    recipient: [
                      {
                        id: 'srjrole2mqoolo95m4g5jldp_2efa7f0',
                        name: 'CA S44 Stage B Standalone',
                        type: 'class',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      });

      err = 'mock error';
      requestParams = {
        requestParams: [
          {
            certificate_info: {
              certificate_id: 'R180_29',
              custom_message1: '1',
              recipients: [
                {
                  recipient: [
                    {
                      id: 'srjrole2mqoolo95m4g5jldp_2efa7f0',
                      name: 'CA S44 Stage B Standalone',
                      type: 'class',
                    },
                  ],
                },
              ],
            },
          },
        ],
      };

      generator = Saga.certificatePrintRequestFlow(requestParams);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getCertificatePrintPdf,
          store.getIn(['login', 'session_id', 0]),
          requestParams.requestParams
        )
      );
      expect(generator.next().value).toEqual(put(Actions.certificatePrintRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.certificatePrintRequestFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('CERTIFICATE_PRINT_REQUEST IS CALLED', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.CERTIFICATE_PRINT_REQUEST, Saga.certificatePrintRequestFlow)
      );
    });
  });
});
