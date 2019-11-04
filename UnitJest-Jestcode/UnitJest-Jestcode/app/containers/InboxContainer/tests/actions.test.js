import * as Actions from '../actions';
describe('InboxContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for getInboxClassesDataRequest', () => {
      expect(Actions.getInboxClassesDataRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for setInBoxGridRequestSuccess', () => {
      const data = [];
      expect(Actions.setInBoxGridRequestSuccess(data)).toMatchSnapshot();
    });
    it('should return the correct constant for setTempGridData', () => {
      expect(Actions.setTempGridData()).toMatchSnapshot();
    });
    it('should return the correct constant for setGridData', () => {
      expect(Actions.setGridData()).toMatchSnapshot();
    });
    it('should return the correct constant for getStudentsSubmissionMetadata', () => {
      expect(Actions.getStudentsSubmissionMetadata()).toMatchSnapshot();
    });
    it('should return the correct constant for setStudentRequestSuccess', () => {
      expect(Actions.setStudentRequestSuccess()).toMatchSnapshot();
    });
    it('should return the correct constant for getClassStudentList', () => {
      expect(Actions.getClassStudentList()).toMatchSnapshot();
    });
    it('should return the correct constant for setAssignmentClassSuccess', () => {
      const gridData = '1';
      const treeData = [
        {
          community_id: '1',
          graded: 'false',
        },
      ];
      expect(Actions.setAssignmentClassSuccess(treeData, gridData)).toMatchSnapshot();
    });
    it('should return the correct constant for setUnreadDataWithTree', () => {
      const newGridData = '';
      expect(Actions.setUnreadDataWithTree(newGridData)).toMatchSnapshot();
    });
    it('should return the correct constant for setInboxTreeData', () => {
      const newGridData = '';
      expect(Actions.setInboxTreeData(newGridData)).toMatchSnapshot();
    });
    it('should return the correct constant for setInboxTreeDataWithTreeList', () => {
      const newGridData = '';
      expect(Actions.setInboxTreeDataWithTreeList(newGridData)).toMatchSnapshot();
    });
  });
});
