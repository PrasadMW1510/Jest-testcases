import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ProgramCertificateView from '../ProgramCertificateView';

describe('ProgramCertificateView  should return no data', () => {
  let wrapper = null;
  let certificateInfo = null;
  beforeEach(() => {
    certificateInfo = {
      certificates: [
        {
          certificate: {},
        },
      ],
    };
    wrapper = shallow(<ProgramCertificateView certificateInfo={certificateInfo} />);
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('ProgramCertificateView  should return valid certificateInfo', () => {
  let wrapper = null;
  let certificateInfo = null;
  beforeEach(() => {
    certificateInfo = {
      certificates: [
        {
          certificate: [
            {
              certificate_id: 'fmng_11',
              certificate_name: 'FASTT Math NG Award Certificate',
              certificate_type: 'Default',
              parent_app_id: 'FMNG',
            },
            {
              certificate_id: 'fm_11',
              certificate_name: 'FASTT Math Award Certificate',
              certificate_type: 'Default',
              parent_app_id: 'FM',
            },
          ],
        },
      ],
      recipients: {
        recipient: [
          {
            name: 'DoTheMath',
            id: 'sc49dbt98j3dbigsb1e73f31_2efa7f0',
            type: 'class',
            grade: '5',
          },
          {
            name: 'E3D CA V1',
            id: 'fs8lgl4fohettf9h1401pb56_2efa7f0',
            type: 'class',
            grade: 'K',
          },
          {
            name: 'E3D CA V2',
            id: 'mff03ugu34i2lrrmt0j39vlg_2efa7f0',
            type: 'class',
            grade: '5',
          },
          {
            name: 'E3D CB V1',
            id: 'c8eib35pi81ada20bp0pmltg_2efa7f0',
            type: 'class',
            grade: 'PK',
          },
        ],
      },
    };
    wrapper = shallow(<ProgramCertificateView certificateInfo={certificateInfo} />);
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Component Will recieve Props', () => {
    wrapper.setProps({ selectedCertificate: 'fmng11' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Component Will not recieve Props if its an array', () => {
    wrapper.setProps({ selectedCertificate: 'fmng11' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleChange', () => {
    wrapper.find('.awardselectbox').simulate('change', {
      target: { value: 'fm_11' },
    });
    expect(wrapper.find('option')).toHaveLength(3);
  });
});

describe('ProgramCertificateView , if an array , pass no Data', () => {
  let wrapper = null;
  let certificateInfo = null;
  beforeEach(() => {
    certificateInfo = [];
    wrapper = shallow(<ProgramCertificateView certificateInfo={certificateInfo} />);
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('Component Will not receive Props', () => {
  let wrapper = null;
  let certificateInfo = null;
  beforeEach(() => {
    certificateInfo = [];
    wrapper = shallow(<ProgramCertificateView certificateInfo={certificateInfo} />);
  });

  it('Component Will not receive Props', () => {
    wrapper.setProps({ selectedCertificate: 'fmng100' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
