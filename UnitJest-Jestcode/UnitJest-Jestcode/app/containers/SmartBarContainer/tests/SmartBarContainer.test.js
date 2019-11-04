import React from 'react';
import { shallow } from 'enzyme';
import SmartBar from 'components/SmartBar';
import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';
import { SmartBarContainer } from '../SmartBarContainer';

describe('<SmartBarContainer />', () => {
  let wrapper = null;
  const location = null;
  let loginUserOrg = null;
  let mockResetSelections = null;
  let mockHistory = null;
  let usageSummaryRequest = null;
  let resetConstantId = null;
  let updateUserData = null;

  beforeEach(() => {
    mockResetSelections = jest.fn();
    usageSummaryRequest = jest.fn();
    resetConstantId = jest.fn();
    updateUserData = jest.fn();
    loginUserOrg = USER_TYPE.Teacher;
    mockHistory = { push: jest.fn() };
    wrapper = shallow(
      <SmartBarContainer
        usageSummaryRequest={usageSummaryRequest}
        resetConstantId={resetConstantId}
        updateUserData={updateUserData}
        location={location}
        resetSelections={mockResetSelections}
        history={mockHistory}
        loginUserOrg={loginUserOrg}
      />
    );
  });

  describe('Teachers', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SmartBarContainer
          usageSummaryRequest={usageSummaryRequest}
          resetConstantId={resetConstantId}
          updateUserData={updateUserData}
          location={location}
          resetSelections={mockResetSelections}
          history={mockHistory}
          loginUserOrg={loginUserOrg}
        />
      );
    });

    it('Expect to have a SmartBar with the right props', () => {
      const smartBar = wrapper.find(SmartBar);
      expect(smartBar).toBeDefined();
    });
  });

  describe('School admins', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SmartBarContainer
          usageSummaryRequest={usageSummaryRequest}
          resetConstantId={resetConstantId}
          updateUserData={updateUserData}
          location={location}
          resetSelections={mockResetSelections}
          history={mockHistory}
          loginUserOrg={COHORT_TYPE.School}
        />
      );
    });

    it('Expect to have a SmartBar with the right props', () => {
      const smartBar = wrapper.find(SmartBar);
      expect(smartBar).toBeDefined();
    });
  });

  describe('District admins', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SmartBarContainer
          usageSummaryRequest={usageSummaryRequest}
          resetConstantId={resetConstantId}
          updateUserData={updateUserData}
          location={location}
          resetSelections={mockResetSelections}
          history={mockHistory}
          loginUserOrg={COHORT_TYPE.District}
        />
      );
    });

    it('Expect to have a SmartBar with the right props', () => {
      const smartBar = wrapper.find(SmartBar);
      expect(smartBar).toBeDefined();
    });
  });
});
describe('default location Route on Handle Click', () => {
  let wrapper = null;
  let location = null;
  let loginUserOrg = null;
  let mockResetSelections = null;
  let mockHistory = null;
  let usageSummaryRequest = null;
  let resetConstantId = null;
  let updateUserData = null;

  beforeEach(() => {
    mockResetSelections = jest.fn();
    usageSummaryRequest = jest.fn();
    resetConstantId = jest.fn();
    updateUserData = jest.fn();
    loginUserOrg = USER_TYPE.Teacher;
    mockHistory = { push: jest.fn() };
    location = {
      pathname: '/roster/reportPage',
    };
    wrapper = shallow(
      <SmartBarContainer
        usageSummaryRequest={usageSummaryRequest}
        resetConstantId={resetConstantId}
        updateUserData={updateUserData}
        location={location}
        resetSelections={mockResetSelections}
        history={mockHistory}
        loginUserOrg={loginUserOrg}
      />
    );
  });

  it('handle title click', () => {
    location = {
      pathname: '/roster/reportPage',
    };
    wrapper.setProps({
      pathname: '/roster/reportPage',
    });
    const smartBar = wrapper.find(SmartBar);
    smartBar.prop('onTitleClick')();
    expect(mockResetSelections).toHaveBeenCalled();
    expect(resetConstantId).toHaveBeenCalled();
    expect(updateUserData).toHaveBeenCalled();
    expect(usageSummaryRequest).toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalled();
  });
});
describe('manageStudentEnrollment', () => {
  let wrapper = null;
  let location = null;
  let loginUserOrg = null;
  let mockResetSelections = null;
  let mockHistory = null;
  let usageSummaryRequest = null;
  let resetConstantId = null;
  let updateUserData = null;

  beforeEach(() => {
    mockResetSelections = jest.fn();
    usageSummaryRequest = jest.fn();
    resetConstantId = jest.fn();
    updateUserData = jest.fn();
    loginUserOrg = USER_TYPE.Teacher;
    mockHistory = { push: jest.fn() };
    location = {
      pathname: '/roster/manageStudentEnrollment',
    };
    wrapper = shallow(
      <SmartBarContainer
        usageSummaryRequest={usageSummaryRequest}
        resetConstantId={resetConstantId}
        updateUserData={updateUserData}
        location={location}
        resetSelections={mockResetSelections}
        history={mockHistory}
        loginUserOrg={loginUserOrg}
      />
    );
  });

  it('handle title click : manageStudentEnrollment', () => {
    const smartBar = wrapper.find(SmartBar);
    smartBar.prop('onTitleClick')();
    expect(mockResetSelections).toHaveBeenCalled();
    expect(updateUserData).toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalledWith('/roster/manageStudentEnrollment');
    expect(resetConstantId).toHaveBeenCalled();
  });
});

