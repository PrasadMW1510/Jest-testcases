import editDistrictProfileContainerReducer from '../reducer';

describe('editDistrictProfileContainerReducer', () => {
  it('returns the initial state', () => {
    expect(editDistrictProfileContainerReducer(undefined, {})).toMatchSnapshot();
  });
});
