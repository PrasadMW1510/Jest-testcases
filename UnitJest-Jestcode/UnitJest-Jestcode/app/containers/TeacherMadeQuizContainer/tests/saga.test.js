import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('TeacherMadeQuizContainer Saga', () => {
  let generator = null;
  let selectSelector = null;
  let mockEpochTime = null;
  let error = null;
  const error1 = { error: 'Quiz not deleted' };

  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    mockEpochTime = 1516120801689;
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
  });
  describe('getInstalledQuizDataRequest', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });

      err = 'mock error';
      error = { error: 'post failed' };
      generator = Saga.getInstalledQuizDataRequest();
    });
    it('getInstalledQuizDataRequestSuccess', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(Request.getInstalledQuizData, store.getIn(['session_id', 0]))
      );
      expect(generator.next().value).toEqual(put(Actions.getInstalledQuizDataRequestSuccess()));
    });

    it('getInstalledQuizDataRequestFailure', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getInstalledQuizDataRequestFailure(err))
      );
    });
  });

  describe('postTeacherMadeQuizDetailRequest having value', () => {
    const value = {
      key: [],
    };
    const err = 'mock error';
    beforeEach(() => {
      generator = Saga.postTeacherMadeQuizDetailRequest(value);
    });
    it('getInstalledQuizDetailDataRequestSuccess', () => {
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      expect(generator.next(value).value).toEqual(
        put(Actions.getInstalledQuizDetailDataRequestSuccess(value))
      );
    });
    it('getInstalledQuizDataRequestFailure', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getInstalledQuizDataRequestFailure(err))
      );
    });
  });
  describe('deleteTeacherMadeQuizRequest having quizid', () => {
    const err = 'mock error';
    it('getSearchResultsRequestSuccess', () => {
      const quizid = {
        quizId: ['hghgh', 'ghgg'],
      };
      const quizdelObj = {
        output_data: [
          {
            DeleteTeacherMadeQuizResp: [
              {
                result: ['succeed'],
              },
            ],
          },
        ],
      };
      generator = Saga.deleteTeacherMadeQuizRequest(quizid);

      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      expect(generator.next(quizdelObj).value).toEqual(
        put(Actions.getInstalledQuizDataRequest(quizdelObj))
      );
      expect(generator.next(quizdelObj).value).toEqual(
        put(Actions.deleteTeacherMadeQuizRequestSuccess(quizdelObj))
      );
    });
    it('deleteTeacherMadeQuizRequestFailure', () => {
      expect(generator.throw(err).value).toEqual(
        put(Actions.deleteTeacherMadeQuizRequestFailure(err))
      );
    });
    it('deleteTeacherMadeQuizRequest fails', () => {
      const quizid = {
        quizId: ['hghgh', 'ghgg'],
      };
      const quizdelObj = {
        output_data: [
          {
            DeleteTeacherMadeQuizResp: [
              {
                result: ['yamini'],
              },
            ],
          },
        ],
      };
      generator = Saga.deleteTeacherMadeQuizRequest(quizid);
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      expect(generator.next(quizdelObj).value).toEqual(
        put(Actions.deleteTeacherMadeQuizRequestFailure(error1))
      );
    });
  });
  describe('postTeacherMadeQuizRequest having postData', () => {
    const err = 'mock error';
    it('getInstalledQuizDetailDataRequestSuccess', () => {
      const postData = {
        output_data: [
          {
            SetQuizResp: [
              {
                QuizID: ['egdhj', 'hgf'],
              },
            ],
          },
        ],
        SrcQuizReq: {
          Book: {
            Title: 'Welcome1',
            Author: {
              FirstName: `authfirstname`,
              LastName: `authlastname`,
            },
            Lexile: `25`,
            ReadingLevel: `7`,
            GRL: `Z`,
            WordCount: `9000`,
            Points: 0,
            IsFiction: 1,
            Copies: 0,
          },
        },
      };
      generator = Saga.postTeacherMadeQuizRequest(postData);
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      expect(generator.next(postData).value).toEqual(
        put(Actions.getInstalledQuizDataRequest(postData))
      );
    });
    it('postTeacherMadeQuizRequestFailure', () => {
      expect(generator.throw(err).value).toEqual(
        put(Actions.postTeacherMadeQuizRequestFailure(err))
      );
    });
    it('getInstalledQuizDetailDataRequestSuccess fails', () => {
      const postData = {
        output_data: [
          {
            SetQuizResp: [
              {
                QuizID: [],
              },
            ],
          },
        ],
        SrcQuizReq: {
          Book: {
            Title: 'Welcome1',
            Author: {
              FirstName: `authfirstname`,
              LastName: `authlastname`,
            },
            Lexile: `25`,
            ReadingLevel: `7`,
            GRL: `Z`,
            WordCount: `9000`,
            Points: 0,
            IsFiction: 1,
            Copies: 0,
          },
        },
      };
      generator = Saga.postTeacherMadeQuizRequest(postData);
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      expect(generator.next(postData).value).toEqual(
        put(Actions.postTeacherMadeQuizRequestFailure(error))
      );
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_INSTALLEDQUIZDATA_REQUEST, Saga.getInstalledQuizDataRequest),
          takeLatest(Constants.POST_ADD_TEACHERMADEQUIZ_REQUEST, Saga.postTeacherMadeQuizRequest),
          takeLatest(
            Constants.GET_ADD_TEACHERMADEQUIZ_DETAILS_REQUEST,
            Saga.postTeacherMadeQuizDetailRequest
          ),
          takeLatest(Constants.DELETE_TEACHERMADEQUIZ_REQUEST, Saga.deleteTeacherMadeQuizRequest),
        ])
      );
    });
  });
});
