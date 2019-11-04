/**
 *
 * Asynchronously loads the component for ReactivateClassModalContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
