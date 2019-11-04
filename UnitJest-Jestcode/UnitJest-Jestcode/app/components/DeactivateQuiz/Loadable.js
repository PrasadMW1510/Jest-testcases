/**
 *
 * Asynchronously loads the component for DeactivateQuiz
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
