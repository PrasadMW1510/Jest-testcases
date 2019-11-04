import { fromJS } from 'immutable';
import makeSelectRead180StudentWorkContainer from '../selectors';

describe('make Select Search Result Details Container', () => {
  it('should select the makeSelect makeSelectCustomListContainer', () => {
    const read180StudentWorkContainer = fromJS({
      read180StudentWorkContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      read180StudentWorkContainer,
    });

    expect(makeSelectRead180StudentWorkContainer()(mockedState)).toEqual(
      read180StudentWorkContainer.toJS()
    );
  });
});
