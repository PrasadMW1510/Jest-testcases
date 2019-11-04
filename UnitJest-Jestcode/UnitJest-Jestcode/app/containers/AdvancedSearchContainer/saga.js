import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getAllTeacherMadeQuizDataRequest } from 'containers/SearchResultsContainer/actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId } from '../App/selectors';

export function* getAwardsDataRequest() {
  try {
    const epochTime = new Date().getTime();
    const getAwardsData = yield call(Request.getAwardsData, epochTime);
    yield put(Actions.getAwardsRequestSuccess(getAwardsData));
  } catch (err) {
    yield put(Actions.getAwardsRequestFailure(err));
  }
}

export function* getComskillDataRequest() {
  try {
    const epochTime = new Date().getTime();
    const getComskillData = yield call(Request.getComskillData, epochTime);
    yield put(Actions.getComskillRequestSuccess(getComskillData));
  } catch (err) {
    yield put(Actions.getComskillRequestFailure(err));
  }
}

export function* getCultureDataRequest() {
  try {
    const epochTime = new Date().getTime();
    const getCultureData = yield call(Request.getCultureData, epochTime);
    yield put(Actions.getCultureRequestSuccess(getCultureData));
  } catch (err) {
    yield put(Actions.getCultureRequestFailure(err));
  }
}

export function* getGenreDataRequest() {
  try {
    const epochTime = new Date().getTime();
    const getGenreData = yield call(Request.getGenreData, epochTime);
    yield put(Actions.getGenreRequestSuccess(getGenreData));
  } catch (err) {
    yield put(Actions.getGenreRequestFailure(err));
  }
}

export function* getInterestLevelDataRequest() {
  try {
    const epochTime = new Date().getTime();
    const getInterestLevelData = yield call(Request.getInterestLevelData, epochTime);
    yield put(Actions.getInterestLevelRequestSuccess(getInterestLevelData));
  } catch (err) {
    yield put(Actions.getInterestLevelRequestFailure(err));
  }
}

export function* getProgramSeriesDataRequest() {
  try {
    const epochTime = new Date().getTime();
    const getProgramSeriesData = yield call(Request.getProgramSeriesData, epochTime);
    yield put(Actions.getProgramSeriesRequestSuccess(getProgramSeriesData));
  } catch (err) {
    yield put(Actions.getProgramSeriesRequestFailure(err));
  }
}

export function* getTopicsDataRequest() {
  try {
    const epochTime = new Date().getTime();
    const getTopicsData = yield call(Request.getTopicsData, epochTime);
    yield put(Actions.getTopicsRequestSuccess(getTopicsData));
  } catch (err) {
    yield put(Actions.getTopicsDataRequestFailure(err));
  }
}

export function* getThemesDataRequest() {
  try {
    const epochTime = new Date().getTime();
    const getThemesData = yield call(Request.getThemesData, epochTime);
    yield put(Actions.getThemesRequestSuccess(getThemesData));
  } catch (err) {
    yield put(Actions.getThemesRequestFailure(err));
  }
}

export function* getInstalledQuizCountDataRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const getInstalledQuizCountData = yield call(Request.getInstalledQuizCountData, sessionId);
    yield put(Actions.getInstalledQuizCountRequestSuccess(getInstalledQuizCountData));
  } catch (err) {
    yield put(Actions.getInstalledQuizCountRequestFailure(err));
  }
}

export function* getBookSearchFilters(searchfilters) {
  const searchOpts = searchfilters.payload;
  yield put(getAllTeacherMadeQuizDataRequest(searchOpts));
}

export default function* defaultSaga() {
  yield takeLatest(Constants.GET_AWARDS_REQUEST, getAwardsDataRequest);
  yield takeLatest(Constants.GET_COMSKILL_REQUEST, getComskillDataRequest);
  yield takeLatest(Constants.GET_CULTURE_REQUEST, getCultureDataRequest);
  yield takeLatest(Constants.GET_GENRE_REQUEST, getGenreDataRequest);
  yield takeLatest(Constants.GET_INTERESTLEVEL_REQUEST, getInterestLevelDataRequest);
  yield takeLatest(Constants.GET_PROGRAM_SERIES_REQUEST, getProgramSeriesDataRequest);
  yield takeLatest(Constants.GET_TOPICS_REQUEST, getTopicsDataRequest);
  yield takeLatest(Constants.GET_THEMES_REQUEST, getThemesDataRequest);
  yield takeLatest(Constants.GET_INSTALLEDQUIZCOUNT_REQUEST, getInstalledQuizCountDataRequest);
  yield takeLatest(Constants.GET_SEARCH_RESULTS_REQUEST, getBookSearchFilters);
}
