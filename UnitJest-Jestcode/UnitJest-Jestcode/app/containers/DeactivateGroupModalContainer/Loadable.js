/**
 *
 * Asynchronously loads the component for DeactivateGroupContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
