/**
 *
 * Asynchronously loads the component for PrintCustomQuizList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
