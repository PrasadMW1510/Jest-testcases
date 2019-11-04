import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { ResourcesActivity } from 'containers/ResourcesActivity/ResourcesActivity';

describe('Update the Advanced Dropdown', () => {
  let wrapper = null;
  let mockGetAppBasedResource = null;
  let mockGetITSApps = null;
  let mockAppSelected = null;
  let mockGetResource = null;
  let mockITSInfo = null;
  let mockUpdateAppSelected = null;
  let mockPostResourcesBasedOnId = null;
  let mockResourcePostResponse = null;
  let mockUpdateResourcesSearchModalStatus = null;
  let mockModalSearchStatus = null;
  let mockSessionId = null;

  beforeEach(() => {
    mockGetAppBasedResource = jest.fn();
    mockGetITSApps = jest.fn();
    mockAppSelected = 'DTM_NOW';
    mockGetResource = fromJS({});
    mockITSInfo = fromJS({});
    mockUpdateAppSelected = jest.fn();
    mockPostResourcesBasedOnId = jest.fn();
    mockResourcePostResponse = fromJS({});
    mockUpdateResourcesSearchModalStatus = jest.fn();
    mockModalSearchStatus = false;
    mockSessionId = '8493hfkd93jr0';

    wrapper = shallow(
      <ResourcesActivity
        getAppBasedResource={mockGetAppBasedResource}
        getITSApps={mockGetITSApps}
        appSelected={mockAppSelected}
        resourceInfo={mockGetResource}
        ITSInfo={mockITSInfo}
        updateAppSelected={mockUpdateAppSelected}
        postResourcesBasedOnId={mockPostResourcesBasedOnId}
        resourcesPostResponse={mockResourcePostResponse}
        updateResourcesSearchModalStatus={mockUpdateResourcesSearchModalStatus}
        modalSearchStatus={mockModalSearchStatus}
        sessionId={mockSessionId}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('updateAdvancedDropdown', () => {
    beforeEach(() => {
      mockGetResource = fromJS({
        resource_program_name: ['Do The Math Now!'],
        resource_program_id: ['58'],
        resource_supertypes: [{}],
        skill_categories: [''],
        available_standards: [{}],
      });
      mockITSInfo = fromJS({
        appID: ['R180_A', 'R180_B', 'R180_C'],
      });
      wrapper = shallow(
        <ResourcesActivity
          getAppBasedResource={mockGetAppBasedResource}
          getITSApps={mockGetITSApps}
          appSelected={mockAppSelected}
          resourceInfo={mockGetResource}
          ITSInfo={mockITSInfo}
          updateAppSelected={mockUpdateAppSelected}
          postResourcesBasedOnId={mockPostResourcesBasedOnId}
          resourcesPostResponse={mockResourcePostResponse}
          updateResourcesSearchModalStatus={mockUpdateResourcesSearchModalStatus}
          modalSearchStatus={mockModalSearchStatus}
          sessionId={mockSessionId}
        />
      );
    });

    it('verify the ITS enabled false', () => {
      wrapper.setProps({ appSelected: '' });
      expect(wrapper.state('itsInfo')).toEqual([]);
    });
  });

  describe('componentWillReceiveProps', () => {
    beforeEach(() => {
      mockGetResource = fromJS({
        resource_program_name: ['Do The Math Now!'],
        resource_program_id: ['58'],
        resource_supertypes: [{}],
        skill_categories: [''],
        available_standards: [{}],
      });
      mockITSInfo = fromJS({
        its_tab_text: [
          {
            text: [
              {
                $: { app: 'SMI' },
              },
              {
                $: { app: 'S44' },
              },
              {
                $: { app: 'S44NG_A_flex' },
              },
            ],
          },
        ],
      });
      wrapper = shallow(
        <ResourcesActivity
          getAppBasedResource={mockGetAppBasedResource}
          getITSApps={mockGetITSApps}
          appSelected={mockAppSelected}
          resourceInfo={mockGetResource}
          ITSInfo={mockITSInfo}
          updateAppSelected={mockUpdateAppSelected}
          postResourcesBasedOnId={mockPostResourcesBasedOnId}
          resourcesPostResponse={mockResourcePostResponse}
          updateResourcesSearchModalStatus={mockUpdateResourcesSearchModalStatus}
          modalSearchStatus={mockModalSearchStatus}
          sessionId={mockSessionId}
        />
      );
    });

    it('verify ITS app info if the app id exist', () => {
      wrapper.setProps({ appSelected: 'SMI' });
      expect(wrapper.state('itsInfo')).toEqual([{ $: { app: 'SMI' } }]);
    });

    it('verify ITS app info if the app id S44', () => {
      wrapper.setProps({ appSelected: 'S44' });
      expect(wrapper.state('itsInfo')).toEqual([{ $: { app: 'S44' } }]);
    });

    it('verify ITS app info if the app id S44NG_A_flex', () => {
      wrapper.setProps({ appSelected: 'S44NG_A_flex' });
      expect(wrapper.state('itsInfo')).toEqual([{ $: { app: 'S44NG_A_flex' } }]);
    });

    it('ITS app info not exist', () => {
      wrapper.setProps({ appSelected: 'DTM' });
      expect(wrapper.state('itsInfo')).toEqual([]);
    });
  });
});

describe('verifyITSStatus', () => {
  let wrapper = null;
  let mockGetAppBasedResource = null;
  let mockGetITSApps = null;
  let mockAppSelected = null;
  let mockGetResource = null;
  let mockITSInfo = null;
  let mockUpdateAppSelected = null;
  let mockPostResourcesBasedOnId = null;
  let mockResourcePostResponse = null;
  let mockUpdateResourcesSearchModalStatus = null;
  let mockModalSearchStatus = null;
  let mockSessionId = null;

  beforeEach(() => {
    mockGetResource = fromJS({
      resource_program_name: [],
      resource_program_id: [],
      resource_supertypes: [{}],
      skill_categories: [''],
      available_standards: [{}],
    });
    mockGetAppBasedResource = jest.fn();
    mockGetITSApps = jest.fn();
    mockAppSelected = 'DTM_NOW';
    mockGetResource = fromJS({});
    mockITSInfo = fromJS({});
    mockUpdateAppSelected = jest.fn();
    mockPostResourcesBasedOnId = jest.fn();
    mockResourcePostResponse = fromJS({});
    mockUpdateResourcesSearchModalStatus = jest.fn();
    mockModalSearchStatus = true;
    mockSessionId = '8493hfkd93jr0';

    wrapper = shallow(
      <ResourcesActivity
        getAppBasedResource={mockGetAppBasedResource}
        getITSApps={mockGetITSApps}
        appSelected={mockAppSelected}
        resourceInfo={mockGetResource}
        ITSInfo={mockITSInfo}
        updateAppSelected={mockUpdateAppSelected}
        postResourcesBasedOnId={mockPostResourcesBasedOnId}
        resourcesPostResponse={mockResourcePostResponse}
        updateResourcesSearchModalStatus={mockUpdateResourcesSearchModalStatus}
        modalSearchStatus={mockModalSearchStatus}
        sessionId={mockSessionId}
      />
    );
  });

  it('verify the ITS enabled false', () => {
    wrapper.setState({ isITSEnabled: false });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify nothing happens with same appSelected', () => {
    wrapper.setProps({ appSelected: 'DTM_NOW' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
