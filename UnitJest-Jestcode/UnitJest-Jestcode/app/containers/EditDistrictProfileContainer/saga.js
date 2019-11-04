// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form/immutable';
import * as AppSelectors from 'containers/App/selectors';
import * as ProfilePageActions from 'containers/ProfilePageContainer/actions';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { hideModal } from 'containers/ModalController/actions';
import * as Constants from './constants';
import * as Actions from './actions';
import * as Request from './request';
import { transformDataForDistrictUpdate } from './transforms';
import { makeSelectCustomDemographics } from './selectors';

export function* getTimeZonesFlow(action) {
  try {
    const sessionId = yield select(AppSelectors.makeSelectProfileSessionId());

    const timeZones = yield call(Request.getTimeZones, sessionId);

    const groupsData = action.profile.get('profileDetailsDistAdmin').get('groups');
    let groups = [];
    if (groupsData.getIn([0, 'group'])) {
      groups = groupsData.getIn([0, 'group']).toJS();
    }

    const demographics = groups.map(group => ({
      name: group.name[0],
      group_id: group.group_id[0],
    }));

    yield put(Actions.getTimeZonesRequestSuccess(timeZones));

    yield put(Actions.updateCustomDemographics(demographics));
  } catch (e) {
    yield put(Actions.getTimeZonesRequestFailure(e));
  }
}

export function* updateDistrictProfileFlow(action) {
  try {
    yield put(showLoading());

    const sessionId = yield select(AppSelectors.makeSelectProfileSessionId());
    const userOrgId = yield select(AppSelectors.makeSelectProfileUserOrgId());
    const customDemographics = yield select(makeSelectCustomDemographics());

    const updateData = transformDataForDistrictUpdate(
      action.profileData,
      userOrgId,
      customDemographics
    );

    yield call(Request.updateDistrictProfile, sessionId, updateData);

    yield put(Actions.updateDistrictProfileSuccess());
    yield put(ProfilePageActions.profilePageForDistrictAdminRequest());
    yield put(hideLoading());
    yield put(hideModal());
  } catch (e) {
    yield put(stopSubmit(Constants.FORM_EDIT_DISTRICT_PROFILE, e));
    yield put(Actions.updateDistrictProfileFailure(e));
  }
}
export default function* defaultSaga() {
  yield takeLatest(Constants.GET_TIME_ZONES_REQUEST, getTimeZonesFlow);
  yield takeLatest(Constants.UPDATE_DISTRICT_PROFILE_REQUEST, updateDistrictProfileFlow);
}
