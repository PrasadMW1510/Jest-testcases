/**
 *
 * Asynchronously loads the component for AddAssignmentContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
