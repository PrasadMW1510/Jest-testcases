import { fromJS } from 'immutable';
import { makeSelectEditDistrictProfileContainer } from '../selectors';

describe('selectEditDistrictProfileContainerDomain', () => {
  it('should select the class assign modal container domain', () => {
    const editDistrictProfileContainer = fromJS({
      editDistrictProfileContainer: {},
    });
    const mockedState = fromJS({ editDistrictProfileContainer });

    expect(makeSelectEditDistrictProfileContainer()(mockedState)).toMatchSnapshot();
  });
});
