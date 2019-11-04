import { fromJS } from 'immutable';
import { makeSelectDeactivateSchoolModalContainer } from '../selectors';

describe('makeSelectDeactivateSchoolModalContainer', () => {
  it('should return school deactivation', () => {
    const deactivateSchool = fromJS({
      deactivateSchool: { name: 'test' },
    });
    const mockedState = fromJS({
      deactivateSchool,
    });
    expect(makeSelectDeactivateSchoolModalContainer()(mockedState)).toEqual(deactivateSchool);
  });
});
