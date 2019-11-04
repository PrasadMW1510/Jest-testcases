import { fromJS } from 'immutable';
import makeSelectInboxContainer from '../selectors';

describe('Inbox container selector', () => {
  it('should select the inbox', () => {
    const inboxContainer = fromJS({
      inboxContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      inboxContainer,
    });

    expect(makeSelectInboxContainer()(mockedState)).toEqual(inboxContainer.toJS());
  });
});
