/**
 *
 * Asynchronously loads the component for R180NGSetting
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
