/**
 *
 * Asynchronously loads the component for DeactivateModalContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
