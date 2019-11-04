import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Collapsible from '../index';

describe('<Collapsible />', () => {
  let wrapper = null;

  it('Expect to render correctly when clicked expand', () => {
    wrapper = shallow(<Collapsible title={'Author'} />);
    wrapper
      .find('.collapsible__wrapper-heading')
      .at(0)
      .simulate('click', {
        currentTarget: { className: 'collapsible__wrapper-heading' },
        preventDefault() {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
