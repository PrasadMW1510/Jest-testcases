import { fromJS } from 'immutable';

import profilePageReducer from '../reducer';
import * as Actions from '../actions';

describe('profilePageReducer', () => {
  const initialState = fromJS({
    error: false,
    profileDetails: [],
    profileDetailsDistAdmin: [],
    profileDetailsSchoolAdmin: [],
    classDetails: [],
    teacherByGradeDetails: [],
    classByGradeDetails: [],
    studentByGradeDetails: [],
  });
  it('returns the initial state', () => {
    expect(profilePageReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle profile page request success actions', () => {
    expect(profilePageReducer(undefined, Actions.profilePageRequestSuccess())).toMatchSnapshot();
  });

  it('should handle profile page request failure actions', () => {
    expect(
      profilePageReducer(undefined, Actions.profilePageRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle profile page for school admin request success actions', () => {
    expect(
      profilePageReducer(undefined, Actions.profilePageForSchoolAdminRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle profile page for school admin request failure actions', () => {
    expect(
      profilePageReducer(undefined, Actions.profilePageForSchoolAdminRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle profile page for district admin request success actions', () => {
    expect(
      profilePageReducer(undefined, Actions.profilePageForDistrictAdminRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle profile page for district admin request failure actions', () => {
    expect(
      profilePageReducer(undefined, Actions.profilePageForDistrictAdminFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle profile page request success actions', () => {
    expect(
      profilePageReducer(undefined, Actions.profilePageClassRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle profile page request failure actions', () => {
    expect(
      profilePageReducer(undefined, Actions.profilePageClassRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle teacher by grade  request success actions', () => {
    expect(profilePageReducer(undefined, Actions.teacherByGradeRequestSuccess())).toMatchSnapshot();
  });

  it('should handle teacher by grade  request failure actions', () => {
    expect(
      profilePageReducer(undefined, Actions.teacherByGradeRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle Class by grade request success actions', () => {
    expect(profilePageReducer(undefined, Actions.classByGradeRequestSuccess())).toMatchSnapshot();
  });

  it('should handle Class by grade request failure actions', () => {
    expect(
      profilePageReducer(undefined, Actions.classByGradeRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle student by grade request success actions', () => {
    expect(profilePageReducer(undefined, Actions.studentByGradeRequestSuccess())).toMatchSnapshot();
  });

  it('should handle student by grade request failure actions', () => {
    expect(
      profilePageReducer(undefined, Actions.studentByGradeRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
