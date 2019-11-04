import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ManageSmaContainer } from '../ManageSmaContainer';

describe('<ManageSmaContainer />', () => {
  let wrapper = null;
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
  ];

  const mockGetMediaServersRequest = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ManageSmaContainer
        getMediaServersRequest={mockGetMediaServersRequest}
        mediaServers={mockMediaServers}
      />
    );
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
