import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import HeaderUserText from '../index';

describe('<HeaderUserText />', () => {
  let wrapper = null;
  let firstName = null;
  let lastName = null;

  beforeEach(() => {
    firstName = 'John';
    lastName = 'Smith';
    wrapper = shallow(<HeaderUserText firstName={firstName} lastName={lastName} />);
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should contain the first and last name', () => {
    expect(wrapper.children().text()).toContain(firstName);
    expect(wrapper.children().text()).toContain(lastName);
  });
});
