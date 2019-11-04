import { call, put, takeLatest, select } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId } from '../App/selectors';

export function* getAllTeacherMadeQuizDataRequest(searchAction) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const searchOpts = searchAction.payload;
    const itemsPerPage = 250;
    const collectionOpts = Actions.getChangeCollectionResultsRequest();
    if (Object.keys(searchOpts).length > 0) {
      const ifCurPage =
        searchAction.payload.SrcSearchReq.SortTerms !== undefined
          ? searchAction.payload.SrcSearchReq.SortTerms.curPage
          : 0;
      const curPage = ifCurPage || 0;

      const getAllTeacherMadeQuizData = yield call(
        Request.getAllTeacherMadeQuizData,
        sessionId,
        searchOpts,
        itemsPerPage,
        curPage,
        collectionOpts
      );

      yield put(Actions.getAllTeacherMadeQuizDataRequestSuccess(getAllTeacherMadeQuizData));
      yield put(Actions.putAllTeacherMadeQuizDataRequest(searchOpts));
      yield put(hideLoading());
    } else {
      const searchTerms = {};
      searchTerms.Term = 'Title';
      searchTerms.Order = 'asc';

      const formTerms = {};
      formTerms.Title = '';
      formTerms.Author = '';
      formTerms.TeacherMade = true;

      const searchFilters = {};
      searchFilters.SortTerm = searchTerms;

      const searchSortTerms = {};
      searchSortTerms.SortTerms = searchFilters;
      searchSortTerms.BookInfo = formTerms;

      const rootElm = {};
      rootElm.SrcSearchReq = searchSortTerms;

      const getAllTeacherMadeQuizData = yield call(
        Request.getAllTeacherMadeQuizData,
        sessionId,
        rootElm
      );

      yield put(Actions.getAllTeacherMadeQuizDataRequestSuccess(getAllTeacherMadeQuizData));
      yield put(hideLoading());
    }
  } catch (err) {
    yield put(Actions.getAllTeacherMadeQuizDataRequestFailure(err));
    yield put(hideLoading());
  }
}

export function* getChangeCollectionResultsRequest(collectionAction) {
  try {
    const collectionOpts = collectionAction.payload;

    yield put(Actions.getChangeCollectionResultsRequestSuccess(collectionOpts));
  } catch (err) {
    yield put(Actions.getChangeCollectionResultsRequestFailure(err));
  }
}

export function* getCollectionsNameRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const getCollectionName = yield call(Request.getCollectionName, sessionId);
    yield put(Actions.getCollectionsNameRequestSuccess(getCollectionName));
  } catch (err) {
    yield put(Actions.getCollectionsNameRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(
    Constants.GET_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST,
    getAllTeacherMadeQuizDataRequest
  );
  yield takeLatest(Constants.GET_COLLECTIONSNAME_REQUEST, getCollectionsNameRequest);
  yield takeLatest(
    Constants.GET_CHANGE_COLLECTION_RESULTS_REQUEST,
    getChangeCollectionResultsRequest
  );
}
