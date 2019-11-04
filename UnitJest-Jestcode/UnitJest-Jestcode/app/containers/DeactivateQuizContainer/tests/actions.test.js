import * as Actions from '../actions';

describe('Print Book Label Container Action', () => {
  it('should return the correct constant for deactivateQuizRequest', () => {
    const tableData = [{ name: 'tableData   1' }];
    const searchOpts = [{ name: 'searchOpts   1' }];
    expect(Actions.deactivateQuizRequest(tableData, searchOpts)).toMatchSnapshot();
  });

  it('should return the correct constant for getPostDeactivateRequestFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.getPostDeactivateRequestFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for deactivateQuizRequest', () => {
    expect(Actions.deactivateQuizRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for defaultAction', () => {
    expect(Actions.defaultAction()).toMatchSnapshot();
  });
});
