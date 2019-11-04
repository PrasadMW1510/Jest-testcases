/**
 *
 * Asynchronously loads the component for ClassAssignModalContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
