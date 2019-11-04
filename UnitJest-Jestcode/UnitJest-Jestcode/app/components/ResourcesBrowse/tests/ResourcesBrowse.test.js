import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ResourcesBrowse from '../index';

describe('<ResourcesBrowse />', () => {
  let wrapper = null;
  let mockBrowseResource = null;

  beforeEach(() => {
    mockBrowseResource = undefined;
    wrapper = shallow(<ResourcesBrowse browseResource={mockBrowseResource} />);
  });

  it('Expect to render itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Verify render with multiple tabs', () => {
    mockBrowseResource = fromJS({
      resource_supertype: [
        {
          supertype_id: ['0'],
        },
        {
          supertype_id: ['1'],
        },
      ],
    });
    wrapper.setProps({ browseResource: mockBrowseResource });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
