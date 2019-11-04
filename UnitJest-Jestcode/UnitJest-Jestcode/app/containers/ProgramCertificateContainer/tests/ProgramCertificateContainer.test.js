import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { ProgramCertificateContainer } from '../ProgramCertificateContainer';

describe('<ProgramCertificateContainer />', () => {
  let wrapper = null;
  let mockCertificateInfoContainer = null;
  const mockCertificateInfoRequest = jest.fn();

  describe('props.certificate Info is not an empty array', () => {
    beforeEach(() => {
      mockCertificateInfoContainer = fromJS({
        certificateInfo: {
          certificates: {
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
        },
      });
      wrapper = shallow(
        <ProgramCertificateContainer
          certificateInfo={mockCertificateInfoContainer}
          certificateInfoRequest={mockCertificateInfoRequest}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify toggleRowSelection method', () => {
      wrapper.setProps({ classIndex: -1 });
      const row = {
        name: 'E3D CB V1',
        id: 'c8eib35pi81ada20bp0pmltg_2efa7f0',
        type: 'class',
      };
      const testValue = [row];
      wrapper.instance().toggleRowSelection(row);
      expect(wrapper.state('selectedClasses')).toEqual(testValue);
    });

    it('toggleRowSelection: classIndex is not -1', () => {
      const selectedClasses = [
        {
          name: 'DoTheMath',
          id: 'sc49dbt98j3dbigsb1e73f31_2efa7f0',
          type: 'class',
        },
        {
          name: 'E3D CB V1',
          id: 'c8eib35pi81ada20bp0pmltg_2efa7f0',
          type: 'class',
        },
      ];
      wrapper.setState({ selectedClasses });
      const row = {
        name: 'E3D CB V1',
        id: 'c8eib35pi81ada20bp0pmltg_2efa7f0',
        type: 'class',
      };
      wrapper.instance().toggleRowSelection(row);
      expect(wrapper.state('selectedClasses')).toHaveLength(1);
    });

    it('toggleRowsSelection: toBeChecked value as true', () => {
      mockCertificateInfoContainer = fromJS({
        certificateInfo: {
          recipients: [
            {
              recipient: [
                {
                  name: 'DoTheMath',
                  id: 'sc49dbt98j3dbigsb1e73f31_2efa7f0',
                  type: 'class',
                },
                {
                  name: 'E3D CB V1',
                  id: 'c8eib35pi81ada20bp0pmltg_2efa7f0',
                  type: 'class',
                },
              ],
            },
          ],
        },
      });
      wrapper.setProps({ certificateInfo: mockCertificateInfoContainer });
      const toBeChecked = true;
      wrapper.instance().toggleRowsSelection(toBeChecked);
      expect(wrapper.state('selectedClasses')).toHaveLength(2);
    });

    it('toggleRowsSelection: toBeChecked value as false', () => {
      const toBeChecked = false;
      wrapper.instance().toggleRowsSelection(toBeChecked);
      expect(wrapper.state('selectedClasses')).toHaveLength(0);
    });
  });

  describe('props.certificateInfo is an empty array', () => {
    beforeEach(() => {
      mockCertificateInfoContainer = fromJS({
        certificateInfo: {},
      });

      wrapper = shallow(
        <ProgramCertificateContainer
          certificateInfo={mockCertificateInfoContainer}
          certificateInfoRequest={mockCertificateInfoRequest}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockCertificateInfoRequest).toHaveBeenCalled();
    });
  });

  describe('props.certificate Info is not an empty array', () => {
    let selectedCertificate = null;
    let lineOne = null;
    let lineTwo = null;
    let lineThree = null;
    let lineFour = null;
    let selectedClasses = null;

    beforeEach(() => {
      selectedClasses = [{ name: 'CA S44 Stage B Standalone' }];
      selectedCertificate = 'R180_29';
      lineOne = 'good Job';
      lineTwo = 'keep it up';
      lineThree = 'A';
      lineFour = 'A+';
      wrapper = shallow(
        <ProgramCertificateContainer
          certificateInfo={mockCertificateInfoContainer}
          certificateInfoRequest={mockCertificateInfoRequest}
        />
      );
    });

    it('to match the custom messages', () => {
      wrapper.setState({
        selectedClasses,
        selectedCertificate,
        lineOne,
        lineTwo,
        lineThree,
        lineFour,
      });
      expect(wrapper.state('lineOne')).toEqual(lineOne);
      expect(wrapper.state('lineTwo')).toEqual(lineTwo);
      expect(wrapper.state('lineThree')).toEqual(lineThree);
      expect(wrapper.state('lineFour')).toEqual(lineFour);
      expect(wrapper.state('selectedCertificate')).toEqual(selectedCertificate);
      expect(wrapper.state('selectedClasses')).toEqual(selectedClasses);
    });

    it('verify handle cancel option', () => {
      wrapper.instance().handleCancel();
      expect(wrapper.state('lineOne')).toEqual('');
    });

    it('verify handle change option', () => {
      const e = {
        target: {
          value: 'fm_11',
        },
      };
      wrapper.instance().handleChange(e);
      expect(wrapper.state('isWorksheetUpdate')).toBeTruthy();
    });
  });
});
