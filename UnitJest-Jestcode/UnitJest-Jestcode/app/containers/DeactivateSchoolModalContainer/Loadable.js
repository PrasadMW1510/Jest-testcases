/**
 *
 * Asynchronously loads the component for DeactivateSchoolModalContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
