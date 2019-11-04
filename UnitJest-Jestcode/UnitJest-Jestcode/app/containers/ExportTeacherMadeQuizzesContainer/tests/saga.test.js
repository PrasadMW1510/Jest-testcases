import { takeLatest, put, all } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('postExportTeacherMadeQuizRequest Saga', () => {
  let generator = null;
  let selectSelector = null;
  let mockEpochTime = null;

  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    mockEpochTime = 1516120801689;
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
  });
  describe('postExportTeacherMadeQuizRequest', () => {
    let err = null;
    const action = {
      quizData: [
        {
          QuizID: [''],
        },
      ],
    };
    it('postExportTeacherMadeQuizRequestSuccess', () => {
      generator = Saga.postExportTeacherMadeQuizRequest(action);
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('postExportTeacherMadeQuizRequestFailure', () => {
      err = 'mock error';
      const errorAction = {
        quizData: [
          {
            QuizID: [''],
          },
        ],
      };
      generator = Saga.postExportTeacherMadeQuizRequest(errorAction);
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      expect(generator.throw(err).value).toEqual(
        put(Actions.postExportTeacherMadeQuizRequestFailure(err))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            Constants.EXPORT_TEACHER_MADE_QUIZZES_LIST,
            Saga.postExportTeacherMadeQuizRequest
          ),
        ])
      );
    });
  });
});
