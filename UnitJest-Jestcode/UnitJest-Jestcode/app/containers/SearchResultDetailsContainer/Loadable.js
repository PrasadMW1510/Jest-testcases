/**
 *
 * Asynchronously loads the component for SearchResultDetailsContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
