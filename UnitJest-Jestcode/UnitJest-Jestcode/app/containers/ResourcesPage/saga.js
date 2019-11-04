/*
* Slms Get application
*/
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { makeSelectLoginData } from 'containers/App/selectors';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as Request from './request';
import * as Actions from './actions';
import * as Constants from './constants';
import { makeSelectSAMBuildVersion } from './selectors';

/**
 * Get list of application that are enabled for the user based on the sessionId during login
 */
export function* getSlmsApps() {
  try {
    const sid = yield select(makeSelectLoginData());

    const getAllApps = yield call(Request.getSlmsApplication, sid.getIn(['session_id', 0]));
    yield put(Actions.getProductListSuccess(getAllApps));
  } catch (err) {
    yield put(Actions.getProductListFailure(err));
  }
}

export function* getBuildInfo() {
  try {
    const epochTime = new Date().getTime();

    const buildInfo = yield call(Request.getBuildInfo, epochTime);
    yield put(Actions.getBuildInfoSuccess(buildInfo));
  } catch (err) {
    yield put(Actions.getBuildInfoFailure(err));
  }
}

export function* postQuickSearch({ resource }) {
  try {
    yield put(showLoading());

    const epochTime = new Date().getTime();
    const samVersion = yield select(makeSelectSAMBuildVersion());

    const postResources = yield call(
      Request.quickSearchPostResources,
      epochTime,
      keywordRequestPayload(resource, samVersion)
    );
    yield put(Actions.postResourcesQuickSearchSuccess(postResources));

    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.postResourcesQuickSearchFailure(err));
    yield put(hideLoading());
  }
}

export default function* getListOfApps() {
  yield takeLatest(Constants.GET_PRODUCT_SEARCH, getSlmsApps);
  yield takeLatest(Constants.GET_BUILD_INFO, getBuildInfo);
  yield takeLatest(Constants.POST_RESOURCES_QUICK_SEARCH, postQuickSearch);
}

export const keywordRequestPayload = (resource, samVersion) => {
  const res = resource;
  res.samversion = samVersion;
  const resourcesObj = {
    searchRequest: res,
  };
  return resourcesObj;
};
