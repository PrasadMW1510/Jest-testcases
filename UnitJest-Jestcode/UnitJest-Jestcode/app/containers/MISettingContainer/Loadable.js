/**
 *
 * Asynchronously loads the component for MISetting
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
