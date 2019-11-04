import * as Actions from '../actions';

it('should return the correct Teacher Enroll Request', () => {
  expect(Actions.teacherEnrollRequest('1234567')).toMatchSnapshot();
});

it('should return the success for Teacher Enroll Request', () => {
  expect(Actions.teacherEnrollRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for Teacher Enroll Request', () => {
  expect(Actions.teacherEnrollRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct Teacher Apps Usage Request', () => {
  expect(Actions.teacherAppsUsageRequest('1234567')).toMatchSnapshot();
});

it('should return the success for Teacher Apps Usage Request', () => {
  expect(Actions.teacherAppsUsageRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for Teacher Apps Usage Request', () => {
  expect(Actions.teacherAppsUsageRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct Teacher Access Loading', () => {
  expect(Actions.showTeacherAccessLoading('1234567')).toMatchSnapshot();
});

it('should return the success for Teacher Access Loading', () => {
  expect(Actions.showTeacherAccessLoadingSuccess()).toMatchSnapshot();
});

it('should return the failure for Teacher Access Loading', () => {
  expect(Actions.showTeacherAccessLoadingFailure('error')).toMatchSnapshot();
});
