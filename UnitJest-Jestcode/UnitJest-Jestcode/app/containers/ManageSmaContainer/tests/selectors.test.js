import { fromJS } from 'immutable';
import { makeSelectManageSmaContainer } from '../selectors';

describe('selectManageSmaContainerDomain', () => {
  it('should select the manage sma container domain', () => {
    const manageSmaContainer = fromJS({
      manageSmaContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      manageSmaContainer,
    });
    expect(makeSelectManageSmaContainer()(mockedState)).toMatchSnapshot();
  });
});
