import * as Actions from '../actions';

describe('InboxModalContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for getStudentProgramDetailsDataRequest', () => {
      const programdata = [];
      expect(Actions.getStudentProgramDetailsDataRequest(programdata)).toMatchSnapshot();
    });

    it('should return the correct constant for getStudentProgramDetailsDataSuccess', () => {
      const resultsData = [];
      expect(Actions.getStudentProgramDetailsDataSuccess(resultsData)).toMatchSnapshot();
    });

    it('should return the correct constant for getQuestion', () => {
      const path = [];
      expect(Actions.getQuestion(path)).toMatchSnapshot();
    });

    it('should return the correct constant for getStudentQuestionDataSuccess', () => {
      const data = [];
      expect(Actions.getStudentQuestionDataSuccess(data)).toMatchSnapshot();
    });
    it('should return the correct constant for getStudentQuestionDataFailure', () => {
      const data = [];
      expect(Actions.getStudentQuestionDataFailure(data)).toMatchSnapshot();
    });
    it('should return the correct constant for defaultAction', () => {
      expect(Actions.defaultAction()).toMatchSnapshot();
    });
    it('should return the correct constant for getStudentQuestionDataSuccess', () => {
      const data = [];
      expect(Actions.getStudentQuestionDataSuccess(data)).toMatchSnapshot();
    });
    it('should return the correct constant for storeEvaluationUpdate', () => {
      const postdata = [];
      const evData = [];
      expect(Actions.storeEvaluationUpdate(postdata, evData)).toMatchSnapshot();
    });
    it('should return the correct constant for saveStudentEvalulationDataSuccess', () => {
      const responseData = [];
      expect(Actions.saveStudentEvalulationDataSuccess(responseData)).toMatchSnapshot();
    });
  });
});
