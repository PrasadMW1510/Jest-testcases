import * as Actions from '../actions';

describe('EditQuizCollectionNamesContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for getEditQuizCollectionNamesDataRequest', () => {
      expect(Actions.getEditQuizCollectionNamesDataRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for initializeQuizNameRequest', () => {
      expect(Actions.initializeQuizNameRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getEditQuizCollectionNamesDataRequestSuccess', () => {
      const editQuizCollectionNamesData = [{ name: 'editQuizCollectionNamesData 1' }];
      expect(
        Actions.getEditQuizCollectionNamesDataRequestSuccess(editQuizCollectionNamesData)
      ).toMatchSnapshot();
    });

    it('should return the correct constant for getEditQuizCollectionNamesDataRequestSuccess', () => {
      expect(Actions.getEditQuizCollectionNamesDataRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getEditQuizCollectionNamesDataRequestFailure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getEditQuizCollectionNamesDataRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for postEditQuizCollectionNamesRequest', () => {
      expect(Actions.postEditQuizCollectionNamesRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for postEditQuizCollectionNamesRequest', () => {
      const nameObject = [{ name: 'nameObject 1' }];
      expect(Actions.postEditQuizCollectionNamesRequest(nameObject)).toMatchSnapshot();
    });

    it('should return the correct constant for initializeClassFormResponseSuccess', () => {
      expect(Actions.initializeClassFormResponseSuccess()).toMatchSnapshot();
    });
  });
});
