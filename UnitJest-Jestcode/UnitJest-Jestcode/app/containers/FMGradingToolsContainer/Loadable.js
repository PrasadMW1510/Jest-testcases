/**
 *
 * Asynchronously loads the component for FastMathGradingToolsContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
