import { takeLatest, put, all } from 'redux-saga/effects';
import { hideModal } from 'containers/ModalController/actions';

import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('PrintBookLabel Saga', () => {
  let generator = null;
  let selectSelector = null;
  let mockEpochTime = null;

  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    mockEpochTime = 1516120801689;
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
  });
  describe('printCustomQuizRequest', () => {
    let err = null;
    const action = {
      quizListPreviewData: {
        selectedOption: 'tallBook',
        previewRequest: ['displayLex', '1', '2', '3', '4'],
      },
      quizId: [
        {
          QuizID: ['ggg'],
        },
      ],
    };

    const errorAction = {
      quizListPreviewData: {
        selectedOption: 'tallBook',
      },
      quizId: [
        {
          QuizID: ['ggg'],
        },
      ],
    };
    it('printCustomQuizRequestsuccess', () => {
      generator = Saga.printCustomQuizRequest(action);
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next('Session12').value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toEqual(put(hideModal()));
    });
    it('getPreviewDataFailure', () => {
      err = 'mock error';
      generator = Saga.printCustomQuizRequest(errorAction);
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      expect(generator.throw(err).value).toEqual(put(Actions.getPreviewDataFailure(err)));
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([takeLatest(Constants.PRINT_CUSTOM_QUIZ_LIST, Saga.printCustomQuizRequest)])
      );
    });
  });
});
