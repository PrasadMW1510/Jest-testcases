/**
 *
 * Asynchronously loads the component for PSSettingContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
