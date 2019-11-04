import { fromJS } from 'immutable';
import makeSelectRead180NgContainer from '../selectors';

describe('Read 180 Ng Containerselector', () => {
  it('should select the read 180 Ng', () => {
    const read180NgContainer = fromJS({
      read180NgContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      read180NgContainer,
    });
    expect(makeSelectRead180NgContainer()(mockedState)).toEqual(read180NgContainer.toJS());
  });
});
