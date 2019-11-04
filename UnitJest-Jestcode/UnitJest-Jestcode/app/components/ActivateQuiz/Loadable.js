/**
 *
 * Asynchronously loads the component for ActivateQuiz
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
