/**
 *
 * Asynchronously loads the component for StudentWorkProgramsContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
