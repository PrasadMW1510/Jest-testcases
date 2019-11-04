/**
 *
 * Asynchronously loads the component for ReportsPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
