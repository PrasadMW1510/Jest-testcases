/**
 *
 * Asynchronously loads the component for NoItemsSelectedModal
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
