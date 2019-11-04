import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import FormLabel from 'components/forms/FormLabel';

describe('<FormLabel />', () => {
  it('Should render correctly with a custom class', () => {
    const wrapper = shallow(<FormLabel className="my-custom-class">form label content</FormLabel>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when flagged as disabled', () => {
    const wrapper = shallow(<FormLabel disabled>form label content</FormLabel>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when flagged as required', () => {
    const wrapper = shallow(<FormLabel required>form label content</FormLabel>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when flagged as having errors', () => {
    const wrapper = shallow(<FormLabel error>form label content</FormLabel>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with mutiple flags set', () => {
    const wrapper = shallow(
      <FormLabel disabled error required>
        form label content
      </FormLabel>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
