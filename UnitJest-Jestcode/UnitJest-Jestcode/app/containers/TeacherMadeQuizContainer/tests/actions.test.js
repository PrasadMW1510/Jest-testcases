import * as Actions from '../actions';

describe('Teacher Made Quiz Container actions', () => {
  it('should return the correct constant for getInstalledQuizDataRequest', () => {
    expect(Actions.getInstalledQuizDataRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for getInstalledQuizDataRequestSuccess', () => {
    const installedQuizData = [{ name: 'installedQuizData 1' }];
    expect(Actions.getInstalledQuizDataRequestSuccess(installedQuizData)).toMatchSnapshot();
  });

  it('should return the correct constant for getInstalledQuizDataRequestSuccess', () => {
    expect(Actions.getInstalledQuizDataRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for getInstalledQuizDataRequestFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.getInstalledQuizDataRequestFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for postTeacherMadeQuizRequestSuccess', () => {
    expect(Actions.postTeacherMadeQuizRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for postTeacherMadeQuizRequest', () => {
    const quizObject = [{ name: 'quizObject 1' }];
    expect(Actions.postTeacherMadeQuizRequest(quizObject)).toMatchSnapshot();
  });

  it('should return the correct constant for postTeacherMadeQuizRequest', () => {
    expect(Actions.postTeacherMadeQuizRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for postTeacherMadeQuizRequestFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.postTeacherMadeQuizRequestFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for getTeacherMadeQuizDetailsRequest', () => {
    const key = [{ name: 'key 1' }];
    expect(Actions.getTeacherMadeQuizDetailsRequest(key)).toMatchSnapshot();
  });

  it('should return the correct constant for getTeacherMadeQuizDetailsRequest', () => {
    expect(Actions.getTeacherMadeQuizDetailsRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for getInstalledQuizDetailDataRequestSuccess', () => {
    const quizQuestions = [{ name: 'quizQuestions 1' }];
    expect(Actions.getInstalledQuizDetailDataRequestSuccess(quizQuestions)).toMatchSnapshot();
  });

  it('should return the correct constant for getInstalledQuizDetailDataRequestSuccess', () => {
    expect(Actions.getInstalledQuizDetailDataRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for deleteQuiz', () => {
    const quizId = [{ name: 'quizId 1' }];
    expect(Actions.deleteQuiz(quizId)).toMatchSnapshot();
  });

  it('should return the correct constant for deleteQuiz', () => {
    expect(Actions.deleteQuiz()).toMatchSnapshot();
  });
  it('should return the correct constant for postTeacherMadeQuizRequestFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.deleteTeacherMadeQuizRequestFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for deleteTeacherMadeQuizRequestSuccess', () => {
    const delSuccess = [{ name: 'delSuccess 1' }];
    expect(Actions.deleteTeacherMadeQuizRequestSuccess(delSuccess)).toMatchSnapshot();
  });

  it('should return the correct constant for deleteTeacherMadeQuizRequestSuccess', () => {
    expect(Actions.deleteTeacherMadeQuizRequestSuccess()).toMatchSnapshot();
  });
});
