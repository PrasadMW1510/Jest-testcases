import * as Actions from '../actions';

describe('Print Book Label Container Action', () => {
  it('should return the correct constant for printQuizAndAnswerKeyRequest', () => {
    const data = [{ name: 'data 1' }];
    expect(Actions.printQuizAndAnswerKeyRequest(data)).toMatchSnapshot();
  });
  it('should return the correct constant for printQuizAndAnswerKeyRequest', () => {
    expect(Actions.printQuizAndAnswerKeyRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for getPreviewDataFailure', () => {
    const err = [{ name: 'err 1' }];
    expect(Actions.getPreviewDataFailure(err)).toMatchSnapshot();
  });
});
