import * as Actions from '../actions';

describe('SearchResultsContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for getAssignmentSuccessRecordRequest', () => {
      expect(Actions.getAssignmentSuccessRecordRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for getAssignmentSuccessRecordSuccess', () => {
      expect(Actions.getAssignmentSuccessRecordSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for assignmentSuccessRecordSaveRequest', () => {
      expect(Actions.assignmentSuccessRecordSaveRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for assignmentSuccessRecordSaveSuccess', () => {
      expect(Actions.assignmentSuccessRecordSaveSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for getAssignmentSuccessRecordFailure', () => {
      expect(Actions.getAssignmentSuccessRecordFailure()).toMatchSnapshot();
    });
  });
});
