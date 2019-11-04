import * as Actions from '../actions';

describe('AddGroupContainer actions', () => {
  it('Get class with student info', () => {
    expect(Actions.getClassesWithStudentInfo()).toMatchSnapshot();
  });
  it('Get class with student info Success', () => {
    expect(Actions.getClassesWithStudentInfoSuccess()).toMatchSnapshot();
  });
  it('Get class with student info Failure', () => {
    expect(Actions.getClassesWithStudentInfoFailure()).toMatchSnapshot();
  });
  it('Get post group', () => {
    expect(Actions.postGroup()).toMatchSnapshot();
  });
  it('Post group success', () => {
    expect(Actions.postGroupSuccess()).toMatchSnapshot();
  });
  it('Post group failure', () => {
    expect(Actions.postGroupFailure()).toMatchSnapshot();
  });
  it('reset the group status', () => {
    expect(Actions.resetGroupStatus()).toMatchSnapshot();
  });
  it('get group info', () => {
    expect(Actions.getGroupInfo()).toMatchSnapshot();
  });
  it('get group info success', () => {
    expect(Actions.getGroupInfoSuccess()).toMatchSnapshot();
  });
  it('get group info failure', () => {
    expect(Actions.getGroupInfoFailure()).toMatchSnapshot();
  });
});
