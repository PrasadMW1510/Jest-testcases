import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddSchoolProfile from 'components/SchoolForm/SchoolProfile';

describe('<SchoolProfile />', () => {
  let schoolContainerWrapper = null;
  const mockRefFunc = jest.fn();
  const mockDispatchChange = jest.fn();

  beforeEach(() => {
    schoolContainerWrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={mockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 1, label: 'Elementary School' }]}
        showWarningModal={jest.fn()}
        validationErrors={{}}
      />,
      { disableLifecycleMethods: true }
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(schoolContainerWrapper)).toMatchSnapshot();
  });

  it('Expect to get grade ids correctly', () => {
    const id = schoolContainerWrapper.instance().getGradeId({ name: ['foo'] });
    expect(id).toBe('foo');
  });

  it('Expect to format grade labels correctly', () => {
    const label1 = schoolContainerWrapper.instance().formatGradeLabel({ name: ['my grade'] });
    expect(label1).toBe('my grade');
    const label2 = schoolContainerWrapper.instance().formatGradeLabel({ name: null });
    expect(label2).toBe('');
  });

  it('Expect to get school type ids correctly', () => {
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={mockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={jest.fn()}
        validationErrors={{}}
      />,
      { disableLifecycleMethods: true }
    );
    const schoolTypeId = wrapper.instance().getSchoolTypeId({ id: 2, label: 'Middle School' });
    expect(schoolTypeId).toBe('Middle School');
  });

  it('componentDidUpdate runs correctly with errored school start', () => {
    const mockShowWarningModal = jest.fn();
    const mockHandleChangeSchoolYearStart = jest.fn();
    const mockHandleChangeSchoolYearEnd = jest.fn();
    const mockClearCalendarInput = jest.fn();
    const mockValidationErrors = {
      hasImperativeNotificationErrors: true,
      popupErrorFieldName: 'schoolYearStart',
      schoolYearStart: 'Fix the errors',
    };
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={mockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={mockShowWarningModal}
        validationErrors={mockValidationErrors}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().handleChangeSchoolYearStart = mockHandleChangeSchoolYearStart;
    wrapper.instance().handleChangeSchoolYearEnd = mockHandleChangeSchoolYearEnd;
    wrapper.instance().clearCalendarInput = mockClearCalendarInput;
    wrapper.instance().componentDidUpdate();
    expect(mockHandleChangeSchoolYearStart).toHaveBeenCalledWith(null);
    expect(mockClearCalendarInput).toHaveBeenCalledWith(mockValidationErrors.popupErrorFieldName);
    expect(mockShowWarningModal).toHaveBeenCalled();
  });

  it('componentDidUpdate runs correctly with no popup error field name', () => {
    const mockShowWarningModal = jest.fn();
    const mockHandleChangeSchoolYearStart = jest.fn();
    const mockHandleChangeSchoolYearEnd = jest.fn();
    const mockClearCalendarInput = jest.fn();
    const mockValidationErrors = {
      hasImperativeNotificationErrors: true,
      schoolYearStart: 'Fix the errors',
    };
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={mockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={mockShowWarningModal}
        validationErrors={mockValidationErrors}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().handleChangeSchoolYearStart = mockHandleChangeSchoolYearStart;
    wrapper.instance().handleChangeSchoolYearEnd = mockHandleChangeSchoolYearEnd;
    wrapper.instance().clearCalendarInput = mockClearCalendarInput;
    wrapper.instance().componentDidUpdate();
    expect(mockHandleChangeSchoolYearStart).toHaveBeenCalledTimes(0);
    expect(mockShowWarningModal).toHaveBeenCalledTimes(0);
  });

  it('componentDidUpdate runs correctly with grading period error field name', () => {
    const mockShowWarningModal = jest.fn();
    const mockHandleChangeSchoolYearStart = jest.fn();
    const mockHandleChangeSchoolYearEnd = jest.fn();
    const mockClearCalendarInput = jest.fn();
    const mockValidationErrors = {
      popupErrorFieldName: 'gradingPeriodStart[0]',
      hasImperativeNotificationErrors: true,
      'gradingPeriodStart[0]': 'Fix the errors',
    };
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={mockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={mockShowWarningModal}
        validationErrors={mockValidationErrors}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().handleChangeSchoolYearStart = mockHandleChangeSchoolYearStart;
    wrapper.instance().handleChangeSchoolYearEnd = mockHandleChangeSchoolYearEnd;
    wrapper.instance().clearCalendarInput = mockClearCalendarInput;
    wrapper.instance().componentDidUpdate();
    expect(mockHandleChangeSchoolYearStart).toHaveBeenCalledTimes(0);
    expect(mockClearCalendarInput).toHaveBeenCalledWith(mockValidationErrors.popupErrorFieldName);
    expect(mockShowWarningModal).toHaveBeenCalled();
  });

  it('componentDidUpdate runs correctly with errored school end', () => {
    const mockShowWarningModal = jest.fn();
    const mockHandleChangeSchoolYearStart = jest.fn();
    const mockHandleChangeSchoolYearEnd = jest.fn();
    const mockClearCalendarInput = jest.fn();
    const mockValidationErrors = {
      hasImperativeNotificationErrors: true,
      popupErrorFieldName: 'schoolYearEnd',
      schoolYearEnd: 'Fix the errors',
    };
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={mockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={mockShowWarningModal}
        validationErrors={mockValidationErrors}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().handleChangeSchoolYearStart = mockHandleChangeSchoolYearStart;
    wrapper.instance().handleChangeSchoolYearEnd = mockHandleChangeSchoolYearEnd;
    wrapper.instance().clearCalendarInput = mockClearCalendarInput;
    wrapper.instance().componentDidUpdate();
    expect(mockHandleChangeSchoolYearEnd).toHaveBeenCalledWith(null);
    expect(mockClearCalendarInput).toHaveBeenCalledWith(mockValidationErrors.popupErrorFieldName);
    expect(mockShowWarningModal).toHaveBeenCalled();
  });

  it('Handle change school year start correctly with valid date', () => {
    const newMockDispatchChange = jest.fn();
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={newMockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={3}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={jest.fn()}
        validationErrors={{}}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().handleChangeSchoolYearStart('2018-03-05');
    expect(newMockDispatchChange).toHaveBeenCalledTimes(6);
  });

  it('Handle change school year start correctly with invalid date', () => {
    const newMockDispatchChange = jest.fn();
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={newMockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={jest.fn()}
        validationErrors={{}}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().handleChangeSchoolYearStart(null);
    expect(newMockDispatchChange).toHaveBeenCalledTimes(1);
  });

  it('Handle change number of grading periods correctly', () => {
    const newMockDispatchChange = jest.fn();
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={newMockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={2}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        schoolYearEndDate={moment('2018-03-05')}
        showWarningModal={jest.fn()}
        validationErrors={{}}
      />,
      { disableLifecycleMethods: true }
    );
    const ev = {
      target: {
        value: '4',
      },
    };
    wrapper.instance().handleChangeNumGradingPeriods(ev);
    expect(newMockDispatchChange).toHaveBeenCalledTimes(8);
  });

  it('Handle change school year end correctly with valid date', () => {
    const newMockDispatchChange = jest.fn();
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={newMockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={2}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={jest.fn()}
        validationErrors={{}}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().handleChangeSchoolYearEnd('2018-03-05');
    expect(newMockDispatchChange).toHaveBeenCalledTimes(4);
  });

  it('Handle change school year end correctly with invalid date', () => {
    const newMockDispatchChange = jest.fn();
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={newMockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={jest.fn()}
        validationErrors={{}}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.setState({ selectedNumGradingPeriods: 2 });
    wrapper.instance().handleChangeSchoolYearEnd(null);
    expect(newMockDispatchChange).toHaveBeenCalledTimes(1);
  });

  it('Calendar input cleared correctly', () => {
    const mockClearInput = jest.fn();
    schoolContainerWrapper.instance().calendarRefs = {
      schoolYearStart: {
        getRenderedComponent: () => ({ clearInput: mockClearInput }),
      },
    };
    schoolContainerWrapper.instance().clearCalendarInput('schoolYearStart');
    expect(mockClearInput).toHaveBeenCalled();
  });

  it('Calendar ref assigned correctly', () => {
    const mockCalendarRef = {
      props: {
        name: 'schoolYearStart',
      },
    };
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={mockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={jest.fn()}
        validationErrors={{}}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().assignCalendarRef(mockCalendarRef);
    expect(wrapper.instance().calendarRefs.schoolYearStart).toEqual(mockCalendarRef);
  });

  it('Calendar ref assigned correctly', () => {
    const wrapper = shallow(
      <AddSchoolProfile
        dispatchChangeToFormField={mockDispatchChange}
        grades={[{ full_name: ['my grade'] }]}
        numGradingPeriods={4}
        refAssignFocusedField={mockRefFunc}
        schoolTypes={[{ id: 2, label: 'Middle School' }]}
        showWarningModal={jest.fn()}
        validationErrors={{}}
      />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().assignCalendarRef(null);
    expect(Object.keys(wrapper.instance().calendarRefs).length).toEqual(0);
  });
});
