/**
 *
 * Asynchronously loads the component for Read180NgAssaignment
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
