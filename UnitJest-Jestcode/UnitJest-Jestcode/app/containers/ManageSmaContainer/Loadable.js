/**
 *
 * Asynchronously loads the component for ManageSmaContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
