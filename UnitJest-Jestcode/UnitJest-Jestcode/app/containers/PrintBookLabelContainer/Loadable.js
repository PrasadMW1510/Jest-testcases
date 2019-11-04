/**
 *
 * Asynchronously loads the component for PrintBookLabelContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
