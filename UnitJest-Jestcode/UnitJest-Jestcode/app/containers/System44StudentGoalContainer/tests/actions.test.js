import * as Actions from '../actions';

describe('System44StudentGoalContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for getCombinedStudentGoalsRequest', () => {
      expect(Actions.getCombinedStudentGoalsRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for getCombinedStudentGoalsRequestSuccess', () => {
      const getCombinedStudentGoalsData = [{ name: 'award 1' }];
      expect(
        Actions.getCombinedStudentGoalsRequestSuccess(getCombinedStudentGoalsData)
      ).toMatchSnapshot();
    });
    it('should return the correct constant for getCombinedStudentGoalsRequestFailure', () => {
      expect(Actions.getCombinedStudentGoalsRequestFailure()).toMatchSnapshot();
    });
    it('should return the correct constant for setStudentAcademicGoals', () => {
      expect(Actions.setStudentAcademicGoals()).toMatchSnapshot();
    });
    it('should return the correct constant for getAllStudentGoalsRequestSuccess', () => {
      expect(Actions.getAllStudentGoalsRequestSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for getAllStudentGoalsRequestFailure', () => {
      expect(Actions.getAllStudentGoalsRequestFailure()).toMatchSnapshot();
    });
    it('should return the correct constant for getAllStudentGoalsRequestSuccess', () => {
      expect(Actions.getAllStudentGoalsRequestSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for setStudentAcademicGoalsSuccess', () => {
      expect(Actions.setStudentAcademicGoalsSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for setStudentAcademicGoalsError', () => {
      expect(Actions.setStudentAcademicGoalsError()).toMatchSnapshot();
    });
    it('should return the correct constant for setStudentBehaviourGoalsSuccess', () => {
      expect(Actions.setStudentBehaviourGoalsSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for setStudentBehaviourGoalsError', () => {
      expect(Actions.setStudentBehaviourGoalsError()).toMatchSnapshot();
    });
    it('should return the correct constant for updateStudentBehaviourGoalsSuccess', () => {
      expect(Actions.updateStudentBehaviourGoalsSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for updateStudentBehaviourGoalsError', () => {
      expect(Actions.updateStudentBehaviourGoalsError()).toMatchSnapshot();
    });
    it('should return the correct constant for getStudentSubmissionsRequestSuccess', () => {
      const data = [{ name: 'award 1' }];
      expect(Actions.getStudentSubmissionsRequestSuccess(data)).toMatchSnapshot();
    });
    it('should return the correct constant for getStudentSubmissionsRequestError', () => {
      const error = [{ name: 'error 1' }];
      expect(Actions.getStudentSubmissionsRequestError(error)).toMatchSnapshot();
    });
  });
});
