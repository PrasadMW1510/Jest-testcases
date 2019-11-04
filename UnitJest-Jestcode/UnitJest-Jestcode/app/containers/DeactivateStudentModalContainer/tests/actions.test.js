import * as Actions from '../actions';

it('should return the correct deactivate class', () => {
  expect(Actions.deactivateStudentRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the success for deactivate class', () => {
  expect(Actions.deactivateStudentRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for deactivate class', () => {
  expect(Actions.deactivateStudentRequestFailure('error')).toMatchSnapshot();
});
