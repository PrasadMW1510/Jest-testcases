/**
 *
 * Asynchronously loads the component for System44SuccessRecordContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
