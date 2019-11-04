/**
 *
 * Asynchronously loads the component for Read180Swcr2
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
