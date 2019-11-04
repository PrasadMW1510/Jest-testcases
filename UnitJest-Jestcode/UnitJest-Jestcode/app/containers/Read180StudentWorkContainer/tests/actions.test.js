import * as Actions from '../actions';

describe('AdvancedSearchContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for read180StudentWorkRequest', () => {
      const read180StudentWorkPreviewData = [{ name: 'award 1' }];
      expect(Actions.read180StudentWorkRequest(read180StudentWorkPreviewData)).toMatchSnapshot();
    });

    it('should return the correct constant for getRead180StudentWorkRequest', () => {
      const read180nData = { name: 'comskill 1' };
      expect(Actions.getRead180StudentWorkRequest(read180nData)).toMatchSnapshot();
    });
    it('should return the correct constant for getRead180StudentWorkRequestSuccess', () => {
      const resultsData = { name: 'culture 1' };
      expect(Actions.getRead180StudentWorkRequestSuccess(resultsData)).toMatchSnapshot();
    });

    it('should return the correct constant for setRead180StudentWorkData', () => {
      const read180ngData = { type: 'genre 1' };
      expect(Actions.setRead180StudentWorkData(read180ngData)).toMatchSnapshot();
    });

    it('should return the correct constant for setRead180StudentWorkRequestSuccess', () => {
      const resultsData = { type: 'interestLevel 1' };
      expect(Actions.setRead180StudentWorkRequestSuccess(resultsData)).toMatchSnapshot();
    });

    it('should return the correct constant for defaultAction', () => {
      expect(Actions.defaultAction()).toMatchSnapshot();
    });
  });
});
