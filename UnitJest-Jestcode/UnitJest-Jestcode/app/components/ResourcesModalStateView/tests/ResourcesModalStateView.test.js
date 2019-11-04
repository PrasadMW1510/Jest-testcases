import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ResourcesModalStateView from '../index';

describe('<ResourcesModalStateView />', () => {
  let wrapper = null;
  let mockItem = null;
  let mockUpdateResourcesModalStatus = null;
  let mockModalStatus = null;
  let mockItemGradeState = null;
  let mockResourceName = null;

  beforeEach(() => {
    mockItem = fromJS({});
    mockUpdateResourcesModalStatus = jest.fn();
    mockModalStatus = true;
    mockItemGradeState = { state: 'MA', grade: '2' };
    mockResourceName = 'Do The Math!';

    wrapper = shallow(
      <ResourcesModalStateView
        item={mockItem}
        updateResourcesModalStatus={mockUpdateResourcesModalStatus}
        modalStatus={mockModalStatus}
        itemGradeState={mockItemGradeState}
        resourceName={mockResourceName}
      />
    );
  });

  it('expect to render itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('close the tab with cancel button in clicked', () => {
    wrapper.instance().handleCancel();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify with item has no value', () => {
    mockItem = fromJS({
      standard_list: '',
    });
    wrapper.setProps({ item: mockItem });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify when the standards list is sending a data', () => {
    mockItem = fromJS({
      standard_list: {
        standard: [
          {
            standard_id: ['9483903'],
            standard_name: ['standard name'],
            standard_grades: [
              {
                grade: ['1', '2'],
              },
            ],
          },
        ],
      },
    });
    wrapper.setProps({ item: mockItem });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
