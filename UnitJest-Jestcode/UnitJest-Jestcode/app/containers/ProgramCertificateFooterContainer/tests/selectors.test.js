import { fromJS } from 'immutable';
import makeSelectCertificatePrintPdfContainer from '../selectors';

describe('selectCertificateInfo', () => {
  it('should return certificate Info', () => {
    const certificatePrint = fromJS({
      certificatePrint: { name: 'test' },
    });
    const mockedState = fromJS({
      certificatePrint,
    });
    expect(makeSelectCertificatePrintPdfContainer()(mockedState)).toEqual(certificatePrint);
  });
});
