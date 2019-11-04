import * as Actions from '../actions';
import programSettingsContainerReducer from '../reducer';

describe('programSettingsContainerReducer', () => {
  it('returns the initial state', () => {
    expect(programSettingsContainerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle programSettingsEnrollmentList action', () => {
    expect(
      programSettingsContainerReducer(undefined, Actions.programSettingsEnrollmentList())
    ).toMatchSnapshot();
  });

  it('should handle programSettingsEnrollmentListSuccess action', () => {
    expect(
      programSettingsContainerReducer(
        undefined,
        Actions.programSettingsEnrollmentListSuccess(['mockEnrollmentList'])
      )
    ).toMatchSnapshot();
  });
});
