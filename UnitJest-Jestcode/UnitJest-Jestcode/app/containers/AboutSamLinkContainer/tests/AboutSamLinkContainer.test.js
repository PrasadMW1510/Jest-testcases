import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AboutSamLink from 'components/AboutSamLink';
import { AboutSamLinkContainer } from '../AboutSamLinkContainer';
import { fromJS } from '../../../../node_modules/immutable/dist/immutable';

describe('<AboutSamLinkContainer />', () => {
  let wrapper = null;
  let mockItems = null;
  let mockedActions = null;
  let wrapperInstance = null;
  beforeEach(() => {
    mockItems = fromJS([
      [{ name: 'SAM Server' }, { name: 'fm' }],
      [{ version: 'v1.1' }, { version: 'v1.2' }],
      [{ Enabled: 'true' }, { Enabled: 'false' }],
      [{ ServerBuildNumber: 'v.3.3' }, { ServerBuildNumber: 'v3.2' }],
      [{ MediaBuildNumber: 'v.3.3' }, { MediaBuildNumber: 'v3.2' }],
      [{ supernumber: 'v.3.3' }, { supernumber: 'v3.2' }],
    ]);
    mockedActions = jest.fn();
    wrapper = shallow(
      <AboutSamLinkContainer global={mockItems} showAboutLinkModal={mockedActions} />
    );
    wrapperInstance = wrapper.instance();
  });
  it('Should match the Snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should contain a AboutSamLink', () => {
    expect(wrapper.find(AboutSamLink).exists()).toBeTruthy();
    expect(wrapper.find(AboutSamLink).prop('item').size).toEqual(mockItems.length);
  });
  it('showMessageLogModal', () => {
    wrapperInstance.handleAboutSAMClick(mockItems);
    expect(mockedActions).toHaveBeenCalledWith(mockItems);
  });
});
