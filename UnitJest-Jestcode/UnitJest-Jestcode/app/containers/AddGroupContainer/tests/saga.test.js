/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as Selectors from 'containers/App/selectors';
import * as SelectorSchool from 'containers/SmartBarContainer/selectors';
import { getClassDetails, getGroupProfilePageData } from 'containers/ProfilePageContainer/request';
import { redirectionSmartBarSGT } from 'containers/SmartBarContainer/actions';
import { hideModal } from 'containers/ModalController/actions';
import * as Saga from '../saga';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';

describe('AddGroupContainer saga', () => {
  let generator = null;
  let sessionIdSelector = null;
  let userIdSelector = null;
  let userTypeSelector = null;
  let selectedTeacherIdSelector = null;
  let selectedClassIdSelector = null;
  let schoolIdSelector = null;
  let groupIdSelector = null;

  beforeEach(() => {
    sessionIdSelector = jest.fn();
    userIdSelector = jest.fn();
    userTypeSelector = jest.fn();
    selectedTeacherIdSelector = jest.fn();
    selectedClassIdSelector = jest.fn();
    schoolIdSelector = jest.fn();
    groupIdSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(userIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserType').mockReturnValue(userTypeSelector);
    jest
      .spyOn(SelectorSchool, 'makeSelectedActiveTeacherId')
      .mockReturnValue(selectedTeacherIdSelector);
    jest
      .spyOn(SelectorSchool, 'makeSelectedActiveClassId')
      .mockReturnValue(selectedClassIdSelector);
    jest.spyOn(SelectorSchool, 'makeSelectedActiveSchoolId').mockReturnValue(schoolIdSelector);
    jest.spyOn(SelectorSchool, 'makeSelectedActiveGroupId').mockReturnValue(groupIdSelector);
  });

  describe('verify when there is a selected class id', () => {
    let store = null;
    const error = 'mockError';
    const classInfo = 'mockClassInfo';

    it('class selected has a value', () => {
      store = fromJS({
        session_id: ['9489383'],
        user_id: ['8493839'],
        user_type: ['Admin'],
        activeTeacherId: ['84938'],
        activeClassId: ['949409'],
        activeSchoolId: ['859484'],
      });

      generator = Saga.getClassesStudentInformation();

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(userIdSelector));
      expect(generator.next(store.getIn(['user_id', 0])).value).toEqual(select(userTypeSelector));
      expect(generator.next(store.getIn(['user_type', 0])).value).toEqual(select(schoolIdSelector));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(selectedTeacherIdSelector)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(selectedClassIdSelector)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        call(getClassDetails, store.getIn(['session_id', 0]), store.getIn(['activeClassId', 0]))
      );

      expect(generator.next(classInfo).value).toEqual(
        put(Actions.getClassesWithStudentInfoSuccess(classInfo))
      );
    });

    it('class selected value is empty and not teacher usertype', () => {
      store = fromJS({
        session_id: ['9489383'],
        user_id: ['8493839'],
        user_type: ['Admin'],
        activeTeacherId: ['84938'],
        activeClassId: [''],
        activeSchoolId: ['859484'],
      });

      generator = Saga.getClassesStudentInformation();

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(userIdSelector));
      expect(generator.next(store.getIn(['user_id', 0])).value).toEqual(select(userTypeSelector));
      expect(generator.next(store.getIn(['user_type', 0])).value).toEqual(select(schoolIdSelector));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(selectedTeacherIdSelector)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(selectedClassIdSelector)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        call(
          Request.getClassDataWithStudents,
          store.getIn(['session_id', 0]),
          store.getIn(['activeSchoolId', 0]),
          store.getIn(['activeTeacherId', 0])
        )
      );

      expect(generator.next(classInfo).value).toEqual(
        put(Actions.getClassesWithStudentInfoSuccess(classInfo))
      );
    });

    it('school id is not empty and usertype is teacher', () => {
      store = fromJS({
        session_id: ['9489383'],
        user_id: ['8493839'],
        user_type: ['Teacher'],
        activeTeacherId: ['84938'],
        activeClassId: [''],
        activeSchoolId: ['859484'],
      });

      generator = Saga.getClassesStudentInformation();

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(userIdSelector));
      expect(generator.next(store.getIn(['user_id', 0])).value).toEqual(select(userTypeSelector));
      expect(generator.next(store.getIn(['user_type', 0])).value).toEqual(select(schoolIdSelector));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(selectedTeacherIdSelector)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(selectedClassIdSelector)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        call(
          Request.getClassDataWithStudents,
          store.getIn(['session_id', 0]),
          store.getIn(['activeSchoolId', 0]),
          store.getIn(['user_id', 0])
        )
      );

      expect(generator.next(classInfo).value).toEqual(
        put(Actions.getClassesWithStudentInfoSuccess(classInfo))
      );
    });

    it('class selected value is empty and teacher usertype with schoolId', () => {
      store = fromJS({
        session_id: ['9489383'],
        user_id: ['8493839'],
        user_type: ['Admin'],
        activeTeacherId: ['84938'],
        activeClassId: [''],
        activeSchoolId: ['859484'],
      });

      generator = Saga.getClassesStudentInformation();

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(userIdSelector));
      expect(generator.next(store.getIn(['user_id', 0])).value).toEqual(select(userTypeSelector));
      expect(generator.next(store.getIn(['user_type', 0])).value).toEqual(select(schoolIdSelector));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(selectedTeacherIdSelector)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(selectedClassIdSelector)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        call(
          Request.getClassDataWithStudents,
          store.getIn(['session_id', 0]),
          store.getIn(['activeSchoolId', 0]),
          store.getIn(['activeTeacherId', 0])
        )
      );

      expect(generator.next(classInfo).value).toEqual(
        put(Actions.getClassesWithStudentInfoSuccess(classInfo))
      );
    });

    it('verify with user type is teacher', () => {
      store = fromJS({
        session_id: ['9489383'],
        user_id: ['8493839'],
        user_type: ['Teacher'],
        activeTeacherId: [''],
        activeClassId: [''],
        activeSchoolId: [''],
      });

      generator = Saga.getClassesStudentInformation();

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(userIdSelector));
      expect(generator.next(store.getIn(['user_id', 0])).value).toEqual(select(userTypeSelector));
      expect(generator.next(store.getIn(['user_type', 0])).value).toEqual(select(schoolIdSelector));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(selectedTeacherIdSelector)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(selectedClassIdSelector)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        call(
          Request.getClassesAssosiatedWithTeacher,
          store.getIn(['session_id', 0]),
          store.getIn(['user_id', 0])
        )
      );

      expect(generator.next(classInfo).value).toEqual(
        put(Actions.getClassesWithStudentInfoSuccess(classInfo))
      );
    });

    it('verify when teacher id is selected', () => {
      store = fromJS({
        session_id: ['9489383'],
        user_id: ['8493839'],
        user_type: ['Teacher'],
        activeTeacherId: ['84938'],
        activeClassId: [''],
        activeSchoolId: [''],
      });

      generator = Saga.getClassesStudentInformation();

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(userIdSelector));
      expect(generator.next(store.getIn(['user_id', 0])).value).toEqual(select(userTypeSelector));
      expect(generator.next(store.getIn(['user_type', 0])).value).toEqual(select(schoolIdSelector));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(selectedTeacherIdSelector)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(selectedClassIdSelector)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        call(
          Request.getClassesAssosiatedWithTeacher,
          store.getIn(['session_id', 0]),
          store.getIn(['activeTeacherId', 0])
        )
      );

      expect(generator.next(classInfo).value).toEqual(
        put(Actions.getClassesWithStudentInfoSuccess(classInfo))
      );
    });

    it('verify saga error', () => {
      store = fromJS({
        session_id: ['9489383'],
        user_id: ['8493839'],
      });

      generator = Saga.getClassesStudentInformation();

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(error).value).toEqual(
        put(Actions.getClassesWithStudentInfoFailure(error))
      );
    });
  });

  describe('verify post group info', () => {
    let store = null;
    let group = null;
    const mockGroupInfo = 'mockGroupInfo';
    const error = 'mockError';

    it('verify when success with class redirection', () => {
      store = fromJS({
        session_id: ['94940'],
        activeGroupId: [''],
      });
      group = {
        class_id: '2323',
      };
      generator = Saga.postGroupInfo({ group });

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(groupIdSelector));
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        call(Request.postCreateAGroup, store.getIn(['session_id', 0]), group)
      );
      expect(generator.next(mockGroupInfo).value).toEqual(
        put(Actions.postGroupSuccess(mockGroupInfo))
      );
      expect(generator.next().value).toEqual(put(Actions.resetGroupStatus()));
      expect(generator.next().value).toEqual(put(redirectionSmartBarSGT()));
      expect(generator.next().value).toEqual(put(hideModal()));
    });

    it('verify when success when groupId is not empty', () => {
      store = fromJS({
        session_id: ['94940'],
        activeGroupId: ['2323'],
      });
      group = {
        class_id: '2323',
      };
      generator = Saga.postGroupInfo({ group });

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(groupIdSelector));
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        call(Request.updateGroupInfo, store.getIn(['session_id', 0]), group)
      );
      expect(generator.next(mockGroupInfo).value).toEqual(
        put(Actions.postGroupSuccess(mockGroupInfo))
      );
      expect(generator.next().value).toEqual(put(Actions.resetGroupStatus()));
      expect(generator.next().value).toEqual(put(redirectionSmartBarSGT()));
      expect(generator.next().value).toEqual(put(hideModal()));
    });

    it('verify failure', () => {
      store = fromJS({
        session_id: ['94940'],
        activeGroupId: [''],
      });
      group = {
        class_id: '2323',
      };
      generator = Saga.postGroupInfo({ group });

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(error).value).toEqual(put(Actions.postGroupFailure(error)));
    });
  });

  describe('verify get group info', () => {
    let store = null;
    const mockGroupInfo = 'mock Group Info';
    const error = 'error';

    beforeEach(() => {
      store = fromJS({
        session_id: ['84849'],
        activeGroupId: ['949039'],
      });
      generator = Saga.getGroupInfo();
    });

    it('verify when the edit group is successful', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(groupIdSelector));
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        call(
          getGroupProfilePageData,
          store.getIn(['session_id', 0]),
          store.getIn(['activeGroupId', 0])
        )
      );
      expect(generator.next(mockGroupInfo).value).toEqual(
        put(Actions.getGroupInfoSuccess(mockGroupInfo))
      );
    });

    it('verfiy when edit group is failure', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(error).value).toEqual(put(Actions.getGroupInfoFailure(error)));
    });
  });

  describe('default sage', () => {
    beforeAll(() => {
      generator = Saga.default();
    });

    it('GET_PRODUCT_SEARCH IS CALLED', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_CLASSES_WITH_STUDENT_INFO, Saga.getClassesStudentInformation)
      );
    });

    it('Verify default saga for post call', () => {
      expect(generator.next().value).toEqual(takeLatest(Constants.POST_GROUP, Saga.postGroupInfo));
    });

    it('Verify default saga for group info', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_GROUP_INFO, Saga.getGroupInfo)
      );
    });
  });
});
