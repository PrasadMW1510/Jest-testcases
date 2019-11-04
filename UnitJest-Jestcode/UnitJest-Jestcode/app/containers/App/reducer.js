/**
 * Created by luib <Brian.Lui@hmhco.com> on 11/13/17.
 */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { fromJSToMap } from 'utils/utilities';
import * as Constants from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: true, // general loading state
  loadingRequests: {
    [Constants.PERMISSION_REQUEST]: false,
    [Constants.PROFILE_REQUEST]: false,
    [Constants.PROGRAM_AVAILABLE_DATA]: false,
    [Constants.SCHOOL_LIST_REQUEST]: false,
    [Constants.UPDATE_CLASS_DATA]: false,
    [Constants.UPDATE_GRADE_DATA]: false,
    [Constants.UPDATE_GROUP_DATA]: false,
    [Constants.UPDATE_SCHOOL_DATA]: false,
    [Constants.UPDATE_STUDENT_DATA]: false,
    [Constants.UPDATE_TEACHER_DATA]: false,
  },
  error: null, // represents an error message
  loginInProgress: false, // when a login request is in progress
  currentUser: false, // represents the logged in state
  isSSO: false, // represents if we are logged in via SSO
  userData: {
    // api data
    classes: null,
    login: {},
    profile: {},
    students: null,
    schools: null,
    schoolsAndClasses: {
      school: [
        {
          school_id: [],
          school_name: null,
          classes: [
            {
              class: [
                {
                  class_id: null,
                  class_name: null,
                },
              ],
            },
          ],
        },
      ],
    },
    groups: null,
    grades: null,
    teachers: null,
    serverAssets: [],
    permissions: [],
    passwordConfig: {
      configs: [],
    },
  },
  profileData: {
    schools: null,
    grades: null,
    teachers: null,
    classes: null,
    groups: null,
    students: null,
    failure: null,
  },
  expandCollapseStatus: {
    school: true,
    grade: false,
    teacher: false,
    class: false,
    group: false,
    student: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.LOGIN_CREDENTIALS_SAVE:
      return state
        .setIn(['userData', 'login'], fromJS(action.login))
        .set('currentUser', true)
        .set('error', null);
    case Constants.LOCAL_RELOGIN:
      return state.set('loginInProgress', true);
    case Constants.SSO_LOGIN:
      return state.set('isSSO', true).set('loginInProgress', true);
    case Constants.LOGIN_REQUEST_SUCCESS: // when all init api data has loaded
      return state.set('loading', false).set('error', null);
    case Constants.LOGIN_REQUEST_FAILURE:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('currentUser', false);
    case Constants.LOGOUT_REQUEST_SUCCESS:
      return initialState;
    case Constants.CLASS_LIST_REQUEST_SUCCESS:
      return state.setIn(['userData', 'classes'], fromJSToMap(action.classes, 'class_id'));
    case Constants.GRADE_LIST_REQUEST_SUCCESS:
      return state.setIn(['userData', 'grades'], fromJSToMap(action.grades, 'name'));
    case Constants.TEACHER_LIST_REQUEST_SUCCESS:
      return state.setIn(['userData', 'teachers'], fromJSToMap(action.teachers, 'user_id'));
    case Constants.PROFILE_REQUEST_SUCCESS: // the bare minimum needed to view the App page
      return state
        .setIn(['userData', 'profile'], fromJS(action.profile))
        .set('loginInProgress', false)
        .set('error', null)
        .setIn(['loadingRequest', Constants.PROFILE_REQUEST], false);
    case Constants.STUDENT_LIST_REQUEST_SUCCESS:
      return state.setIn(['userData', 'students'], fromJSToMap(action.students, 'user_id'));
    case Constants.SCHOOL_LIST_REQUEST_SUCCESS:
      return state
        .setIn(['userData', 'schools'], fromJSToMap(action.schools, 'org_id'))
        .setIn(['userData', 'grades'], null)
        .setIn(['userData', 'teachers'], null)
        .setIn(['userData', 'classes'], null)
        .setIn(['userData', 'groups'], null)
        .setIn(['userData', 'students'], null)
        .setIn(['loadingRequest', Constants.SCHOOL_LIST_REQUEST], false);
    case Constants.GROUP_LIST_REQUEST_SUCCESS:
      return state.setIn(['userData', 'groups'], fromJSToMap(action.groups, 'group_id'));
    case Constants.PROGRAM_AVAILABLE_REQUEST_SUCCESS:
      return state
        .setIn(['userData', 'serverAssets'], fromJS(action.serverAssets))
        .setIn(['loadingRequest', Constants.PROGRAM_AVAILABLE_DATA], false);
    case Constants.UPDATE_SCHOOL_DATA_SUCCESS:
      return state
        .setIn(['userData', 'classes'], null)
        .setIn(['userData', 'groups'], null)
        .setIn(['userData', 'students'], null)
        .setIn(['loadingRequest', Constants.UPDATE_SCHOOL_DATA], false);
    case Constants.UPDATE_SCHOOL_ADMIN_DATA_SUCCESS:
      return state.setIn(['userData', 'groups'], null).setIn(['userData', 'students'], null);
    case Constants.UPDATE_GRADE_DATA_SUCCESS:
      return state
        .setIn(['userData', 'groups'], null)
        .setIn(['loadingRequest', Constants.UPDATE_GRADE_DATA], false);
    case Constants.PERMISSION_REQUEST_SUCCESS:
      return state
        .setIn(['userData', 'permissions'], fromJS(action.permissionsData))
        .setIn(['loadingRequest', Constants.PERMISSION_REQUEST], false);
    case Constants.UPDATE_PROFILE_REQUEST_SUCCESS:
      return state.setIn(['userData', 'profile'], fromJS(action.profile));
    case Constants.PASSWORD_CONFIG_REQUEST_SUCCESS:
      return state.setIn(['userData', 'passwordConfig'], fromJS(action.passwordConfig));
    case Constants.SCHOOLS_AND_CLASSES_REQUEST_SUCCESS:
      return state.setIn(['userData', 'schoolsAndClasses'], fromJS(action.schoolsAndClasses));
    case Constants.PERMISSION_REQUEST:
    case Constants.PROFILE_REQUEST:
    case Constants.PROGRAM_AVAILABLE_DATA:
    case Constants.SCHOOL_LIST_REQUEST:
    case Constants.UPDATE_CLASS_DATA:
    case Constants.UPDATE_GRADE_DATA:
    case Constants.UPDATE_GROUP_DATA:
    case Constants.UPDATE_SCHOOL_DATA:
    case Constants.UPDATE_STUDENT_DATA:
    case Constants.UPDATE_TEACHER_DATA:
      return state.setIn(['loadingRequest', action.type], true);
    case Constants.UPDATE_CLASS_DATA_SUCCESS:
      return state.setIn(['loadingRequest', Constants.UPDATE_CLASS_DATA], false);
    case Constants.UPDATE_GROUP_DATA_SUCCESS:
      return state.setIn(['loadingRequest', Constants.UPDATE_GROUP_DATA], false);
    case Constants.UPDATE_STUDENT_DATA_SUCCESS:
      return state.setIn(['loadingRequest', Constants.UPDATE_STUDENT_DATA], false);
    case Constants.UPDATE_TEACHER_DATA_SUCCESS:
      return state.setIn(['loadingRequest', Constants.UPDATE_TEACHER_DATA], false);
    case Constants.GENERAL_FAILURE:
      return state.set('error', action.error);
    case Constants.UPDATE_PROFILE_SCHOOL_DATA_SUCCESS:
      return state.setIn(['profileData', 'schools'], action.profileSchool);
    case Constants.UPDATE_PROFILE_GRADE_DATA_SUCCESS:
      return state.setIn(
        ['profileData', 'grades'],
        action.profileGrade ? fromJSToMap(action.profileGrade, 'name') : null
      );
    case Constants.UPDATE_PROFILE_TEACHER_DATA_SUCCESS:
      return state.setIn(
        ['profileData', 'teachers'],
        action.profileTeacher ? fromJSToMap(action.profileTeacher, 'user_id') : null
      );
    case Constants.UPDATE_PROFILE_CLASS_DATA_SUCCESS:
      return state.setIn(
        ['profileData', 'classes'],
        action.profileClass ? fromJSToMap(action.profileClass, 'class_id') : null
      );
    case Constants.UPDATE_PROFILE_GROUP_DATA_SUCCESS:
      return state.setIn(
        ['profileData', 'groups'],
        action.profileGroup ? fromJSToMap(action.profileGroup, 'group_id') : null
      );
    case Constants.UPDATE_PROFILE_STUDENT_DATA_SUCCESS:
      return state.setIn(
        ['profileData', 'students'],
        action.profileStudent ? fromJSToMap(action.profileStudent, 'user_id') : null
      );
    case Constants.UPDATE_PROFILE_PAGE_DATA_FAILURE:
      return state.setIn(['profilesData', 'failure'], fromJS(action.err));
    case Constants.UPDATE_SMART_BAR_EXPAND_COLLAPSE_STATUS:
      return state
        .setIn(['expandCollapseStatus', 'school'], action.school)
        .setIn(['expandCollapseStatus', 'grade'], action.grade)
        .setIn(['expandCollapseStatus', 'teacher'], action.teacher)
        .setIn(['expandCollapseStatus', 'class'], action.classes)
        .setIn(['expandCollapseStatus', 'group'], action.group)
        .setIn(['expandCollapseStatus', 'student'], action.student);
    default:
      return state;
  }
}

export default appReducer;
