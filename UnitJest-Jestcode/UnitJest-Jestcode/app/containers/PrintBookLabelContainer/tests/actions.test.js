import * as Actions from '../actions';

describe('Print Book Label Container Action', () => {
  it('should return the correct constant for printBookLabelRequest', () => {
    const bookLabelPreviewData = [{ name: 'bookLabelPreviewData   1' }];
    const bookId = [{ name: 'bookId   1' }];
    expect(Actions.printBookLabelRequest(bookLabelPreviewData, bookId)).toMatchSnapshot();
  });

  it('should return the correct constant for getPreviewDataFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.getPreviewDataFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for printBookLabelRequest', () => {
    expect(Actions.printBookLabelRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for defaultAction', () => {
    expect(Actions.defaultAction()).toMatchSnapshot();
  });
});
