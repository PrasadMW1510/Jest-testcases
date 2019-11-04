import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { ResourcesPage } from 'containers/ResourcesPage/ResourcesPage';

describe('<ResourcesPage />', () => {
  let wrapper = null;
  let mockGetProductList = null;
  let mockGetBuildInfo = null;
  let mockApps = null;
  let mockPostResourcesQuickModalSearch = null;
  let mockUpdateResourcesQuickModalStatus = null;
  let mockModalQuickStatus = null;
  let mockResponseQuickSearch = null;

  beforeEach(() => {
    mockApps = fromJS({});
    mockGetProductList = jest.fn();
    mockGetBuildInfo = jest.fn();
    mockPostResourcesQuickModalSearch = jest.fn();
    mockUpdateResourcesQuickModalStatus = jest.fn();
    mockModalQuickStatus = false;
    mockResponseQuickSearch = fromJS({});

    wrapper = shallow(
      <ResourcesPage
        getProductList={mockGetProductList}
        getBuildInfo={mockGetBuildInfo}
        Apps={mockApps}
        postResourcesQuickSearch={mockPostResourcesQuickModalSearch}
        updateResourcesQuickModalStatus={mockUpdateResourcesQuickModalStatus}
        modalQuickStatus={mockModalQuickStatus}
        responseQuickSearch={mockResponseQuickSearch}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('ResourcesActivity app selection', () => {
    wrapper.find('select#appList').simulate('change', {
      target: { value: 'DTM_NOW' },
    });
    expect(wrapper.state('appSelected')).toEqual('DTM_NOW');
  });

  it('verify render when state name is empty', () => {
    const appList = {
      menu_option: [],
    };
    const app = wrapper.instance().updateAppList(appList);
    expect(app).toMatchSnapshot();
  });

  describe('verify the state', () => {
    let name = null;
    beforeEach(() => {
      name = [
        {
          app_id: 'choose_a_program',
          name: 'choose a program',
        },
        {
          app_id: ['CDX_CI'],
          community_id: ['CDX'],
          description: ['Common Core Code X Course I'],
          name: ['Common Core Code X Course I'],
        },
        {
          app_id: ['CDX_CII'],
          community_id: ['CDX'],
          description: ['Common Core Code X Course II'],
          name: ['Common Core Code X Course II'],
        },
      ];
      wrapper.setState({
        name,
      });
    });

    it('verify if the option tab updates the list', () => {
      expect(wrapper.find('option')).toHaveLength(3);
    });
  });

  describe('verify the working of the getProductList', () => {
    beforeEach(() => {
      mockApps = fromJS({
        menu_option: [
          {
            community_id: ['CDX'],
            app_id: ['CDX_CI'],
            name: ['Common Core Code X Course I'],
            description: ['Common Core Code X Course I'],
          },
          {
            community_id: ['CDX'],
            app_id: ['CDX_CII'],
            name: ['Common Core Code X Course II'],
            description: ['Common Core Code X Course II'],
          },
          {
            community_id: ['DTM'],
            app_id: ['DTM_NOW'],
            name: ['Do The Math Now'],
            description: ['Do the math now'],
          },
          {
            app_id: ['CDX_CII_Teacher'],
            community_id: ['CDX_Teacher'],
            description: ['Common Core Code X Course II Teacher'],
            name: ['Common Core Code X Course II Teacher'],
          },
          {
            app_id: ['CDX_CII_Xtra_Topic'],
            community_id: ['CDX_Xtra_Topic'],
            description: ['READ180 Xtra Topic Software A'],
            name: ['READ180 Xtra Topic Software A'],
          },
        ],
      });
    });

    it('verify if the option is being update', () => {
      wrapper = shallow(
        <ResourcesPage
          getProductList={mockGetProductList}
          getBuildInfo={mockGetBuildInfo}
          Apps={mockApps}
          postResourcesQuickSearch={mockPostResourcesQuickModalSearch}
          updateResourcesQuickModalStatus={mockUpdateResourcesQuickModalStatus}
          modalQuickStatus={mockModalQuickStatus}
          responseQuickSearch={mockResponseQuickSearch}
        />
      );
      expect(wrapper.find('option')).toHaveLength(2);
    });

    it('verify componentWillReceiveProps', () => {
      wrapper.setProps({ Apps: mockApps });
      expect(wrapper.find('option')).toHaveLength(2);
    });
  });

  describe('verify when the value is false', () => {
    it('verify the display state if false', () => {
      mockApps = fromJS({});
      wrapper.setProps({ Apps: mockApps });
      expect(wrapper.find('option')).toHaveLength(1);
    });

    it('verify the false loading state', () => {
      mockApps = fromJS({});
      wrapper = shallow(
        <ResourcesPage
          getProductList={mockGetProductList}
          getBuildInfo={mockGetBuildInfo}
          Apps={mockApps}
          postResourcesQuickSearch={mockPostResourcesQuickModalSearch}
          updateResourcesQuickModalStatus={mockUpdateResourcesQuickModalStatus}
          modalQuickStatus={mockModalQuickStatus}
          responseQuickSearch={mockResponseQuickSearch}
        />
      );
      expect(wrapper.find('option')).toHaveLength(1);
    });
  });
});
