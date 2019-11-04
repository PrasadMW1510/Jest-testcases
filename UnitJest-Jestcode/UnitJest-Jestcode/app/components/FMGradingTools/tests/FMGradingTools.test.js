import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import FMGradingTools from '../index';

describe('FMGradingTools', () => {
  const mockFMGeneratePdfReport = jest.fn();
  const wrapper = shallow(
    <FMGradingTools
      studentOperations={[]}
      columns={[]}
      FMGeneratePdfReport={mockFMGeneratePdfReport}
      selectedCohort={{ cohortType: 'Teacher' }}
    />
  );

  it('should match the snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should change the state correctly when the current checkbox is clicked', () => {
    const currentCheckBox = wrapper.find({ id: 'current' });
    currentCheckBox.simulate('change');
    expect(wrapper.state().current).toEqual(false);
  });

  it('should change the state correctly when the addition checkbox is clicked', () => {
    const additionCheckBox = wrapper.find({ id: 'addition' });
    additionCheckBox.simulate('change');
    expect(wrapper.state().addition).toEqual(true);
  });

  it('should change the state correctly when the subtraction checkbox is clicked', () => {
    const subtractionCheckBox = wrapper.find({ id: 'subtraction' });
    subtractionCheckBox.simulate('change');
    expect(wrapper.state().subtraction).toEqual(true);
  });

  it('should change the state correctly when the multiplication checkbox is clicked', () => {
    const multiplicationCheckBox = wrapper.find({ id: 'multiplication' });
    multiplicationCheckBox.simulate('change');
    expect(wrapper.state().multiplication).toEqual(true);
  });

  it('should change the state correctly when the division checkbox is clicked', () => {
    const divisionCheckBox = wrapper.find({ id: 'division' });
    divisionCheckBox.simulate('change');
    expect(wrapper.state().division).toEqual(true);
  });

  it('should change the state correctly when the answerKey checkbox is clicked', () => {
    const answerKeyCheckBox = wrapper.find({ id: 'answerKey' });
    answerKeyCheckBox.simulate('change');
    expect(wrapper.state().answerKey).toEqual(true);
  });

  it('should change the state correctly when the remainder checkbox is clicked', () => {
    const remainderCheckBox = wrapper.find({ id: 'remainder' });
    remainderCheckBox.simulate('change');
    expect(wrapper.state().remainder).toEqual(true);
  });

  describe('selectProblemType dropdown', () => {
    it('should change the problem type to the selected value', () => {
      wrapper.instance().selectProblemType({ target: { value: '2digit' } });
      expect(wrapper.state().problemType).toEqual('2digit');
    });

    it('should change the problem type to the selected value', () => {
      wrapper.instance().selectProblemType({ target: { value: '1digit' } });
      expect(wrapper.state().problemType).toEqual('1digit');
    });
  });

  describe('selectOrientation dropdown', () => {
    it('should change the orientation to the selected value', () => {
      wrapper.instance().selectOrientation({ target: { value: 'vertical' } });
      expect(wrapper.state().orientation).toEqual('vertical');
    });
  });

  describe('componentDidUpdate', () => {
    it('should reset the state of the form to the initial state when cohort changes', () => {
      wrapper.setProps({ current: false });
      wrapper.setProps({ selectedCohort: 'student' });
      expect(wrapper.state().current).toEqual(true);
    });
  });

  describe('handleGeneratePdfReport', () => {
    it('generate the PDF report', () => {
      wrapper.instance().handleGeneratePDFReport();
      expect(mockFMGeneratePdfReport).toHaveBeenCalled();
    });
  });
});
