import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import FADresetModal from '../index';

describe('<FADresetModal />', () => {
  let isOpen = null;
  let doYes = null;
  let doNo = null;
  let wrapper = null;
  beforeEach(() => {
    isOpen = true;
    doYes = jest.fn();
    doNo = jest.fn();
    wrapper = shallow(<FADresetModal isOpen={isOpen} doYes={doYes} doNo={doNo} />);
  });

  it('Expect to render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
