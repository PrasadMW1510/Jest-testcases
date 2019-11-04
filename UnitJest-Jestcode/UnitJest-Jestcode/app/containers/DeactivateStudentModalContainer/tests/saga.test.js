/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as Request from 'containers/DeactivateModalContainer/request';
import { hideModal, showModal } from 'containers/ModalController/actions';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as ModalConstants from 'containers/ModalController/constants';

import { fromJS } from 'immutable';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Selector from '../../SmartBarContainer/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('Deactivate Student Saga', () => {
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

  describe('DeactivateStudentFlow Saga', () => {
    let err = null;

    beforeEach(() => {
      smartBarSelections = fromJS({
        selectedCohType: 'student',
        selectedStudentId: 'cohort123',
      });

      err = 'mock error';

      generator = Saga.DeactivateStudentFlow();
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
      expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));

      expect(generator.next(smartBarSelections).value).toEqual(
        call(Request.getDeactivateUser, mockSessionId, 'cohort123', 'student', mockUserId)
      );
      expect(generator.next().value).toEqual(put(Actions.deactivateStudentRequestSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(
        put(showModal(ModalConstants.DEACTIVATE_STUDENT_SUCCESS_MODAL))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(hideModal()));
      expect(generator.next().value).toEqual(put(Actions.deactivateStudentRequestFailure(err)));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('DEACTIVATE_STUDENT_REQUEST IS CALLED', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.DEACTIVATE_STUDENT_REQUEST, Saga.DeactivateStudentFlow)
      );
    });
  });
});
