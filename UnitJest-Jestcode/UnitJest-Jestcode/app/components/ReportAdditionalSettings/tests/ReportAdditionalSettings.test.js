import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ReportAdditionalSettings from '../index';

describe('<ReportAdditionalSettings />', () => {
  let wrapper = null;
  let optionName = null;
  let optionValues = null;
  let optionLabels = null;
  let optionDefault = null;
  let optionChoose = null;

  beforeEach(() => {
    optionName = 'Test Option';
    optionValues = ['Value0', 'Value1'];
    optionLabels = ['Label0', 'Label1'];
    optionDefault = 'Value0';
    optionChoose = jest.fn();
    wrapper = shallow(
      <ReportAdditionalSettings
        optionName={optionName}
        optionValues={optionValues}
        optionLabels={optionLabels}
        optionDefault={optionDefault}
        optionChoose={optionChoose}
      />
    );
  });
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly with no options', () => {
    optionName = undefined;
    optionValues = [];
    wrapper.setProps({ optionName });
    wrapper.setProps({ optionValues });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handle clicks', () => {
    wrapper
      .find('select')
      .first()
      .simulate('change', { target: { value: 'Value0' } });
    expect(optionChoose.mock.calls.length).toBe(1);
  });
});
