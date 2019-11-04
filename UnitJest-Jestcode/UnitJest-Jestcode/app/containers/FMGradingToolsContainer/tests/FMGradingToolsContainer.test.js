import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { COHORT_TYPE } from 'containers/App/constants';
import { FMGradingToolsContainer } from '../index';

describe('<FMGradingToolsContainer />', () => {
  const mockFMStudentOperationRequest = jest.fn();
  const mockFMGeneratePdfReport = jest.fn();
  const mockStudentOperations = [];
  const mockSelectedCohort = {
    cohortType: COHORT_TYPE.Student,
  };

  const wrapper = shallow(
    <FMGradingToolsContainer
      studentOperations={mockStudentOperations}
      FMGeneratePdfReport={mockFMGeneratePdfReport}
      selectedCohort={mockSelectedCohort}
      FMStudentOperationRequest={mockFMStudentOperationRequest}
      enrollmentCount={1}
    />
  );

  it('should match the snapshot for cohort type of Student', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should have columns that match the snapshot', () => {
    wrapper.instance().columns.forEach(column => {
      expect(column.Header()).toMatchSnapshot();
    });
  });

  it('should match the snapshot for an invalid cohort type of Grade', () => {
    mockSelectedCohort.cohortType = COHORT_TYPE.Grade;

    wrapper.setProps({
      studentOperations: mockStudentOperations,
      FMGeneratePdfReport: mockFMGeneratePdfReport,
      selectedCohort: mockSelectedCohort,
      FMStudentOperationRequest: mockFMStudentOperationRequest,
      enrollmentCount: 1,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should match the snapshot for a cohort type of Teacher with enrollmentCount of 0', () => {
    mockSelectedCohort.cohortType = COHORT_TYPE.Teacher;

    wrapper.setProps({
      studentOperations: mockStudentOperations,
      FMGeneratePdfReport: mockFMGeneratePdfReport,
      selectedCohort: mockSelectedCohort,
      FMStudentOperationRequest: mockFMStudentOperationRequest,
      enrollmentCount: 0,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().renderNoEnrollment()).toMatchSnapshot();
  });

  it('should match the snapshot for a cohort type of Group with enrollmentCount of 0', () => {
    mockSelectedCohort.cohortType = COHORT_TYPE.Group;

    wrapper.setProps({
      studentOperations: mockStudentOperations,
      FMGeneratePdfReport: mockFMGeneratePdfReport,
      selectedCohort: mockSelectedCohort,
      FMStudentOperationRequest: mockFMStudentOperationRequest,
      enrollmentCount: 0,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().renderNoEnrollment()).toMatchSnapshot();
  });

  it('should match the snapshot for a cohort type of Class with enrollmentCount of 0', () => {
    mockSelectedCohort.cohortType = COHORT_TYPE.Class;

    wrapper.setProps({
      studentOperations: mockStudentOperations,
      FMGeneratePdfReport: mockFMGeneratePdfReport,
      selectedCohort: mockSelectedCohort,
      FMStudentOperationRequest: mockFMStudentOperationRequest,
      enrollmentCount: 0,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().renderNoEnrollment()).toMatchSnapshot();
  });

  it('should match the snapshot for a cohort type of Student with enrollmentCount of 0', () => {
    mockSelectedCohort.cohortType = COHORT_TYPE.Student;

    wrapper.setProps({
      studentOperations: mockStudentOperations,
      FMGeneratePdfReport: mockFMGeneratePdfReport,
      selectedCohort: mockSelectedCohort,
      FMStudentOperationRequest: mockFMStudentOperationRequest,
      enrollmentCount: 0,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().renderNoEnrollment()).toMatchSnapshot();
  });

  it('should return null for a cohort type that does not match any valid cohort type', () => {
    mockSelectedCohort.cohortType = 'justinbieber';

    wrapper.setProps({
      studentOperations: mockStudentOperations,
      FMGeneratePdfReport: mockFMGeneratePdfReport,
      selectedCohort: mockSelectedCohort,
      FMStudentOperationRequest: mockFMStudentOperationRequest,
      enrollmentCount: 0,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().renderNoEnrollment()).toMatchSnapshot();
  });

  it('renderInvalidCohortTab() should match the snapshot', () => {
    expect(wrapper.instance().renderInvalidCohortTab()).toMatchSnapshot();
  });
});
