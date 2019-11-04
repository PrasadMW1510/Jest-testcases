/**
 *
 * Asynchronously loads the component for CatchSystem44Class
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
