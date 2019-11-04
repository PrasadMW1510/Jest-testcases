import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import resourcesStandardPostSchema from '../resourcesStandardPostSchema.json';

import ResourcesStandardsView from '../index';

describe('<ResourcesStandardsView />', () => {
  let wrapper = null;
  let event = null;
  let mockStandard = null;
  let mockAppSelected = null;
  let mockPostResourcesBasedOnId = null;
  let mockResourcesPostResponse = null;
  let mockUpdateResourcesSearchModalStatus = null;
  let mockModalSearchStatus = null;
  let mockResourceName = null;

  beforeEach(() => {
    mockPostResourcesBasedOnId = jest.fn();
    event = {
      preventDefault: jest.fn(),
      target: {
        value: null,
      },
    };
    mockStandard = fromJS({
      available_standards: [
        {
          locales: [
            {
              locale: ['MA', 'NY'],
            },
          ],
          grades: [
            {
              grade: ['1', '2'],
            },
          ],
        },
      ],
    });
    mockAppSelected = 'SMI';
    mockResourcesPostResponse = fromJS({});
    mockUpdateResourcesSearchModalStatus = jest.fn();
    mockModalSearchStatus = false;
    mockResourceName = 'Do The Math!';

    wrapper = shallow(
      <ResourcesStandardsView
        standard={mockStandard}
        postResourcesBasedOnId={mockPostResourcesBasedOnId}
        appSelected={mockAppSelected}
        resourcesPostResponse={mockResourcesPostResponse}
        updateResourcesSearchModalStatus={mockUpdateResourcesSearchModalStatus}
        modalSearchStatus={mockModalSearchStatus}
        resourceName={mockResourceName}
      />
    );
  });

  it('Expect to render itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Verify when stateHandleChange has a value', () => {
    event.target.value = 'MA';
    resourcesStandardPostSchema.state = 'MA';
    wrapper.instance().stateHandleChange(event);
    expect(wrapper.state('postData')).toEqual(resourcesStandardPostSchema);
  });

  it('Verify when stateHandleChange be null', () => {
    event.target.value = 'locale';
    resourcesStandardPostSchema.state = null;
    wrapper.instance().stateHandleChange(event);
    expect(wrapper.state('postData')).toEqual(resourcesStandardPostSchema);
  });

  it('Verify when gradeHandleChange has a value', () => {
    event.target.value = '1';
    resourcesStandardPostSchema.grade = '1';
    wrapper.instance().gradeHandleChange(event);
    expect(wrapper.state('postData')).toEqual(resourcesStandardPostSchema);
  });

  it('Verify when gradeHandleChange be null', () => {
    event.target.value = 'grade';
    resourcesStandardPostSchema.grade = null;
    wrapper.instance().gradeHandleChange(event);
    expect(wrapper.state('postData')).toEqual(resourcesStandardPostSchema);
  });

  it('handle click event', () => {
    wrapper.setState({
      postData: {
        grade: 1,
        state: 'MA',
      },
    });
    wrapper.instance().handleClick(event);
    expect(mockPostResourcesBasedOnId).toMatchSnapshot();
  });

  it('verify component will receive props', () => {
    mockAppSelected = 'r180ng_A';
    wrapper.setProps({ appSelected: mockAppSelected });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify component will receive props didnt udpate', () => {
    wrapper.setProps({ appSelected: 'SMI' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handle click null element', () => {
    wrapper.setState({
      postData: {
        test: '',
      },
    });
    wrapper.instance().handleClick(event);
    expect(mockPostResourcesBasedOnId).toMatchSnapshot();
  });

  it('when modal status state is true', () => {
    wrapper.setProps({ modalSearchStatus: true });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('veirfy for available standard not matching', () => {
    mockStandard = fromJS({
      available_standards: [],
    });
    wrapper.setProps({ standard: mockStandard });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify with the appSelected in FASTT Math', () => {
    mockAppSelected = 'FM';
    wrapper.setProps({ appSelected: mockAppSelected });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
