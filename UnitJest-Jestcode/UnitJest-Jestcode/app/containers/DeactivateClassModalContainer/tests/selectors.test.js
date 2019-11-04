import { fromJS } from 'immutable';
import { makeSelectDeactivateClassModalContainer } from '../selectors';

describe('makeSelectDeactivateSchoolModalContainer', () => {
  it('should return class deactivation', () => {
    const deactivateClass = fromJS({
      deactivateClass: { name: 'test' },
    });
    const mockedState = fromJS({
      deactivateClass,
    });
    expect(makeSelectDeactivateClassModalContainer()(mockedState)).toEqual(deactivateClass);
  });
});
