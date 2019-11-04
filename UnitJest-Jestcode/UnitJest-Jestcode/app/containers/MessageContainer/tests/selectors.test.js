import { fromJS } from 'immutable';
import makeSelectMessageContainer, { isMessageContainerLoading } from '../selectors';

describe('selectMessageContainerDomain', () => {
  it('should select the message container domain', () => {
    const messageContainer = fromJS({
      messageContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      messageContainer,
    });

    expect(makeSelectMessageContainer()(mockedState)).toEqual(messageContainer);
  });

  describe('isMessageContainerLoading', () => {
    it('should return true if mockState is undefined', () => {
      const messageContainer = undefined;
      const mockedState = fromJS({
        messageContainer,
      });

      expect(isMessageContainerLoading()(mockedState)).toBeTruthy();
    });

    it('should return loading prop', () => {
      const messageContainer = fromJS({
        loading: false,
      });
      const mockedState = fromJS({
        messageContainer,
      });

      expect(isMessageContainerLoading()(mockedState)).toBeFalsy();
    });
  });
});
