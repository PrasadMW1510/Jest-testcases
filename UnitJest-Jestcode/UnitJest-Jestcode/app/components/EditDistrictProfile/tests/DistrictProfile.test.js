import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DistrictProfile from '../DistrictProfile';

describe('<DistrictProfile />', () => {
  let wrapper = null;
  const mockApplications = [
    { label: 'Common Core Code X', id: 'CDX' },
    { label: 'Progress Space', id: 'DTM' },
    { label: 'Do The Math', id: 'DTM2' },
  ];
  const mockTimeZones = ['Pacific (US & Canada', 'Eastern (US & Canada)'];

  beforeEach(() => {
    wrapper = shallow(
      <DistrictProfile applications={mockApplications} timeZones={mockTimeZones} />
    );
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
