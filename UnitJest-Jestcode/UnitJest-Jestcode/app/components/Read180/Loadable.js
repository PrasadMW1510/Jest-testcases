/**
 *
 * Asynchronously loads the component for Read180Ng
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
