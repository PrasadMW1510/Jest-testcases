import { fromJS } from 'immutable';
import { makeSelectDeactivateModalContainer } from '../selectors';

describe('selectCertificateInfo', () => {
  it('should return certificate Info', () => {
    const deactivateUser = fromJS({
      deactivateUser: { name: 'test' },
    });
    const mockedState = fromJS({
      deactivateUser,
    });
    expect(makeSelectDeactivateModalContainer()(mockedState)).toEqual(deactivateUser);
  });
});
