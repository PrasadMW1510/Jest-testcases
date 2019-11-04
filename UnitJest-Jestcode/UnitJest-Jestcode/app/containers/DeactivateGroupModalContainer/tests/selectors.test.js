import { fromJS } from 'immutable';
import { makeSelectDeactivateGroupModalContainer } from '../selectors';

describe('selectDeactivateGroupModalContainerDomain', () => {
  it('should return group deactivation', () => {
    const deactivateGroup = fromJS({
      deactivateGroup: { name: 'test' },
    });
    const mockedState = fromJS({
      deactivateGroup,
    });
    expect(makeSelectDeactivateGroupModalContainer()(mockedState)).toEqual(deactivateGroup);
  });
});
