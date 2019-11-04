/**
 *
 * Asynchronously loads the component for PrintQuizAndAnswerKeyContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
