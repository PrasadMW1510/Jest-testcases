import * as Actions from '../actions';

it('should return the correct Student Enroll Request', () => {
  expect(Actions.studentEnrollRequest('1234567')).toMatchSnapshot();
});

it('should return the success for Student Enroll Request', () => {
  expect(Actions.studentEnrollRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for Student Enroll Request', () => {
  expect(Actions.studentEnrollRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct Student Apps Usage Request', () => {
  expect(Actions.studentAppsUsageRequest('1234567')).toMatchSnapshot();
});

it('should return the success for Student Apps Usage Request', () => {
  expect(Actions.studentAppsUsageRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for Student Apps Usage Request', () => {
  expect(Actions.studentAppsUsageRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct Student Apps Usage Request', () => {
  expect(Actions.studentEnrollSaveRequest('1234567')).toMatchSnapshot();
});

it('should return the success for Student Apps Usage Request', () => {
  expect(Actions.studentEnrollSaveRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for Student Apps Usage Request', () => {
  expect(Actions.studentEnrollSaveRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct showStudentEnrollmentLoading', () => {
  expect(Actions.showStudentEnrollmentLoading('1234567')).toMatchSnapshot();
});

it('should return the success for showStudentEnrollmentLoading', () => {
  expect(Actions.showStudentEnrollmentLoadingSuccess()).toMatchSnapshot();
});

it('should return the failure for showStudentEnrollmentLoading', () => {
  expect(Actions.showStudentEnrollmentLoadingFailure('error')).toMatchSnapshot();
});
