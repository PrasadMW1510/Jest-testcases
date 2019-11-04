/**
 * Test  sagas
 */
import { takeLatest, put, all } from 'redux-saga/effects';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('AddAssignmentContainer Saga', () => {
  const err = 'mock error';
  let generator = null;
  let profileSessionIdSelector = null;
  let profileUserIdSelector = null;
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    profileUserIdSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });

  describe('getStudentDetailsRequest', () => {
    const data = {
      data: 'jjj',
    };
    beforeEach(() => {
      generator = Saga.getStudentDetailsRequest(data);
    });
    it('getStudentDetailsSuccess', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(data).value;
      expect(putDescriptor1).toEqual(put(Actions.getStudentDetailsSuccess(data)));
    });
    it('getStudentDetailsFailure', () => {
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      expect(generator.throw(err).value).toEqual(put(Actions.getStudentDetailsFailure(err)));
    });
  });
  describe('postNewAssignmentRequest', () => {
    const assignmentData = {
      data: {
        assignmentName: 'assign',
        assignmentType: 'assi',
        dueDate: 'jhdh',
        createdForClass: 'createdForClass',
        communityId: 'communityId',
        studentId: 'studentId',
        average: 'avg',
        comment: 'comment',
      },
    };
    beforeEach(() => {
      generator = Saga.postNewAssignmentRequest(assignmentData);
    });
    it('getStudentDetailsSuccess', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(assignmentData).value;
      expect(putDescriptor1).toEqual(put(Actions.postSaveNewAssignmentSuccess(assignmentData)));
      const putDescriptor2 = generator.next(assignmentData).value;
      expect(putDescriptor2).toMatchSnapshot();
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_STUDENT_DETAILS, Saga.getStudentDetailsRequest),
          takeLatest(Constants.POST_NEW_ASSIGNMENT, Saga.postNewAssignmentRequest),
        ])
      );
    });
  });
});
