import * as Actions from '../actions';

describe('Read 180 ng Modal Container Action', () => {
  it('should return the correct constant for getStudentDetails', () => {
    expect(Actions.getStudentDetails()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentDetailsSuccess', () => {
    expect(Actions.getStudentDetailsSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentDetailsFailure', () => {
    const err = [];
    expect(Actions.getStudentDetailsFailure(err)).toMatchSnapshot();
  });
  it('should return the correct constant for postSaveNewAssignment', () => {
    const data = [];
    expect(Actions.postSaveNewAssignment(data)).toMatchSnapshot();
  });
  it('should return the correct constant for postSaveNewAssignmentSuccess', () => {
    const data = [];
    expect(Actions.postSaveNewAssignmentSuccess(data)).toMatchSnapshot();
  });
  it('should return the correct constant for defaultAction', () => {
    expect(Actions.defaultAction()).toMatchSnapshot();
  });
});
