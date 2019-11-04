import * as Actions from '../actions';

describe('AdvancedSearchContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for getAwardsDataRequest', () => {
      expect(Actions.getAwardsDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getAwardsRequestSuccess', () => {
      const awards = [{ name: 'award 1' }];
      expect(Actions.getAwardsRequestSuccess(awards)).toMatchSnapshot();
    });

    it('should return the correct constant for getAwardsRequestSuccess', () => {
      expect(Actions.getAwardsRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getComskillDataRequest', () => {
      expect(Actions.getComskillDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getComskillRequestSuccess', () => {
      const comskill = { name: 'comskill 1' };
      expect(Actions.getComskillRequestSuccess(comskill)).toMatchSnapshot();
    });

    it('should return the correct constant for getComskillRequestSuccess', () => {
      expect(Actions.getComskillRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getCultureDataRequest', () => {
      expect(Actions.getCultureDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getCultureRequestSuccess', () => {
      const culture = { name: 'culture 1' };
      expect(Actions.getCultureRequestSuccess(culture)).toMatchSnapshot();
    });

    it('should return the correct constant for getCultureRequestSuccess', () => {
      expect(Actions.getCultureRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getGenreDataRequest', () => {
      expect(Actions.getGenreDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getGenreRequestSuccess', () => {
      const genre = { type: 'genre 1' };
      expect(Actions.getGenreRequestSuccess(genre)).toMatchSnapshot();
    });

    it('should return the correct constant for getGenreRequestSuccess', () => {
      expect(Actions.getGenreRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getInterestLevelDataRequest', () => {
      expect(Actions.getInterestLevelDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getInterestLevelRequestSuccess', () => {
      const interestLevel = { type: 'interestLevel 1' };
      expect(Actions.getInterestLevelRequestSuccess(interestLevel)).toMatchSnapshot();
    });

    it('should return the correct constant for getInterestLevelRequestSuccess', () => {
      expect(Actions.getInterestLevelRequestSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for getProgramSeriesDataRequest', () => {
      expect(Actions.getProgramSeriesDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getProgramSeriesRequestSuccess', () => {
      const programSeries = { type: 'programSeries 1' };
      expect(Actions.getProgramSeriesRequestSuccess(programSeries)).toMatchSnapshot();
    });

    it('should return the correct constant for getProgramSeriesRequestSuccess', () => {
      expect(Actions.getProgramSeriesRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getTopicsDataRequest', () => {
      expect(Actions.getTopicsDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getTopicsRequestSuccess', () => {
      const topics = { type: 'topics 1' };
      expect(Actions.getTopicsRequestSuccess(topics)).toMatchSnapshot();
    });

    it('should return the correct constant for getTopicsRequestSuccess', () => {
      expect(Actions.getTopicsRequestSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for getThemesDataRequest', () => {
      expect(Actions.getThemesDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getThemesRequestSuccess', () => {
      const themes = { type: 'themes 1' };
      expect(Actions.getThemesRequestSuccess(themes)).toMatchSnapshot();
    });

    it('should return the correct constant for getThemesRequestSuccess', () => {
      expect(Actions.getThemesRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getAwardsRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getAwardsRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getComskillRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getComskillRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getCultureRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getCultureRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getGenreRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getGenreRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getInterestLevelRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getInterestLevelRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getProgramSeriesRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getProgramSeriesRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getTopicsDataRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getTopicsDataRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getThemesRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getThemesRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getInstalledQuizCountDataRequest', () => {
      expect(Actions.getInstalledQuizCountDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getInstalledQuizCountRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getInstalledQuizCountRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getTopicsRequestSuccess', () => {
      const topics = { type: 'installedQuizCount  1' };
      expect(Actions.getInstalledQuizCountRequestSuccess(topics)).toMatchSnapshot();
    });

    it('should return the correct constant for getTopicsRequestSuccess', () => {
      expect(Actions.getInstalledQuizCountRequestSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for getSearchResultsRequestSuccess', () => {
      const searchResults = { type: 'searchResults 1' };
      expect(Actions.getSearchResultsRequestSuccess(searchResults)).toMatchSnapshot();
    });

    it('should return the correct constant for getSearchResultsRequestSuccess', () => {
      expect(Actions.getSearchResultsRequestSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for getBookResult', () => {
      const resultvalue = '0';
      expect(Actions.getBookResult(resultvalue)).toMatchSnapshot();
    });

    it('should return the correct constant for getBookResult', () => {
      expect(Actions.getBookResult()).toMatchSnapshot();
    });
    it('should return the correct constant for getSearchResultsRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getSearchResultsRequestFailure(error)).toMatchSnapshot();
    });
    it('should return the correct constant for getSearchResultsRequest', () => {
      const searchOpts = { type: 'searchOpts 1' };
      expect(Actions.getSearchResultsRequest(searchOpts)).toMatchSnapshot();
    });

    it('should return the correct constant for getSearchResultsRequest', () => {
      expect(Actions.getSearchResultsRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for getBookSearchFilters', () => {
      const searchfilters = { type: 'searchfilters 1' };
      expect(Actions.getBookSearchFilters(searchfilters)).toMatchSnapshot();
    });

    it('should return the correct constant for getBookSearchFilters', () => {
      expect(Actions.getBookSearchFilters()).toMatchSnapshot();
    });
  });
});
