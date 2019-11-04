import React from 'react';
import { shallow } from 'enzyme';
import FormFieldFocuser from 'components/FormFieldFocuser';

describe('<FormFieldFocuser />', () => {
  it('Component focuses on mount', () => {
    const mockDomElement = {
      focus: jest.fn(),
    };
    const mockGetRenderedComponent = jest.fn().mockReturnValue(mockDomElement);
    const wrapper = shallow(
      <FormFieldFocuser focusOnMount focusOnToggleTrue={false}>
        <div />
      </FormFieldFocuser>,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().focusedField = {
      getRenderedComponent: mockGetRenderedComponent,
    };
    wrapper.instance().componentDidMount();
    expect(mockDomElement.focus).toHaveBeenCalled();
  });

  it('Component focuses first field as expected during update', () => {
    const previousProps = {
      focusOnToggleTrue: false,
    };
    const mockDomElement = {
      focus: jest.fn(),
    };
    const mockGetRenderedComponent = jest.fn().mockReturnValue(mockDomElement);
    const wrapper = shallow(
      <FormFieldFocuser focusOnToggleTrue>
        <div />
      </FormFieldFocuser>,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().focusedField = {
      getRenderedComponent: mockGetRenderedComponent,
    };
    wrapper.instance().componentDidMount();
    expect(mockDomElement.focus).toHaveBeenCalledTimes(0);
    wrapper.instance().componentDidUpdate(previousProps);
    expect(mockDomElement.focus).toHaveBeenCalled();
  });

  it('Component suppresses focus as expected during update', () => {
    const previousProps = {
      focusOnToggleTrue: true,
    };
    const mockDomElement = {
      focus: jest.fn(),
    };
    const mockGetRenderedComponent = jest.fn().mockReturnValue(mockDomElement);
    const wrapper = shallow(
      <FormFieldFocuser focusOnToggleTrue>
        <div />
      </FormFieldFocuser>,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().focusedField = {
      getRenderedComponent: mockGetRenderedComponent,
    };
    wrapper.instance().componentDidUpdate(previousProps);
    expect(mockDomElement.focus).toHaveBeenCalledTimes(0);
  });

  it('Assign first field as expected', () => {
    const mockRef = true;
    const wrapper = shallow(
      <FormFieldFocuser focusOnToggleTrue>
        <div />
      </FormFieldFocuser>,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().refAssignFocusedField(mockRef);
    expect(wrapper.instance().focusedField).toBe(true);
  });
});
