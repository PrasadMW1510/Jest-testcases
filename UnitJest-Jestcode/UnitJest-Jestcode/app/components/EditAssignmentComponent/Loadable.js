/**
 *
 * Asynchronously loads the component for EditAssignmentComponent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
