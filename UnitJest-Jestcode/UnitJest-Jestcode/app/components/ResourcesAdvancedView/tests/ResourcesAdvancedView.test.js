import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ResourcesAdvancedView from '../index';

describe('<ResourcesAdvancedView />', () => {
  let wrapper = null;
  let event = null;
  let mockAdvancedResource = null;
  let mockAdvancedSkill = null;
  let mockPostResourcesBasedOnId = null;
  let mockAppSelected = null;
  let mockResourcesPostResponse = null;
  let mockUpdateResourcesSearchModalStatus = null;
  let mockModalSearchStatus = null;

  beforeEach(() => {
    event = {
      preventDefault: jest.fn(),
      target: { value: '23234' },
    };
    mockAdvancedResource = [];
    mockAdvancedSkill = fromJS({});
    mockPostResourcesBasedOnId = jest.fn();
    mockAppSelected = 'DTM';
    mockResourcesPostResponse = fromJS({});
    mockUpdateResourcesSearchModalStatus = jest.fn();
    mockModalSearchStatus = false;

    wrapper = shallow(
      <ResourcesAdvancedView
        advancedResource={mockAdvancedResource}
        advancedSkill={mockAdvancedSkill}
        postResourcesBasedOnId={mockPostResourcesBasedOnId}
        appSelected={mockAppSelected}
        resourcesPostResponse={mockResourcesPostResponse}
        updateResourcesSearchModalStatus={mockUpdateResourcesSearchModalStatus}
        modalSearchStatus={mockModalSearchStatus}
      />
    );
  });

  it('Expect to render itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('option')).toHaveLength(1);
  });

  it('verify close modal instance', () => {
    wrapper.instance().noValueModalClose();
    expect(wrapper.state('isNoValueSelected')).toBeFalsy();
  });

  it('Expect to render when an array is send', () => {
    mockAdvancedResource = [
      {
        supertype_id: ['TOP0200'],
        supertype_name: ['For individual students'],
      },
      {
        type_id: ['TOP0300'],
        type_name: ['Group students'],
      },
      {
        resource_subtypes: [
          {
            resource_subtype: [
              {
                resource_subtype_id: ['TOP0300'],
                resource_subtype_name: ['Good students'],
              },
            ],
          },
        ],
      },
      {
        resource_subtypes: [''],
      },
      {
        resource_id: ['TOP0300'],
        resource_name: ['Good1 students'],
      },
    ];
    wrapper.setProps({ advancedResource: mockAdvancedResource });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('resourcesStrandDropDown with data', () => {
    mockAdvancedSkill = fromJS({
      skill_categories: [
        {
          skill_category: [
            {
              category_id: ['23234'],
              category_name: ['Test Name'],
              skills: [
                {
                  skill_id: ['5434'],
                  skill_name: ['testName'],
                },
              ],
            },
          ],
        },
      ],
    });
    wrapper.setProps({ advancedSkill: mockAdvancedSkill });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify onChange with no data', () => {
    mockAdvancedSkill = fromJS({
      skill_categories: [
        {
          skill_category: [
            {
              category_id: ['23234'],
            },
          ],
        },
      ],
    });
    wrapper.setProps({ advancedSkill: mockAdvancedSkill });
    event.target.value = '2';
    wrapper.instance().handleStrand(event);
    expect(wrapper.state('strandSelected')).toEqual(null);
  });

  it('verify for skill value with stateSelected has a value', () => {
    const mockStrandSelected = fromJS({
      skills: [
        {
          skill: [
            {
              skill_id: ['8989'],
              skill_name: ['testName'],
            },
          ],
        },
      ],
    });
    wrapper.setState({ strandSelected: mockStrandSelected });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify onChange on dropdown', () => {
    mockAdvancedSkill = fromJS({
      skill_categories: [
        {
          skill_category: [
            {
              category_id: ['23234'],
              category_name: ['Test Name'],
              skills: [
                {
                  skill: [
                    {
                      skill_id: ['8989'],
                      skill_name: ['testName'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    wrapper.setProps({ advancedSkill: mockAdvancedSkill });
    event.target.value = 'Test Name';
    wrapper.instance().handleStrand(event);
    expect(wrapper.state('strandSelected')).toEqual(
      mockAdvancedSkill.getIn(['skill_categories', 0, 'skill_category', 0])
    );
  });

  describe('verify based on data', () => {
    let mockStrandSelected = null;
    beforeEach(() => {
      mockAdvancedSkill = fromJS({
        skill_categories: [
          {
            skill_category: [
              {
                category_id: ['23234'],
                category_name: ['Test Name'],
                skills: [
                  {
                    skill: [
                      {
                        skill_id: ['8989'],
                        skill_name: ['testName'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      mockStrandSelected = fromJS({
        skills: [
          {
            skill: [
              {
                skill_id: ['8989'],
                skill_name: ['testName'],
              },
            ],
          },
        ],
      });
      mockAdvancedResource = [
        {
          supertype_id: ['TOP0200'],
          supertype_name: ['For individual students'],
        },
        {
          type_id: ['TOP0300'],
          type_name: ['Group students'],
        },
        {
          resource_subtype_id: ['TOP0400'],
          resource_subtype_name: ['Good students'],
        },
        {
          resource_id: ['TOP0400'],
          resource_name: ['Good1 students'],
        },
      ];
      wrapper.setProps({
        advancedSkill: mockAdvancedSkill,
        advancedResource: mockAdvancedResource,
      });
      wrapper.setState({ strandSelected: mockStrandSelected });
    });
    it('verify default for strand', () => {
      event.target.value = 'select_a_strand';
      wrapper.instance().handleStrand(event);
      const currentState = wrapper.state('advancedPostData');
      expect(currentState.skill_category).toEqual(null);
    });

    it('verify default for skill', () => {
      event.target.value = 'select_a_skill';
      wrapper.instance().handleSkill(event);
      const currentState = wrapper.state('advancedPostData');
      expect(currentState.skill).toEqual(null);
    });

    it('verify skill select with a value', () => {
      event.target.value = 'testName';
      wrapper.instance().handleSkill(event);
      const currentState = wrapper.state('advancedPostData');
      expect(currentState.skill).toEqual(
        mockStrandSelected.getIn(['skills', 0, 'skill', 0, 'skill_name', 0])
      );
    });

    it('verify default for resource', () => {
      event.target.value = 'select_a_type';
      wrapper.instance().handleAdvanced(event);
      const currentState = wrapper.state('advancedPostData');
      expect(currentState.resource_type).toEqual(null);
    });

    it('verify resource to be selected with a value', () => {
      event.target.value = 'TOP0300';
      wrapper.instance().handleAdvanced(event);
      const currentState = wrapper.state('advancedPostData');
      expect(currentState.resource_type).toEqual('TOP0300');
    });

    it('app id changes gives a new value', () => {
      wrapper.setProps({ appSelected: 'SMI' });
      const currentState = wrapper.state('advancedPostData');
      expect(currentState.resource_type).toEqual(null);
    });

    it('click on the go button', () => {
      const handleClick = jest.fn();
      expect(
        wrapper.find('button.resources-advanced__button').simulate('click', { preventDefault() {} })
      );
      expect(handleClick).toMatchSnapshot();
    });

    it('resource_type skill_category skill', () => {
      const test = jest.spyOn(wrapper.instance(), 'handleClick');
      const advancedPostData = {
        resource_type: '4849',
        skill_category: '74847',
        skill: '74937',
      };
      wrapper.setState({ advancedPostData });
      wrapper.find('button.resources-advanced__button').simulate('click', { preventDefault() {} });
      expect(test).toHaveBeenCalled();
    });

    it('resource_type skill_category skill', () => {
      const test = jest.spyOn(wrapper.instance(), 'handleClick');
      const advancedPostData = {};
      wrapper.setState({ advancedPostData });
      wrapper.find('button.resources-advanced__button').simulate('click', { preventDefault() {} });
      expect(test).toHaveBeenCalled();
    });

    it('verify the sortTerm update', () => {
      const sortTerm = {
        term: 'resourceName',
        order: 'desc',
      };
      wrapper.instance().sortingPostCall(sortTerm);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify when the modalSearchStatus is set to true', () => {
      wrapper.setProps({ modalSearchStatus: true });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
