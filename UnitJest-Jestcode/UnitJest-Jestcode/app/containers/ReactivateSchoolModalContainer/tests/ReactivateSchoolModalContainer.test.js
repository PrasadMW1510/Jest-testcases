import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ReactivateSchoolModalContainer } from '../index';

describe('<ReactivateSchoolModalContainer />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockData = {
    searchOpts: { cohortType: 'School' },
    cohortsToReactivate: ['asdfghadsasdasdasd'],
  };
  const mockDistrictId = 'mockDistId';
  const mockReactivateSchoolRequest = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ReactivateSchoolModalContainer
        hideModal={mockHideModal}
        data={mockData}
        postReactivateSchoolRequest={mockReactivateSchoolRequest}
        districtId={mockDistrictId}
      />
    );
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should create reactivateSchoolPayload', () => {
    const expected = {
      accounts: { input: { district_id: 'mockDistId', schools: [{ school_id: ['a'] }] } },
      searchOpts: { cohortType: 'School' },
    };
    const payload = wrapper.instance().createReactivateSchoolPayload();
    expect(payload).toEqual(expected);
  });

  it('should call its prop.hideModal when handleCancel method is called', () => {
    wrapper.instance().handleCancel();
    expect(mockHideModal).toHaveBeenCalled();
  });

  it('should call its prop.postAccountDeleteRequest when handleSave is called', () => {
    wrapper.instance().handleSave();
    expect(mockReactivateSchoolRequest).toHaveBeenCalled();
  });
});
