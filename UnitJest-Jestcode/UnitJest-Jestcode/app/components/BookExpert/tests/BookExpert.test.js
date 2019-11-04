import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BookExpert from '../index';

describe('<BookExpert />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<BookExpert />);
  });

  it('Expect to render correctly', () => {
    const bookExpertButton = wrapper.find('.book-expert-button');
    expect(bookExpertButton.exists()).toBe(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
