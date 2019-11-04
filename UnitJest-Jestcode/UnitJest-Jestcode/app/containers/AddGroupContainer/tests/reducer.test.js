import * as Actions from '../actions';
import addGroupContainerReducer from '../reducer';

describe('addGroupContainerReducer', () => {
  it('returns list of classes with students', () => {
    const classInfo = [{ test: 'test' }];
    expect(
      addGroupContainerReducer(undefined, Actions.getClassesWithStudentInfoSuccess(classInfo))
    ).toMatchSnapshot();
  });
  it('returns list of classes with students error', () => {
    expect(
      addGroupContainerReducer(undefined, Actions.getClassesWithStudentInfoFailure('error'))
    ).toMatchSnapshot();
  });
  it('return the post group id', () => {
    const groupInfo = { group: 'test' };
    expect(
      addGroupContainerReducer(undefined, Actions.postGroupSuccess(groupInfo))
    ).toMatchSnapshot();
  });
  it('return the post group failure', () => {
    expect(
      addGroupContainerReducer(undefined, Actions.postGroupFailure('error'))
    ).toMatchSnapshot();
  });
  it('verify data when reset is called', () => {
    expect(addGroupContainerReducer(undefined, Actions.resetGroupStatus())).toMatchSnapshot();
  });
  it('verify default state', () => {
    expect(addGroupContainerReducer(undefined, {})).toMatchSnapshot();
  });
  it('verify get group info success', () => {
    const groupDetails = [];
    expect(
      addGroupContainerReducer(undefined, Actions.getGroupInfoSuccess(groupDetails))
    ).toMatchSnapshot();
  });
  it('verify get group info failure', () => {
    expect(
      addGroupContainerReducer(undefined, Actions.getGroupInfoFailure('error'))
    ).toMatchSnapshot();
  });
});
