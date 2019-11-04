import { fromJS } from 'immutable';
import makeSelectCertificateInfo from '../selectors';

describe('selectCertificateInfo', () => {
  it('should return certificate Info', () => {
    const certificateInfo = fromJS({
      certificateInfo: { name: 'test' },
    });
    const mockedState = fromJS({
      certificateInfo,
    });
    expect(makeSelectCertificateInfo()(mockedState)).toEqual(certificateInfo);
  });
});
