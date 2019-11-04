/**
 *
 * Asynchronously loads the component for RSkillsCCSettingContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
