// import { take, call, put, select } from 'redux-saga/effects';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import * as Actions from './actions';
import * as Request from './request';
import { makeSelectProfileUserId, makeSelectProfileSessionId } from '../App/selectors';

export function* getSearchMetaDataRequest() {
  try {
    yield call(mainSearchMetaDataFlow);
  } catch (err) {
    yield put(Actions.getSearchMetaDataRequestFailure(err));
  }
}

export function* mainSearchMetaDataFlow() {
  yield all([
    call(getSchoolsForSearchRequest),
    call(getGradesForSearchRequest),
    call(getTeachersForSearchRequest),
    call(getClassesForSearchRequest),
    call(getAppsForSearchRequest),
  ]);
  yield put(Actions.getSearchMetaDataRequestSuccess());
}

export function* getAppsForSearchRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const appList = yield call(Request.getAppsForSearch, sessionId);
    yield put(Actions.getAppsForSearchRequestSuccess(appList));
  } catch (err) {
    yield put(Actions.getAppsForSearchRequestFailure(err));
  }
}

export function* getClassesForSearchRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const classList = yield call(Request.getClassesForSearch, sessionId, userId);

    yield put(Actions.getClassesForSearchRequestSuccess(classList));
  } catch (err) {
    yield put(Actions.getClassesForSearchRequestFailure(err));
  }
}

export function* getSchoolsForSearchRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const schoolList = yield call(Request.getSchoolListForSearch, sessionId, userId);
    yield put(Actions.getSchoolsForSearchRequestSuccess(schoolList));
  } catch (err) {
    yield put(Actions.getSchoolsForSearchRequestFailure(err));
  }
}

export function* getTeachersForSearchRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const teacherList = yield call(Request.getTeachersForSearch, sessionId, userId);
    yield put(Actions.getTeachersForSearchRequestSuccess(teacherList));
  } catch (err) {
    yield put(Actions.getTeachersForSearchRequestFailure(err));
  }
}

export function* getGradesForSearchRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const gradeList = yield call(Request.getGradesForSearch, sessionId, userId);
    yield put(Actions.getGradesForSearchRequestSuccess(gradeList));
  } catch (err) {
    yield put(Actions.getGradesForSearchRequestFailure(err));
  }
}

/**
 *
 * handles the getSearchResultsRequest
 *
 */
export function* getSearchResultsRequest(searchAction) {
  const searchBy = searchAction.payload.searchBy;
  const itemsPerPage = searchAction.payload.itemsPerPage;
  const curPage = searchAction.payload.curPage;
  let filter = {};
  try {
    let sResults = {};
    yield put(Actions.resetSearchResultsData());
    const sessionId = yield select(makeSelectProfileSessionId());
    switch (searchBy) {
      case Constants.SEARCH_STUDENT:
        filter = searchAction.payload.student_search;
        sResults = yield call(
          Request.getStudentSearchResults,
          sessionId,
          filter,
          itemsPerPage,
          curPage
        );
        break;
      case Constants.SEARCH_TEACHER:
        filter = searchAction.payload.teacher_search;
        sResults = yield call(
          Request.getTeacherSearchResults,
          sessionId,
          filter,
          itemsPerPage,
          curPage
        );
        break;
      default:
    }

    yield put(Actions.getSearchResultsRequestSuccess(sResults));
  } catch (err) {
    yield put(Actions.getSearchResultsRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_SEARCH_META_DATA_REQUEST, getSearchMetaDataRequest),
    takeLatest(Constants.GET_SEARCH_RESULTS_REQUEST, getSearchResultsRequest),
  ]);
}
