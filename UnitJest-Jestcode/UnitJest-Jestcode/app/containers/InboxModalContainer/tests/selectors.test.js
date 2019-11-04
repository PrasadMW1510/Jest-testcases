import { fromJS } from 'immutable';
import makeSelectInboxModalContainer from '../selectors';

describe('search Results Container selector', () => {
  it('should select the search Results', () => {
    const inboxModalContainer = fromJS({
      inboxModalContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      inboxModalContainer,
    });

    expect(makeSelectInboxModalContainer()(mockedState)).toEqual(inboxModalContainer.toJS());
  });
});
