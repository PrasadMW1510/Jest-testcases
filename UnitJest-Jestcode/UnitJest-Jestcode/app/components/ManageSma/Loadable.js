/**
 *
 * Asynchronously loads the component for ManageSma
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
