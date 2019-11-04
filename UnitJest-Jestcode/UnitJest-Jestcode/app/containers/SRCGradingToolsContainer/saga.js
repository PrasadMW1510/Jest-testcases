import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import _ from 'lodash';

import {
  makeSelectLoginUserOrg,
  makeSelectProfileSessionId,
  makeSelectProfileUserOrgId,
} from 'containers/App/selectors';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Request from './request';
import * as Transformers from './transformers';

export function* srcGradingToolsRequestFlow() {
  try {
    const { sessionId } = yield call(getProfileData);
    let apiParam = null;
    const selectedCohortInfo = yield select(makeSelectEffectiveCohortObject());
    apiParam = {
      cohortId: selectedCohortInfo.id,
      sessionId,
    };
    const srcGradingToolsPoints = yield call(Request.getSrcGradingPoints, apiParam);
    const srcGradingToolsScore = yield call(Request.getSrcGradingScores, apiParam);
    const transformedSrcGradingToolsScore = Transformers.transformSrcGradingToolsScores(
      srcGradingToolsScore[0]
    );
    const transformSrcGradingToolsPoints = Transformers.transformSrcGradingToolsPoints(
      srcGradingToolsPoints[0]
    );
    yield put(
      Actions.SRCGradingToolsRequestSuccess(
        transformSrcGradingToolsPoints,
        transformedSrcGradingToolsScore
      )
    );
  } catch (err) {
    yield put(Actions.SRCGradingToolsRequestFailure(err));
  }
}

export function* srcQuizzesForTeacherRequestFlow(action) {
  try {
    const { sessionId } = yield call(getProfileData);
    let apiParam = null;
    let searchFilter;
    const selectedCohortInfo = yield select(makeSelectEffectiveCohortObject());
    if (action.name === null) {
      searchFilter = `<SrcSearchReq><SortTerms><SortTerm><Term>${action.term}</Term><Order>${
        action.order
      }</Order></SortTerm></SortTerms><OptionalQuizFilters><IncludePassed>1</IncludePassed></OptionalQuizFilters></SrcSearchReq>`;
    } else {
      searchFilter = `<SrcSearchReq><BookInfo><${action.term}>${action.name}</${
        action.term
      }></BookInfo><SortTerms><SortTerm><Term>${action.term}</Term><Order>${
        action.order
      }</Order></SortTerm></SortTerms><OptionalQuizFilters><IncludePassed>1</IncludePassed></OptionalQuizFilters></SrcSearchReq>`;
    }
    apiParam = {
      cohortId: selectedCohortInfo.id,
      sessionId,
      searchFilter,
      curPg: action.curPg,
    };
    const getSrcStudentQuizzes = yield call(Request.getSrcStudentQuizzes, apiParam);
    const transformedSrcStudentQuizzes = Transformers.transformSrcStudentQuizzes(
      getSrcStudentQuizzes.output_data[0]
    );
    const transformSrcStudentQuizPaginationData = Transformers.transformSrcStudentQuizPaginationData(
      getSrcStudentQuizzes
    );
    const transformSrcStudentQuizItemCount = Transformers.transformSrcStudentQuizItemCount(
      getSrcStudentQuizzes
    );
    yield put(
      Actions.SRCQuizzesForTeacherRequestSuccess(
        transformedSrcStudentQuizzes,
        transformSrcStudentQuizPaginationData,
        transformSrcStudentQuizItemCount
      )
    );
  } catch (err) {
    yield put(Actions.SRCQuizzesForTeacherRequestFailure(err));
  }
}

export function* SRCSaveRemovedQuizzesRequestFlow(action) {
  try {
    const { sessionId } = yield call(getProfileData);
    const selectedCohortInfo = yield select(makeSelectEffectiveCohortObject());
    let apiParam = null;
    let idsToXml = '<SetScoreReq><Additions /><Deletions>';
    _.map(action.quizInfo, info => {
      const idXml = `<Item><QuizID>${info.ID}</QuizID><QuizSequence>${
        info.sequence
      }</QuizSequence></Item>`;
      idsToXml = idsToXml.concat(idXml);
    });
    idsToXml = idsToXml.concat(`</Deletions></SetScoreReq>`);
    apiParam = {
      sessionId,
      cohortId: selectedCohortInfo.id,
      searchFilter: idsToXml,
    };
    yield call(Request.getSrcAddRemoveQuizScore, apiParam);
    yield put(Actions.SRCClearSearchedQuizzes());
    yield call(srcGradingToolsRequestFlow);
  } catch (err) {
    yield put(Actions.SRCSaveRemovedQuizzesRequestFailure(err));
  }
}

export function* getProfileData() {
  const sessionId = yield select(makeSelectProfileSessionId());
  const userOrgType = yield select(makeSelectLoginUserOrg());
  const userOrgId = yield select(makeSelectProfileUserOrgId());
  return { sessionId, userOrgId, userOrgType };
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.SRC_GRADING_TOOLS_REQUEST, srcGradingToolsRequestFlow),
    takeLatest(Constants.SRC_QUIZZES_FOR_TEACHER_REQUEST, srcQuizzesForTeacherRequestFlow),
    takeLatest(Constants.SRC_SAVE_REMOVED_QUIZZES_REQUEST, SRCSaveRemovedQuizzesRequestFlow),
  ]);
}
