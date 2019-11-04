import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CollectionsList from '../index';
describe('<CollectionsList />', () => {
  const props = {
    onChange: jest.fn(),
    data: [
      {
        Name: 'vyp',
      },
    ],
  };
  const wrapper = shallow(<CollectionsList {...props} />);
  it('Expect to have unit tests specified', () => {
    const e = {
      target: {
        value: 'hhh',
      },
    };
    wrapper.instance().handleChange(e);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
