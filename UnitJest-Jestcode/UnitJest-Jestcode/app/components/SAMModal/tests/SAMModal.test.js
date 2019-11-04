import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SAMModal from '../index';

describe('<SAMModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(
      <SAMModal>
        {' '}
        <span>hello world!</span>
      </SAMModal>
    );
  });

  it('Expect to match snapshot when closed', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to match snapshot when is open', () => {
    wrapper = shallow(
      <SAMModal isOpen>
        {' '}
        <span>hello world!</span>
      </SAMModal>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to match snapshot when the overlay modifier class is defined', () => {
    wrapper = shallow(
      <SAMModal isOpen overlayClassModifier="overlay--test">
        {' '}
        <span>hello world!</span>
      </SAMModal>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to match snapshot when the modal modifier class is defined', () => {
    wrapper = shallow(
      <SAMModal isOpen modalClassModifier="modal--test">
        {' '}
        <span>hello world!</span>
      </SAMModal>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
