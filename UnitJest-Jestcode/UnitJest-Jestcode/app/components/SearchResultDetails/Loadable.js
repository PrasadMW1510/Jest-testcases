/**
 *
 * Asynchronously loads the component for SearchResultDetails
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
