/**
 * Created by luib <Brian.Lui@hmhco.com> on 1/11/18.
 */
import cookie from 'react-cookies';
import * as CookieManager from '../cookieManager';

// mock out react-cookies
jest.mock('react-cookies', () => ({
  load: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
}));

describe('Cookie Manager', () => {
  it('should get the SSO referrer', () => {
    CookieManager.getSSOReferrer();
    expect(cookie.load).toHaveBeenCalledWith('slmsclient_referrer');
  });

  it('should get the SSO SLMS ID', () => {
    CookieManager.getSSOSLMSId();
    expect(cookie.load).toHaveBeenCalledWith('slmsclient_sid');
  });

  it('should get the local SLMS ID', () => {
    CookieManager.getLocalSLMSId();
    expect(cookie.load).toHaveBeenCalledWith('slmsclient_local_sid');
  });

  it('should delete the local SLMS ID', () => {
    CookieManager.deleteLocalSLMSId();
    expect(cookie.remove).toHaveBeenCalledWith('slmsclient_local_sid');
  });

  it('should save the local SLMS ID', () => {
    const SLMS_ID = 'foobar';
    CookieManager.saveLocalSLMSId(SLMS_ID);
    expect(cookie.save).toHaveBeenCalledWith('slmsclient_local_sid', SLMS_ID);
  });
});
