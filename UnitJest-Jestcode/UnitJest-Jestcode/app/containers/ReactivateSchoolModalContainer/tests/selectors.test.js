import { fromJS } from 'immutable';
import makeSelectReactivateSchoolModalContainer from '../selectors';

describe('selectReactivateSchoolModalContainerDomain', () => {
  it('should select the account delete modal container domain', () => {
    const reactivateSchoolModalContainer = fromJS({
      reactivateSchoolModalContainer: { error: 'err' },
    });
    const mockedState = fromJS({
      reactivateSchoolModalContainer,
    });

    expect(makeSelectReactivateSchoolModalContainer()(mockedState)).toMatchSnapshot();
  });
});
