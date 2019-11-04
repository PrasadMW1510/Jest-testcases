import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { ClearRosterModalContainer } from '../ClearRosterModalContainer';

describe('<ClearRosterModalContainer />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockDeactivateAllClassesRequest = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ClearRosterModalContainer
        hideModal={mockHideModal}
        deactivateAllClassesRequest={mockDeactivateAllClassesRequest}
      />
    );
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should hideModal when handleNo is pressed', () => {
    const mockEvent = {
      preventDefault: () => {},
    };
    wrapper.instance().handleNo(mockEvent);
    expect(mockHideModal).toBeCalled();
  });

  it('should deactivateAllClassesRequest when handleYes is pressed', () => {
    const mockEvent = { preventDefault: () => {} };
    wrapper.instance().handleYes(mockEvent);
    expect(mockDeactivateAllClassesRequest).toBeCalled();
  });
});
