import manageSmaContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('manageSmaContainerReducer', () => {
  it('returns the initial state', () => {
    expect(manageSmaContainerReducer(undefined, { loading: true })).toMatchSnapshot();
  });

  it('should handle GET_MEDIA_SERVERS_REQUEST', () => {
    expect(
      manageSmaContainerReducer(undefined, Actions.getMediaServersRequest())
    ).toMatchSnapshot();
  });

  it('should handle GET_MEDIA_SERVERS_REQUEST_SUCCESS', () => {
    expect(
      manageSmaContainerReducer(
        undefined,
        Actions.handleMediaServersRequestSuccess([{ name: 'mockServer1' }])
      )
    ).toMatchSnapshot();
  });

  it('should handle GET_MEDIA_SERVERS_REQUEST_FAILURE', () => {
    expect(
      manageSmaContainerReducer(undefined, Actions.handleMediaServersRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
