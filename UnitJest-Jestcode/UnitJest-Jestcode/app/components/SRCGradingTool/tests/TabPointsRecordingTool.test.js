import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TabPointsRecordingTool from '../TabPointsRecordingTool';

describe('<TabPointsRecordingTool />', () => {
  let wrapper = null;
  const profileInfo = { last_name: 'h', first_name: 'd' };
  const pointsData = { earnedToDate: 0, usedToDate: 0, available: 0 };
  it('Expect to render correctly', () => {
    wrapper = shallow(
      <TabPointsRecordingTool
        enrollmentCount={2}
        profileInfo={profileInfo}
        pointsData={pointsData}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
