import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { SAMLinkButton } from '../SAMLinkButton';

describe('<SamlinkButton />', () => {
  let wrapper = null;
  let mockOnClickHandler = null;
  let mockHistory = null;
  const fakeEvent = { preventDefault: () => {} };

  beforeEach(() => {
    mockOnClickHandler = jest.fn();
    mockHistory = {
      push: jest.fn(),
    };
  });

  it('expect the default to render', () => {
    wrapper = shallow(<SAMLinkButton to="/mockLocation1">mockButton1</SAMLinkButton>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('expect primary button to render', () => {
    wrapper = shallow(
      <SAMLinkButton to="/mockLocation2" isPrimaryButton>
        mockButton2
      </SAMLinkButton>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('onClickHandler returning undefined (default)', () => {
    wrapper = shallow(
      <SAMLinkButton to="/mockLocation3" history={mockHistory} onClickHandler={mockOnClickHandler}>
        mockButton3
      </SAMLinkButton>
    );
    wrapper.find('SAMButton').prop('onClickHandler')(fakeEvent);
    expect(mockOnClickHandler).toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalledWith('/mockLocation3');
  });

  it('onClickHandler returning false', () => {
    const mockOnClickHandlerReturningFalse = jest.fn().mockReturnValue(false);
    wrapper = shallow(
      <SAMLinkButton
        to="/mockLocation3"
        history={mockHistory}
        onClickHandler={mockOnClickHandlerReturningFalse}
      >
        mockButton3
      </SAMLinkButton>
    );
    wrapper.find('SAMButton').prop('onClickHandler')(fakeEvent);
    expect(mockOnClickHandlerReturningFalse).toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalledTimes(0);
  });

  it('onClickHandler is not passed as props', () => {
    wrapper = shallow(
      <SAMLinkButton to="/mockLocation4" history={mockHistory}>
        mockButton4
      </SAMLinkButton>
    );

    wrapper.find('SAMButton').prop('onClickHandler')(fakeEvent);
    expect(mockOnClickHandler).not.toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalledWith('/mockLocation4');
  });
});
