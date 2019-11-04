import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ReportProductList } from '../ReportProductList';

describe('<ReportProductList />', () => {
  let reports = null;
  let wrapper = null;
  let chooseReport = null;
  let filter = null;
  let productName = null;
  let productReportKey = null;
  beforeEach(() => {
    chooseReport = jest.fn();
    productName = 'System 44';
    filter = '';
    productReportKey = 'S44';
    reports = [
      {
        category_name: ['Category B'],
        cohort_id: ['abcd'],
        cohort_type: ['school'],
        description: ['example report data 2'],
        last_generated: ['2017/12/08'],
        name: ['Example Report C'],
        relationship: ['Optimal'],
        report_cohort_type: ['Group'],
        report_id: ['def'],
        type_id: ['S44_05'],
        app_id: ['S44'],
        date_ranges: [['CurrSchoolYear', 'LastMonth', 'Custom']],
      },
      {
        category_name: ['Category C'],
        cohort_id: ['abc'],
        cohort_type: ['school'],
        description: ['example report data 3'],
        last_generated: ['2018/01/18'],
        name: ['Example Report D'],
        relationship: ['Optimal'],
        report_cohort_type: ['Student'],
        report_id: ['def'],
        type_id: ['S44_06'],
        app_id: ['S44'],
        date_ranges: [['CurrSchoolYear', 'Custom']],
      },
      {
        category_name: ['Category C'],
        cohort_id: ['abc'],
        cohort_type: ['school'],
        description: ['example report data 0'],
        last_generated: ['2018/01/18'],
        name: ['Example Report C'],
        relationship: ['Optimal'],
        report_cohort_type: ['Aggregate'],
        report_id: ['def'],
        type_id: ['S44_07'],
        app_id: ['S44'],
        date_ranges: [['CurrSchoolYear', 'Custom']],
      },
      {
        category_name: ['Category C'],
        cohort_id: ['abc'],
        cohort_type: ['school'],
        description: ['example report data 0'],
        last_generated: ['2018/01/18'],
        name: ['Example Report C'],
        relationship: ['Optimal'],
        report_cohort_type: ['Student'],
        report_id: ['def'],
        type_id: ['S44_08'],
        app_id: ['S44'],
        date_ranges: [['CurrSchoolYear', 'Custom']],
      },
    ];
    wrapper = mount(
      <ReportProductList
        chooseReport={chooseReport}
        reports={reports}
        productName={productName}
        reportKey={productReportKey}
        filter={filter}
      />
    );
  });
  it('Expect to render as expected', () => {
    filter = '';
    wrapper = shallow(
      <ReportProductList
        chooseReport={chooseReport}
        reports={reports}
        productName={productName}
        reportKey={productReportKey}
        filter={filter}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should filter reports by type: Aggregate', () => {
    filter = 'Aggregate';
    wrapper = shallow(
      <ReportProductList
        chooseReport={chooseReport}
        reports={reports}
        productName={productName}
        reportKey={productReportKey}
        filter={filter}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should filter reports by type: Group', () => {
    filter = 'Group';
    wrapper = shallow(
      <ReportProductList
        chooseReport={chooseReport}
        reports={reports}
        productName={productName}
        reportKey={productReportKey}
        filter={filter}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should filter reports by type: Student', () => {
    filter = 'Student';
    wrapper = shallow(
      <ReportProductList
        chooseReport={chooseReport}
        reports={reports}
        productName={productName}
        reportKey={productReportKey}
        filter={filter}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should toggle visibility', () => {
    wrapper
      .find('.report-list-product-title')
      .first()
      .simulate('click', { target: { attributes: { rel: { value: productReportKey } } } });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('.report-list-product-title')
      .first()
      .simulate('click', { target: { attributes: { rel: { value: productReportKey } } } });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
