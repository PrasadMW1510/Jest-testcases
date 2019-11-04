import * as Actions from '../actions';

describe('MessageContainer actions', () => {
  it('should return the correct constant for getMessageRequest', () => {
    expect(Actions.getMessageRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for getMessagesRequestSuccess', () => {
    expect(Actions.getMessagesRequestSuccess('message')).toMatchSnapshot();
  });

  it('should return the correct constant for getMessagesRequestFailure', () => {
    expect(Actions.getMessagesRequestFailure('error')).toMatchSnapshot();
  });

  it('should return the correct constant for postDeleteRequest', () => {
    expect(Actions.postDeleteRequest(['messageId'])).toMatchSnapshot();
  });

  it('should return the correct constant for postDeleteRequest, when passed nothing', () => {
    expect(Actions.postDeleteRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for postDeleteRequestSuccess', () => {
    expect(Actions.postDeleteRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for postDeleteRequestFailure', () => {
    expect(Actions.postDeleteRequestFailure('error')).toMatchSnapshot();
  });
});
