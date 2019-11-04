import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as AppConstants from 'containers/App/constants';
import ReportDateRangeOptions from '../index';

describe('<ReportDateRangeOptions />', () => {
  let wrapper = null;
  let dateRanges = null;
  let chooseDate = null;
  let cohortType = null;
  beforeEach(() => {
    dateRanges = [
      'CurrSchoolYear',
      'CurrGradingPeriod',
      'GradingPeriod1',
      'GradingPeriod2',
      'GradingPeriod3',
      'GradingPeriod4',
      'GradingPeriod5',
      'GradingPeriod6',
      'Custom',
    ];
    chooseDate = jest.fn();
    cohortType = AppConstants.COHORT_TYPE.School;
    wrapper = shallow(
      <ReportDateRangeOptions
        dateRanges={dateRanges}
        chooseDate={chooseDate}
        cohortType={cohortType}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly with no date range options', () => {
    dateRanges = undefined;
    wrapper.setProps({ dateRanges });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly with district cohort type', () => {
    cohortType = AppConstants.COHORT_TYPE.District;
    wrapper.setProps({ cohortType });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to handle (non-custom) radio button clicks', () => {
    wrapper
      .find('.report-date-range-radio')
      .first()
      .simulate('click', { target: { className: 'report-date-range-radio', value: 'Today' } });
    expect(chooseDate.mock.calls.length).toBe(1);
  });
});
