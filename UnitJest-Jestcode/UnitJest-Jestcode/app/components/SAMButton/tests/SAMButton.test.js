import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SAMButton from '../index';

describe('<SAMButton />', () => {
  let wrapper = null;
  let mockOnClickHandler = null;
  let onClickAction = null;

  beforeEach(() => {
    mockOnClickHandler = jest.fn();
    onClickAction = { preventDefault: jest.fn() };
  });

  it('expect the default to render', () => {
    wrapper = shallow(<SAMButton onClickHandler={mockOnClickHandler}>test button</SAMButton>);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('expect primary button to render', () => {
    wrapper = shallow(
      <SAMButton isPrimaryButton buttonType="submit" onClickHandler={mockOnClickHandler}>
        test button
      </SAMButton>
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('expect style to include a class modifier', () => {
    wrapper = shallow(
      <SAMButton buttonClassModifier="mockButtonClassModifier" onClickHandler={mockOnClickHandler}>
        test button
      </SAMButton>
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleOnClick', () => {
    wrapper = shallow(<SAMButton onClickHandler={mockOnClickHandler}>test button</SAMButton>);

    wrapper.find('button').simulate('click', onClickAction);
    expect(mockOnClickHandler).toHaveBeenCalled();
  });

  it('onClickHandler is not passed as props', () => {
    wrapper = shallow(<SAMButton buttonType="submit">test button</SAMButton>);

    wrapper.find('button').simulate('click', onClickAction);
    expect(onClickAction.preventDefault).not.toHaveBeenCalled();
    expect(mockOnClickHandler).not.toHaveBeenCalled();
  });
});
