/**
 *
 * Asynchronously loads the component for IreadScreenerModalContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
