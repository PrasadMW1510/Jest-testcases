/**
 *
 * Asynchronously loads the component for AddAssignmentComponent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
