import { takeLatest, all } from 'redux-saga/effects';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('TeacherMadeQuizContainer Saga', () => {
  let generator = null;
  let loginDataSelector = null;
  let profileSessionIdSelector = null;
  let profileUserIdSelector = null;
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    loginDataSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });
  describe('getAssignmentDataRequest', () => {
    const assignmentData = {
      data: {
        classId: {
          classId: '',
          workItemId: {
            community_id: '',
          },
        },
        assignment: 'assign',
      },
    };
    beforeEach(() => {
      generator = Saga.getAssignmentDataRequest(assignmentData);
    });
    it('setClassRequestSuccess', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(assignmentData).value;
      expect(putDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next(assignmentData.data.classId.classId).value;
      expect(putDescriptor2).toMatchSnapshot();
      const putDescriptor3 = generator.next().value;
      expect(putDescriptor3).toMatchSnapshot();
    });
    it('setStudentRequestSuccess err part', () => {
      const err = 'mock err';
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('getStudentDetailsRequest', () => {
    const action = {
      data: {},
    };
    beforeEach(() => {
      generator = Saga.getStudentDetailsRequest(action);
    });
    it('setClassRequestSuccess', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('calssID').value).toMatchSnapshot();

      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
    });
    it('setStudentRequestSuccess err part', () => {
      const err = 'mock err';
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('saveAssignmentRequest ', () => {
    const action = {
      data: {
        currentIndex: 0,
        metaData: [
          {
            workItemId: 'work',
          },
        ],
      },
    };
    beforeEach(() => {
      generator = Saga.saveAssignmentRequest(action);
    });
    it('setClassRequestSuccess', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('action').value).toMatchSnapshot();

      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toMatchSnapshot();
      const putDescriptor3 = generator.next().value;
      expect(putDescriptor3).toMatchSnapshot();
    });
    it('setStudentRequestSuccess err part', () => {
      const err = 'mock err';
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('deleteAssignmentRequest ', () => {
    const action = {
      data: {},
    };
    beforeEach(() => {
      generator = Saga.deleteAssignmentRequest(action);
    });
    it('setClassRequestSuccess', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toMatchSnapshot();
    });
    it('setStudentRequestSuccess err part', () => {
      const err = 'mock err';
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_ASSIGNMENT_REQUEST, Saga.getAssignmentDataRequest),
          takeLatest(Constants.GET_STUDENT_DETAILS, Saga.getStudentDetailsRequest),
          takeLatest(Constants.SAVE_ASSGINMENT_REQUEST, Saga.saveAssignmentRequest),
          takeLatest(Constants.DELETE_ASSIGNMENT_REQUEST, Saga.deleteAssignmentRequest),
        ])
      );
    });
  });
});
