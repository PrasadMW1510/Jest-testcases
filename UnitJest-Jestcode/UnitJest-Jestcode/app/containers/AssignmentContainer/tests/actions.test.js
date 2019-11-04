import * as Actions from '../actions';

describe('AssignmentContainer actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for getClassesDataRequest', () => {
      const data = [
        {
          type: 'PfAsignment',
        },
      ];
      const node = '';
      expect(Actions.setClassRequestSuccess(data, node)).toMatchSnapshot();
    });

    it('should return the correct constant for setClassRequestSuccess', () => {
      const data = [];
      expect(Actions.setClassRequestSuccess(data)).toMatchSnapshot();
    });

    it('should return the correct constant for getClassAssignmentRequest', () => {
      const data = 'jjj_ii';
      const node = [
        [
          {
            classId: 'jjj_ii',
            createdForClass: 'jjj_ii',
          },
        ],
      ];
      expect(Actions.getClassAssignmentRequest(data, node)).toMatchSnapshot();
    });
    it('should return the correct constant for getClassAssignmentRequest', () => {
      const data = 'jjj_ii';
      const node = [
        [
          {
            classId: 'jjj_',
            createdForClass: 'jjj_ii',
          },
        ],
      ];
      expect(Actions.getClassAssignmentRequest(data, node)).toMatchSnapshot();
    });
    it('should return the correct constant for getClassAssignmentRequest', () => {
      const data = 'jjj_ii';
      const node = [];
      expect(Actions.getClassAssignmentRequest(data, node)).toMatchSnapshot();
    });

    it('should return the correct constant for setInboxDataByCommunityId if', () => {
      const data = [
        {
          graded: 'false',
          community_id: 'iii_uuu',
        },
      ];
      const id = 'iii_uuu';
      expect(Actions.setInboxDataByCommunityId(data, id)).toMatchSnapshot();
    });
    it('should return the correct constant for setInboxDataByCommunityId else', () => {
      const data = [];
      const id = [
        {
          community_id: 'iii_uuu',
        },
      ];
      expect(Actions.setInboxDataByCommunityId(data, id)).toMatchSnapshot();
    });
  });
});
