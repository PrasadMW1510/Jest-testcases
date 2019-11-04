/**
 *
 * Asynchronously loads the component for CatchAllClassWarning
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
