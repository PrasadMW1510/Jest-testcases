import * as Actions from '../actions';

describe('Print Book Label Container Action', () => {
  it('should return the correct constant for getStudentDetails', () => {
    expect(Actions.getStudentDetails()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentDetailsSuccess', () => {
    expect(Actions.getStudentDetailsSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for postSaveNewAssignment', () => {
    expect(Actions.postSaveNewAssignment()).toMatchSnapshot();
  });
  it('should return the correct constant for postSaveNewAssignmentSuccess', () => {
    expect(Actions.postSaveNewAssignmentSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentDetailsFailure', () => {
    expect(Actions.getStudentDetailsFailure()).toMatchSnapshot();
  });
  it('should return the correct constant for postSaveNewAssignmentFailure', () => {
    expect(Actions.postSaveNewAssignmentFailure()).toMatchSnapshot();
  });
  it('should return the correct constant for setRead180DataRequestFailure', () => {
    expect(Actions.setRead180DataRequestFailure()).toMatchSnapshot();
  });
  it('should return the correct constant for defaultAction', () => {
    expect(Actions.defaultAction()).toMatchSnapshot();
  });
});
