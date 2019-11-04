/**
 *
 * Asynchronously loads the component for CatchiReadClass
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
