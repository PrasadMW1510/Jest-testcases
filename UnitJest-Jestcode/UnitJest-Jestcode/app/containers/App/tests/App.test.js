import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import App from '../App';

describe('<App />', () => {
  let wrapper = null;
  const props = {
    location: {
      pathname: 'port',
    },
  };
  beforeEach(() => {
    wrapper = shallow(<App {...props} />);
  });

  it('should render some routes', () => {
    expect(wrapper.find(Route).length).not.toBe(0);
  });
});
