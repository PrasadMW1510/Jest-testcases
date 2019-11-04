import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getAllTeacherMadeQuizDataRequest } from 'containers/SearchResultsContainer/actions';
import * as Constants from './constants';
import * as Actions from './actions';
import * as Request from './request';
import { makeSelectProfileSessionId } from '../App/selectors';

export function* getSearchResultsRequest(searchAction) {
  try {
    const searchOpts = searchAction.payload;

    const sessionId = yield select(makeSelectProfileSessionId());
    const getSearchResults = yield call(Request.getSearchResults, sessionId, searchOpts);
    yield put(getAllTeacherMadeQuizDataRequest(searchOpts));
    yield put(Actions.getSearchResultsRequestSuccess(getSearchResults));
  } catch (err) {
    yield put(Actions.getSearchResultsRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([takeLatest(Constants.GET_SEARCH_RESULTS_REQUEST, getSearchResultsRequest)]);
}
