/**
 *
 * Asynchronously loads the component for XskillsSettingContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
