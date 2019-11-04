/**
 *
 * Asynchronously loads the component for SystemRecordingPopUp
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
