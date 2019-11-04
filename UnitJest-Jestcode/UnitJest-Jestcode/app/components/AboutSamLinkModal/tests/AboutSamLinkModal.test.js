import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMModal from 'components/SAMModal';
import SAM_SERVER_NAME from 'components/AboutSamLinkModal/constants';
import AboutSamLinkModal from '../index';

describe('<AboutSamLinkModal />', () => {
  let wrapper = null;
  const items = [
    {
      name: SAM_SERVER_NAME,
      version: '3.0.0-32',
      Enabled: 'true',
      ServerBuildNumber: '3.0.0-44',
      MediaBuildNumber: '',
      supernumber: '3.0.0.44',
    },
    {
      name: 'Math Inventory',
      version: '2.6.3',
      Enabled: 'flase',
      ServerBuildNumber: '3.0.0-37',
      MediaBuildNumber: '2.8.0',
      supernumber: '3.0.0.37',
    },
  ];

  const mockOnOk = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<AboutSamLinkModal isOpen item={items} onOk={mockOnOk} key={[]} />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should contain a AboutSamLink', () => {
    expect(wrapper.find(SAMModal).exists()).toBeTruthy();
    expect(wrapper.find(SAMModal).prop('contentLabel')).toEqual('About SAM');
  });
  it('OK clicked', () => {
    wrapper.find('button').simulate('click', { preventDefault: () => {} });
    expect(mockOnOk).toHaveBeenCalled();
  });
});
