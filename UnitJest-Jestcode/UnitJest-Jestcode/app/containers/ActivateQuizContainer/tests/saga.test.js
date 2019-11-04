import { takeLatest, put, select, all } from 'redux-saga/effects';
import { hideModal } from 'containers/ModalController/actions';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('postactivateQuizRequest Saga', () => {
  let generator = null;
  let selectSelector = null;
  let mockEpochTime = null;

  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    mockEpochTime = 1516120801689;
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
  });
  describe('postactivateQuizRequest', () => {
    let err = null;
    const action = {
      activateQuizPreviewData: [
        {
          QuizID: ['ggg'],
          QuizActive: ['true'],
        },
      ],
      bookId: [
        {
          ID: ['ggg'],
        },
      ],
    };

    beforeEach(() => {
      err = 'mock error';
      generator = Saga.postactivateQuizRequest(action);
    });

    it('getPreviewDataFailuresuccess', () => {
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(hideModal()));
    });
    it('getPostActivateRequestFailure', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.getPostActivateRequestFailure(err)));
      expect(generator.next().value).toEqual(put(hideModal()));
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([takeLatest(Constants.ACTIVATE_QUIZ_LIST, Saga.postactivateQuizRequest)])
      );
    });
  });
});
