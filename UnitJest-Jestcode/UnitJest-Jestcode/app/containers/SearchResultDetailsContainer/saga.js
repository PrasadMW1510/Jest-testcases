import { all, call, takeLatest, select, put } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId } from '../App/selectors';

export function* getSearchResultDetailsDataRequest(action) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const teacherMadeQuiz = action && action.data && action.data.teacherMadeQuiz;
    const id = action && action.data && action.data.id;
    let getSearchDetails = [];
    let bookObj = {};
    if (teacherMadeQuiz[0] === 'true') {
      bookObj = {
        GetQuizWithQuestionsReq: {
          QuizID: id,
        },
      };
      getSearchDetails = yield call(Request.getSearchResultQuizDetails, sessionId, bookObj);
      yield put(Actions.getSearchQuizResultsSuccess(getSearchDetails, action.data));
    } else {
      bookObj = {
        GetBookInfoReq: {
          BookID: id,
        },
      };
      getSearchDetails = yield call(Request.getSearchResultDetails, sessionId, bookObj);
      yield put(Actions.getSearchResultDetailsSuccess(getSearchDetails, action.data));
    }
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.getSearchResultDetailsFailure(err));
    yield put(hideLoading());
  }
}

export function* saveSearchResultDetailsDataRequest(searchDetail) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const bookObj = {
      SetBookInfoReq: {
        BookID: searchDetail.data.ID,
        QuizPointValue:
          searchDetail.data.QuizPointValue === '' ? 0 : searchDetail.data.QuizPointValue,
        LibraryCopies: searchDetail.data.LibraryCopies,
      },
    };
    const saveSearchDetails = yield call(Request.saveSearchResultDetails, sessionId, bookObj);
    yield put(Actions.saveSearchResultDetailsSuccess(saveSearchDetails));
    yield put(Actions.getSearchResultDetailsDataRequest(searchDetail.data.ID, searchDetail.flag));
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.saveSearchResultDetailsDataFailure(err));
    yield put(hideLoading());
  }
}

export function* saveTeacherMadeQuizDataRequest(action) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const data = action && action.data;
    const teacherMadeQuizObj = {
      SrcQuizReq: {
        Book: {
          Title: data.Title,
          Author: {
            FirstName: data.Author[0].FirstName,
            LastName: data.Author[0].LastName,
          },
          Lexile: data.Lexile,
          ReadingLevel: data.ReadingLevel,
          GRL: data.GRL,
          WordCount: data.WordCount,
          Points: data.Points,
          IsFiction: data.IsFiction,
          Copies: data.Copies,
          Quiz: {
            QuizID: data.ID,
          },
        },
      },
    };
    const saveSearchTeacherMadeQuizDetails = yield call(
      Request.saveTeacherMadeQuiz,
      sessionId,
      teacherMadeQuizObj
    );
    yield put(Actions.saveSearchResultDetailsSuccess(saveSearchTeacherMadeQuizDetails));
    yield put(Actions.getSearchResultDetailsDataRequest(data.ID, action.flag));
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.saveSearchResultDetailsDataFailure(err));
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_SEARCH_RESULT_DETAILS_DATA_REQUEST, getSearchResultDetailsDataRequest),
    takeLatest(
      Constants.SAVE_SEARCH_RESULT_DETAILS_DATA_REQUEST,
      saveSearchResultDetailsDataRequest
    ),
    takeLatest(Constants.SAVE_TEACHER_MADE_QUIZ_DATA, saveTeacherMadeQuizDataRequest),
  ]);
}
