/**
 *
 * Asynchronously loads the component for IReadStudentWork
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
