import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import PopupModal from '../PopupModal';

describe('<PopupModal />', () => {
  let wrapper = null;
  wrapper = shallow(<PopupModal />);
  it('Expect to have unit tests specified', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
