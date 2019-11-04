import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ProgramCertificateFooter from '../index';

describe('<ProgramCertificateFooter />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<ProgramCertificateFooter />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('display cancel button', () => {
  let wrapper = null;
  let isWorksheetUpdate = null;

  beforeEach(() => {
    isWorksheetUpdate = true;
    wrapper = shallow(<ProgramCertificateFooter isWorksheetUpdate={isWorksheetUpdate} />);
  });

  it('isWorksheetUpdate is true', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
