import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as Constants from '../constants';

import SRCGradingTool from '../index';

describe('<SRCGradingTool />', () => {
  let wrapper = null;
  const profileInfo = {};
  const scoreData = [];
  const quizSearchData = [];
  const paginationData = {};
  const itemCount = -1;
  const isLoading = false;
  it('Expect to render correctly', () => {
    wrapper = shallow(
      <SRCGradingTool
        enrollmentCount={2}
        profileInfo={profileInfo}
        scoreData={scoreData}
        quizSearchData={quizSearchData}
        paginationData={paginationData}
        itemCount={itemCount}
        isLoading={isLoading}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handle tab click', () => {
    wrapper = shallow(
      <SRCGradingTool
        enrollmentCount={2}
        profileInfo={profileInfo}
        scoreData={scoreData}
        quizSearchData={quizSearchData}
        paginationData={paginationData}
        itemCount={itemCount}
        isLoading={isLoading}
      />
    );
    wrapper.setState({ activeTab: Constants.TAB_POINTS_RECORDING_TOOL });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
