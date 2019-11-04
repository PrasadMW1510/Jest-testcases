import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import AdvancedSearchControlButtons from '../index';

describe('<AdvancedSearchControlButtons />', () => {
  let wrapper = null;
  beforeEach(() => {
    const props = {
      callbackFromParent: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearchControlButtons {...props} />);
  });
  it('Expect to have unit tests specified', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call handleClearForm ', () => {
    wrapper.instance().handleClearForm();
  });
  it('should call handleSearchForm  ', () => {
    wrapper.instance().handleSearchForm();
  });
});
