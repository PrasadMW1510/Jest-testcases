import { takeLatest, put, select, all, call } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { hideModal } from 'containers/ModalController/actions';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('StudentWorkProgramsContainer Saga', () => {
  let generator = null;
  let selectSelector = null;
  let profileUserIdSelector = null;

  beforeEach(() => {
    selectSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });
  describe('getIreadStudentWorkDataRequest', () => {
    let err = null;
    const studentData = {
      data: {
        workItemId: '',
        communityId: '',
        id: '',
        assignment: '',
      },
    };
    const val = `<workItemsSubset>
    <workItemInfo
      workItemId=""
      communityId=""
      studentId=""
      assignment=""
      kind="ClassAssignment"/>
    </workItemsSubset>`;

    beforeEach(() => {
      err = 'mock error';
      generator = Saga.getIreadStudentWorkDataRequest(studentData);
    });

    it('getIreadStudentWorkDataRequest', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('ProfileIDVal').value).toEqual(
        call(Request.getIReadStudentWorkDataRequest, 'ProfileIDVal', 'SessionIDVal', val)
      );
      expect(generator.next().value).toEqual(put(Actions.getIReadStudentWorkDataRequestSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('getIReadStudentWorkDataRequestFailure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toEqual(
        put(Actions.getIReadStudentWorkDataRequestFailure(err))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('deleteIreadStudentWorkDataRequest', () => {
    let err = null;
    const studentData = {
      data: {
        workItemId: '',
      },
    };

    beforeEach(() => {
      err = 'mock error';
      generator = Saga.deleteIreadStudentWorkDataRequest(studentData);
    });

    it('deleteIreadStudentWorkDataRequest', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toEqual(put(Actions.delIReadStudentWorkDataSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(put(hideModal()));
    });

    it('delIReadStudentWorkDataFailure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.delIReadStudentWorkDataFailure(err)));
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
          takeLatest(Constants.GET_IREAD_STUDENT_WORK_DATA, Saga.getIreadStudentWorkDataRequest),
          takeLatest(Constants.DELETE_IREAD_STUDENT_WORK, Saga.deleteIreadStudentWorkDataRequest),
          takeLatest(Constants.POST_IREAD_STUDENT_WORK_DATA, Saga.saveIreadStudentWorkDataRequest),
        ])
      );
    });
  });
});
