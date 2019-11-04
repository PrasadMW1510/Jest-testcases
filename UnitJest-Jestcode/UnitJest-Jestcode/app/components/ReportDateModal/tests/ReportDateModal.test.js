import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ReportDateModal from '../index';

describe('<ReportDateModal />', () => {
  let wrapper = null;
  let isOpen = null;
  let chooseDate = null;
  let runReport = null;
  let closeModal = null;
  beforeEach(() => {
    chooseDate = jest.fn();
    runReport = jest.fn();
    closeModal = jest.fn();
    isOpen = true;
    wrapper = shallow(
      <ReportDateModal
        isOpen={isOpen}
        chooseDate={chooseDate}
        runReport={runReport}
        closeModal={closeModal}
      />
    );
  });
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handle start date change', () => {
    wrapper.find('#ReportDateCustomStart').simulate('change');
    expect(chooseDate.mock.calls.length).toBe(1);
  });
  it('Expect to handle end date change', () => {
    wrapper.find('#ReportDateCustomEnd').simulate('change');
    expect(chooseDate.mock.calls.length).toBe(1);
  });
  it('Expect to handle run report click', () => {
    wrapper.find('#RunReportModal').simulate('click');
    expect(runReport.mock.calls.length).toBe(1);
  });

  it('Expect to handle cancel click', () => {
    wrapper.find('#CancelReportButton').simulate('click');
    expect(closeModal.mock.calls.length).toBe(1);
  });
});
