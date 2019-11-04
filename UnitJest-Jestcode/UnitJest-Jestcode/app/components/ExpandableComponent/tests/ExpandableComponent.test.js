/**
 * Created by nairs on 2/21/18.
 */
import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import ExpandableComponent from '../ExpandableComponent';

describe('<ExpandableComponent with datapoint/>', () => {
  let wrapper = null;
  let mockItems = null;
  beforeEach(() => {
    mockItems = [
      {
        name: ['MATH 180 Course I'],
        datapoint: fromJS([
          {
            label: ['Current Series/Topic'],
            value: ['N/A'],
          },
        ]),
      },
    ];
    // ]);
    wrapper = shallow(<ExpandableComponent items={mockItems} />);
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
