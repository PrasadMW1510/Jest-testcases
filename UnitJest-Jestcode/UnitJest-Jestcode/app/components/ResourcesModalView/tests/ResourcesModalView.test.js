import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ResourcesModalView from '../index';

describe('<ResourcesModalView />', () => {
  let wrapper = null;
  let mockItem = null;
  let mockUpdateResourcesModalStatus = null;
  let mockModalStatus = null;
  let mockSortUpdater = null;

  beforeEach(() => {
    mockItem = fromJS({});
    mockUpdateResourcesModalStatus = jest.fn();
    mockModalStatus = true;
    mockSortUpdater = jest.fn();

    wrapper = shallow(
      <ResourcesModalView
        item={mockItem}
        updateResourcesModalStatus={mockUpdateResourcesModalStatus}
        modalStatus={mockModalStatus}
        sortUpdater={mockSortUpdater}
      />
    );
  });

  it('expect to render itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify handle close button', () => {
    wrapper.instance().handleClose();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('verify <ResourcesModalView /> with data', () => {
    const event = { preventDefault: jest.fn() };
    beforeEach(() => {
      mockItem = fromJS({
        resource_search_results: {
          item: ['2'],
          pagination_data: [
            {
              paginate: ['true'],
              page_count: ['1'],
              current_page: ['0'],
              items_per_page: ['100'],
            },
          ],
          resource: [
            {
              resource_id: ['16641'],
              resource_name: ['Conference Records'],
              resource_url: [''],
              resource_type: ['Classroom Management/Teacher Resources'],
              resource_programs: [
                {
                  program: [
                    {
                      program_id: ['49'],
                      program_name: ['SMI'],
                    },
                  ],
                },
              ],
              resource_grades: [
                {
                  grade: ['1', '2'],
                },
              ],
              reosurce_levels: [''],
              resource_desc: ['Use this resources'],
            },
            {
              resource_id: ['12578'],
              resource_name: ['Do the Math'],
              resource_url: [''],
              resource_type: ['Practice'],
              resource_programs: [
                {
                  program: [
                    {
                      program_id: ['51'],
                      program_name: ['Read 180'],
                    },
                  ],
                },
              ],
              resource_grades: [
                {
                  grade: ['1', '2'],
                },
              ],
              reosurce_levels: [''],
              resource_desc: ['Use this passage'],
            },
          ],
        },
      });
      wrapper.setProps({ item: mockItem });
    });

    it('verify handle close button', () => {
      wrapper.instance().handleClose();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify sort search updater', () => {
      const sortTerm = { term: 'resourceName', order: 'asc' };
      wrapper.setState({ sortTerm });
      wrapper.instance().sortSearch('resourceName', event);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify sort search updater when its desc', () => {
      const sortTerm = { term: 'resourceName', order: 'desc' };
      wrapper.setState({ sortTerm });
      wrapper.instance().sortSearch('resourceName', event);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify sort search updater different term', () => {
      const sortTerm = { term: 'resourceName', order: 'asc' };
      wrapper.setState({ sortTerm });
      wrapper.instance().sortSearch('resourceType', event);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('click event for resourceName', () => {
      const sortSearch = jest.fn();
      const sortTerm = { term: 'resourceName' };
      wrapper.setState({ sortTerm });
      wrapper
        .find('.resources-modal__button--active.resources-modal--resource-name')
        .simulate('click', { preventDefault() {} });
      expect(sortSearch).toMatchSnapshot();
    });

    it('click event for resourceType', () => {
      const sortSearch = jest.fn();
      const sortTerm = { term: 'resourceType' };
      wrapper.setState({ sortTerm });
      wrapper.find('.resources-modal__button--active').simulate('click', { preventDefault() {} });
      expect(sortSearch).toMatchSnapshot();
    });

    it('click event for resourceProgram', () => {
      const sortSearch = jest.fn();
      const sortTerm = { term: 'resourceProgram' };
      wrapper.setState({ sortTerm });
      wrapper.find('.resources-modal__button--active').simulate('click', { preventDefault() {} });
      expect(sortSearch).toMatchSnapshot();
    });
  });
});
