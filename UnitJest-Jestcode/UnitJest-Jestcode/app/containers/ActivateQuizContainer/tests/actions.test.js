import * as Actions from '../actions';

describe('Print Book Label Container Action', () => {
  it('should return the correct constant for activateQuizRequest', () => {
    const activateQuizPreviewData = [{ name: 'bookLabelPreviewData   1' }];
    const searchOpts = [{ name: 'bookId   1' }];
    const searchDataChecked = [{ name: 'bookId   1' }];
    expect(
      Actions.activateQuizRequest(activateQuizPreviewData, searchOpts, searchDataChecked)
    ).toMatchSnapshot();
  });

  it('should return the correct constant for getPostActivateRequestFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.getPostActivateRequestFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for activateQuizRequest', () => {
    expect(Actions.activateQuizRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for defaultAction', () => {
    expect(Actions.defaultAction()).toMatchSnapshot();
  });
  it('should return the correct constant for initialiseModalFlag', () => {
    expect(Actions.initialiseModalFlag()).toMatchSnapshot();
  });
});
