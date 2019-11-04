import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TreebeardDecorator from '../TreebeardDecorator';

describe('<TreebeardDecorator  />', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;
  let wrapper3 = null;

  const props = {
    style: {},
    node: {
      name: 'Loading',
      toggled: true,
    },
  };
  const props1 = {
    style: {},
    node: {
      name: 'Loadin',
      children: [],
      toggled: true,
    },
  };
  const props3 = {
    style: {},
    node: {
      name: 'Loadin',
      children: [],
    },
  };
  const props2 = {
    style: {},
    node: {
      name: 'Loadin',
      toggled: true,
    },
  };
  wrapper = shallow(<TreebeardDecorator {...props} />);
  wrapper1 = shallow(<TreebeardDecorator {...props1} />);
  wrapper2 = shallow(<TreebeardDecorator {...props2} />);
  wrapper3 = shallow(<TreebeardDecorator {...props3} />);

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
    expect(shallowToJson(wrapper3)).toMatchSnapshot();
  });
});
