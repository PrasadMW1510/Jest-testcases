import { fromJS } from 'immutable';
import makeSelectAccountDeleteModalContainer from '../selectors';

describe('selectAccountDeleteModalContainerDomain', () => {
  it('should select the account delete modal container domain', () => {
    const accountDeleteModalContainer = fromJS({
      accountDeleteModalContainer: { error: 'err' },
    });
    const mockedState = fromJS({
      accountDeleteModalContainer,
    });

    expect(makeSelectAccountDeleteModalContainer()(mockedState)).toMatchSnapshot();
  });
});
