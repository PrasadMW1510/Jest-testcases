/**
 *
 * Asynchronously loads the component for EditAdminContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
