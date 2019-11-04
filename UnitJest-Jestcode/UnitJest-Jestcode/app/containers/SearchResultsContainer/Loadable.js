/**
 *
 * Asynchronously loads the component for SearchResultsContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
