/**
 *
 * Asynchronously load the component for PrintBooklabel
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
