/**
 *
 * Asynchronously loads the component for AdvancedSearchContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
