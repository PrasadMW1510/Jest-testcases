import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import HeaderUserText from 'components/HeaderUserText';
import { HeaderUserTextContainer } from '../HeaderUserTextContainer';

describe('<HeaderUserTextContainer />', () => {
  let wrapper = null;
  let mockedGlobalState = null;

  beforeEach(() => {
    mockedGlobalState = fromJS({ first_name: ['John'], last_name: ['Smith'] });
    wrapper = shallow(<HeaderUserTextContainer global={mockedGlobalState} />);
  });

  it('Expect to have HeaderUserText', () => {
    expect(wrapper.find(HeaderUserText)).toBeTruthy();
  });

  it('Expect to have HeaderUserText with first name and last name', () => {
    expect(wrapper.find(HeaderUserText).prop('firstName')).toBeDefined();
    expect(wrapper.find(HeaderUserText).prop('lastName')).toBeDefined();
  });
});
