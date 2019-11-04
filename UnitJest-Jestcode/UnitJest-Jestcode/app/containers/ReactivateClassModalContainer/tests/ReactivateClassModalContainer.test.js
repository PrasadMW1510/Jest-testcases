import React from 'react';
import { shallow } from 'enzyme';
// import { shallowToJson } from 'enzyme-to-json';
// import { fromJS } from 'immutable';
import { ReactivateClassModalContainer } from '../index';

describe('<ReactivateClassModalContainer />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockData = {
    searchOpts: { cohortType: 'Class' },
    cohortsToReactivate: ['asdfghadsasdasdasd'],
  };
  const mockReactivateClassRequest = jest.fn();
  // const mockSchools = fromJS({
  //   schools: {
  //     mockSchoolId: {
  //       org_id: ['a'],
  //       parent_org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
  //       name: ['mockSchoolA'],
  //     },
  //   },
  // });

  beforeEach(() => {
    wrapper = shallow(
      <ReactivateClassModalContainer
        data={mockData}
        hideModal={mockHideModal}
        postReactivateClassRequest={mockReactivateClassRequest}
        // schools={mockSchools}
      />
    );
  });

  // it('should render correctly', () => {
  //   expect(shallowToJson(wrapper)).toMatchSnapshot();
  // });

  it('should create reactivateClassPayload', () => {
    const expected = {
      accounts: { input: { school_id: 'mockSchoolId', classes: [{ class_id: ['a'] }] } },
      searchOpts: { cohortType: 'Class' },
    };
    const payload = wrapper.instance().createReactivateClassPayload('mockSchoolId');
    expect(payload).toEqual(expected);
  });

  it('should call its prop.hideModal when handleCancel method is called', () => {
    wrapper.instance().handleCancel();
    expect(mockHideModal).toHaveBeenCalled();
  });

  it('should call its prop.postAccountDeleteRequest when handleSave is called', () => {
    const mockSelectedSchoolId = 'mockSchoolId';
    wrapper.instance().handleSave(mockSelectedSchoolId);
    expect(mockReactivateClassRequest).toHaveBeenCalled();
  });
});
