/**
 *
 * Asynchronously loads the component for AddEditClass
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
