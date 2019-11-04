import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ResourcesItsview from '../index';

describe('<ResourcesItsview />', () => {
  let wrapper = null;
  let mockAppInfo = null;
  let mockSessionId = null;

  beforeEach(() => {
    mockAppInfo = [
      {
        text1: ['text1'],
        text2: ['text2'],
        text3: ['text3'],
        ref_guide_url: ['ref_guide_url'],
        its_url: ['its_url'],
      },
    ];
    mockSessionId = '2938403';
    wrapper = shallow(<ResourcesItsview appInfo={mockAppInfo} sessionId={mockSessionId} />);
  });

  it('Expect to render itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
