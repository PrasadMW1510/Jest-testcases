/**
 *
 * Asynchronously loads the component for CatchAllClass
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
