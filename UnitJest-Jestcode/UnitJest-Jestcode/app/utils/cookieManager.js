import cookie from 'react-cookies';

/**
 * Your one-stop place for all your cookie needs.
 *
 * Created by luib <Brian.Lui@hmhco.com> on 1/10/18.
 */

/* SSO cookies */
export const getSSOReferrer = () => cookie.load('slmsclient_referrer');
export const getSSOSLMSId = () => cookie.load('slmsclient_sid');

/* non-SSO cookies */
export const getLocalSLMSId = () => cookie.load('slmsclient_local_sid');
export const deleteLocalSLMSId = () => cookie.remove('slmsclient_local_sid');
export const saveLocalSLMSId = id => cookie.save('slmsclient_local_sid', id);
