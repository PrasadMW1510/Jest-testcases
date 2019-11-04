import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { AccountDeleteModalContainer } from '../index';

describe('<AccountDeleteModalContainer />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockData = {
    searchOpts: { searchBy: 'student' },
    cohortsToDelete: ['asdfghadsasdasdasd'],
  };
  const mockPostAccountDeleteRequest = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <AccountDeleteModalContainer
        hideModal={mockHideModal}
        data={mockData}
        postAccountDeleteRequest={mockPostAccountDeleteRequest}
      />
    );
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should create acountDeletePayload', () => {
    const expected = {
      accounts: { input: { users: [{ user_id: ['a'] }] } },
      searchOpts: { searchBy: 'student' },
    };
    const payload = wrapper.instance().createAccountPayload();
    expect(payload).toEqual(expected);
  });

  it('should call its prop.hideModal when handleNo method is called', () => {
    wrapper.instance().handleNo();
    expect(mockHideModal).toHaveBeenCalled();
  });

  it('should call its prop.postAccountDeleteRequest when handleyes is called', () => {
    wrapper.instance().handleYes();
    expect(mockPostAccountDeleteRequest).toHaveBeenCalled();
  });
});
