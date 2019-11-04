import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ResourcesBrowseTab from '../index';

describe('<ResourcesBrowseTab />', () => {
  let wrapper = null;
  let mockBrowseList = null;
  let mockPostResourcesBasedOnId = null;
  let mockResourcesPostResponse = null;
  let mockUpdateResourcesSearchModal = null;
  let mockModalSearchStatus = null;
  let mockAppSelected = null;

  beforeEach(() => {
    mockBrowseList = fromJS({
      resource_types: [
        {
          resource_type: [
            {
              type_id: ['8493'],
              type_name: ['type1'],
              type_description: ['test name'],
              resource_subtypes: [''],
            },
            {
              type_id: ['4739287'],
              type_name: ['type2'],
              type_description: ['test name'],
              resource_subtypes: [
                {
                  resource_subtype: [
                    {
                      resource_subtype_id: ['8403930'],
                      resource_subtype_name: ['subtype1'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    mockPostResourcesBasedOnId = jest.fn();
    mockResourcesPostResponse = fromJS({});
    mockUpdateResourcesSearchModal = jest.fn();
    mockModalSearchStatus = false;
    mockAppSelected = 'SMI';
    wrapper = shallow(
      <ResourcesBrowseTab
        browseList={mockBrowseList}
        postResourcesBasedOnId={mockPostResourcesBasedOnId}
        resourcesPostResponse={mockResourcesPostResponse}
        updateResourcesSearchModalStatus={mockUpdateResourcesSearchModal}
        modalSearchStatus={mockModalSearchStatus}
        appSelected={mockAppSelected}
      />
    );
  });

  it('verify if it renders', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify the type_id click', () => {
    const itemSelect = jest.fn();
    expect(
      wrapper
        .find('button.resources-browse__items')
        .at(0)
        .simulate('click', { preventDefault() {} })
    );
    expect(itemSelect).toMatchSnapshot();

    expect(
      wrapper
        .find('button.resources-browse__items')
        .at(2)
        .simulate('click', { preventDefault() {} })
    );
    expect(itemSelect).toMatchSnapshot();
  });

  it('verify function sorting post call', () => {
    const sortTerm = {
      term: 'resouresType',
      order: 'asc',
    };
    wrapper.instance().sortingPostCall(sortTerm);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify with the modalSearchStatus has a true value', () => {
    wrapper.setProps({ modalSearchStatus: true });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
