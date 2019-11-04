/**
 *
 * Asynchronously loads the component for CatchAllClassMath180
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
