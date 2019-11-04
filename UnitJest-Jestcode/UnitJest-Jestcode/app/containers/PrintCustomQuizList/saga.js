import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { hideModal } from 'containers/ModalController/actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId } from '../App/selectors';

export function* printCustomQuizRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const previewRequest = action.quizListPreviewData;
    const quizId = action.quizId;
    const Quizzes = {
      QuizList: {},
      AllInstalledQuizzes: false,
    };
    Quizzes.QuizList.QuizId = quizId.map(id => id.QuizID[0]);
    const rootElm = {
      PrintQuizListReq: {
        DisplayColumnSwitches: {
          DisplayTitle: true,
          DisplayAuthor: true,
          DisplayLexile: previewRequest[0],
          DisplayReadingLevel: previewRequest[1],
          DisplayGRL: previewRequest[2],
          DisplayPoints: previewRequest[3],
          DisplayWordCount: previewRequest[4],
        },
      },
      Quizzes,
    };
    yield call(Request.getPrintCustomQuizListPreviewData, sessionId, rootElm);
    // yield put(Actions.getPreviewDataSuccess(printCustomQuizListPreviewData));
    yield put(hideModal());
  } catch (err) {
    yield put(Actions.getPreviewDataFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([takeLatest(Constants.PRINT_CUSTOM_QUIZ_LIST, printCustomQuizRequest)]);
}
