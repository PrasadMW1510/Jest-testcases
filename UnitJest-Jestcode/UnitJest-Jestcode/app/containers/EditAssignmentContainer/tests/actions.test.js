import * as Actions from '../actions';

describe('Print Book Label Container Action', () => {
  it('should return the correct constant for getAssignmentData', () => {
    const data = [{ name: 'quizData   1' }];
    expect(Actions.getAssignmentData(data)).toMatchSnapshot();
  });
  it('should return the correct constant for getAssignmentDataSuccess', () => {
    const data = [{ name: 'quizData   1' }];
    expect(Actions.getAssignmentDataSuccess(data)).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentDetails', () => {
    const data = [{ name: 'quizData   1' }];
    expect(Actions.getStudentDetails(data)).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentDetailsSuccess', () => {
    const data = [{ name: 'quizData   1' }];
    expect(Actions.getStudentDetailsSuccess(data)).toMatchSnapshot();
  });
  it('should return the correct constant for saveAssignmentRequest', () => {
    const data = [{ name: 'quizData   1' }];
    expect(Actions.saveAssignmentRequest(data)).toMatchSnapshot();
  });
  it('should return the correct constant for saveAssignmentRequestSuccess', () => {
    const data = [{ name: 'quizData   1' }];
    expect(Actions.saveAssignmentRequestSuccess(data)).toMatchSnapshot();
  });
  it('should return the correct constant for saveAssignmentRequestError', () => {
    const error = [{ name: 'error   1' }];
    expect(Actions.saveAssignmentRequestError(error)).toMatchSnapshot();
  });
  it('should return the correct constant for deleteAssignmentRequestSuccess', () => {
    const data = [{ name: 'quizData   1' }];
    expect(Actions.deleteAssignmentRequestSuccess(data)).toMatchSnapshot();
  });
  it('should return the correct constant for deleteAssignmentRequestError', () => {
    const error = [{ name: 'error   1' }];
    expect(Actions.deleteAssignmentRequestError(error)).toMatchSnapshot();
  });
});
