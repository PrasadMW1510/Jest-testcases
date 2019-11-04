/**
 *
 * Asynchronously loads the component for BookQuizContainer
 *
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
