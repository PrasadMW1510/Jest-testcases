import React from 'react';
import { shallow } from 'enzyme';
import CollapsibleBook from '../index';

describe('<CollapsibleBook />', () => {
  let wrapper = null;
  let props = null;
  const items = [
    {
      name: 'Book 1',
      id: '5',
    },
  ];
  it('should call unCheck if', () => {
    const e = {
      target: {
        value: '0',
        checked: false,
        nextSibling: {
          classList: {
            remove: jest.fn(),
            add: jest.fn(),
          },
        },
      },
    };
    props = {
      selectedata: ['0'],
      callbackFromParent: jest.fn(),
    };
    wrapper = shallow(<CollapsibleBook {...props} data={items} key={[]} />);
    wrapper.instance().unCheck(e);
    expect(wrapper.instance().props.selectedata).toEqual(['0']);
  });
  it('should call unCheck else', () => {
    const e = {
      target: {
        checked: true,
        nextSibling: {
          classList: {
            remove: jest.fn(),
            add: jest.fn(),
          },
        },
      },
    };
    props = {
      selectedata: [],
      callbackFromParent: jest.fn(),
    };
    wrapper = shallow(<CollapsibleBook {...props} data={items} key={[]} />);
    wrapper.instance().unCheck(e);
    expect(wrapper.instance().props.selectedata).toEqual([]);
  });
  it('on un check isChecked ', () => {
    const id = ['5'];
    props = {
      selectedata: ['5'],
      callbackFromParent: jest.fn(),
    };
    wrapper = shallow(<CollapsibleBook {...props} data={items} key={[]} />);
    wrapper.instance().isChecked(id);
    expect(wrapper.instance().props.selectedata).toEqual(['5']);
  });
});
