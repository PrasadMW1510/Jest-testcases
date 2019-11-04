import * as Actions from '../actions';

describe('Search Result Detail Container Action', () => {
  it('should return the correct constant for exportCustomQuizRequest', () => {
    expect(Actions.exportCustomQuizRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for exportCustomQuizRequest', () => {
    const quizListexportData = [{ name: 'quizListexportData   1' }];
    expect(Actions.exportCustomQuizRequest(quizListexportData)).toMatchSnapshot();
  });

  it('should return the correct constant for getExportDataFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.getExportDataFailure(error)).toMatchSnapshot();
  });
});
