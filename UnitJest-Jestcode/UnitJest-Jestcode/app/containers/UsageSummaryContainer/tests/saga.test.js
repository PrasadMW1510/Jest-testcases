/**
 * Created by nairs on 1/16/18.
 */
/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { USER_TYPE, USER_ORG } from 'containers/App/constants';

import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as SmartSelectors from '../../SmartBarContainer/selectors';
import * as Actions from '../actions';
import * as SmartBarActions from '../../SmartBarContainer/actions';
import * as Request from '../request';
import * as Constants from '../constants';
import * as SmartBarConstants from '../../SmartBarContainer/constants';

describe('UsageSummaryContainer Saga', () => {
  let generator = null;
  let loginSelector = null;
  let action = null;

  beforeEach(() => {
    loginSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginSelector);
  });

  describe('usageSummaryRequest studentId preselected', () => {
    let store = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_type: [USER_TYPE.Teacher],
        },
        smartBarSelections: {
          selectedStudentId: ['student01'],
        },
      });
      generator = Saga.usageSummaryRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(
        call(
          Saga.usageSummaryStudentRequestFlow,
          SmartBarActions.studentSelection(store.getIn(['smartBarSelections', 'selectedStudentId']))
        )
      );
    });
  });

  describe('usageSummaryRequest groupId preselected', () => {
    let store = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_type: [USER_TYPE.Teacher],
        },
        smartBarSelections: {
          selectedGroupId: ['group01'],
        },
      });
      generator = Saga.usageSummaryRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(
        call(
          Saga.usageSummaryGroupRequestFlow,
          SmartBarActions.groupSelection(store.getIn(['smartBarSelections', 'selectedGroupId']))
        )
      );
    });
  });

  describe('usageSummaryRequest classId preselected', () => {
    let store = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_type: [USER_TYPE.Teacher],
        },
        smartBarSelections: {
          selectedClassId: ['class01'],
        },
      });
      generator = Saga.usageSummaryRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(
        call(
          Saga.usageSummaryClassRequestFlow,
          SmartBarActions.classSelection(store.getIn(['smartBarSelections', 'selectedClassId']))
        )
      );
    });
  });

  describe('usageSummaryRequest teacherId preselected', () => {
    let store = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_type: [USER_TYPE.Teacher],
        },
        smartBarSelections: {
          selectedTeacherId: ['teacher01'],
        },
      });
      generator = Saga.usageSummaryRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(
        call(
          Saga.usageSummaryTeacherRequestFlow,
          SmartBarActions.teacherSelection(store.getIn(['smartBarSelections', 'selectedTeacherId']))
        )
      );
    });
  });

  describe('usageSummaryRequest gradeId preselected', () => {
    let store = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_type: [USER_TYPE.Teacher],
        },
        smartBarSelections: {
          selectedGradeId: ['grade01'],
        },
      });
      generator = Saga.usageSummaryRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(
        call(
          Saga.usageSummaryGradeRequestFlow,
          SmartBarActions.gradeSelection(store.getIn(['smartBarSelections', 'selectedGradeId']))
        )
      );
    });
  });

  describe('usageSummaryRequest schoolId preselected', () => {
    let store = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_type: [USER_TYPE.Teacher],
        },
        smartBarSelections: {
          activeSchoolId: ['school01'],
        },
      });
      generator = Saga.usageSummaryRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(
        call(
          Saga.usageSummarySchoolRequestFlow,
          SmartBarActions.schoolSelection(store.getIn(['smartBarSelections', 'activeSchoolId']))
        )
      );
    });
  });

  describe('usageSummaryRequest getUsageSummaryDataForTeacher', () => {
    let store = null;
    // let err = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_type: [USER_TYPE.Teacher],
        },
        smartBarSelections: {},
      });
      generator = Saga.usageSummaryRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getUsageSummaryDataForTeacher,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0])
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });
  });

  describe('usageSummaryRequest getUsageSummaryDataForDistAdmin', () => {
    let store = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_org_id: ['user123'],
          user_type: [USER_TYPE.Administrator],
          user_org: [USER_ORG.District],
        },
        smartBarSelections: {},
      });

      generator = Saga.usageSummaryRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getUsageSummaryDataForDistAdmin,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_org_id', 0])
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });
  });

  describe('usageSummaryRequest default user_type', () => {
    let store = null;
    let err = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_org_id: ['user123'],
          user_type: [''],
        },
        smartBarSelections: {},
      });

      err = 'mock error';

      generator = Saga.usageSummaryRequestFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getUsageSummaryDataForSchoolAdmin,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_org_id', 0])
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.usageSummaryRequestFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.USAGE_SUMMARY_REQUEST, Saga.usageSummaryRequestFlow),
          takeLatest(
            SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
            Saga.usageSummarySchoolRequestFlow
          ),
          takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, Saga.usageSummaryGradeRequestFlow),
          takeLatest(
            SmartBarConstants.TEACHER_SELECTION_SUCCESS,
            Saga.usageSummaryTeacherRequestFlow
          ),
          takeLatest(SmartBarConstants.CLASS_SELECTION_SUCCESS, Saga.usageSummaryClassRequestFlow),
          takeLatest(SmartBarConstants.GROUP_SELECTION_SUCCESS, Saga.usageSummaryGroupRequestFlow),
          takeLatest(
            SmartBarConstants.STUDENT_SELECTION_SUCCESS,
            Saga.usageSummaryStudentRequestFlow
          ),
        ])
      );
    });
  });

  describe('usageSummaryRequest getUsageSummaryDataForSchoolAdmin', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_type: [USER_TYPE.Administrator],
        },
      });

      action = {
        schoolId: '9takfjgbb8527pd4ltrere43_2efa7f0',
      };

      err = 'mock error';

      generator = Saga.usageSummarySchoolRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getUsageSummaryDataForSchoolAdmin,
          store.getIn(['login', 'session_id', 0]),
          action.schoolId
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.usageSummaryRequestFailure(err)));
    });
  });

  describe('usageSummaryRequest usageSummaryTeacherRequestFlow', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
        },
      });

      action = {
        teacherId: 'teacher01',
      };

      err = 'mock error';

      generator = Saga.usageSummaryTeacherRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getUsageSummaryDataForTeacher,
          store.getIn(['login', 'session_id', 0]),
          action.teacherId
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.usageSummaryRequestFailure(err)));
    });
  });

  describe('usageSummaryRequest usageSummaryClassRequestFlow', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
        },
        action: {
          classId: 'class01',
        },
      });

      err = 'mock error';

      generator = Saga.usageSummaryClassRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getClassUsageSummaryData,
          store.getIn(['login', 'session_id', 0]),
          action.classId
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.usageSummaryRequestFailure(err)));
    });
  });

  describe('usageSummaryRequest usageSummaryGroupRequestFlow', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
        },
        action: {
          groupId: 'group01',
        },
      });

      err = 'mock error';

      generator = Saga.usageSummaryGroupRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getGroupUsageSummaryData,
          store.getIn(['login', 'session_id', 0]),
          action.groupId
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.usageSummaryRequestFailure(err)));
    });
  });

  describe('usageSummaryGradeRequestFlow', () => {
    let store = null;
    let err = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
        },
        smartBarSelections: {
          activeSchoolId: ['qqfmpacjkacenql6s8v2o7vp_2efa7f0'],
          selectedClassId: '',
          selectedGroupId: '',
          selectedStudentId: '',
          selectedGradeId: '6',
          selectedTeacherId: '',
        },
      });

      action = {
        gradeId: '6',
      };
      err = 'mock error';

      generator = Saga.usageSummaryGradeRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(
        call(
          Request.getGradeUsageSummaryData,
          store.getIn(['login', 'session_id', 0]),
          action.gradeId,
          store.getIn(['smartBarSelections', 'activeSchoolId'])
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.usageSummaryRequestFailure(err)));
    });
  });

  describe('usageSummaryGradeRequestFlow school admin', () => {
    let store = null;
    let err = null;
    let smartBarSelector = null;

    beforeEach(() => {
      smartBarSelector = jest.fn();
      jest.spyOn(SmartSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_org: [USER_ORG.School],
          user_type: [USER_TYPE.Administrator],
          user_org_id: ['abcdefg'],
        },
        smartBarSelections: {
          activeSchoolId: '',
        },
      });

      action = {
        gradeId: '6',
      };
      err = 'mock error';

      generator = Saga.usageSummaryGradeRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(select(smartBarSelector));
      expect(generator.next(store.get('smartBarSelections')).value).toEqual(
        call(
          Request.getGradeUsageSummaryData,
          store.getIn(['login', 'session_id', 0]),
          action.gradeId,
          store.getIn(['login', 'user_org_id', 0])
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.usageSummaryRequestFailure(err)));
    });
  });

  describe('usageSummaryRequest usageSummaryStudentRequestFlow', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
        },
        action: {
          studentId: 'student01',
        },
      });

      err = 'mock error';

      generator = Saga.usageSummaryStudentRequestFlow(action);
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(
          Request.getStudentUsageSummaryData,
          store.getIn(['login', 'session_id', 0]),
          action.studentId
        )
      );
      expect(generator.next().value).toEqual(put(Actions.usageSummaryRequestSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.usageSummaryRequestFailure(err)));
    });
  });
});
