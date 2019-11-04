import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import StudentGoals from '../index';

describe('<StudentGoals />', () => {
  let wrapper = null;
  const props = {
    showSystem44StudentGoalsModal: jest.fn(),
    location: {},
    data: [],
  };
  wrapper = shallow(<StudentGoals {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect toggleAllCheckboxes  to render correctly', () => {
    const isChecked = true;
    const itemIds = 1;
    const selectedRows = [];
    wrapper.instance().toggleAllCheckboxes(isChecked, itemIds, selectedRows);
    expect(wrapper.state('selectAll')).toBeTruthy();
  });
  it('Expect handleRowSelections  to render correctly', () => {
    const isChecked = true;
    const itemId = 1;
    const row = [];
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(wrapper.instance().props.data).toEqual([]);
  });
  it('Expect handleRowSelections  to render correctly', () => {
    const isChecked = false;
    const itemId = 1;
    const row = [];
    wrapper.setState({
      searchResultsIdsChecked: [
        {
          itemId: 1,
        },
      ],
    });
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(wrapper.instance().props.data).toEqual([]);
  });
  it('Expect handleClick  to render correctly', () => {
    const isChecked = true;
    const itemId = 1;
    const row = [];
    wrapper.instance().handleClick(isChecked, itemId, row);
    expect(props.showSystem44StudentGoalsModal.mock.calls.length).toBe(1);
  });
  it('Expect handleRowCheckboxOnChange  to render correctly', () => {
    const isChecked = true;
    const itemId = 1;
    const row = [];
    wrapper.instance().handleRowCheckboxOnChange(isChecked, itemId, row);
    expect(wrapper.instance().props.data).toEqual([]);
  });
  it('Expect handleRowCheckboxOnChange  to render correctly', () => {
    const isChecked = false;
    const itemId = 1;
    const row = [];
    wrapper.instance().handleRowCheckboxOnChange(isChecked, itemId, row);
    expect(wrapper.instance().props.data).toEqual([]);
  });
});
