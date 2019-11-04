import * as Actions from '../actions';

describe('SearchModalContainer actions', () => {
  it('should return the correct constant for resetSearchMetaData', () => {
    expect(Actions.resetSearchMetaData()).toMatchSnapshot();
  });
  it('should return the correct constant for getSearchMetaDataRequest', () => {
    expect(Actions.getSearchMetaDataRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for getSearchMetaDataRequestSuccess', () => {
    expect(Actions.getSearchMetaDataRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for getSearchMetatDataRequestFailure', () => {
    expect(Actions.getSearchMetaDataRequestFailure()).toMatchSnapshot();
  });

  it('should return the correct constant for getGradesForSearchRequestSuccess', () => {
    expect(Actions.getGradesForSearchRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for getGradesForSearchRequestFailure', () => {
    expect(Actions.getGradesForSearchRequestFailure()).toMatchSnapshot();
  });

  it('should return the correct constant for getAppsForSearchRequestSuccess', () => {
    expect(Actions.getAppsForSearchRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for getAppsForSearchRequestFailure', () => {
    expect(Actions.getAppsForSearchRequestFailure()).toMatchSnapshot();
  });

  it('should return the correct constant for getClassesForSearchRequestSuccess', () => {
    expect(Actions.getClassesForSearchRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for getClassesForSearchRequestFailure', () => {
    expect(Actions.getClassesForSearchRequestFailure()).toMatchSnapshot();
  });

  it('should return the correct constant for getTeachersForSearchRequestSuccess', () => {
    expect(Actions.getTeachersForSearchRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for getTeachersForSearchRequestFailure', () => {
    expect(Actions.getTeachersForSearchRequestFailure()).toMatchSnapshot();
  });

  it('should return the correct constant for getSearchResultsRequest', () => {
    expect(Actions.getSearchResultsRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for getSearchResultsRequestSuccess', () => {
    expect(Actions.getSearchResultsRequestSuccess()).toMatchSnapshot();
  });
});
