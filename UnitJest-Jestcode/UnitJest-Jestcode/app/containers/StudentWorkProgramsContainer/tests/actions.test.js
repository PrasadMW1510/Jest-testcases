import * as Actions from '../actions';

describe('ModalController actions', () => {
  it('should return the correct constant for hide modal', () => {
    expect(Actions.getIreadStudentWorkData()).toMatchSnapshot();
  });
  it('should return the correct constant for hide modal', () => {
    expect(Actions.getIReadStudentWorkDataRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for hide modal', () => {
    expect(Actions.getIReadStudentWorkDataRequestFailure()).toMatchSnapshot();
  });
  it('should return the correct constant for hide modal', () => {
    expect(Actions.postIReadStudentWorkData()).toMatchSnapshot();
  });
  it('should return the correct constant for hide modal', () => {
    expect(Actions.saveIReadStudentWorkDataRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for hide modal', () => {
    expect(Actions.saveIReadStudentWorkDataRequestFailure()).toMatchSnapshot();
  });
  it('should return the correct constant for hide modal', () => {
    expect(Actions.delIReadStudentWorkData()).toMatchSnapshot();
  });
  it('should return the correct constant for hide modal', () => {
    expect(Actions.delIReadStudentWorkDataSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for hide modal', () => {
    expect(Actions.delIReadStudentWorkDataFailure()).toMatchSnapshot();
  });
  it('should return the correct constant for hide modal', () => {
    expect(Actions.showDeleteModal()).toMatchSnapshot();
  });
});
