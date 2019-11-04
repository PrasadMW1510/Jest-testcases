/**
 *
 * Asynchronously loads the component for Read180NgContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
