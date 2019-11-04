import * as Actions from '../actions';

describe('ClassAssignModalContainer actions', () => {
  it('should getClassesAndGroupRequest', () => {
    expect(Actions.getClassesAndGroupsRequest()).toMatchSnapshot();
  });

  it('should getClassesAndGroupSuccess', () => {
    const classesAndGroups = ['test'];
    expect(Actions.getClassesAndGroupsRequestSuccess(classesAndGroups)).toMatchSnapshot();
  });

  it('should getClassesAndGroupRequestFailure', () => {
    expect(Actions.getClassesAndGroupsRequestFailure('err')).toMatchSnapshot();
  });

  it('should openClassAssignModal', () => {
    expect(Actions.openClassAssignModal()).toMatchSnapshot();
  });

  it('should closeClassAssignModal', () => {
    expect(Actions.closeClassAssignModal()).toMatchSnapshot();
  });

  it('should postAssignToClassRequest', () => {
    const payload = {
      input: { users: [{ user_id: [] }], classes: [{ class_id: [] }], groups: [{ group_id: [] }] },
    };
    expect(Actions.postAssignToClassRequest(payload)).toMatchSnapshot();
  });

  it('should postAssignToClassRequestFailure', () => {
    expect(Actions.postAssignToClassRequestFailure('err')).toMatchSnapshot();
  });
});
