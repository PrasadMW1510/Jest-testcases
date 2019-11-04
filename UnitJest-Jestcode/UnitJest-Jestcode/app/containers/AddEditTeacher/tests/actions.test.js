import * as Actions from '../actions';

describe('AddEditTeacher actions', () => {
  it('should return the correct constant for addEditTeacherRequest', () => {
    expect(Actions.addEditTeacherRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for addEditTeacherRequestSuccess', () => {
    expect(Actions.addEditTeacherRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for addEditTeacherRequestFailure', () => {
    expect(Actions.addEditTeacherRequestFailure('error')).toMatchSnapshot();
  });

  it('should return the correct constant for postAddTeacherRequest with no params', () => {
    expect(Actions.postAddTeacherRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for postAddTeacherRequest with params', () => {
    expect(
      Actions.postAddTeacherRequest('mockProfileData', ['mockPermissionsId'])
    ).toMatchSnapshot();
  });

  it('should return the correct constant for postAddTeacherRequestSuccess', () => {
    expect(Actions.postAddTeacherRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for postAddTeacherRequestFailure', () => {
    expect(Actions.postAddTeacherRequestFailure()).toMatchSnapshot();
  });

  it('should return the correct constant for postSaveTeacherRequest with no params', () => {
    expect(Actions.postSaveTeacherRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for postSaveTeacherRequest with params', () => {
    expect(Actions.postSaveTeacherRequest('mockProfileData')).toMatchSnapshot();
  });

  it('should return the correct constant for postSaveTeacherRequestSuccess', () => {
    expect(Actions.postSaveTeacherRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for postSaveTeacherRequestFailure', () => {
    expect(Actions.postSaveTeacherRequestFailure()).toMatchSnapshot();
  });
});
