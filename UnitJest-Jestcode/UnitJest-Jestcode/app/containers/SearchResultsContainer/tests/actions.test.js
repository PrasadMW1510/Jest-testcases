import * as Actions from '../actions';

describe('SearchResultsContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for getAllTeacherMadeQuizDataRequest', () => {
      expect(Actions.getAllTeacherMadeQuizDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getAllTeacherMadeQuizDataRequestSuccess', () => {
      const allTeacherMadeQuizData = [{ name: 'allTeacherMadeQuizData 1' }];
      expect(
        Actions.getAllTeacherMadeQuizDataRequestSuccess(allTeacherMadeQuizData)
      ).toMatchSnapshot();
    });

    it('should return the correct constant for getAllTeacherMadeQuizDataRequestSuccess', () => {
      expect(Actions.getAllTeacherMadeQuizDataRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getAllTeacherMadeQuizDataRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getAllTeacherMadeQuizDataRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getCollectionsNameRequest', () => {
      expect(Actions.getCollectionsNameRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for clearSearchOptions', () => {
      expect(Actions.clearSearchOptions()).toMatchSnapshot();
    });

    it('should return the correct constant for getCollectionsNameRequestSuccess', () => {
      const collectionName = [{ name: 'collectionName  1' }];
      expect(Actions.getCollectionsNameRequestSuccess(collectionName)).toMatchSnapshot();
    });

    it('should return the correct constant for getCollectionsNameRequestSuccess', () => {
      expect(Actions.getCollectionsNameRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getCollectionsNameRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getCollectionsNameRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for getChangeCollectionResultsRequest', () => {
      expect(Actions.getChangeCollectionResultsRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getChangeCollectionResultsRequestSuccess', () => {
      const changeCollectionName = [{ name: 'changeCollectionName  1' }];
      expect(
        Actions.getChangeCollectionResultsRequestSuccess(changeCollectionName)
      ).toMatchSnapshot();
    });

    it('should return the correct constant for getChangeCollectionResultsRequestSuccess', () => {
      expect(Actions.getChangeCollectionResultsRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getChangeCollectionResultsRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getChangeCollectionResultsRequestFailure(error)).toMatchSnapshot();
    });
    it('should return the correct constant for postSaveRequest', () => {
      const searchResultsIdsChecked = [{ name: 'searchResultsIdsChecked  1' }];
      expect(Actions.postSaveRequest(searchResultsIdsChecked)).toMatchSnapshot();
    });

    it('should return the correct constant for postSaveRequest', () => {
      expect(Actions.postSaveRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for postSaveRequestSuccess', () => {
      expect(Actions.postSaveRequestSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for postSaveRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.postSaveRequestFailure(error)).toMatchSnapshot();
    });
    it('should return the correct constant for makeselectedbookresults', () => {
      const selectedrows = [{ name: 'selectedrows  1' }];
      const selectedIds = [{ name: 'selectedIds  1' }];
      expect(Actions.makeSelectedbookresults(selectedrows, selectedIds)).toMatchSnapshot();
    });

    it('should return the correct constant for makeselectedbookresults', () => {
      expect(Actions.makeSelectedbookresults()).toMatchSnapshot();
    });
    it('should return the correct constant for clearSelectedCustomList', () => {
      expect(Actions.clearSelectedCustomList()).toMatchSnapshot();
    });

    it('should return the correct constant for putAllTeacherMadeQuizDataRequest', () => {
      const searchOpts = [{ name: 'searchOpts  1' }];
      expect(Actions.putAllTeacherMadeQuizDataRequest(searchOpts)).toMatchSnapshot();
    });

    it('should return the correct constant for putAllTeacherMadeQuizDataRequest', () => {
      expect(Actions.putAllTeacherMadeQuizDataRequest()).toMatchSnapshot();
    });
  });
});
