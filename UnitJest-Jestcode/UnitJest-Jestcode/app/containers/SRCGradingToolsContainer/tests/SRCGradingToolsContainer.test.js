import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { shallowToJson } from 'enzyme-to-json';

import { SRCGradingToolsContainer } from '../index';

describe('<SRCGradingToolsContainer />', () => {
  let wrapper = null;
  const mockSrcGradingToolsRequest = jest.fn();
  const profilePage = fromJS({ profile: { first_name: 'John', last_name: 'Smith' } });
  const selectedCohort = { cohortType: 'Student' };
  it('Expect to render correctly', () => {
    wrapper = shallow(
      <SRCGradingToolsContainer
        enrollmentCount={2}
        profilePage={profilePage}
        SRCGradingToolsRequest={mockSrcGradingToolsRequest}
        selectedCohort={selectedCohort}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
