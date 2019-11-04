import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AboutSamLink from '../index';

describe('<AboutSamLink />', () => {
  let wrapper = null;
  let mockOnAboutClick = null;
  let mockItems = null;
  let mockedItem = null;
  beforeEach(() => {
    mockItems = [
      [{ name: 'SAM Server' }, { name: 'fm' }],
      [{ version: 'v1.1' }, { version: 'v1.2' }],
      [{ Enabled: 'true' }, { Enabled: 'false' }],
      [{ ServerBuildNumber: 'v.3.3' }, { ServerBuildNumber: 'v3.2' }],
      [{ MediaBuildNumber: 'v.3.3' }, { MediaBuildNumber: 'v3.2' }],
      [{ supernumber: 'v.3.3' }, { supernumber: 'v3.2' }],
    ];
    mockedItem = { item: mockItems };
    mockOnAboutClick = jest.fn();
    wrapper = shallow(<AboutSamLink item={mockItems} onAboutSAMClick={mockOnAboutClick} />);
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('handleOnAboutSamLink', () => {
    it('on click', () => {
      wrapper.find('.asl-btn-link').simulate('click', { preventDefault: () => {} });
      expect(mockOnAboutClick).toBeCalledWith(mockedItem);
    });
  });
});
