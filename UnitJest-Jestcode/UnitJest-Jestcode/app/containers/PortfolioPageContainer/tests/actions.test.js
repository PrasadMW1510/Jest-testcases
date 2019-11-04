import * as Actions from '../actions';

describe('Iread Modal Container Action', () => {
  it('should return the correct constant for getClassDetailsRequest', () => {
    expect(Actions.getClassDetailsRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for getClassDataRequestSuccess', () => {
    expect(Actions.getClassDataRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentSubmissions', () => {
    expect(Actions.getStudentSubmissions()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentSubmissionSuccess', () => {
    expect(Actions.getStudentSubmissionSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getClassCommunity', () => {
    expect(Actions.getClassCommunity()).toMatchSnapshot();
  });
  it('should return the correct constant for getClassCommunityDataSuccess', () => {
    expect(Actions.getClassCommunityDataSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getPortfolioClassDetailsRequest', () => {
    expect(Actions.getPortfolioClassDetailsRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for getInboxClassByCommunityId', () => {
    expect(Actions.getInboxClassByCommunityId()).toMatchSnapshot();
  });
  it('should return the correct constant for setProgramListSuccess', () => {
    expect(Actions.setProgramListSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for setProgramListForTabSuccess', () => {
    expect(Actions.setProgramListForTabSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentsSubmissionMetadata', () => {
    expect(Actions.getStudentsSubmissionMetadata()).toMatchSnapshot();
  });
  it('should return the correct constant for setStudentSetCount', () => {
    expect(Actions.setStudentSetCount()).toMatchSnapshot();
  });
  it('should return the correct constant for setStudentRequestSuccess', () => {
    expect(Actions.setStudentRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getAssignmentMetaData', () => {
    expect(Actions.getAssignmentMetaData()).toMatchSnapshot();
  });
  it('should return the correct constant for setStudentAssignmentRequestSuccess', () => {
    expect(Actions.setStudentAssignmentRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for setStudentAssignmentSetCount', () => {
    expect(Actions.setStudentAssignmentSetCount()).toMatchSnapshot();
  });
});
