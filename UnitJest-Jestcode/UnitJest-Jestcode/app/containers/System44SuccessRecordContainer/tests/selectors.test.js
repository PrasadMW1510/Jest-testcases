import { fromJS } from 'immutable';
import makeSelectSystem44SuccessRecordContainer from '../selectors';

describe('Inbox container selector', () => {
  it('should select the inbox', () => {
    const system44SuccessRecordContainer = fromJS({
      system44SuccessRecordContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      system44SuccessRecordContainer,
    });

    expect(makeSelectSystem44SuccessRecordContainer()(mockedState)).toEqual(
      system44SuccessRecordContainer.toJS()
    );
  });
});
