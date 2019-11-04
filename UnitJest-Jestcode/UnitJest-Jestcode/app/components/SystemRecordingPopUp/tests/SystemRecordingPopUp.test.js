import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SystemRecordingPopUp from '../index';

describe('<SystemRecordingPopUp />', () => {
  let wrapper = null;
  const props = {
    tableData: {
      'Success Recording': [
        { title: 'titlevalue1' },
        { content: 'value.value1' },
        { title: 'titlevalue2', content: 'value.value1' },
        { title: 'titlevalue3', content: 'value.value1' },
      ],
    },
    popUpType: 'Success Recording',
    scoreToggleClose: jest.fn(),
  };
  wrapper = shallow(<SystemRecordingPopUp {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('<SystemRecordingPopUp />', () => {
  let wrapper = null;
  const props = {
    tableData: {
      'Success Recording': [
        { title: 'titlevalue1', content: 'value.value1' },
        { title: 'titlevalue2', content: 'khushbu.sinha' },
        { title: 'titlevalue3', content: 'value.value1' },
      ],
    },
    popUpType: 'Success Recording',
    scoreToggleClose: jest.fn(),
  };
  wrapper = shallow(<SystemRecordingPopUp {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<SystemRecordingPopUp />', () => {
  let wrapper = null;
  const props = {
    tableData: {
      'Success Recording1': [
        { title: 'titlevalue1', content: 'value.value1' },
        { title: 'titlevalue2', content: 'khushbu.sinha' },
        { title: 'titlevalue3', content: 'value.value1' },
        { title: 'titlevalue4', content: 'value.value1' },
      ],
    },
    popUpType: 'Success Recording1',
    scoreToggleClose: jest.fn(),
  };
  wrapper = shallow(<SystemRecordingPopUp {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
