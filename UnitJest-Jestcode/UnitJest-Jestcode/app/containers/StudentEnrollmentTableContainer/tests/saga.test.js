/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartSelectors from 'containers/SmartBarContainer/selectors';
import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';

import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';

describe('StudentEnrollmentFlow Saga', () => {
  let generator = null;
  let sessionIdSelector = null;
  let districtSelector = null;
  let activeSchoolIdSelector = null;
  let smartBarSelector = null;
  let activeTeacherIdSelector = null;
  let activeClassIdSelector = null;
  let activeGradeIdSelector = null;
  let orgTypeSelector = null;
  let userTypeSelector = null;
  let activeGroupIdSelector = null;
  let activeStudentIdSelector = null;
  let schoolIdSelector = null;
  beforeEach(() => {
    sessionIdSelector = jest.fn();
    districtSelector = jest.fn();
    activeSchoolIdSelector = jest.fn();
    activeTeacherIdSelector = jest.fn();
    activeClassIdSelector = jest.fn();
    activeGradeIdSelector = jest.fn();
    activeGroupIdSelector = jest.fn();
    activeStudentIdSelector = jest.fn();
    orgTypeSelector = jest.fn();
    userTypeSelector = jest.fn();
    schoolIdSelector = jest.fn();
    smartBarSelector = jest.fn();

    jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileDistrictId').mockReturnValue(districtSelector);
    jest
      .spyOn(SmartSelectors, 'makeSelectedActiveSchoolId')
      .mockReturnValue(activeSchoolIdSelector);
    jest
      .spyOn(SmartSelectors, 'makeSelectedActiveTeacherId')
      .mockReturnValue(activeTeacherIdSelector);
    jest.spyOn(SmartSelectors, 'makeSelectedActiveGradeId').mockReturnValue(activeGradeIdSelector);
    jest.spyOn(SmartSelectors, 'makeSelectedActiveClassId').mockReturnValue(activeClassIdSelector);
    jest.spyOn(SmartSelectors, 'makeSelectedActiveGroupId').mockReturnValue(activeGroupIdSelector);
    jest
      .spyOn(SmartSelectors, 'makeSelectedActiveStudentId')
      .mockReturnValue(activeStudentIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserOrgId').mockReturnValue(schoolIdSelector);

    jest.spyOn(Selectors, 'makeSelectLoginUserOrg').mockReturnValue(orgTypeSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserType').mockReturnValue(userTypeSelector);
  });

  describe('StudentAppsUsageFlow', () => {
    let err = null;

    beforeEach(() => {
      err = 'mock error';
      generator = Saga.StudentAppsUsageFlow({});
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(call(Saga.makeStudentAppUsageRequest));
      expect(generator.next().value).toEqual(put(Actions.studentAppsUsageRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(call(Saga.makeStudentAppUsageRequest));
      expect(generator.throw(err).value).toEqual(put(Actions.studentAppsUsageRequestFailure(err)));
    });
  });

  describe('StudentGetListRequestFlow', () => {
    let err = null;
    beforeEach(() => {
      err = 'mock error';
    });

    it('All calls pass', () => {
      const login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      generator = Saga.StudentGetListRequestFlow();
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(
        call(Request.getListOfStudentsEnrollment, login.session_id)
      );
      expect(generator.next().value).toEqual(put(Actions.studentGetListRequestSuccess()));
    });

    it('StudentGetListRequestFlow: calls fail', () => {
      generator = Saga.StudentGetListRequestFlow();
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.studentGetListRequestFailure(err)));
    });
  });

  describe('SamCentralStatusFLow', () => {
    let err = null;
    beforeEach(() => {
      err = 'mock error';
    });

    it('All calls pass', () => {
      const login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      generator = Saga.SamCentralStatusFLow();
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(
        call(Request.getSamCentralStatus, login.session_id)
      );
      expect(generator.next().value).toEqual(put(Actions.samCentralStatusRequestSuccess()));
    });

    it('SamCentralStatusFLow: calls fail', () => {
      generator = Saga.SamCentralStatusFLow();
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.samCentralStatusRequestFailure(err)));
    });
  });

  describe('makeStudentAppUsageRequest', () => {
    let login = null;

    beforeEach(() => {
      generator = Saga.makeStudentAppUsageRequest();
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
        call(Request.getStudentAppsUsageForSchool, login.session_id, login.school_id)
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
        call(Request.getStudentAppsUsage, login.session_id)
      );
    });
  });

  describe('makeStudentRequest', () => {
    let action = null;
    let login = null;

    it('when the smart bar selection is student', () => {
      login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        school_id: ['adsfczas111'],
        student_id: ['adsfczas111'],
        activeClassId: ['class01'],
        activeGradeId: ['grade01'],
        activeTeacherId: ['teacher01'],
        activeStudentId: ['adsfczas111'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      action = {
        studentId: ['adsfczas111'],
        payload: {},
      };
      generator = Saga.makeStudentRequest(action);
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(districtSelector));
      expect(generator.next(login.district_id).value).toEqual(select(activeSchoolIdSelector));
      expect(generator.next(login.activeSchoolId).value).toEqual(select(activeTeacherIdSelector));
      expect(generator.next(login.activeTeacherId).value).toEqual(select(activeGradeIdSelector));
      expect(generator.next(login.activeGradeId).value).toEqual(select(activeClassIdSelector));
      expect(generator.next(login.activeClassId).value).toEqual(select(activeGroupIdSelector));
      expect(generator.next(login.activeGroupId).value).toEqual(select(activeStudentIdSelector));
      expect(generator.next(login.activeStudentId).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.student_id).value).toEqual(
        call(
          Request.getStudentEnrollmentForStudent,
          login.session_id,
          login.activeStudentId,
          action.payload
        )
      );
    });

    it('when the smart bar selection is Group', () => {
      login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        school_id: ['adsfczas111'],
        student_id: ['adsfczas111'],
        activeClassId: ['class01'],
        activeGroupId: ['group01'],
        activeGradeId: ['grade01'],
        activeTeacherId: ['teacher01'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      action = {
        groupId: ['group01'],
        payload: {},
      };
      generator = Saga.makeStudentRequest(action);
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(districtSelector));
      expect(generator.next(login.district_id).value).toEqual(select(activeSchoolIdSelector));
      expect(generator.next(login.activeSchoolId).value).toEqual(select(activeTeacherIdSelector));
      expect(generator.next(login.activeTeacherId).value).toEqual(select(activeGradeIdSelector));
      expect(generator.next(login.activeGradeId).value).toEqual(select(activeClassIdSelector));
      expect(generator.next(login.activeClassId).value).toEqual(select(activeGroupIdSelector));
      expect(generator.next(login.activeGroupId).value).toEqual(select(activeStudentIdSelector));
      expect(generator.next(login.activeStudentId).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.student_id).value).toEqual(
        call(
          Request.getStudentEnrollmentForGroup,
          login.session_id,
          login.activeGroupId,
          action.payload
        )
      );
    });

    it('when the smart bar selection is Class', () => {
      login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        school_id: ['adsfczas111'],
        student_id: ['adsfczas111'],
        activeClassId: ['class01'],
        activeGradeId: ['grade01'],
        activeTeacherId: ['teacher01'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      action = {
        classId: ['class01'],
        payload: {},
      };
      generator = Saga.makeStudentRequest(action);
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(districtSelector));
      expect(generator.next(login.district_id).value).toEqual(select(activeSchoolIdSelector));
      expect(generator.next(login.activeSchoolId).value).toEqual(select(activeTeacherIdSelector));
      expect(generator.next(login.activeTeacherId).value).toEqual(select(activeGradeIdSelector));
      expect(generator.next(login.activeGradeId).value).toEqual(select(activeClassIdSelector));
      expect(generator.next(login.activeClassId).value).toEqual(select(activeGroupIdSelector));
      expect(generator.next(login.activeGroupId).value).toEqual(select(activeStudentIdSelector));
      expect(generator.next(login.activeStudentId).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.student_id).value).toEqual(
        call(
          Request.getStudentEnrollmentForClass,
          login.session_id,
          login.activeClassId,
          action.payload
        )
      );
    });

    it('when the smart bar selection is Teacher', () => {
      login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        school_id: ['adsfczas111'],
        student_id: ['adsfczas111'],
        activeTeacherId: ['teacher01'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      action = {
        teacherId: ['teacher01'],
        payload: {},
      };
      generator = Saga.makeStudentRequest(action);
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(districtSelector));
      expect(generator.next(login.district_id).value).toEqual(select(activeSchoolIdSelector));
      expect(generator.next(login.activeSchoolId).value).toEqual(select(activeTeacherIdSelector));
      expect(generator.next(login.activeTeacherId).value).toEqual(select(activeGradeIdSelector));
      expect(generator.next(login.activeGradeId).value).toEqual(select(activeClassIdSelector));
      expect(generator.next(login.activeClassId).value).toEqual(select(activeGroupIdSelector));
      expect(generator.next(login.activeGroupId).value).toEqual(select(activeStudentIdSelector));
      expect(generator.next(login.activeStudentId).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.student_id).value).toEqual(
        call(
          Request.getStudentEnrollmentForTeacher,
          login.session_id,
          login.activeTeacherId,
          action.payload
        )
      );
    });

    it('when the smart bar selection is School', () => {
      login = {
        session_id: ['adsfczas111'],
        district_id: ['adsfczas111'],
        school_id: ['adsfczas111'],
        student_id: ['adsfczas111'],
        activeSchoolId: ['adsfczas111'],
        user_org: USER_ORG.School,
        user_type: USER_TYPE.Administrator,
      };
      action = {
        schoolId: ['adsfczas111'],
        payload: {},
      };
      generator = Saga.makeStudentRequest(action);
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(districtSelector));
      expect(generator.next(login.district_id).value).toEqual(select(activeSchoolIdSelector));
      expect(generator.next(login.activeSchoolId).value).toEqual(select(activeTeacherIdSelector));
      expect(generator.next(login.activeTeacherId).value).toEqual(select(activeGradeIdSelector));
      expect(generator.next(login.activeGradeId).value).toEqual(select(activeClassIdSelector));
      expect(generator.next(login.activeClassId).value).toEqual(select(activeGroupIdSelector));
      expect(generator.next(login.activeGroupId).value).toEqual(select(activeStudentIdSelector));
      expect(generator.next(login.activeStudentId).value).toEqual(select(orgTypeSelector));
      expect(generator.next(login.user_org).value).toEqual(select(userTypeSelector));
      expect(generator.next(login.user_type).value).toEqual(select(schoolIdSelector));
      expect(generator.next(login.student_id).value).toEqual(
        call(
          Request.getStudentEnrollmentForSchool,
          login.session_id,
          login.activeSchoolId,
          action.payload
        )
      );
    });
  });

  describe('StudentEnrollSaveFlow when should return is true', () => {
    let store = null;
    let err = null;
    let action = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
        },
        smartBarSelections: {
          selectedCohType: ['Student'],
        },
      });

      err = 'mock error';
      action = {
        studentEnroll:
          '<enrollment><users><user><user_id>ukofq8qbu8e7mf0vekbcj8qi_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>tieujrvp40j783ce1sdt9ed0_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id></applications></user><user><user_id>k32pf5an12lsc15ek8u7aio5_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>464b3im5dtqmhtouchk8j8na_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id></applications></user><user><user_id>hht3s9t7cq87r8q5l4ss44qk_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>ombeun4d4nkmpe8ff7sau0c2_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>uacfhsv4t94ocramofib85fd_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>qejiipnhqj167nj8i3v6tnco_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>k2oilhshf7q2ckdq6s3nisr2_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>8rg97gjs6viv9u9caklkfpnm_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>dg1g7lp65n40tjeob81jcgm1_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>3im5c6n5rfv90cnnmdipsetg_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>5t8solpm9nmnskk9g0d66fik_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>6udu95jpq1egin9bqdpbgl9k_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>vsjiq9bg8fm8p9aj242n2eg8_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id>',
        shouldReturn: true,
        currentPage: 2,
      };
      generator = Saga.StudentEnrollSaveFlow(action);
    });

    it('should return is true', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id'])).value).toEqual(
        select(smartBarSelector)
      );
      expect(generator.next(store.getIn(['smartBarSelections', 'selectedCohType'])).value).toEqual(
        call(
          Request.postStudentEnrollment,
          store.getIn(['login', 'session_id']),
          action.studentEnroll
        )
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.studentEnrollSaveRequestFailure(err)));
    });
  });

  describe('StudentEnrollSaveFlow when should return is false', () => {
    let store = null;
    let err = null;
    let action = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
        },
        smartBarSelections: {
          selectedCohType: ['Student'],
        },
      });

      err = 'mock error';
      action = {
        studentEnroll:
          '<enrollment><users><user><user_id>ukofq8qbu8e7mf0vekbcj8qi_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>tieujrvp40j783ce1sdt9ed0_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id></applications></user><user><user_id>k32pf5an12lsc15ek8u7aio5_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>464b3im5dtqmhtouchk8j8na_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id></applications></user><user><user_id>hht3s9t7cq87r8q5l4ss44qk_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_B_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>ombeun4d4nkmpe8ff7sau0c2_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>uacfhsv4t94ocramofib85fd_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>qejiipnhqj167nj8i3v6tnco_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>k2oilhshf7q2ckdq6s3nisr2_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id><application_id>r180u_C_flex_Teach</application_id></applications></user><user><user_id>8rg97gjs6viv9u9caklkfpnm_2efa7f0</user_id><applications><application_id>CDX_CI_Teach</application_id><application_id>CDX_CII_Teach</application_id><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>dg1g7lp65n40tjeob81jcgm1_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>3im5c6n5rfv90cnnmdipsetg_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>5t8solpm9nmnskk9g0d66fik_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>6udu95jpq1egin9bqdpbgl9k_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id><application_id>r180u_B_Teach</application_id><application_id>r180u_C_Teach</application_id><application_id>r180u_A_flex_Teach</application_id></applications></user><user><user_id>vsjiq9bg8fm8p9aj242n2eg8_2efa7f0</user_id><applications><application_id>CDX_CIII_Teach</application_id><application_id>DTM2_Teach</application_id><application_id>E3D_A_1_Teach</application_id><application_id>E3D_A_2_Teach</application_id><application_id>E3D_B_1_Teach</application_id><application_id>E3D_B_2_Teach</application_id><application_id>E3D_C_1_Teach</application_id><application_id>S44JR_Teach</application_id><application_id>M180_Y1_Teach</application_id><application_id>M180_Y2_Teach</application_id><application_id>r180u_A_Teach</application_id>',
        shouldReturn: false,
        currentPage: 2,
      };
      generator = Saga.StudentEnrollSaveFlow(action);
    });

    it('should return is true', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id'])).value).toEqual(
        select(smartBarSelector)
      );
      expect(generator.next(store.getIn(['smartBarSelections', 'selectedCohType'])).value).toEqual(
        call(
          Request.postStudentEnrollment,
          store.getIn(['login', 'session_id']),
          action.studentEnroll
        )
      );
      expect(generator.next().value).toEqual(put(Actions.studentEnrollRequest({ currentPage: 1 })));
      expect(generator.next().value).toEqual(put(Actions.studentAppsUsageRequest()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.studentEnrollSaveRequestFailure(err)));
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
              Constants.STUDENT_ENROLL_REQUEST,
              SmartBarConstants.GRADE_SELECTION_SUCCESS,
              SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
              SmartBarConstants.TEACHER_SELECTION_SUCCESS,
              SmartBarConstants.CLASS_SELECTION_SUCCESS,
              SmartBarConstants.GROUP_SELECTION_SUCCESS,
              SmartBarConstants.STUDENT_SELECTION_SUCCESS,
              SmartBarConstants.RESET_SELECTIONS,
            ],
            Saga.StudentEnrollmentFlow
          ),
          takeLatest(Constants.STUDENT_APPS_USAGE_REQUEST, Saga.StudentAppsUsageFlow),
          takeLatest(Constants.STUDENT_ENROLL_SAVE_REQUEST, Saga.StudentEnrollSaveFlow),
          takeLatest(Constants.STUDENT_GET_LIST_REQUEST, Saga.StudentGetListRequestFlow),
          takeLatest(Constants.SAM_CENTRAL_STATUS_REQUEST, Saga.SamCentralStatusFLow),
        ])
      );
    });
  });
});
