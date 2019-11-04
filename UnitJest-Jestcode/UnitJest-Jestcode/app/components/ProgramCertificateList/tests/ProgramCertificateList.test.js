import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ProgramCertificateList from '../index';

describe('<ProgramCertificateList />', () => {
  let wrapper = null;
  let mockCertificateInfo = null;
  let mockSelectedCertificate = null;
  let mockToggleRowSelection = null;
  let mockToggleRowsSelection = null;
  let mockSelectedClasses = null;

  beforeEach(() => {
    mockCertificateInfo = {
      recipients: [{ recipient: [] }],
    };
    mockSelectedCertificate = '';
    mockToggleRowSelection = jest.fn();
    mockToggleRowsSelection = jest.fn();
    mockSelectedClasses = [];
    wrapper = shallow(
      <ProgramCertificateList
        certificateInfo={mockCertificateInfo}
        selectedCertificate={mockSelectedCertificate}
        toggleRowSelection={mockToggleRowSelection}
        toggleRowsSelection={mockToggleRowsSelection}
        selectedClasses={mockSelectedClasses}
      />
    );
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('certificateInfo when there is no value', () => {
    mockCertificateInfo = [];
    wrapper.setProps({ certificateInfo: mockCertificateInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify toggleRows method', () => {
    wrapper.find('#checkBoxHeader').simulate('change', {
      toggleRows: true,
    });
    expect(wrapper.state('toggleRows')).toBeTruthy();
  });

  describe('verify with the data', () => {
    beforeEach(() => {
      mockCertificateInfo = {
        recipients: [
          {
            recipient: [
              {
                R180_level: [''],
                books_read: [''],
                grade: ['2'],
                id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
                lexile_level: [''],
                lexile_score: [''],
                name: ['CA S44 Stage A Standalone'],
                points_earned: [''],
                type: ['class'],
              },
              {
                R180_level: [''],
                books_read: [''],
                grade: ['9'],
                id: ['srjrole2mqoolo95m4g5jldp_2efa7f0'],
                lexile_level: [''],
                lexile_score: [''],
                name: ['CA S44 Stage B Standalone'],
                points_earned: [''],
                type: ['class'],
              },
            ],
          },
        ],
      };
      wrapper = shallow(
        <ProgramCertificateList
          certificateInfo={mockCertificateInfo}
          selectedCertificate={mockSelectedCertificate}
          toggleRowSelection={mockToggleRowSelection}
          toggleRowsSelection={mockToggleRowsSelection}
          selectedClasses={mockSelectedClasses}
        />
      );
    });

    it('certificateInfo returns the table data', () => {
      wrapper.setProps({ certificateInfo: mockCertificateInfo });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('certificateInfo returns only student data for Math Products', () => {
      mockSelectedCertificate = 'fmng_11';
      wrapper.setProps({
        certificateInfo: mockCertificateInfo,
        selectedCertificate: mockSelectedCertificate,
      });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify toggle row selection', () => {
      const item = {
        id: 'srjrole2mqoolo95m4g5jldp_2efa7f0',
        type: 'class',
        name: 'CA S44 Stage B Standalone',
      };
      wrapper.instance().handleChange(item);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('with data in the array', () => {
    it('onClick function to be called', () => {
      mockToggleRowSelection = jest.fn();
      mockSelectedClasses = [{ id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'] }];
      mockCertificateInfo = {
        recipients: [
          {
            recipient: [
              {
                R180_level: ['2'],
                books_read: ['3'],
                grade: ['2'],
                id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
                lexile_level: ['3'],
                lexile_score: ['3'],
                name: ['CA S44 Stage A Standalone'],
                points_earned: ['3'],
                type: ['class'],
              },
              {
                R180_level: ['1'],
                books_read: ['1'],
                grade: ['9'],
                id: ['srjrole2mqoolo95m4g5jldp_2efa7f0'],
                lexile_level: ['1'],
                lexile_score: ['1'],
                name: ['CA S44 Stage B Standalone'],
                points_earned: ['1'],
                type: ['class'],
              },
            ],
          },
        ],
      };
      wrapper = shallow(
        <ProgramCertificateList
          certificateInfo={mockCertificateInfo}
          toggleRowSelection={mockToggleRowSelection}
          selectedClasses={mockSelectedClasses}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('testing onCLick function', () => {
    it('onClick function to be called', () => {
      mockToggleRowSelection = jest.fn();
      mockSelectedClasses = [{ id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'] }];
      mockCertificateInfo = {
        recipients: [
          {
            recipient: [
              {
                R180_level: [''],
                books_read: [''],
                grade: ['2'],
                id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
                lexile_level: [''],
                lexile_score: [''],
                name: ['CA S44 Stage A Standalone'],
                points_earned: [''],
                type: ['class'],
              },
              {
                R180_level: [''],
                books_read: [''],
                grade: ['9'],
                id: ['srjrole2mqoolo95m4g5jldp_2efa7f0'],
                lexile_level: [''],
                lexile_score: [''],
                name: ['CA S44 Stage B Standalone'],
                points_earned: [''],
                type: ['class'],
              },
            ],
          },
        ],
      };
      wrapper = shallow(
        <ProgramCertificateList
          certificateInfo={mockCertificateInfo}
          toggleRowSelection={mockToggleRowSelection}
          selectedClasses={mockSelectedClasses}
        />
      );
      const item = {
        id: 'srjrole2mqoolo95m4g5jldp_2efa7f0',
        type: 'class',
        name: 'CA S44 Stage B Standalone',
      };
      wrapper.instance().handleChange(item)();
      expect(mockToggleRowSelection).toBeCalled();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
