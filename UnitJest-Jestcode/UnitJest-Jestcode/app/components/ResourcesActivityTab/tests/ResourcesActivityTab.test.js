import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import MockResourcesAppInfoJson from 'components/ResourcesActivityTab/tests/resourcesAppInfo.json';
import { tab } from '../constants';
import ResourcesActivityTab from '../index';

describe('<ResourcesActivityTab />', () => {
  let wrapper = null;
  let mockResourcesAppInfo = null;
  let mockAppITSInfo = null;

  beforeEach(() => {
    mockResourcesAppInfo = fromJS({});
    mockAppITSInfo = [];
    wrapper = shallow(
      <ResourcesActivityTab resourcesAppInfo={mockResourcesAppInfo} appITSInfo={mockAppITSInfo} />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('click browse', () => {
    wrapper.setState({ tabSelected: tab.BROWSE });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('click standards', () => {
    wrapper.setState({ tabSelected: tab.STANDARDS });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify with next props has no value for resources Info', () => {
    mockResourcesAppInfo = fromJS({});
    wrapper.setProps({ resourcesAppInfo: mockResourcesAppInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly with resources Info no subtype', () => {
    mockResourcesAppInfo = fromJS({
      resource_supertypes: [
        {
          resource_supertype: [
            {
              resource_types: [
                {
                  type_id: ['TOP0300'],
                  type_name: ['Group students'],
                },
              ],
            },
          ],
          supertype_id: ['TOP0200'],
          supertype_name: ['For individual students'],
        },
      ],
    });
    wrapper.setProps({ resourcesAppInfo: mockResourcesAppInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly with resources Info type Info', () => {
    mockResourcesAppInfo = fromJS({
      resouce_supertype: [
        {
          resource_types: [
            {
              type_id: ['GEN0200'],
              type_name: ['Practice Pages/BLMs'],
              type_description: [
                'Provide students with guided or independent practice opportunities in class or to take home.',
              ],
              resource_subtypes: [
                {
                  resource_subtype: [
                    {
                      resource_subtype_description: [''],
                      resource_subtype_id: ['GEN0201'],
                      resource_subtype_name: ['Practice Pages'],
                    },
                  ],
                },
              ],
            },
          ],
          supertype_description: [''],
          supertype_id: ['TOP0200'],
          supertype_name: ['For individual students'],
        },
        {
          resource_types: [],
          supertype_description: [''],
          supertype_id: ['TOP0100'],
          supertype_name: ['For Whole/Small Group Instructions'],
        },
      ],
    });
    wrapper.setProps({ resourcesAppInfo: mockResourcesAppInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('random tab other than ITS', () => {
    wrapper.setState({ tabSelected: tab.ITS });
    mockAppITSInfo = [
      {
        $: { app: 'DTM' },
        text1: ['text1'],
      },
    ];
    wrapper.setProps({ appITSInfo: mockAppITSInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify if the data is rendered correctly', () => {
    const setStateSpy = jest.fn();
    wrapper.instance().setState = setStateSpy;
    wrapper.instance().updateResourcesAppInfo(MockResourcesAppInfoJson);

    expect(setStateSpy.mock.calls[0][0]).toMatchSnapshot();
  });

  it('verify the state change for nav bar', () => {
    wrapper
      .instance()
      .handleTabClick({ currentTarget: { id: tab.ADVANCED }, preventDefault: () => {} });
    expect(wrapper.state('tabSelected')).toEqual(tab.ADVANCED);
    wrapper
      .instance()
      .handleTabClick({ currentTarget: { id: tab.BROWSE }, preventDefault: () => {} });
    expect(wrapper.state('tabSelected')).toEqual(tab.BROWSE);
    wrapper
      .instance()
      .handleTabClick({ currentTarget: { id: tab.STANDARDS }, preventDefault: () => {} });
    expect(wrapper.state('tabSelected')).toEqual(tab.STANDARDS);
    wrapper.instance().handleTabClick({ currentTarget: { id: tab.ITS }, preventDefault: () => {} });
    expect(wrapper.state('tabSelected')).toEqual(tab.ITS);
  });

  it('verify if the standards tab is selected on no ITS app', () => {
    wrapper.setState({ tabSelected: 'ITS' });
    mockAppITSInfo = [];
    wrapper.setProps({ appITSInfo: mockAppITSInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify render method when ITS value exist', () => {
    mockAppITSInfo = [
      {
        $: { app: 'DTM' },
        text1: ['text1'],
      },
    ];
    wrapper.setProps({ appITSInfo: mockAppITSInfo });
    wrapper.setState({ tabSelected: tab.BROWSE });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
