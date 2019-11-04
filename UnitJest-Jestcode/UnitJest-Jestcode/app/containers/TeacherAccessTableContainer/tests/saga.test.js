/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartSelectors from 'containers/SmartBarContainer/selectors';
import { USER_ORG, USER_TYPE } from 'containers/App/constants';

import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';

describe('TeacherEnrollmentFlow', () => {
  let generator = null;
  let sessionIdSelector = null;
  let districtSelector = null;
  let activeSchoolIdSelector = null;
  let activeTeacherIdSelector = null;
  let activeGradeIdSelector = null;
  let orgTypeSelector = null;
  let userTypeSelector = null;
  let schoolIdSelector = null;
  beforeEach(() => {
    sessionIdSelector = jest.fn();
    districtSelector = jest.fn();
    activeSchoolIdSelector = jest.fn();
    activeTeacherIdSelector = jest.fn();
    activeGradeIdSelector = jest.fn();
    orgTypeSelector = jest.fn();
    userTypeSelector = jest.fn();
    schoolIdSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectProfileUserOrgId').mockReturnValue(schoolIdSelector);

    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileDistrictId').mockReturnValue(districtSelector);
    jest
      .spyOn(SmartSelectors, 'makeSelectedActiveSchoolId')
      .mockReturnValue(activeSchoolIdSelector);
    jest
      .spyOn(SmartSelectors, 'makeSelectedActiveTeacherId')
      .mockReturnValue(activeTeacherIdSelector);
    jest.spyOn(SmartSelectors, 'makeSelectedActiveGradeId').mockReturnValue(activeGradeIdSelector);
    jest.spyOn(Selectors, 'makeSelectLoginUserOrg').mockReturnValue(orgTypeSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserType').mockReturnValue(userTypeSelector);
  });

  describe('TeacherAppsUsageFlow', () => {
    let err = null;

    beforeEach(() => {
      err = 'mock error';
      generator = Saga.TeacherAppsUsageFlow({});
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(call(Saga.makeTeacherAppUsageRequest, {}));
      expect(generator.next().value).toEqual(put(Actions.teacherAppsUsageRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(call(Saga.makeTeacherAppUsageRequest, {}));
      expect(generator.throw(err).value).toEqual(put(Actions.teacherAppsUsageRequestFailure(err)));
    });
  });

  describe('TeacherEnrollmentFlow', () => {
    let err = null;
    let action = null;
    beforeEach(() => {
      err = 'mock error';
    });

    it('All calls pass', () => {
      action = {
        currentPage: 1,
        itemsPerPage: 250,
      };
      generator = Saga.TeacherEnrollmentFlow(action);
      expect(generator.next().value).toEqual(call(Saga.makeTeacherRequest, action));
      expect(generator.next().value).toEqual(put(Actions.teacherEnrollRequestSuccess()));
    });

    it('when classId/stduentId/groupId are present', () => {
      action = {
        classId: ['class01234'],
        studentId: ['student0123'],
        groupId: ['group1234'],
      };
      generator = Saga.TeacherEnrollmentFlow(action);
      expect(generator.next().value).toEqual(put(push('/roster')));
    });

    it('TeacherEnrollmentFlow: calls fail', () => {
      action = {
        currentPage: 1,
        itemsPerPage: 250,
      };
      generator = Saga.TeacherEnrollmentFlow(action);
      expect(generator.next().value).toEqual(call(Saga.makeTeacherRequest, action));
      expect(generator.throw(err).value).toEqual(put(Actions.teacherEnrollRequestFailure(err)));
    });
  });

  describe('TeacherAccessSaveFlow when should return is true', () => {
    let store = null;
    let err = null;
    let action = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
        },
      });
      err = 'mock error';
      action = {
        teacherEnroll:
          '<enrollment><users><user><user_id>ukofq8qbu8e7mf0vekbcj8qi_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>tieujrvp40j783ce1sdt9ed0_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id></applications></user><user><user_id>k32pf5an12lsc15ek8u7aio5_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>464b3im5dtqmhtouchk8j8na_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id></applications></user><user><user_id>hht3s9t7cq87r8q5l4ss44qk_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>ombeun4d4nkmpe8ff7sau0c2_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>uacfhsv4t94ocramofib85fd_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>qejiipnhqj167nj8i3v6tnco_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>k2oilhshf7q2ckdq6s3nisr2_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>8rg97gjs6viv9u9caklkfpnm_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>dg1g7lp65n40tjeob81jcgm1_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>3im5c6n5rfv90cnnmdipsetg_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>5t8solpm9nmnskk9g0d66fik_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>6udu95jpq1egin9bqdpbgl9k_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>vsjiq9bg8fm8p9aj242n2eg8_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id>',
        shouldReturn: true,
        currentPage: 2,
      };
      generator = Saga.TeacherAccessSaveFlow(action);
    });

    it('should return is true', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(Request.postTeacherEnrollment, store.getIn(['session_id', 0]), action.teacherEnroll)
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.teacherAccessSaveRequestFailure(err)));
    });
  });

  describe('TeacherAccessSaveFlow when should return is false', () => {
    let store = null;
    let err = null;
    let action = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
        },
      });
      err = 'mock error';
      action = {
        teacherEnroll:
          '<enrollment><users><user><user_id>ukofq8qbu8e7mf0vekbcj8qi_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>tieujrvp40j783ce1sdt9ed0_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id></applications></user><user><user_id>k32pf5an12lsc15ek8u7aio5_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>464b3im5dtqmhtouchk8j8na_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id></applications></user><user><user_id>hht3s9t7cq87r8q5l4ss44qk_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>ombeun4d4nkmpe8ff7sau0c2_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>uacfhsv4t94ocramofib85fd_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>qejiipnhqj167nj8i3v6tnco_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>k2oilhshf7q2ckdq6s3nisr2_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>8rg97gjs6viv9u9caklkfpnm_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>dg1g7lp65n40tjeob81jcgm1_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>3im5c6n5rfv90cnnmdipsetg_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>5t8solpm9nmnskk9g0d66fik_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>6udu95jpq1egin9bqdpbgl9k_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>vsjiq9bg8fm8p9aj242n2eg8_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id>',
        shouldReturn: false,
        currentPage: 2,
      };
      generator = Saga.TeacherAccessSaveFlow(action);
    });

    it('should return is false', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(Request.postTeacherEnrollment, store.getIn(['session_id', 0]), action.teacherEnroll)
      );
      expect(generator.next().value).toEqual(put(Actions.teacherEnrollRequest({ currentPage: 1 })));
      expect(generator.next().value).toEqual(put(Actions.teacherAppsUsageRequest()));
      expect(generator.next().value).toEqual(put(Actions.teacherAccessSaveRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.teacherAccessSaveRequestFailure(err)));
    });
  });

  describe('makeTeacherRequest', () => {
    let action = null;
    let login = null;

    it('when the smart bar selection is teacher', () => {
      login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        school_id: ['adsfczas111'],
        activeTeacherId: ['class01'],
        activeSchoolId: ['abcdefgh'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      action = {
        teacherId: ['class01'],
        payload: {},
      };
      generator = Saga.makeTeacherRequest(action);
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(districtSelector));
      expect(generator.next(login.district_id).value).toEqual(select(activeSchoolIdSelector));
      expect(generator.next(login.activeSchoolId).value).toEqual(select(activeTeacherIdSelector));
      expect(generator.next(login.activeTeacherId).value).toEqual(select(activeGradeIdSelector));
      expect(generator.next(login.activeGradeId).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.school_id).value).toEqual(
        call(
          Request.getTeacherEnrollmentForTeacher,
          login.session_id,
          login.activeSchoolId,
          login.activeTeacherId,
          action.payload
        )
      );
    });

    it('when the smart bar selection is grade', () => {
      login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        school_id: ['adsfczas111'],
        activeGradeId: ['class01'],
        activeSchoolId: ['abcdefgh'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      action = {
        gradeId: ['class01'],
        payload: {},
      };
      generator = Saga.makeTeacherRequest(action);
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(districtSelector));
      expect(generator.next(login.district_id).value).toEqual(select(activeSchoolIdSelector));
      expect(generator.next(login.activeSchoolId).value).toEqual(select(activeTeacherIdSelector));
      expect(generator.next(login.activeTeacherId).value).toEqual(select(activeGradeIdSelector));
      expect(generator.next(login.activeGradeId).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.school_id).value).toEqual(
        call(
          Request.getTeacherEnrollmentForGrade,
          login.session_id,
          login.activeSchoolId,
          login.activeGradeId,
          action.payload
        )
      );
    });

    it('when the smart bar selection is school', () => {
      login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        school_id: ['adsfczas111'],
        activeSchoolId: ['adsfczas111'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      action = {
        schoolId: ['adsfczas111'],
        payload: {},
      };
      generator = Saga.makeTeacherRequest(action);
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(districtSelector));
      expect(generator.next(login.district_id).value).toEqual(select(activeSchoolIdSelector));
      expect(generator.next(login.activeSchoolId).value).toEqual(select(activeTeacherIdSelector));
      expect(generator.next(login.activeTeacherId).value).toEqual(select(activeGradeIdSelector));
      expect(generator.next(login.activeGradeId).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.school_id).value).toEqual(
        call(
          Request.getTeacherEnrollmentForSchool,
          login.session_id,
          login.activeSchoolId,
          action.payload
        )
      );
    });
    it('when the smart bar selection is class', () => {
      login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      action = {
        classId: ['adsfczas111'],
        payload: {},
      };
      generator = Saga.makeTeacherRequest(action);
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(districtSelector));
      expect(generator.next(login.district_id).value).toEqual(select(activeSchoolIdSelector));
      expect(generator.next(login.activeSchoolId).value).toEqual(select(activeTeacherIdSelector));
      expect(generator.next(login.activeTeacherId).value).toEqual(select(activeGradeIdSelector));
      expect(generator.next(login.activeGradeId).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.school_id).value).toEqual(
        call(
          Request.getTeacherEnrollmentForDistrict,
          login.session_id,
          login.district_id,
          action.payload
        )
      );
    });
  });

  describe('makeTeacherAppUsageRequest', () => {
    let login = null;

    beforeEach(() => {
      generator = Saga.makeTeacherAppUsageRequest();
    });

    it('when the userOrg is School', () => {
      login = {
        session_id: ['adsfczas111'],
        school_id: ['adsfczas123'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.school_id).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(
        call(Request.getTeacherAppsUsageForSchool, login.session_id, login.school_id)
      );
    });

    it('when the userOrg is District', () => {
      login = {
        session_id: ['adsfczas111'],
        school_id: ['adsfczas111'],
        user_org: USER_ORG.District,
        user_type: USER_TYPE.Administrator,
      };
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.school_id).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(
        call(Request.getTeacherAppsUsage, login.session_id)
      );
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            [
              Constants.TEACHER_ENROLL_REQUEST,
              SmartBarConstants.GRADE_SELECTION_SUCCESS,
              SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
              SmartBarConstants.TEACHER_SELECTION_SUCCESS,
              SmartBarConstants.CLASS_SELECTION_SUCCESS,
              SmartBarConstants.GROUP_SELECTION_SUCCESS,
              SmartBarConstants.STUDENT_SELECTION_SUCCESS,
              SmartBarConstants.RESET_SELECTIONS,
            ],
            Saga.TeacherEnrollmentFlow
          ),
          takeLatest(
            [Constants.TEACHER_APPS_USAGE_REQUEST, SmartBarConstants.SCHOOL_SELECTION_SUCCESS],
            Saga.TeacherAppsUsageFlow
          ),
          takeLatest(Constants.TEACHER_ACCESS_SAVE_REQUEST, Saga.TeacherAccessSaveFlow),
        ])
      );
    });
  });
});
