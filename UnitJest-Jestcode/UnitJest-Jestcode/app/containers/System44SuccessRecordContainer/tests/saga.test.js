import { takeLatest, put, select, all, call } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('System44SuccessRecordContainer Saga', () => {
  let err = null;
  let generator = null;
  let profileUserIdSelector = null;
  let profileSessionIdSelector = null;

  beforeEach(() => {
    profileUserIdSelector = jest.fn();
    profileSessionIdSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });

  describe('When getAssignmentSuccessRecordRequest generator is invoked', () => {
    const action = {
      payload: {
        studentId: '',
        workItemId: '',
        questionNum: '',
        comment: '',
        communityId: 'CohortIDVal',
        assignment: '',
        kind: '',
      },
    };
    const xmlPayload = `<workItemsSubset><workItemInfo workItemId="${
      action.payload.workItemId
    }" communityId="${action.payload.communityId}" studentId="${
      action.payload.studentId
    }" assignment="${action.payload.assignment}" kind="${action.payload.kind}"/></workItemsSubset>`;
    beforeAll(() => {
      generator = Saga.getAssignmentSuccessRecordRequest(action);
    });

    it('should trigger showLoading action and open a busy loader', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
    });

    it('should get a user session id', () => {
      expect(generator.next().value).toEqual(select(Selectors.makeSelectProfileSessionId()));
    });

    it('should get a user profile id', () => {
      expect(generator.next('SessionIDVal').value).toEqual(
        select(Selectors.makeSelectProfileUserId())
      );
    });

    it('should trigger getAssignmentSuccessRecordData request successfully', () => {
      expect(generator.next('UserIDVal').value).toEqual(
        call(
          Request.getAssignmentSuccessRecordData,
          'SessionIDVal',
          'UserIDVal',
          'R180NG,S44NG,S44JR,M180,M180Y2',
          'teacher',
          xmlPayload
        )
      );
    });

    it('should dispatch an action with the response data', () => {
      expect(generator.next().value).toEqual(put(Actions.getAssignmentSuccessRecordSuccess()));
    });

    it('should trigger hideLoading action and remove the busy loader', () => {
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('should dispatch an action with the response data', () => {
      expect(generator.throw(err).value).toEqual(
        put(Actions.getAssignmentSuccessRecordFailure(err))
      );
    });
    it('should trigger hideLoading action and remove the busy loader', () => {
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });

  describe('assignmentSaveSuccessRecordRequest', () => {
    const userId = 'UserIDVal';
    const action = {
      payload: {
        studentId: '',
        workItemId: '',
        questionNum: '',
        comment: '',
        communityId: 'CohortIDVal',
      },
    };
    const val = `<evaluationUpdate submissionType="SUCCESS_PASSAGE_REC" studentId="${
      action.payload.studentId
    }" teacherId="${userId}" rubricType="SuccessPassageRec" workItemId="${
      action.payload.workItemId
    }">
  <questionNum>${action.payload.questionNum}</questionNum>
  <comment>${action.payload.comment}</comment>
</evaluationUpdate>`;

    beforeEach(() => {
      err = 'mock error';
      generator = Saga.assignmentSaveSuccessRecordRequest(action);
    });

    it('assignmentSaveSuccessRecordRequest', () => {
      expect(generator.next().value).toEqual(select(profileUserIdSelector));
      expect(generator.next('UserIDVal').value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next('SessionIDVal').value).toEqual(
        call(Request.assignmentSaveSuccessRecordData, 'SessionIDVal', 'CohortIDVal', val)
      );
      expect(generator.next().value).toEqual(put(Actions.assignmentSuccessRecordSaveSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('getAssignmentSuccessRecordFailure', () => {
      expect(generator.next().value).toEqual(select(profileUserIdSelector));
      expect(generator.next('UserIDVal').value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getAssignmentSuccessRecordFailure(err))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            Constants.GET_ASSIGNMENT_SUCCESS_RECORD_REQUEST,
            Saga.getAssignmentSuccessRecordRequest
          ),
          takeLatest(
            Constants.ASSIGNMENT_SUCCESS_RECORD_SAVE_REQUEST,
            Saga.assignmentSaveSuccessRecordRequest
          ),
        ])
      );
    });
  });
});
