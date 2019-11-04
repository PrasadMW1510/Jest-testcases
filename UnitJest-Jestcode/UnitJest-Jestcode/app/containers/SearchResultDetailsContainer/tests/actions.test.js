import * as Actions from '../actions';

describe('Search Result Detail Container Action', () => {
  it('should return the correct constant for getSearchResultDetailsDataRequest', () => {
    expect(Actions.getSearchResultDetailsDataRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for getSearchResultDetailsSuccess', () => {
    const searchDetails = [{ name: 'searchDetails  1' }];
    expect(Actions.getSearchResultDetailsSuccess(searchDetails)).toMatchSnapshot();
  });

  it('should return the correct constant for getSearchResultDetailsSuccess', () => {
    expect(Actions.getSearchResultDetailsSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for getSearchResultDetailsFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.getSearchResultDetailsFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for saveSearchResultDetailsDataRequest', () => {
    expect(Actions.saveSearchResultDetailsDataRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for saveSearchResultDetailsDataRequest', () => {
    const data = [{ name: 'data  1' }];
    expect(Actions.saveSearchResultDetailsDataRequest(data)).toMatchSnapshot();
  });
  it('should return the correct constant for saveSearchResultDetailsSuccess', () => {
    const searchDetails = [{ name: 'searchDetails  1' }];
    expect(Actions.saveSearchResultDetailsSuccess(searchDetails)).toMatchSnapshot();
  });

  it('should return the correct constant for saveSearchResultDetailsSuccess', () => {
    expect(Actions.saveSearchResultDetailsSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for saveSearchResultDetailsDataFailure', () => {
    const error = { type: 'my custom error' };
    expect(Actions.saveSearchResultDetailsDataFailure(error)).toMatchSnapshot();
  });
  it('should return the correct constant for getSearchQuizResultsSuccess', () => {
    const searchDetails = [{ name: 'searchDetails  1' }];
    const detailsID = { name: 'searchDetails  1' };
    expect(Actions.getSearchQuizResultsSuccess(searchDetails, detailsID)).toMatchSnapshot();
  });

  it('should return the correct constant for getSearchQuizResultsSuccess', () => {
    expect(Actions.getSearchQuizResultsSuccess()).toMatchSnapshot();
  });
});
