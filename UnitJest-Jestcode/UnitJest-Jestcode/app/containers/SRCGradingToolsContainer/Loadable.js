/**
 *
 * Asynchronously loads the component for SRCGradingTools
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
