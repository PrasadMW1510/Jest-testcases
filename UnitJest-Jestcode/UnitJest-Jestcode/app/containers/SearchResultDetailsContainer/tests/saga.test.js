import { takeLatest, put, select, all } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */

describe('Advanced Search Container Saga', () => {
  let generator = null;
  let selectSelector = null;
  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
  });
  describe('getSearchResultDetailsDataRequest', () => {
    let err = null;
    let action = null;
    action = {
      data: {
        teacherMadeQuiz: ['true'],
      },
    };
    beforeEach(() => {
      err = 'mock error';
      generator = Saga.getSearchResultDetailsDataRequest(action);
    });

    it('getSearchResultDetailsSuccess', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('getSearchResultDetailsSuccess fails', () => {
      action = {
        data: {
          teacherMadeQuiz: ['false'],
        },
      };
      generator = Saga.getSearchResultDetailsDataRequest(action);

      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('getSearchResultDetailsFailure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.getSearchResultDetailsFailure(err)));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('saveSearchResultDetailsDataRequest', () => {
    let err = null;
    const searchDetail = {
      data: {
        QuizPointValue: '',
        LibraryCopies: '',
      },
    };
    beforeEach(() => {
      err = 'mock error';
      generator = Saga.saveSearchResultDetailsDataRequest(searchDetail);
    });

    it('saveSearchResultDetailsSuccess', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(searchDetail).value;
      expect(putDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toMatchSnapshot();
      const putDescriptor3 = generator.next().value;
      expect(putDescriptor3).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('saveSearchResultDetailsDataFailure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.saveSearchResultDetailsDataFailure(err))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('saveSearchResultDetailsDataRequest', () => {
    let err = null;
    const searchDetail = {
      data: {
        QuizPointValue: '23',
        LibraryCopies: '',
      },
    };
    beforeEach(() => {
      err = 'mock error';
      generator = Saga.saveSearchResultDetailsDataRequest(searchDetail);
    });

    it('saveSearchResultDetailsSuccess', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(searchDetail).value;
      expect(putDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toMatchSnapshot();
      const putDescriptor3 = generator.next().value;
      expect(putDescriptor3).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('saveSearchResultDetailsDataFailure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.saveSearchResultDetailsDataFailure(err))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('saveTeacherMadeQuizDataRequest', () => {
    let err = null;
    let action = null;
    action = {
      data: {
        Title: 'hfsjkd',
        teacherMadeQuiz: ['true'],
        Author: [
          {
            FirstName: 'Tester',
            LastName: 'Test',
          },
        ],
        Lexile: 4,
        ReadingLevel: 23,
        GRL: 'http://sampleURL',
        WordCount: 10,
        Points: 30,
        IsFiction: false,
        Copies: 10,
        ID: 'IDVal',
      },
      flag: '',
    };
    const successResult = {
      data: 'success',
    };

    beforeEach(() => {
      err = 'mock error';
      generator = Saga.saveTeacherMadeQuizDataRequest(action);
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
    });

    it('saveTeacherMadeQuizDataRequest', () => {
      const selectDescriptor2 = generator.next().value;
      expect(selectDescriptor2).toMatchSnapshot();
      const selectDescriptor3 = generator.next('SessionID').value;
      expect(selectDescriptor3).toMatchSnapshot();
      const putDescriptor1 = generator.next(successResult).value;
      expect(putDescriptor1).toEqual(put(Actions.saveSearchResultDetailsSuccess(successResult)));
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('saveSearchResultDetailsDataFailure', () => {
      const selectDescriptor2 = generator.next().value;
      expect(selectDescriptor2).toMatchSnapshot();
      const selectDescriptor3 = generator.next('SessionID').value;
      expect(selectDescriptor3).toMatchSnapshot();
      expect(generator.throw(err).value).toEqual(
        put(Actions.saveSearchResultDetailsDataFailure(err))
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
            Constants.GET_SEARCH_RESULT_DETAILS_DATA_REQUEST,
            Saga.getSearchResultDetailsDataRequest
          ),
          takeLatest(
            Constants.SAVE_SEARCH_RESULT_DETAILS_DATA_REQUEST,
            Saga.saveSearchResultDetailsDataRequest
          ),
          takeLatest(Constants.SAVE_TEACHER_MADE_QUIZ_DATA, Saga.saveTeacherMadeQuizDataRequest),
        ])
      );
    });
  });
});
