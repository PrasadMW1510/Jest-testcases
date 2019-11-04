/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Selector from '../../SmartBarContainer/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
import { hideModal, showDeactivateUserSuccessModal } from '../../ModalController/actions';

describe('Deactivate User Saga', () => {
  let generator = null;
  let sessionIdSelector = null;
  let userIdSelector = null;
  let smartBarSelector = null;
  let mockSessionId = null;
  let mockUserId = null;
  let smartBarSelections = null;

  beforeEach(() => {
    sessionIdSelector = jest.fn();
    userIdSelector = jest.fn();
    smartBarSelector = jest.fn();
    smartBarSelections = jest.fn();
    mockSessionId = 'mockSessionId';
    mockUserId = 'mockUserId';

    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(userIdSelector);
    jest.spyOn(Selector, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);
  });

  describe('deactivateUserRequest', () => {
    let err = null;

    beforeEach(() => {
      smartBarSelections = fromJS({
        selectedCohType: 'teacher',
        selectedTeacherId: 'cohort123',
      });

      err = 'mock error';

      generator = Saga.DeactivateUserFlow();
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
      expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));

      expect(generator.next(smartBarSelections).value).toEqual(
        call(Request.getDeactivateUser, mockSessionId, 'cohort123', 'teacher', mockUserId)
      );
      expect(generator.next().value).toEqual(put(Actions.deactivateUserRequestSuccess()));
      expect(generator.next().value).toEqual(put(showDeactivateUserSuccessModal()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(hideModal()));
      expect(generator.next().value).toEqual(put(showDeactivateUserSuccessModal()));
      expect(generator.next().value).toEqual(put(Actions.deactivateUserRequestFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('DEACTIVATE_USER_REQUEST IS CALLED', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.DEACTIVATE_USER_REQUEST, Saga.DeactivateUserFlow)
      );
    });
  });
});
