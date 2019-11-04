/**
 *
 * Asynchronously loads the component for ReactivateSchoolModalContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
