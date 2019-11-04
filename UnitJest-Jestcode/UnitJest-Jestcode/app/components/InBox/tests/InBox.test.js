import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import InBox from '../index';
import * as Constants from '../constants';

describe('<InBox />', () => {
  let wrapper = null;
  const props = {
    data: [],
    showInboxProgram: jest.fn(),
    showSystem44Modal: jest.fn(),
    showIreadModal: jest.fn(),
    showRead180NgModal: jest.fn(),
    showRead180StudentWorkModal: jest.fn(),
  };
  wrapper = shallow(<InBox {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render toggleAllCheckboxes with truthy value', () => {
    const isChecked = true;
    const itemIds = [];
    wrapper.instance().toggleAllCheckboxes(isChecked, itemIds);

    expect(wrapper.state('selectAll')).toBeTruthy();
  });
  it('Expect handleRowSelections to update state with row values', () => {
    const isChecked = true;
    const itemId = [];
    const row = 2;
    wrapper.setState({
      selectedrows: [],
      searchResultsIdsChecked: [
        {
          itemId: 1,
        },
      ],
    });
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(wrapper.state('selectedrows')).toEqual([2]);
  });
  it('Expect to render handleRowSelections with falsy value', () => {
    const isChecked = false;
    const itemId = [];
    const row = 2;
    wrapper.setState({
      selectedrows: [],
      searchResultsIdsChecked: [
        {
          itemId: 1,
        },
      ],
    });
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(wrapper.state('isChecked')).toBeFalsy();
  });
  it('Expect handleClick to execute with falsy condition', () => {
    const clickedValue = ' System 44NG ';
    wrapper.instance().handleClick(clickedValue);
    expect(props.showInboxProgram.mock.calls.length).toBe(0);
  });
  it('Expect handleClick to execute with truthy condition 1', () => {
    const clickedValue = 'MATH180 COURSE1 ';
    wrapper.instance().handleClick(clickedValue);
    expect(props.showInboxProgram.mock.calls.length).toBe(1);
  });
  it('Expect handleClick to execute with truthy condition 1', () => {
    const clickedValue = 'MATH180 COURSE2 ';
    wrapper.instance().handleClick(clickedValue);
    expect(props.showInboxProgram.mock.calls.length).toBe(2);
  });
  it('Expect handleClick to execute with falsy condition 2', () => {
    const clickedValue = ' Read 180 NG ';
    wrapper.instance().handleClick(clickedValue);
    expect(props.showInboxProgram.mock.calls.length).toBe(2);
  });
  it('Expect handleClick to execute with falsy condition 3', () => {
    const clickedValue = ' iRead';
    wrapper.instance().handleClick(clickedValue);
    expect(props.showInboxProgram.mock.calls.length).toBe(2);
  });
  it('Expect to render handleDetailProgram  correctly', () => {
    const isEditable = true;
    const metaData = [];
    const index = 0;
    const row = {
      community_id: 'S44JR',
    };
    wrapper.instance().handleDetailProgram(row, isEditable, index, metaData);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render handleDetailProgram  correctly', () => {
    const isEditable = true;
    const metaData = [];
    const index = 0;
    const row = {
      community_id: 'S44NG',
    };
    wrapper.instance().handleDetailProgram(row, isEditable, index, metaData);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render handleDetailProgram  correctly', () => {
    const isEditable = true;
    const metaData = [];
    const index = 0;
    const row = {
      community_id: 'R180NG',
    };
    wrapper.instance().handleDetailProgram(row, isEditable, index, metaData);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render handleDetailProgram  correctly', () => {
    const isEditable = true;
    const metaData = [];
    const index = 0;
    const row = {
      community_id: 'R180NG1',
    };
    wrapper.instance().handleDetailProgram(row, isEditable, index, metaData);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handleDetailProgram to execute with falsy condition 2', () => {
    const programRow = {
      communityId: ' System 44NG ',
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(props.showInboxProgram.mock.calls.length).toBe(2);
  });
  it('Expect to handleDetailProgram to execute with falsy condition 3', () => {
    const programRow = {
      communityId: ' iRead',
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(props.showInboxProgram.mock.calls.length).toBe(2);
  });
  it('Expect to handleDetailProgram to execute with falsy condition 3', () => {
    const programRow = {
      community_id: 'RTNG',
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(props.showInboxProgram.mock.calls.length).toBe(2);
  });
  it('Expect to handleDetailProgram to execute with truthy condition 1', () => {
    const programRow = {
      communityId: Constants.PROG_MATH_VALUE_1,
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(props.showInboxProgram.mock.calls.length).toBe(3);
  });
  it('Expect to handleDetailProgram to execute with truthy condition 2', () => {
    const programRow = {
      community_id: Constants.PROG_MATH_VALUE_2,
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(props.showInboxProgram.mock.calls.length).toBe(3);
  });
  it('Expect to handleDetailProgram to execute with truthy condition 1', () => {
    const isChecked = true;
    const itemId = 1;
    wrapper.instance().handleRowCheckboxOnChange(isChecked, itemId);
    expect(wrapper.state().searchResultsIdsChecked).toContain(itemId);
  });
  it('Expect to handleDetailProgram to execute with falsy condition', () => {
    const isChecked = false;
    const itemId = 1;
    expect(wrapper.state().searchResultsIdsChecked).toContain(itemId);
    wrapper.instance().handleRowCheckboxOnChange(isChecked, itemId);
    expect(wrapper.state().searchResultsIdsChecked).not.toContain(itemId);
  });
});
