/**
 *
 * Asynchronously loads the component for DeleteInactiveSuccessModal
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
