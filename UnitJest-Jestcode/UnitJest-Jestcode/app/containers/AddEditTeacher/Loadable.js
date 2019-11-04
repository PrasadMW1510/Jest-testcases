/**
 *
 * Asynchronously loads the component for AddEditTeacher
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
