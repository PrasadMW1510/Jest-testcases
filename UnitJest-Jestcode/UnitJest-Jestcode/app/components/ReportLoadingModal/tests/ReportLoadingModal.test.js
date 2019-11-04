import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ReportLoadingModal from '../index';

describe('<ReportLoadingModal />', () => {
  let wrapper = null;
  let isOpen = null;

  beforeEach(() => {
    isOpen = true;

    wrapper = shallow(<ReportLoadingModal isOpen={isOpen} />);
  });
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
