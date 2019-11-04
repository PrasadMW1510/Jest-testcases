import { fromJS } from 'immutable';
import messageContainerReducer from '../reducer';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('messageContainerReducer', () => {
  const initialState = fromJS({
    error: false,
    loading: false,
    messages: [],
  });

  it('returns the initial state', () => {
    expect(messageContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('returns the initial state for MESSAGE_REQUEST action', () => {
    const updatedState = fromJS({
      error: false,
      loading: true,
      messages: [],
    });

    expect(messageContainerReducer(undefined, { type: Constants.GET_MESSAGES_REQUEST })).toEqual(
      fromJS(updatedState)
    );
  });

  it('updates the message for GET_MESSAGES_REQUEST_SUCCESS action', () => {
    const messageObj = {
      message: [{}, {}],
    };

    const updatedState = fromJS({
      error: false,
      loading: false,
      messages: messageObj.message,
    });

    expect(
      messageContainerReducer(undefined, Actions.getMessagesRequestSuccess(messageObj))
    ).toEqual(updatedState);
  });

  it('updates the messagesToDelete fro POST_DELETE_REQUEST_SUCCESS', () => {
    expect(messageContainerReducer(undefined, Actions.postDeleteRequestSuccess())).toEqual(
      initialState
    );
  });

  it('updates the error for POST_DELETE_REQUEST_FAILURE action', () => {
    const updatedState = fromJS({
      error: 'error',
      loading: false,
      messages: [],
    });

    expect(messageContainerReducer(undefined, Actions.postDeleteRequestFailure('error'))).toEqual(
      updatedState
    );
  });

  it('updates the error for GET_MESSAGES_REQUEST_FAILURE action', () => {
    const updatedState = fromJS({
      error: 'error',
      loading: false,
      messages: [],
    });

    expect(messageContainerReducer(undefined, Actions.getMessagesRequestFailure('error'))).toEqual(
      updatedState
    );
  });
});
