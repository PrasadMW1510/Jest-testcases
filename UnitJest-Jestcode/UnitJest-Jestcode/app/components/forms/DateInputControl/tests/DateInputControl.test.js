import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DateInputControl from '../DateInputControl';

describe('<DateInputControl />', () => {
  const inputValue = moment('03/05/2018 8:00:00 +0000', 'MM/DD/YYYY HH:mm:ss Z');

  it('Should render correctly', () => {
    const wrapper = shallow(
      <DateInputControl
        className="custom-date-picker-class"
        input={{ value: inputValue }}
        required
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly with label and required', () => {
    const wrapper = shallow(
      <DateInputControl
        className="custom-date-picker-class"
        label="Some Calendar Date"
        input={{ value: inputValue }}
        required
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Assign ref as expected', () => {
    const mockRef = true;
    const wrapper = shallow(<DateInputControl input={{ value: inputValue }} required />);
    wrapper.instance().assignRef(mockRef);
    expect(wrapper.instance().datePickerRef).toBe(true);
  });

  it('Handle toMomentDate as expected', () => {
    const wrapper = shallow(<DateInputControl input={{ value: inputValue }} required />);
    expect(wrapper.instance().toMomentDate(null)).toBeNull();
    expect(wrapper.instance().toMomentDate('03/10/203')).toBeNull();
    expect(wrapper.instance().toMomentDate('03/10/2013')).toEqual('03/10/2013');
  });

  it('Handle focus as expected', () => {
    const mockFocus = jest.fn();
    const mockDatePickerRef = {
      input: {
        focus: mockFocus,
      },
    };
    const wrapper = shallow(<DateInputControl input={{ value: inputValue }} required />);
    wrapper.instance().datePickerRef = mockDatePickerRef;
    wrapper.instance().focus();
    expect(mockFocus).toHaveBeenCalled();
  });

  it('Handle clearInput as expected', () => {
    const mockClearClick = jest.fn();
    const mockDatePickerRef = {
      onClearClick: mockClearClick,
    };
    const wrapper = shallow(<DateInputControl input={{ value: inputValue }} required />);
    wrapper.instance().datePickerRef = mockDatePickerRef;
    wrapper.instance().clearInput();
    expect(mockClearClick).toHaveBeenCalled();
  });

  it('Handle blur as expected with invalid date', () => {
    const mockDateBlur = jest.fn();
    const mockEvent = {
      currentTarget: {
        value: '03/10/201', // purposely invalid date
      },
    };
    const wrapper = shallow(
      <DateInputControl onDateBlur={mockDateBlur} input={{ value: inputValue }} required />
    );
    wrapper.instance().clearInput = jest.fn();
    wrapper.instance().handleBlur(mockEvent);
    expect(mockDateBlur).toHaveBeenCalledWith(mockEvent);
    expect(wrapper.instance().clearInput).toHaveBeenCalled();
  });

  it('Handle blur as expected with no value', () => {
    const mockEvent = {
      currentTarget: {
        value: '', // purposely invalid date
      },
    };
    const wrapper = shallow(<DateInputControl input={{ value: inputValue }} required />);
    wrapper.instance().clearInput = jest.fn();
    wrapper.instance().handleBlur(mockEvent);
    expect(wrapper.instance().clearInput).toHaveBeenCalledTimes(0);
  });

  it('Handle blur as expected with valid date', () => {
    const mockEvent = {
      currentTarget: {
        value: '03/10/2018',
      },
    };
    const wrapper = shallow(<DateInputControl input={{ value: inputValue }} required />);
    wrapper.instance().clearInput = jest.fn();
    wrapper.instance().handleBlur(mockEvent);
    expect(wrapper.instance().clearInput).toHaveBeenCalledTimes(0);
  });

  it('Handle change as expected', () => {
    const mockOnChange = jest.fn(date => date.format());
    const newValue = '2018-03-12';
    const momentObj = moment([2018, 2, 12]);
    const wrapper = shallow(<DateInputControl input={{ onChange: mockOnChange }} required />);
    expect(wrapper.instance().handleChange(newValue)).toEqual(momentObj.format());
  });

  it('Should use passed in datePickerClassModifier class name', () => {
    const wrapper = shallow(
      <DateInputControl
        className="custom-date-picker-class"
        datePickerClassModifier="modified-class"
        input={{ value: inputValue }}
        required
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('DatePicker').hasClass('modified-class')).toBeTruthy();
  });

  it('Should render correctly when a submission fails with errors', () => {
    const wrapper = shallow(
      <DateInputControl
        className="custom-date-picker-class"
        datePickerClassModifier="modified-class"
        input={{ value: inputValue }}
        required
        meta={{ error: 'An error happened on this item.', submitFailed: true }}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
