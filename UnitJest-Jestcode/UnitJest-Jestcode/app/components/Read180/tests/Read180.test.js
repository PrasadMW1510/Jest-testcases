import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Read180 from '../index';

describe('<Read180 />', () => {
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    requestData: jest.fn(),
    data: {
      row: {
        communityId: 1,
      },
    },
    modalData: [
      {
        communityId: 'R180NG',
        assignment: 'Respond & Write',
      },
      {
        communityId: 'R180NG',
        assignment: 'Respond & Write',
      },
      {
        communityId: 'R180NG',
        assignment: 'Respond & Write',
      },
    ],
    hideModal: jest.fn(),
    showRead180RespondWriteModal: jest.fn(),
  };
  const wrapper = shallow(<Read180 {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect prevSerd to render component', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 0,
    });
    wrapper.instance().prevSerd(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect prevSerd to render component', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 1,
    });
    wrapper.instance().prevSerd(e);
    expect(props.hideModal.mock.calls.length).toBe(1);
  });
  it('Expect nextSerd to render component', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 2,
    });
    wrapper.instance().nextSerd(e);
    expect(props.hideModal.mock.calls.length).toBe(1);
  });
  it('Expect nextSerd to render component', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 1,
    });
    wrapper.instance().nextSerd(e);
    expect(props.hideModal.mock.calls.length).toBe(2);
  });
});

describe('<Read180 />', () => {
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    requestData: jest.fn(),
    data: {
      row: {
        communityId: 1,
      },
    },
    modalData: [
      {
        communityId: 'R180NG11',
        assignment: 'Respond & Write11',
      },
      {
        communityId: 'R180NG11',
        assignment: 'Respond & Write11',
      },
      {
        communityId: 'R180NG11',
        assignment: 'Respond & Write11',
      },
    ],
    hideModal: jest.fn(),
    showRead180RespondWriteModal: jest.fn(),
  };
  const wrapper = shallow(<Read180 {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect prevSerd to render component', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 1,
    });
    wrapper.instance().prevSerd(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect nextSerd to render component', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 1,
    });
    wrapper.instance().nextSerd(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
});
