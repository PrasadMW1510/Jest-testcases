/**
 *
 * Asynchronously loads the component for System44SuccessRecord
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
