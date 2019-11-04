/**
 *
 * Asynchronously loads the component for CatchAllClassContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
