/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getProfileData } from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import defaultSaga, * as Saga from '../saga';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';

describe('Profile Page Container Saga', () => {
  let generator = null;
  let sessionIdSelector = null;
  let userSelector = null;
  let districtSelector = null;
  let userOrgIdSelector = null;
  let smartBarSelector = null;
  let action = null;

  beforeEach(() => {
    sessionIdSelector = jest.fn();
    userOrgIdSelector = jest.fn();
    userSelector = jest.fn();
    districtSelector = jest.fn();
    smartBarSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(userSelector);
    jest.spyOn(Selectors, 'makeSelectProfileDistrictId').mockReturnValue(districtSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserOrgId').mockReturnValue(userOrgIdSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);
  });

  describe('profilePageRequestFlow', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });

      err = 'mock error';

      generator = Saga.profilePageRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next().value).toEqual(select(userSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(getProfileData, store.getIn(['session_id', 0]), store.getIn(['user_id', 0]))
      );
      expect(generator.next().value).toEqual(put(Actions.profilePageRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next().value).toEqual(select(userSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.profilePageRequestFailure(err)));
    });
  });

  describe('profilePageForDistrictAdminRequestFlow', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          district_id: ['id1'],
        },
      });

      err = 'mock error';

      generator = Saga.profilePageForDistrictAdminRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next().value).toEqual(select(districtSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(
          Request.getProfileForDistrictAdmin,
          store.getIn(['session_id', 0]),
          store.getIn(['district_id', 0])
        )
      );
      expect(generator.next().value).toEqual(
        put(Actions.profilePageForDistrictAdminRequestSuccess())
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next().value).toEqual(select(districtSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.profilePageForDistrictAdminFailure(err))
      );
    });
  });

  describe('profilePageForSchoolAdminRequestFlow', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          school_id: ['id1'],
        },
      });

      err = 'mock error';

      generator = Saga.profilePageForSchoolAdminRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next().value).toEqual(select(userOrgIdSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(
          Request.getProfileForSchoolAdmin,
          store.getIn(['session_id', 0]),
          store.getIn(['school_id', 0])
        )
      );
      expect(generator.next().value).toEqual(
        put(Actions.profilePageForSchoolAdminRequestSuccess())
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next().value).toEqual(select(userOrgIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.profilePageForSchoolAdminRequestFailure(err))
      );
    });
  });

  describe('profilePageStudentRequestFlow', () => {
    let login = null;
    let err = null;

    beforeEach(() => {
      login = {
        session_id: ['adsfczas111'],
      };

      action = {
        studentId: ['student01'],
      };

      err = 'mock error';

      generator = Saga.profilePageStudentRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(
        call(Request.getStudentProfilePageData, login.session_id, action.studentId)
      );
      expect(generator.next().value).toEqual(put(Actions.profilePageRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.profilePageRequestFailure(err)));
    });
  });

  describe('profilePageClassRequestFlow', () => {
    let login = null;
    let err = null;

    beforeEach(() => {
      login = {
        session_id: ['adsfczas111'],
      };

      action = {
        classId: ['class01'],
      };

      err = 'mock error';

      generator = Saga.profilePageClassRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(
        call(Request.getClassDetails, login.session_id, action.classId)
      );
      expect(generator.next().value).toEqual(put(Actions.profilePageRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.profilePageRequestFailure(err)));
    });
  });

  describe('profilePageSchoolRequestFlow', () => {
    let login = null;
    let err = null;

    beforeEach(() => {
      login = {
        session_id: ['adsfczas111'],
      };

      action = {
        schoolId: ['school01'],
      };

      err = 'mock error';

      generator = Saga.profilePageSchoolRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(
        call(Request.getSchoolProfilePageData, login.session_id, action.schoolId)
      );
      expect(generator.next().value).toEqual(put(Actions.profilePageRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.profilePageRequestFailure(err)));
    });
  });

  describe('classDetailsFlow', () => {
    let login = null;
    let err = null;

    beforeEach(() => {
      login = {
        session_id: ['adsfczas111'],
      };

      action = {
        classId: ['class01'],
      };

      err = 'mock error';

      generator = Saga.classDetailsFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(
        call(Request.getClassDetails, login.session_id, action.classId)
      );
      expect(generator.next().value).toEqual(put(Actions.profilePageClassRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.profilePageClassRequestFailure(err)));
    });
  });

  describe('profilePageGroupRequestFlow', () => {
    let login = null;
    let err = null;

    beforeEach(() => {
      login = {
        session_id: ['adsfczas111'],
      };
      action = {
        groupId: ['group01'],
      };

      err = 'mock error';

      generator = Saga.profilePageGroupRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(
        call(Request.getGroupProfilePageData, login.session_id, action.groupId)
      );

      expect(generator.next().value).toEqual(put(Actions.profilePageRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.profilePageRequestFailure(err)));
    });
  });

  describe('profilePageTeacherRequestFlow', () => {
    let login = null;
    let err = null;

    beforeEach(() => {
      login = {
        session_id: ['adsfczas111'],
      };
      action = {
        teacherId: ['teacher01'],
      };

      err = 'mock error';

      generator = Saga.profilePageTeacherRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(
        call(Request.getTeacherProfilePageData, login.session_id, action.teacherId)
      );
      expect(generator.next().value).toEqual(put(Actions.profilePageRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.profilePageRequestFailure(err)));
    });
  });

  describe('teacherByGradeRequestFlow', () => {
    let login = null;
    let err = null;
    let school = null;
    let smartBarSelections = null;

    beforeEach(() => {
      login = {
        session_id: ['adsfczas111'],
      };
      action = {
        gradeId: ['k'],
      };
      school = {
        school_id: ['012345'],
      };

      smartBarSelections = fromJS({
        activeSchoolId: ['012345'],
      });

      err = 'mock error';

      generator = Saga.teacherByGradeRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(smartBarSelector));
      expect(generator.next(smartBarSelections).value).toEqual(select(userOrgIdSelector));

      expect(generator.next(school.school_id).value).toEqual(
        call(
          Request.getTeachersByGrade,
          login.session_id,
          action.gradeId,
          smartBarSelections.getIn(['activeSchoolId'])
        )
      );

      expect(generator.next().value).toEqual(put(Actions.teacherByGradeRequestSuccess()));
    });

    it('All calls pass, activeSchoolId is null', () => {
      smartBarSelections = fromJS({
        activeSchoolId: null,
      });

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(smartBarSelector));
      expect(generator.next(smartBarSelections).value).toEqual(select(userOrgIdSelector));

      expect(generator.next(school.school_id).value).toEqual(
        call(Request.getTeachersByGrade, login.session_id, action.gradeId, school.school_id)
      );

      expect(generator.next().value).toEqual(put(Actions.teacherByGradeRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.teacherByGradeRequestFailure(err)));
    });
  });

  describe('classByGradeRequestFlow', () => {
    let login = null;
    let err = null;
    let school = null;
    let smartBarSelections = null;

    beforeEach(() => {
      login = {
        session_id: ['adsfczas111'],
      };
      action = {
        gradeId: ['k'],
      };
      school = {
        school_id: ['012345'],
      };

      smartBarSelections = fromJS({
        activeSchoolId: ['012345'],
      });

      err = 'mock error';

      generator = Saga.classByGradeRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(smartBarSelector));
      expect(generator.next(smartBarSelections).value).toEqual(select(userOrgIdSelector));

      expect(generator.next(school.school_id).value).toEqual(
        call(
          Request.getClassByGrade,
          login.session_id,
          action.gradeId,
          smartBarSelections.getIn(['activeSchoolId'])
        )
      );

      expect(generator.next().value).toEqual(put(Actions.classByGradeRequestSuccess()));
    });

    it('All calls pass, selectedSchoolId is null', () => {
      smartBarSelections = fromJS({
        activeSchoolId: null,
      });

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(smartBarSelector));
      expect(generator.next(smartBarSelections).value).toEqual(select(userOrgIdSelector));

      expect(generator.next(school.school_id).value).toEqual(
        call(Request.getClassByGrade, login.session_id, action.gradeId, school.school_id)
      );

      expect(generator.next().value).toEqual(put(Actions.classByGradeRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.classByGradeRequestFailure(err)));
    });
  });

  describe('studentByGradeRequestFlow', () => {
    let login = null;
    let err = null;
    let school = null;
    let smartBarSelections = null;

    beforeEach(() => {
      login = {
        session_id: ['adsfczas111'],
      };
      action = {
        gradeId: ['k'],
      };
      school = {
        school_id: ['012345'],
      };

      smartBarSelections = fromJS({
        activeSchoolId: ['012345'],
      });

      err = 'mock error';

      generator = Saga.studentByGradeRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(smartBarSelector));
      expect(generator.next(smartBarSelections).value).toEqual(select(userOrgIdSelector));

      expect(generator.next(school.school_id).value).toEqual(
        call(
          Request.getStudentsByGrade,
          login.session_id,
          action.gradeId,
          smartBarSelections.getIn(['activeSchoolId'])
        )
      );

      expect(generator.next().value).toEqual(put(Actions.studentByGradeRequestSuccess()));
    });

    it('All calls pass, activeSchoolId is null', () => {
      smartBarSelections = fromJS({
        activeSchoolId: null,
      });

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(login.session_id).value).toEqual(select(smartBarSelector));
      expect(generator.next(smartBarSelections).value).toEqual(select(userOrgIdSelector));

      expect(generator.next(school.school_id).value).toEqual(
        call(Request.getStudentsByGrade, login.session_id, action.gradeId, school.school_id)
      );

      expect(generator.next().value).toEqual(put(Actions.studentByGradeRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.studentByGradeRequestFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.PROFILE_PAGE_REQUEST, Saga.profilePageRequestFlow),
          takeLatest(
            Constants.PROFILE_PAGE_DISTRICT_ADMIN_REQUEST,
            Saga.profilePageForDistrictAdminRequestFlow
          ),
          takeLatest(
            Constants.PROFILE_PAGE_SCHOOL_ADMIN_REQUEST,
            Saga.profilePageForSchoolAdminRequestFlow
          ),
          takeLatest(
            SmartBarConstants.TEACHER_SELECTION_SUCCESS,
            Saga.profilePageTeacherRequestFlow
          ),
          takeLatest(Constants.PROFILE_PAGE_TEACHER_REQUEST, Saga.profilePageTeacherRequestFlow),
          takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, Saga.teacherByGradeRequestFlow),
          takeLatest(Constants.PROFILE_PAGE_GRADE_REQUEST, Saga.teacherByGradeRequestFlow),
          takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, Saga.classByGradeRequestFlow),
          takeLatest(Constants.PROFILE_PAGE_GRADE_REQUEST, Saga.classByGradeRequestFlow),
          takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, Saga.studentByGradeRequestFlow),
          takeLatest(Constants.PROFILE_PAGE_GRADE_REQUEST, Saga.studentByGradeRequestFlow),
          takeLatest(SmartBarConstants.CLASS_SELECTION_SUCCESS, Saga.profilePageClassRequestFlow),
          takeLatest(SmartBarConstants.GROUP_SELECTION_SUCCESS, Saga.profilePageGroupRequestFlow),
          takeLatest(Constants.PROFILE_PAGE_GROUP_REQUEST, Saga.profilePageGroupRequestFlow),
          takeLatest(SmartBarConstants.SCHOOL_SELECTION_SUCCESS, Saga.profilePageSchoolRequestFlow),
          takeLatest(Constants.PROFILE_PAGE_SCHOOL_REQUEST, Saga.profilePageSchoolRequestFlow),
          takeLatest(
            SmartBarConstants.STUDENT_SELECTION_SUCCESS,
            Saga.profilePageStudentRequestFlow
          ),
          takeLatest(Constants.PROFILE_PAGE_STUDENT_REQUEST, Saga.profilePageStudentRequestFlow),
          takeLatest(Constants.PROFILE_PAGE_CLASS_REQUEST, Saga.classDetailsFlow),
        ])
      );
    });
  });
});
