import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ManageSma from '../ManageSma';

describe('<ManageSma />', () => {
  const mockMediaServers = [
    {
      name: ['MMA tests'],
      capabilities: [
        {
          capability: [
            {
              url: ['S3CDN-B8AEED7F1944-107-DaytonStDCNJ.media.education.scholastic.com'],
            },
          ],
        },
      ],
    },
    {
      name: ['1234567890123456789'],
      capabilities: [
        {
          capability: [
            {
              url: ['test.media.education.scholastic.com'],
            },
          ],
        },
      ],
    },
  ];

  it('should load the media servers', () => {
    const localWrapper = shallow(<ManageSma mediaServers={mockMediaServers} />);
    expect(shallowToJson(localWrapper)).toMatchSnapshot();
  });
});
