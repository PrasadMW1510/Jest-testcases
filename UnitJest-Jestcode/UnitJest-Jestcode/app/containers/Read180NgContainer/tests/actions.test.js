import * as Actions from '../actions';

describe('AssignmentContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for read180ngRequest', () => {
      expect(Actions.read180ngRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getRead180DataRequest', () => {
      const data = [];
      expect(Actions.getRead180DataRequest(data)).toMatchSnapshot();
    });

    it('should return the correct constant for getRead180DataRequestSuccess', () => {
      const data = [];
      expect(Actions.getRead180DataRequestSuccess(data)).toMatchSnapshot();
    });

    it('should return the correct constant for setRead180NgData', () => {
      const data = [];
      expect(Actions.setRead180NgData(data)).toMatchSnapshot();
    });
    it('should return the correct constant for setRead180DataRequestSuccess', () => {
      const data = [];
      expect(Actions.setRead180DataRequestSuccess(data)).toMatchSnapshot();
    });
    it('should return the correct constant for deleteAssignmentData', () => {
      const data = [];
      expect(Actions.deleteAssignmentData(data)).toMatchSnapshot();
    });
    it('should return the correct constant for defaultAction', () => {
      expect(Actions.defaultAction()).toMatchSnapshot();
    });
  });
});
