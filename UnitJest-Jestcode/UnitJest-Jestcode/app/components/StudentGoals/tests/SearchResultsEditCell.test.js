import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SearchResultsEditCell from '../SearchResultsEditCell';

describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  let mockmetaData = null;
  let mockItems = null;
  let mockclickHandler = null;
  beforeEach(() => {
    mockItems = {
      name: 'SAM Server',
      version: 'v1.1',
    };
    mockmetaData = {};
    mockclickHandler = jest.fn();
    wrapper = shallow(
      <SearchResultsEditCell
        row={mockItems}
        metaData={mockmetaData}
        clickHandler={mockclickHandler}
      />
    );
  });
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  describe('handleshowMeClick', () => {
    it('on click', () => {
      wrapper.props.clickHandler = jest.fn();
      wrapper.find('a').simulate('click', {});
      expect(wrapper.props.clickHandler).not.toHaveBeenCalled();
    });
  });
});
