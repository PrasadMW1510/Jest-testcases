import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { hideModal } from 'containers/ModalController/actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId } from '../App/selectors';

export function* printBookLabelRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const previewRequest = action.bookLabelPreviewData;
    const wideLabelVal = action.bookLabelPreviewData.selectedOption === 'tallBook' ? 0 : 1;
    const bookId = action.bookId;
    const Books = {
      AllInstalledQuizzes: false,
      BookList: {},
    };
    Books.BookList.BookID = bookId.map(id => id.ID[0]);
    const rootElm = {
      GetBookLabelsPdfReq: {
        DisplayOptions: {
          ShowLexile: previewRequest.checked[0],
          ShowPoints: previewRequest.checked[1],
          ShowGRL: previewRequest.checked[2],
          ShowReadingLevel: previewRequest.checked[3],
          WideLabels: wideLabelVal,
          SkipLabels: previewRequest.labelVal === '' ? 0 : previewRequest.labelVal,
        },
        Books,
      },
    };
    yield call(Request.getBookLabelData, sessionId, rootElm);
    yield put(hideModal());
    // yield put(Actions.getPreviewDataSuccess(printCustomQuizListPreviewData));
  } catch (err) {
    yield put(Actions.getPreviewDataFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([takeLatest(Constants.PRINT_BOOK_LABEL, printBookLabelRequest)]);
}
