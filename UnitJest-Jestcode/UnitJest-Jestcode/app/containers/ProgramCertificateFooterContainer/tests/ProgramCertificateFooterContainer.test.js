import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import ProgramCertificateFooter from 'components/ProgramCertificateFooter';
import { ProgramCertificateFooterContainer } from '../ProgramCertificateFooterContainer';
import { certificatePrintRequest } from '../actions';

describe('<ProgramCertificateFooterContainer />', () => {
  let wrapper = null;
  let onPrintPdfClick = null;
  let onCancel = null;
  const fakeEvent = { preventDefault: () => {} };
  let getCertificatePdfContainer = null;

  beforeEach(() => {
    jest.spyOn(window, 'open');
    onPrintPdfClick = jest.fn();
    getCertificatePdfContainer = jest.fn();
    onCancel = jest.fn();
    wrapper = shallow(
      <ProgramCertificateFooterContainer
        certificatePrintRequest={certificatePrintRequest}
        onPrintPdfClick={onPrintPdfClick}
        onCancel={onCancel}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should handle the print PDF click', () => {
    const printPDFLinks = wrapper.find(ProgramCertificateFooter);
    printPDFLinks.prop('onPrintPdfClick')(fakeEvent);
    expect(window.open).toBeTruthy();
  });

  it('Should handle Cancel', () => {
    const cancelLink = wrapper.find(ProgramCertificateFooter);
    cancelLink.prop('onCancel')(fakeEvent);
    expect(onCancel).toHaveBeenCalled();
  });

  it('to verify the component will receive props', () => {
    const mockCertificateprintpdfcontainer = fromJS({
      certificatePrint: [
        {
          certificate_id: ['1234589'],
        },
      ],
    });
    wrapper = shallow(
      <ProgramCertificateFooterContainer
        certificatePrintPdfContainer={mockCertificateprintpdfcontainer}
        getCertificatePdfContainer={getCertificatePdfContainer}
        certificatePrintRequest={certificatePrintRequest}
        onPrintPdfClick={onPrintPdfClick}
        onCancel={onCancel}
      />
    );
    const mockNextPropCertificateprintpdfcontainer = fromJS({
      certificatePrint: [
        {
          certificate_id: ['12345900'],
        },
      ],
    });
    wrapper.setProps({ certificatePrintPdfContainer: mockNextPropCertificateprintpdfcontainer });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('getCertificatePdfContainer: check for null condition', () => {
    const mockCertificateprintpdfcontainer = undefined;
    wrapper = shallow(
      <ProgramCertificateFooterContainer
        certificatePrintPdfContainer={mockCertificateprintpdfcontainer}
        getCertificatePdfContainer={getCertificatePdfContainer}
        certificatePrintRequest={certificatePrintRequest}
        onPrintPdfClick={onPrintPdfClick}
        onCancel={onCancel}
      />
    );
    wrapper.setProps({ certificatePrintPdfContainer: mockCertificateprintpdfcontainer });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
