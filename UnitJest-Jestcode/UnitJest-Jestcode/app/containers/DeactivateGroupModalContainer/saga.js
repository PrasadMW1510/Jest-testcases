import { call, put, takeLatest, select } from 'redux-saga/effects';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from 'containers/App/selectors';
import * as Request from './request';
import * as Actions from './actions';
import * as Constants from './constants';
import { makeSelectSmartBarContainer } from '../SmartBarContainer/selectors';
import { hideModal, showDeactivateGroupSuccessModal } from '../ModalController/actions';

export function* DeactivateGroupFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']).toLowerCase();
    const cohortId = smartBarSelections.getIn(['selectedGroupId']);
    const deactivateUser = yield call(
      Request.getDeactivateGroup,
      sessionId,
      cohortId,
      cohortType,
      userId
    );
    yield put(Actions.deactivateGroupRequestSuccess(deactivateUser));
    yield put(showDeactivateGroupSuccessModal());
  } catch (err) {
    yield put(hideModal());
    yield put(Actions.deactivateGroupRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.DEACTIVATE_GROUP_REQUEST, DeactivateGroupFlow);
}
