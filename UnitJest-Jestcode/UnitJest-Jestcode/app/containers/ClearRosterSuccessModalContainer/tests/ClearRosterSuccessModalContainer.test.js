import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { USER_ORG } from 'containers/App/constants';

import { ClearRosterSuccessModalContainer } from '../ClearRosterSuccessModalContainer';

describe('<ClearRosterSuccessModalContainer />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockUsageSummaryRequest = jest.fn();
  const mockResetSelections = jest.fn();
  const mockSchoolSelection = jest.fn();
  const mockUserOrg = USER_ORG.District;

  beforeEach(() => {
    wrapper = shallow(
      <ClearRosterSuccessModalContainer
        hideModal={mockHideModal}
        usageSummaryRequest={mockUsageSummaryRequest}
        resetSelections={mockResetSelections}
        schoolSelection={mockSchoolSelection}
        userOrg={mockUserOrg}
      />
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handleYes for district org type', () => {
    const mockEvent = { preventDefault: () => {} };
    wrapper.instance().handleYes(mockEvent);
    expect(mockHideModal).toHaveBeenCalledTimes(2);
    expect(mockUsageSummaryRequest).toBeCalled();
    expect(mockSchoolSelection).toBeCalled();
  });

  it('should handleYes for school org type', () => {
    wrapper = shallow(
      <ClearRosterSuccessModalContainer
        hideModal={mockHideModal}
        usageSummaryRequest={mockUsageSummaryRequest}
        resetSelections={mockResetSelections}
        schoolSelection={mockSchoolSelection}
        userOrg={USER_ORG.School}
      />
    );
    const mockEvent = { preventDefault: () => {} };
    wrapper.instance().handleYes(mockEvent);
    expect(mockHideModal).toHaveBeenCalledTimes(2);
    expect(mockUsageSummaryRequest).toBeCalled();
    expect(mockSchoolSelection).not.toBeCalled();
  });
});
