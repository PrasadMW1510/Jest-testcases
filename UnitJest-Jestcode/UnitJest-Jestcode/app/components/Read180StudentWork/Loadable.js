/**
 *
 * Asynchronously loads the component for Read180StudentWork
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
