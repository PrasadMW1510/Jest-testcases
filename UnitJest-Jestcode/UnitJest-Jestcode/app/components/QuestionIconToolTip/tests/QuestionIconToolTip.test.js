import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import QuestionIconToolTip from '../index';

describe('<QuestionIconToolTip />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<QuestionIconToolTip>Tool Tip Text</QuestionIconToolTip>);
  });

  it('expect the default to render', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
