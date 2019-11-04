/**
 *
 * Asynchronously loads the component for InboxProgram
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
