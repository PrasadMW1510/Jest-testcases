import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TabQuizScoreRecordingTool from '../TabQuizScoreRecordingTool';

describe('<TabQuizScoreRecordingTool />', () => {
  let wrapper = null;
  const profileInfo = { last_name: 'h', first_name: 'd' };
  const quizSearchData = [];
  const scoreData = [];
  const paginationData = {};
  const itemCount = '-1';
  it('Expect to render correctly', () => {
    wrapper = shallow(
      <TabQuizScoreRecordingTool
        enrollmentCount={2}
        profileInfo={profileInfo}
        scoreData={scoreData}
        quizSearchData={quizSearchData}
        paginationData={paginationData}
        itemCount={itemCount}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
