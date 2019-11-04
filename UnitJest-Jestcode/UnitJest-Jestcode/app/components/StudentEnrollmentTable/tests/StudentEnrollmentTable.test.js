import React from 'react';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import StudentEnrollmentTable from 'components/StudentEnrollmentTable';

// Using `mount` so that the ref properties get caught in testing (ref property
// example `grid => (this.Grid = grid)`). Need to replace SamLinkButton to avoid
// errors since there's no Router context here.

jest.mock('components/SAMLinkButton', () => jest.fn().mockImplementation(() => <div />));

describe('<StudentEnrollmentTable />', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      handleToggle: jest.fn(),
      handleStudentViewToggle: jest.fn(),
      studentEnrollRequest: jest.fn(),
      studentViewEnrollSaveRequest: jest.fn(),
      studentEnrollSaveRequest: jest.fn(),
      handleTabIsolate: jest.fn(),
      handleTabReset: jest.fn(),
      smartBarSelections: fromJS({
        selectedCohType: 'DistrictAdmin',
      }),
      headers: ['header', 'CDX_CI', 'CDX_CII', 'CDX_CIII'],
      footers: ['footer', 1, 2, 3],
      gridList: [
        [
          'header-row',
          { id: 'CDX_CI', label: 'CDX CI' },
          { id: 'CDX_CII', label: 'CDX CII' },
          { id: 'CDX_CIII', label: 'CDX CIII' },
        ],
        ['teacher-001', true, true, true],
        ['teacher-002', false, false, false],
      ],
    };
  });

  it('Expect to render correctly for non-students', () => {
    const wrapper = mount(<StudentEnrollmentTable {...mockProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly when data loading', () => {
    const wrapper = mount(
      <StudentEnrollmentTable {...mockProps} isDataLoading isDataInitialized />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly when tab isolated', () => {
    const wrapper = mount(<StudentEnrollmentTable {...mockProps} isolateTab />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly for students', () => {
    const wrapper = mount(
      <StudentEnrollmentTable
        {...mockProps}
        smartBarSelections={fromJS({
          selectedCohType: 'Student',
        })}
        isDataLoading
        isDataInitialized
        immPaginationData={{ itemCount: 1 }}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly when tab isolated for students', () => {
    const wrapper = mount(
      <StudentEnrollmentTable
        {...mockProps}
        smartBarSelections={fromJS({
          selectedCohType: 'Student',
        })}
        isolateTab
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly for students while loading', () => {
    const wrapper = mount(
      <StudentEnrollmentTable
        {...mockProps}
        smartBarSelections={fromJS({
          selectedCohType: 'Student',
        })}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to call functions to trigger functions passed in as props', () => {
    const wrapper = mount(<StudentEnrollmentTable {...mockProps} />);
    wrapper.instance().handleStudentViewEnrollSaveAndReturn();
    wrapper.instance().handleStudentViewEnrollSave();
    wrapper.instance().handleStudentEnrollSave();
    wrapper.instance().handleStudentEnrollSaveAndReturn();
    expect(mockProps.studentViewEnrollSaveRequest.mock.calls.length).toBe(2);
    expect(mockProps.studentEnrollSaveRequest.mock.calls.length).toBe(2);
  });

  it('Expect to handle pagination page change', () => {
    const wrapper = mount(<StudentEnrollmentTable {...mockProps} />);
    wrapper.instance().handlePageChange(2);
    expect(mockProps.studentEnrollRequest.mock.calls.length).toBe(1);
    expect(mockProps.handleTabReset.mock.calls.length).toBe(1);
  });

  it('Expect it handles weird data at row 0, column 0', () => {
    const gridList = [
      [
        {},
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', true, true, true],
      ['teacher-002', false, false, false],
    ];
    const wrapper = mount(<StudentEnrollmentTable {...mockProps} gridList={gridList} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
