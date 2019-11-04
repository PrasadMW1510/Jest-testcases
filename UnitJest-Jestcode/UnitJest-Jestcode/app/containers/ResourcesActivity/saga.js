/*
* Resources Manager Initialize product
*/
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { makeSelectSAMBuildVersion } from '../ResourcesPage/selectors';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectAppSelected } from './selectors';

/**
 * Checks if the resources outputs empty string or a values
 * @param resources
 * @returns {{}}
 */
const convertToObjectIfString = resources => (!resources ? {} : resources);

/**
 * Get application based Sam Resources for the App Id provided
 */
export function* getSamResourceByApp({ app }) {
  try {
    const epochTime = new Date().getTime();

    const getResource = yield call(Request.getAppResources, app, epochTime);

    yield put(Actions.getAppBasedResourceSuccess(convertToObjectIfString(getResource)));
  } catch (err) {
    yield put(Actions.getAppBasedResourceFailure(err));
  }
}

/**
 * Get the list of ITS enabled applications
 */
export function* getItsApps() {
  try {
    const epochTime = new Date().getTime();

    const getIts = yield call(Request.getITSApps, epochTime);

    yield put(Actions.getITSAppsSuccess(getIts));
  } catch (err) {
    yield put(Actions.getITSAppsFailure(err));
  }
}

/**
 *
 * @param resource
 */
export function* postResourcesBasedInfo({ resource, activity }) {
  try {
    yield put(showLoading());

    const epochTime = new Date().getTime();
    const appId = yield select(makeSelectAppSelected());
    const samVersion = yield select(makeSelectSAMBuildVersion());

    const postResources = yield call(
      Request.postResourcesObjectInfo,
      epochTime,
      ResourcesInfoRequestPayload(resource, appId, samVersion),
      activity
    );
    yield put(Actions.postResourcesBasedOnIdSuccess(postResources));

    yield put(hideLoading());
  } catch (err) {
    yield put(Actions.postResourcesBasedOnIdFailure(err));
    yield put(hideLoading());
  }
}

export default function* getResourcesManagerInitializeProduct() {
  yield takeLatest(Constants.GET_APP_BASED_RESOURCE, getSamResourceByApp);
  yield takeLatest(Constants.GET_ITS_APPS, getItsApps);
  yield takeLatest(Constants.POST_RESOURCE_TYPE, postResourcesBasedInfo);
}

export const ResourcesInfoRequestPayload = (resource, appId, samVersion) => {
  const res = resource;
  res.samversion = samVersion;
  res.program_id = appId;
  const resourcesObj = {
    searchRequest: res,
  };
  return resourcesObj;
};
