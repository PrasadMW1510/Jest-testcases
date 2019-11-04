import * as Actions from '../actions';

describe('All actions', () => {
  it('should return the correct constant for getSGClassesDataRequest', () => {
    const data = [
      {
        type: 'PfStudentGoal',
        community_id: ['S4NG'],
      },
    ];
    expect(Actions.setSGClassRequestSuccess(data)).toMatchSnapshot();
  });
  it('should return the correct constant for setSGClassRequestSuccess', () => {
    const data = [
      {
        type: 'PfStudentGoal',
        community_id: ['S44NG'],
      },
    ];
    expect(Actions.setSGClassRequestSuccess(data)).toMatchSnapshot();
  });
  it('should return the correct constant for setSGClassRequestSuccess', () => {
    const data = '';
    expect(Actions.setSGClassRequestSuccess(data)).toMatchSnapshot();
  });
  it('should return the correct constant for getClassStudentGoalRequest', () => {
    expect(Actions.getClassStudentGoalRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for setClassSGGridRequestSuccess', () => {
    expect(Actions.setClassSGGridRequestSuccess()).toMatchSnapshot();
  });
});
