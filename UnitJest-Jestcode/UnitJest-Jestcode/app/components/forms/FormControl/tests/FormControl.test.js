import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import FormControl from 'components/forms/FormControl';

describe('<FormControl />', () => {
  it('Should render correctly with a custom class', () => {
    const wrapper = shallow(
      <FormControl className="my-custom-class">form control content</FormControl>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when flagged as disabled', () => {
    const wrapper = shallow(<FormControl disabled>form control content</FormControl>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when flagged as required', () => {
    const wrapper = shallow(<FormControl required>form control content</FormControl>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when flagged as having errors', () => {
    const wrapper = shallow(<FormControl error>form control content</FormControl>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with mutiple flags set', () => {
    const wrapper = shallow(
      <FormControl disabled error required>
        form control content
      </FormControl>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
