import * as Actions from '../actions';

it('should return the correct Program Settings', () => {
  expect(Actions.R180NGProgramSettingsRequest()).toMatchSnapshot();
});

it('should return the correct Program Settings success', () => {
  expect(Actions.R180NGProgramSettingsRequestSuccess('r180ung')).toMatchSnapshot();
});

it('should return the correct correct Program Settings failure', () => {
  expect(Actions.R180NGProgramSettingsRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct Program Settings Enrollment count', () => {
  expect(Actions.R180NGProgramSettingsEnrollmentRequest()).toMatchSnapshot();
});

it('should return the correct Program Settings  Enrollment count success', () => {
  expect(Actions.R180NGProgramSettingsEnrollmentRequestSuccess('r180ung')).toMatchSnapshot();
});

it('should return the correct correct Program Settings  Enrollment count failure', () => {
  expect(Actions.R180NGProgramSettingsEnrollmentRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct Program Settings', () => {
  expect(Actions.R180NGSaveRequest()).toMatchSnapshot();
});

it('should return the correct Program Settings success', () => {
  expect(Actions.R180NGSaveRequestSuccess()).toMatchSnapshot();
});

it('should return the correct correct Program Settings failure', () => {
  expect(Actions.R180NGSaveRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct correct r180ng topics failure', () => {
  expect(Actions.R180NGSaveRequestFailure('error')).toMatchSnapshot();
});

it('should return the correct update R180NG Setting RequestSuccess with params', () => {
  expect(Actions.updateR180NGSettingRequestSuccess('settings')).toMatchSnapshot();
});

it('should return the correct update R180NG Setting RequestSuccess without params', () => {
  expect(Actions.updateR180NGSettingRequestSuccess()).toMatchSnapshot();
});
