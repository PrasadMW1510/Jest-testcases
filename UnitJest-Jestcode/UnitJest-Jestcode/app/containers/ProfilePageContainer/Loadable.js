/**
 *
 * Asynchronously loads the component for ProfilePageContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
