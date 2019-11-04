import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import StudentWorks from '../index';

describe('<StudentWorks />', () => {
  let wrapper = null;
  const props = {
    data: [],
    showInboxProgram: jest.fn(),
    showRead180Modal: jest.fn(),
    showSystem44StudentGoalsModal: jest.fn(),
    showIReadStudentWorkModal: jest.fn(),
    location: {},
  };
  wrapper = shallow(<StudentWorks {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect toggleAllCheckboxes to render correctly', () => {
    const isChecked = true;
    const itemIds = 1;
    const selectedRows = [];
    wrapper.instance().toggleAllCheckboxes(isChecked, itemIds, selectedRows);
    expect(wrapper.state('selectAll')).toBeTruthy();
  });
  it('Expect handleRowSelections to render correctly', () => {
    const isChecked = true;
    const itemId = 1;
    const row = [];
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(props.showInboxProgram.mock.calls.length).toBe(0);
  });
  it('Expect handleRowSelections to render correctly', () => {
    const isChecked = false;
    const itemId = 1;
    const row = [];
    wrapper.setState({
      searchResultsIdsChecked: [
        {
          itemId: 2,
        },
      ],
    });
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(wrapper.state('isChecked')).toBeFalsy();
  });
  it('Expect handleClick to render correctly', () => {
    const clickedValue = 'MATH180 COURSE1 ';
    wrapper.instance().handleClick(clickedValue);
    expect(props.showInboxProgram.mock.calls.length).toBe(1);
  });
  it('Expect handleClick to render correctly', () => {
    const clickedValue = 'MATH180 COURSE2 ';
    wrapper.instance().handleClick(clickedValue);
    expect(props.showInboxProgram.mock.calls.length).toBe(2);
  });
  it('Expect handleClick to render correctly', () => {
    const clickedValue = ' Read 180 NG ';
    wrapper.instance().handleClick(clickedValue);
    expect(props.showInboxProgram.mock.calls.length).toBe(2);
  });
  it('Expect to render handleDetailProgram correctly', () => {
    const programRow = {
      community_id: 'R180NG',
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(wrapper.instance().props.showInboxProgram).toBeCalled();
  });
  it('Expect to render handleDetailProgram correctly', () => {
    const programRow = {
      community_id: 'M18011',
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(wrapper.instance().props.showInboxProgram).toBeCalled();
  });
  it('Expect handleRowCheckboxOnChange to render correctly', () => {
    const isChecked = true;
    const itemId = 1;
    wrapper.instance().handleRowCheckboxOnChange(isChecked, itemId);
    expect(props.data).toEqual([]);
  });
  it('Expect handleRowCheckboxOnChange to render correctly', () => {
    const isChecked = false;
    const itemId = 1;
    wrapper.instance().handleRowCheckboxOnChange(isChecked, itemId);
    expect(wrapper.state('isChecked')).toBeFalsy();
  });
  it('Expect to render handleDetailProgram correctly', () => {
    const programRow = {
      community_id: 'M180',
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(wrapper.instance().props.showInboxProgram).toBeCalled();
  });
  it('Expect to render handleDetailProgram correctly', () => {
    const programRow = {
      community_id: 'M18011',
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(wrapper.instance().props.showInboxProgram).toBeCalled();
  });
  it('Expect to render handleDetailProgram correctly', () => {
    const programRow = {
      community_id: 'S44JR',
    };
    wrapper.instance().handleDetailProgram(programRow);
    expect(wrapper.instance().props.showInboxProgram).toBeCalled();
  });

  it('Expect handleDetailProgram to render correctly', () => {
    const programRow = {
      community_id: ' System 44NG ',
    };
    const selectedIndex = 0;
    const metaData = [];
    wrapper.instance().handleDetailProgram(programRow, selectedIndex, metaData);
    expect(wrapper.instance().props.data).toEqual([]);
  });
  it('Expect handleDetailProgram to render correctly', () => {
    const programRow = {
      community_id: ' iRead ',
    };
    const selectedIndex = 0;
    const metaData = [];
    wrapper.instance().handleDetailProgram(programRow, selectedIndex, metaData);
    expect(wrapper.instance().props.data).toEqual([]);
  });
  it('Expect handleDetailProgram to render correctly', () => {
    const programRow = {
      community_id: 'R180NG',
    };
    const selectedIndex = 0;
    const metaData = [];
    wrapper.instance().handleDetailProgram(programRow, selectedIndex, metaData);
    expect(wrapper.instance().props.data).toEqual([]);
  });
  it('Expect handleDetailProgram to render correctly', () => {
    const programRow = {
      community_id: 'RTNG',
    };
    const selectedIndex = 0;
    const metaData = [];
    wrapper.instance().handleDetailProgram(programRow, selectedIndex, metaData);
    expect(wrapper.instance().props.data).toEqual([]);
  });
  it('Expect handleDetailProgram to render correctly', () => {
    const programRow = {
      community_id: 'S44NG',
      from: 'QuickWrites',
    };
    const selectedIndex = 0;
    const metaData = [];
    wrapper.instance().handleDetailProgram(programRow, selectedIndex, metaData);
    expect(wrapper.instance().props.data).toEqual([]);
  });
  it('Expect handleDetailProgram to render correctly', () => {
    const programRow = {
      community_id: 'S44NG',
      from: 'Student Goals',
    };
    const selectedIndex = 0;
    const metaData = [
      {
        kind: 'Goal',
        date: '2017-05-21T00:00:00',
      },
    ];
    wrapper.instance().handleDetailProgram(programRow, selectedIndex, metaData);
    expect(wrapper.instance().props.data).toEqual([]);
  });
  it('Expect handleDetailProgram to render correctly', () => {
    const programRow = {
      community_id: 'S44NG',
      from: 'Student1',
    };
    const selectedIndex = 0;
    const metaData = [
      {
        kind: 'Goal',
      },
    ];
    wrapper.instance().handleDetailProgram(programRow, selectedIndex, metaData);
    expect(wrapper.instance().props.data).toEqual([]);
  });
});
