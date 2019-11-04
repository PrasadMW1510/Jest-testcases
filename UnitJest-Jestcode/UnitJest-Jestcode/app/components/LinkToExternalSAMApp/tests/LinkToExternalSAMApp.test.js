import React from 'react';
import { shallow } from 'enzyme';
import { getBaseUrl } from 'utils/request';
import LinkToExternalSAMApp from '../index';

describe('<LinkToExternalSAMApp />', () => {
  let wrapper = null;
  const browserURL = 'localhost';
  let originalEnv = null;
  let originalLocation = null;

  // these tests modify the testing environment, so we need to back it up and restore it after each test
  beforeAll(() => {
    originalEnv = process.env.NODE_ENV;
    originalLocation = window.location;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    window.location = originalLocation;
  });

  beforeEach(() => {
    Object.defineProperty(window.location, 'origin', {
      writable: true,
      value: browserURL,
    });
  });

  it('Link with no relative URL path nor query params should render correctly', () => {
    wrapper = shallow(<LinkToExternalSAMApp linkText="Sample link" />);
    expect(
      wrapper
        .find('a')
        .first()
        .props().href
    ).toEqual(`${getBaseUrl()}/`);
  });

  it('Link with relative URL path but no query params should render correctly', () => {
    wrapper = shallow(<LinkToExternalSAMApp linkText="Sample link" relativeUrlPath="import.s" />);
    expect(
      wrapper
        .find('a')
        .first()
        .props().href
    ).toEqual(`${getBaseUrl()}/import.s`);
  });

  it('Link with relative URL path and query params should render correctly', () => {
    const queryParamList = [['user_id', 'some_user_id'], ['district_id', 'some_district id']];
    wrapper = shallow(
      <LinkToExternalSAMApp
        linkText="Sample link"
        relativeUrlPath="import.s"
        queryParamList={queryParamList}
      />
    );
    const linkAttributes = wrapper
      .find('a')
      .first()
      .props();
    expect(linkAttributes.target).toEqual('_blank');
    expect(linkAttributes.href).toEqual(
      `${getBaseUrl()}/import.s?user_id=some_user_id&district_id=some_district%20id`
    );
    expect(wrapper.find('a').text()).toEqual('Sample link');
  });
});
