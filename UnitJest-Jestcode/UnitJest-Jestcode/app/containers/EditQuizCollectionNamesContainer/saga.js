// import { take, call, put, select } from 'redux-saga/effects';
import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId } from '../App/selectors';

export function* getEditQuizCollectionNamesDataRequest() {
  try {
    yield put(Actions.initialRequest());
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const getEditQuizCollectionNamesData = yield call(
      Request.getEditQuizCollectionNamesData,
      sessionId
    );
    yield put(Actions.getEditQuizCollectionNamesDataRequestSuccess(getEditQuizCollectionNamesData));
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.getEditQuizCollectionNamesDataRequestFailure(err));
    yield put(hideLoading());
  }
}

export function* postEditQuizCollectionNamesDataRequest(value) {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const nameObject = `<RenameQuizCollectionReq><OldName>${
      value.nameObject.oldName
    }</OldName><NewName>${value.nameObject.newName}</NewName></RenameQuizCollectionReq>`;
    yield call(Request.postEditQuizCollectionNamesData, sessionId, nameObject);
    yield put(Actions.getEditQuizCollectionNamesDataRequest());
    yield put(Actions.initializeClassFormResponseSuccess());
    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.saveEditQuizCollectionNamesFailure(err));
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(
      Constants.GET_EDITQUIZCOLLECTIONNAMESDATA_REQUEST,
      getEditQuizCollectionNamesDataRequest
    ),
    takeLatest(
      Constants.POST_EDIT_QUIZ_COLLECTION_NAMES_DATA_REQUEST,
      postEditQuizCollectionNamesDataRequest
    ),
  ]);
}
