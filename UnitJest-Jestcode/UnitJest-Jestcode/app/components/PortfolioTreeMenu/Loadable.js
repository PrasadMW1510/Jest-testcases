/**
 *
 * Asynchronously loads the component for PortfolioTreeMenu
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
