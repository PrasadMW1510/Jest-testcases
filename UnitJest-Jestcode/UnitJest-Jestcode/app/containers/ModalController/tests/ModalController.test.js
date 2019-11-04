import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { ModalController } from '../index';
import * as Constants from '../constants';

describe('<ModalController />', () => {
  let wrapper = null;
  let mockModalType = null;
  let mockGlobal = null;

  beforeEach(() => {
    mockModalType = fromJS({
      openModals: [],
    });

    mockGlobal = fromJS({
      error: null,
      currentUser: true,
    });
  });

  it('Expect to render a main modal', () => {
    mockModalType = fromJS({
      openModals: [],
    });
    mockModalType = mockModalType.setIn(['openModals', 0], {
      modalType: Constants.LOGOUT_MODAL,
      data: {},
    });
    wrapper = shallow(<ModalController global={mockGlobal} modalController={mockModalType} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render the error modal', () => {
    mockGlobal = fromJS({
      error: 'foobar error',
      currentUser: true,
    });

    wrapper = shallow(<ModalController global={mockGlobal} modalController={mockModalType} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render the error modal when error is not string', () => {
    mockGlobal = fromJS({
      error: { Error: 'Network Error' },
      currentUser: true,
    });

    wrapper = shallow(<ModalController global={mockGlobal} modalController={mockModalType} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
