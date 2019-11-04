import { takeLatest, put, all } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('printQuizAndAnswerKeyRequest Saga', () => {
  let generator = null;
  let selectSelector = null;
  let mockEpochTime = null;
  const err = 'mock err';
  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    mockEpochTime = 1516120801689;
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
  });
  describe('printQuizAndAnswerKeyRequest', () => {
    let action = {
      data: {
        initialNumberOfQs: 31,
        initialId: ['ttt'],
      },
    };
    beforeEach(() => {
      generator = Saga.printQuizAndAnswerKeyRequest(action);
    });

    it('printQuizAndAnswerKeyRequestsuccess', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('printQuizAndAnswerKeyRequestsuccesselse', () => {
      action = {
        data: {
          initialNumberOfQs: 20,
          initialId: ['ttt'],
        },
      };
      generator = Saga.printQuizAndAnswerKeyRequest(action);
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
    });
    it('printQuizAndAnswerKeyRequest err part', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([takeLatest(Constants.PRINT_QUIZ_AND_ANSWER_KEY, Saga.printQuizAndAnswerKeyRequest)])
      );
    });
  });
});
