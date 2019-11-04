/**
 *
 * Asynchronously loads the component for DeactivateModalSuccessContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
