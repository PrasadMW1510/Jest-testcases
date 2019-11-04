import * as Actions from '../actions';

describe('Student works Container Action', () => {
  it('should return the correct constant for getSchoolDetailsRequest', () => {
    expect(Actions.getSchoolDetailsRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for getSchoolDataRequestSuccess', () => {
    expect(Actions.getSchoolDataRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getGradeDetailsRequest', () => {
    expect(Actions.getGradeDetailsRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for getGradeDataRequestSuccess', () => {
    expect(Actions.getGradeDataRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getTeachersDetailsRequest', () => {
    expect(Actions.getTeachersDetailsRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for setGradeDataRequestSuccess', () => {
    expect(Actions.setGradeDataRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getTeacherDataRequestSuccess', () => {
    expect(Actions.getTeacherDataRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getPortfolioClassDetailsRequest', () => {
    expect(Actions.getPortfolioClassDetailsRequest()).toMatchSnapshot();
  });
  it('should return the correct constant for setPortfolioSelectedGradeId', () => {
    expect(Actions.setPortfolioSelectedGradeId()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentsSubmissionMetadata', () => {
    expect(Actions.getStudentsSubmissionMetadataSW()).toMatchSnapshot();
  });
  it('should return the correct constant for setStudentRequestSuccess', () => {
    expect(Actions.setStudentRequestSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentEnrolment', () => {
    expect(Actions.getStudentEnrolment()).toMatchSnapshot();
  });
  it('should return the correct constant for setStudentEnrolmentDataSuccess', () => {
    expect(Actions.setStudentEnrolmentDataSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentsSubmissionTreeList', () => {
    expect(Actions.getStudentsSubmissionTreeList()).toMatchSnapshot();
  });
  it('should return the correct constant for setStudentsSubmissionTreeList', () => {
    expect(Actions.setStudentsSubmissionTreeList()).toMatchSnapshot();
  });
  it('should return the correct constant for setPortfolioSelectedTeacherId', () => {
    expect(Actions.setPortfolioSelectedTeacherId()).toMatchSnapshot();
  });
  it('should return the correct constant for getStudentsSubmissionNodeList', () => {
    expect(Actions.getStudentsSubmissionNodeList()).toMatchSnapshot();
  });
});
