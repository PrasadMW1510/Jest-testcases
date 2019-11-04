import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ReportEntry from '../index';

describe('<ReportEntry />', () => {
  let wrapper = null;
  const report = {
    name: 'Test Name',
    category: 'Test Category',
    type_id: 'TestID',
    last_generated: '2018/02/05',
  };
  const reportKey = 'FAD_05';
  const chooseReport = jest.fn();
  const index = 0;

  beforeEach(() => {
    wrapper = shallow(
      <ReportEntry
        report={report}
        index={index}
        reportKey={reportKey}
        chooseReport={chooseReport}
      />
    );
  });

  it('Expect to render the report as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to call click handler', () => {
    wrapper
      .find('input')
      .first()
      .simulate('click', { target: { id: 'Report1_0', value: 'FAD_05' } });
    expect(chooseReport.mock.calls.length).toBe(1);
  });
});
