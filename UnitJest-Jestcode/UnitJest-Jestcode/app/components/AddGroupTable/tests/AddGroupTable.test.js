import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import AddGroupTable from '../index';

describe('<AddGroupTable />', () => {
  let wrapper = null;
  let mockToggleAllCheckboxes = null;
  let mockSelectAll = null;
  let mockHandleRowCheckboxOnChange = null;
  let mockStudentIdChecked = null;
  let mockStudents = null;

  beforeEach(() => {
    mockToggleAllCheckboxes = jest.fn();
    mockSelectAll = false;
    mockHandleRowCheckboxOnChange = jest.fn();
    mockStudentIdChecked = [['9493930']];
    mockStudents = [{ user_id: ['90495039'] }, { user_id: ['9493930'] }];

    wrapper = mount(
      <AddGroupTable
        toggleAllCheckboxes={mockToggleAllCheckboxes}
        selectAll={mockSelectAll}
        handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
        studentIdChecked={mockStudentIdChecked}
        students={mockStudents}
      />
    );
  });

  it('verify if it renders itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleChange', () => {
    const e = { preventDefault: jest.fn() };
    wrapper.instance().handleChange(e);
    expect(wrapper.state('isLastName')).toBeFalsy();
  });

  it('Should click the first column when componentDidMount', () => {
    const firstColumnClickSpy = jest.fn();
    wrapper.instance().firstColumn = { click: firstColumnClickSpy };
    wrapper.instance().componentDidMount();
    expect(firstColumnClickSpy).toBeCalled();
  });

  it('Should not click the first column when componentDidMount and first column is not defined', () => {
    const firstColumnClickSpy = jest.fn();
    wrapper.instance().firstColumn = { click: firstColumnClickSpy };
    wrapper.instance().firstColumn = null;
    wrapper.instance().componentDidMount();
    expect(firstColumnClickSpy).not.toBeCalled();
  });

  it('render last name column', () => {
    const table = wrapper.find('SAMTable');
    const { columns } = table.props();

    const nameColumn = columns.find(row => row.accessor === 'last_name');

    const nameColumnWrapper = shallow(nameColumn.Header());

    expect(shallowToJson(nameColumnWrapper)).toMatchSnapshot();
  });

  it('render first name column', () => {
    const table = wrapper.find('SAMTable');
    const { columns } = table.props();

    const nameColumn = columns.find(row => row.accessor === 'first_name');

    const nameColumnWrapper = shallow(nameColumn.Header());

    expect(shallowToJson(nameColumnWrapper)).toMatchSnapshot();
  });
});
