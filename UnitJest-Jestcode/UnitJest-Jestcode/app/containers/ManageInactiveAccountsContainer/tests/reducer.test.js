import manageInactiveAccountsReducer from '../reducer';
import * as Actions from '../actions';

describe('manageInactiveAccountsReducer', () => {
  const inactiveMembersResponse = {
    item_count: [15],
    pagination_data: ['some paginated data'],
    output_data: [
      {
        students: [
          {
            user: [
              {
                first_name: ['first'],
                last_name: ['last'],
                user_name: ['username'],
                sis_id: ['sis_id'],
                is_attached: ['false'],
                is_enrolled: ['false'],
                user_id: ['userid'],
              },
            ],
          },
        ],
      },
    ],
  };

  it('returns the initial state', () => {
    expect(manageInactiveAccountsReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle get inactive cohort members request actions', () => {
    expect(
      manageInactiveAccountsReducer(
        undefined,
        Actions.getInactiveCohortMembersRequest({ key1: 'value1', key2: 'value2' })
      )
    ).toMatchSnapshot();
  });

  it('should handle get inactive cohort members request success actions with data', () => {
    expect(
      manageInactiveAccountsReducer(
        undefined,
        Actions.getInactiveCohortMembersRequestSuccess(inactiveMembersResponse)
      )
    ).toMatchSnapshot();
  });

  it('should handle get inactive cohort members request success actions without data', () => {
    expect(
      manageInactiveAccountsReducer(undefined, Actions.getInactiveCohortMembersRequestSuccess())
    ).toMatchSnapshot();
  });
});
