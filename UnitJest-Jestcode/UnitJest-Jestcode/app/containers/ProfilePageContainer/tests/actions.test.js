import * as Actions from '../actions';

it('should return the correct profile request', () => {
  expect(Actions.profilePageRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.profilePageStudentRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.profilePageSchoolRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.profilePageGroupRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.profilePageTeacherRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.profilePageGradeRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request success', () => {
  expect(Actions.profilePageRequestSuccess()).toMatchSnapshot();
});

it('should return the correct profile request failure', () => {
  expect(Actions.profilePageRequestFailure('error')).toMatchSnapshot();
});

it('should return the class call by classID', () => {
  expect(Actions.profilePageClassRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the class call by classID success', () => {
  expect(Actions.profilePageClassRequestSuccess()).toMatchSnapshot();
});

it('should return the class call by classID failure', () => {
  expect(Actions.profilePageClassRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.teacherByGradeRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request success', () => {
  expect(Actions.teacherByGradeRequestSuccess()).toMatchSnapshot();
});

it('should return the correct profile request failure', () => {
  expect(Actions.teacherByGradeRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.classByGradeRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request success', () => {
  expect(Actions.classByGradeRequestSuccess()).toMatchSnapshot();
});

it('should return the correct profile request failure', () => {
  expect(Actions.classByGradeRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.studentByGradeRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request success', () => {
  expect(Actions.studentByGradeRequestSuccess()).toMatchSnapshot();
});

it('should return the correct profile request failure', () => {
  expect(Actions.studentByGradeRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.profilePageForSchoolAdminRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request success', () => {
  expect(Actions.profilePageForSchoolAdminRequestSuccess()).toMatchSnapshot();
});

it('should return the correct profile request failure', () => {
  expect(Actions.profilePageForSchoolAdminRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct profile request', () => {
  expect(Actions.profilePageForDistrictAdminRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct profile request success', () => {
  expect(Actions.profilePageForDistrictAdminRequestSuccess()).toMatchSnapshot();
});

it('should return the correct profile request failure', () => {
  expect(Actions.profilePageForDistrictAdminFailure('error')).toMatchSnapshot();
});
