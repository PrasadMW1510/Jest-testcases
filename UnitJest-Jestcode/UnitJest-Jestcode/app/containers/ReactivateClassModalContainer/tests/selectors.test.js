import { fromJS } from 'immutable';
import makeSelectReactivateClassModalContainer from '../selectors';

describe('selectReactivateCkassModalContainerDomain', () => {
  it('should select the account delete modal container domain', () => {
    const reactivateClassModalContainer = fromJS({
      reactivateClassModalContainer: { error: 'err' },
    });
    const mockedState = fromJS({
      reactivateClassModalContainer,
    });

    expect(makeSelectReactivateClassModalContainer()(mockedState)).toMatchSnapshot();
  });
});
