import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ReportDescription from '../index';

describe('<ReportDescription />', () => {
  let wrapper = null;
  const testDescription = 'This is a test of the emergency broadcast system';

  beforeEach(() => {
    wrapper = shallow(<ReportDescription description={testDescription} />);
  });
  it('Expect to render the description as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
