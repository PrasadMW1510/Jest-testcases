import * as Actions from '../actions';

describe('ManageInactiveAccountsContainer Actions', () => {
  describe('Get inactive cohort members request', () => {
    it('should return the correct constant for getting inactive cohort members request', () => {
      const payload = {
        cohortType: 'Student',
        sortColumn: 'last_name',
      };
      expect(Actions.getInactiveCohortMembersRequest(payload)).toMatchSnapshot();
    });

    it('should return the correct constant for getting inactive cohort members request success', () => {
      const inactiveMembers = {
        item_count: [20],
        output_data: ['some output'],
        students: ['some students'],
      };
      expect(Actions.getInactiveCohortMembersRequestSuccess(inactiveMembers)).toMatchSnapshot();
    });

    it('should return the correct constant for getting inactive cohort members request failure', () => {
      const error = { type: 'my error' };
      expect(Actions.getInactiveCohortMembersRequestFailure(error)).toMatchSnapshot();
    });
  });
});