describe('manageTeacherAccess', () => {
  let wrapper = null;
  let location = null;
  let loginUserOrg = null;
  let mockResetSelections = null;
  let mockHistory = null;
  let usageSummaryRequest = null;
  let resetConstantId = null;
  let updateUserData = null;

  beforeEach(() => {
    mockResetSelections = jest.fn();
    usageSummaryRequest = jest.fn();
    resetConstantId = jest.fn();
    updateUserData = jest.fn();
    loginUserOrg = USER_TYPE.Teacher;
    mockHistory = { push: jest.fn() };
    location = {
      pathname: '/roster/manageTeacherAccess',
    };
    wrapper = shallow(
      <SmartBarContainer
        usageSummaryRequest={usageSummaryRequest}
        resetConstantId={resetConstantId}
        updateUserData={updateUserData}
        location={location}
        resetSelections={mockResetSelections}
        history={mockHistory}
        loginUserOrg={loginUserOrg}
      />
    );
  });

  it('handle title click : manageTeacherAccess', () => {
    const smartBar = wrapper.find(SmartBar);
    smartBar.prop('onTitleClick')();
    expect(mockResetSelections).toHaveBeenCalled();
    expect(updateUserData).toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalledWith('/roster/manageTeacherAccess');
    expect(resetConstantId).toHaveBeenCalled();
  });
});

describe('programSettings', () => {
  let wrapper = null;
  let location = null;
  let loginUserOrg = null;
  let mockResetSelections = null;
  let mockHistory = null;
  let usageSummaryRequest = null;
  let resetConstantId = null;
  let updateUserData = null;

  beforeEach(() => {
    mockResetSelections = jest.fn();
    usageSummaryRequest = jest.fn();
    resetConstantId = jest.fn();
    updateUserData = jest.fn();
    loginUserOrg = USER_TYPE.Teacher;
    mockHistory = { push: jest.fn() };
    location = {
      pathname: '/roster/programSettings',
    };
    wrapper = shallow(
      <SmartBarContainer
        usageSummaryRequest={usageSummaryRequest}
        resetConstantId={resetConstantId}
        updateUserData={updateUserData}
        location={location}
        resetSelections={mockResetSelections}
        history={mockHistory}
        loginUserOrg={loginUserOrg}
      />
    );
  });

  it('handle title click : programSettings', () => {
    const smartBar = wrapper.find(SmartBar);
    smartBar.prop('onTitleClick')();
    expect(mockResetSelections).toHaveBeenCalled();
    expect(updateUserData).toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalledWith('/roster/programSettings');
    expect(resetConstantId).toHaveBeenCalled();
  });
});
