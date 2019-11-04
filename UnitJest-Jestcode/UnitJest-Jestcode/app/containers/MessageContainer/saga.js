import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';
import * as Constants from './constants';

export function* getMessageRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());

    const messageDetails = yield call(Request.getMessageData, sessionId, userId);

    yield put(Actions.getMessagesRequestSuccess(messageDetails));
  } catch (err) {
    yield put(Actions.getMessagesRequestFailure(err));
  }
}

export function* postDeleteRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const messagesChecked = action.messageIdsChecked.map(messageId => ({
      message_id: messageId,
    }));

    const messageObj = {
      messages: {
        message: messagesChecked,
      },
    };

    yield call(Request.postDeleteMessages, sessionId, messageObj);

    yield put(Actions.postDeleteRequestSuccess());

    // Refresh the message list after successful delete
    yield put(Actions.getMessageRequest());
  } catch (err) {
    yield put(Actions.postDeleteRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.GET_MESSAGES_REQUEST, getMessageRequest);
  yield takeLatest(Constants.POST_DELETE_REQUEST, postDeleteRequest);
}
