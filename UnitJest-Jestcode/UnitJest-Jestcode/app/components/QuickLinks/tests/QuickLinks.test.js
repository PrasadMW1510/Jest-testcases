import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import QuickLinksItem from 'components/QuickLinksItem';
import QuickLinks from '../index';

describe('<QuickLinks />', () => {
  let wrapper = null;
  let mockLogout = null;
  let mockHelpClick = null;
  let mockSearch = null;
  let mockOnProfileClick = null;
  let mockHomeClick = null;

  beforeEach(() => {
    mockLogout = jest.fn();
    mockHelpClick = jest.fn();
    mockSearch = jest.fn();
    mockOnProfileClick = jest.fn();
    mockHomeClick = jest.fn();

    wrapper = shallow(
      <QuickLinks
        onLogoutClick={mockLogout}
        onHelpClick={mockHelpClick}
        onSearchClick={mockSearch}
        onProfileClick={mockOnProfileClick}
        onHomeClick={mockHomeClick}
      />
    );
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should have five QuickLinkItems', () => {
    expect(wrapper.find(QuickLinksItem).length).toEqual(5);
  });

  it('Should have a QuickLinkItem for Search', () => {
    expect(wrapper.find(QuickLinksItem).filterWhere(i => i.contains('SEARCH')).length).toEqual(1);
  });

  it('Should have another QuickLinkItem for Search', () => {
    const item = wrapper.find(QuickLinksItem).filterWhere(i => i.contains('SEARCH'));
    item.prop('onClick')();
    expect(item).toHaveLength(1);
    expect(mockSearch).toHaveBeenCalled();
  });

  it('Should have a QuickLinkItem for Exit', () => {
    const item = wrapper.find(QuickLinksItem).filterWhere(i => i.contains('EXIT'));
    item.prop('onClick')();
    expect(item).toHaveLength(1);
    expect(mockLogout).toHaveBeenCalled();
  });

  it('Should have a QuickLinkItem for Help', () => {
    expect(wrapper.find(QuickLinksItem).filterWhere(i => i.contains('HELP')).length).toEqual(1);
    const item = wrapper.find(QuickLinksItem).filterWhere(i => i.contains('HELP'));
    item.prop('onClick')();
    expect(item).toHaveLength(1);
    expect(mockHelpClick).toHaveBeenCalled();
  });

  it('Should have a QuickLinkItem for Profile', () => {
    expect(wrapper.find(QuickLinksItem).filterWhere(i => i.contains('MY PROFILE')).length).toEqual(
      1
    );
    const item = wrapper.find(QuickLinksItem).filterWhere(i => i.contains('MY PROFILE'));
    item.prop('onClick')();
    expect(item).toHaveLength(1);
    expect(mockOnProfileClick).toHaveBeenCalled();
  });

  it('Should have a QuickLinkItem for Home', () => {
    expect(wrapper.find(QuickLinksItem).filterWhere(i => i.contains('HOME')).length).toEqual(1);
    const item = wrapper.find(QuickLinksItem).filterWhere(i => i.contains('HOME'));
    item.prop('onClick')();
    expect(item).toHaveLength(1);
    expect(mockHomeClick).toHaveBeenCalled();
  });
});
