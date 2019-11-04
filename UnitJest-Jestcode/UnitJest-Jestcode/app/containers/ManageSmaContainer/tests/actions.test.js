import * as Actions from '../actions';

describe('ManageSmaContainer Actions', () => {
  describe('Getting media server request', () => {
    it('Should return the correct constant for getMediaServersRequest', () => {
      expect(Actions.getMediaServersRequest()).toMatchSnapshot();
    });
    it('Should return the correct constant for handleMediaServersRequestSuccess', () => {
      const mediaServers = {};
      expect(Actions.handleMediaServersRequestSuccess(mediaServers)).toMatchSnapshot();
    });
    it('Should return the correct constant for handleMediaServersRequestFailure', () => {
      const error = {};
      expect(Actions.handleMediaServersRequestFailure(error)).toMatchSnapshot();
    });
  });
});
