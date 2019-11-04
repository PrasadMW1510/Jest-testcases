import * as Actions from '../actions';

describe('Print Book Label Container Action', () => {
  it('should return the correct constant for printCustomQuizRequest', () => {
    const quizListPreviewData = [{ name: 'quizListPreviewData   1' }];
    const quizId = [{ name: 'quizId   1' }];
    expect(Actions.printCustomQuizRequest(quizListPreviewData, quizId)).toMatchSnapshot();
  });

  it('should return the correct constant for getPreviewDataFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.getPreviewDataFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for printCustomQuizRequest', () => {
    expect(Actions.printCustomQuizRequest()).toMatchSnapshot();
  });
});
