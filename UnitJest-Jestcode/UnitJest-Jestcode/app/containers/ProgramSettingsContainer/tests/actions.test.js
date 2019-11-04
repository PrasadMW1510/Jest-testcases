import * as Actions from '../actions';

describe('ProgramSettingsContainer actions', () => {
  it('should return the correct constant for programSettingsEnrollmentList', () => {
    expect(Actions.programSettingsEnrollmentList()).toMatchSnapshot();
  });

  it('should return the correct constant for programSettingsEnrollmentListSuccess with no params', () => {
    expect(Actions.programSettingsEnrollmentListSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for programSettingsEnrollmentListSuccess with params', () => {
    expect(Actions.programSettingsEnrollmentListSuccess(['mockEnrollmentList'])).toMatchSnapshot();
  });

  it('should return the correct constant for programSettingsEnrollmentListFailure', () => {
    expect(Actions.programSettingsEnrollmentListFailure('mockError')).toMatchSnapshot();
  });
});
