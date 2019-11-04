/**
 *
 * Asynchronously loads the component for StudentWorksContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
