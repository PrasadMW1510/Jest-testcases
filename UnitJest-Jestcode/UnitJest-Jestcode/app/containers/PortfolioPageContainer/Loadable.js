/**
 *
 * Asynchronously loads the component for PortfolioPageContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
