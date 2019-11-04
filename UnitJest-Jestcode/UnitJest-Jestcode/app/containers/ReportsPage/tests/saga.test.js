/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as Constants from '../constants';
import * as Request from '../request';
import defaultSaga, * as Saga from '../saga';
import * as Actions from '../actions';
import * as GlobalSelectors from '../../App/selectors';
import * as SmartBarSelectors from '../../SmartBarContainer/selectors';

describe('Report list request flow', () => {
  let store = null;
  const err = null;
  let generator = null;
  let loginSelector = null;
  let districtSelector = null;
  let schoolSelector = null;
  let gradeSelector = null;
  let teacherSelector = null;
  let classSelector = null;
  let groupSelector = null;
  let studentSelector = null;

  let reportList = null;
  beforeEach(() => {
    loginSelector = jest.fn().mockReturnValue(fromJS({ session_id: ['abdecf'] }));
    districtSelector = jest.fn();
    schoolSelector = jest.fn();
    gradeSelector = jest.fn();
    teacherSelector = jest.fn();
    classSelector = jest.fn();
    groupSelector = jest.fn();
    studentSelector = jest.fn();
    jest.spyOn(GlobalSelectors, 'makeSelectLoginData').mockReturnValue(loginSelector);
    jest.spyOn(GlobalSelectors, 'makeSelectProfileDistrictId').mockReturnValue(districtSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectSchoolId').mockReturnValue(schoolSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectGradeId').mockReturnValue(gradeSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectTeacherId').mockReturnValue(teacherSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectClassId').mockReturnValue(classSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectGroupId').mockReturnValue(groupSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectStudentId').mockReturnValue(studentSelector);

    store = fromJS({
      login: {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
      },
      profile: {
        school_id: ['my_school'],
      },
      session_id: ['adsfczas111'],
    });
    reportList = [{ report_id: 0 }, { report_id: 1 }];
    generator = Saga.reportListRequestFlow();
  });

  it('Should handle successful report request', () => {
    expect(generator.next().value).toEqual(select(loginSelector));
    expect(generator.next(store.get('login')).value).toEqual(select(districtSelector));
    expect(generator.next('6477EA8C2E3D11E6A9700A2175802BAF').value).toEqual(
      select(schoolSelector)
    );
    expect(generator.next('schoolid').value).toEqual(select(gradeSelector));
    expect(generator.next('gradeid').value).toEqual(select(teacherSelector));
    expect(generator.next('teacherid').value).toEqual(select(classSelector));
    expect(generator.next('classid').value).toEqual(select(groupSelector));
    expect(generator.next('groupid').value).toEqual(select(studentSelector));
    expect(generator.next('studentid').value).toEqual(
      call(Request.getReportList, store.getIn(['login', 'session_id', 0]), 'Student', 'studentid')
    );
    expect(generator.next(reportList).value).toEqual(
      put(Actions.reportListRequestSuccess(reportList))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Should handle successful district only report request', () => {
    expect(generator.next().value).toEqual(select(loginSelector));
    expect(generator.next(store.get('login')).value).toEqual(select(districtSelector));
    expect(generator.next('6477EA8C2E3D11E6A9700A2175802BAF').value).toEqual(
      select(schoolSelector)
    );
    expect(generator.next('').value).toEqual(select(gradeSelector));
    expect(generator.next('').value).toEqual(select(teacherSelector));
    expect(generator.next('').value).toEqual(select(classSelector));
    expect(generator.next('').value).toEqual(select(groupSelector));
    expect(generator.next('').value).toEqual(select(studentSelector));
    expect(generator.next('').value).toEqual(
      call(
        Request.getReportList,
        store.getIn(['login', 'session_id', 0]),
        'District',
        '6477EA8C2E3D11E6A9700A2175802BAF'
      )
    );
    expect(generator.next(reportList).value).toEqual(
      put(Actions.reportListRequestSuccess(reportList))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Should handle failed report request', () => {
    expect(generator.next().value).toEqual(select(loginSelector));
    expect(generator.next(store.get('login')).value).toEqual(select(districtSelector));
    expect(generator.next('6477EA8C2E3D11E6A9700A2175802BAF').value).toEqual(
      select(schoolSelector)
    );
    expect(generator.next('schoolid').value).toEqual(select(gradeSelector));
    expect(generator.next('gradeid').value).toEqual(select(teacherSelector));
    expect(generator.next('teacherid').value).toEqual(select(classSelector));
    expect(generator.next('classid').value).toEqual(select(groupSelector));
    expect(generator.next('groupid').value).toEqual(select(studentSelector));
    expect(generator.next('studentid').value).toEqual(
      call(Request.getReportList, store.getIn(['login', 'session_id', 0]), 'Student', 'studentid')
    );
    expect(generator.next(reportList).value).toEqual(
      put(Actions.reportListRequestSuccess(reportList))
    );
    expect(generator.throw(err).value).toEqual(put(Actions.reportListRequestFailure(err)));
    expect(generator.next().done).toBeTruthy();
  });

  describe('defaultSaga', () => {
    beforeEach(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.REPORT_LIST_REQUEST, Saga.reportListRequestFlow)
      );
    });
  });
});
