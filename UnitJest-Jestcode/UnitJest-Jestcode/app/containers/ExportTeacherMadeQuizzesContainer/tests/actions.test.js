import * as Actions from '../actions';

describe('Print Book Label Container Action', () => {
  it('should return the correct constant for exportTeacherMadeQuizRequest', () => {
    const quizData = [{ name: 'quizData   1' }];
    expect(Actions.exportTeacherMadeQuizRequest(quizData)).toMatchSnapshot();
  });

  it('should return the correct constant for postExportTeacherMadeQuizRequestFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.postExportTeacherMadeQuizRequestFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for exportTeacherMadeQuizRequest', () => {
    expect(Actions.exportTeacherMadeQuizRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for postExportTeacherMadeQuizRequestSuccess', () => {
    expect(Actions.postExportTeacherMadeQuizRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for defaultAction', () => {
    expect(Actions.defaultAction()).toMatchSnapshot();
  });
});
