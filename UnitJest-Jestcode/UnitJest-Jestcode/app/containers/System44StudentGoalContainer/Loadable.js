/**
 *
 * Asynchronously loads the component for System44StudentGoalContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
