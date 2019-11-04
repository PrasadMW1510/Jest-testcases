/**
 *
 * Asynchronously loads the component for ActivateQuizContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
