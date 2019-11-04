/**
 *
 * Asynchronously loads the component for TeacherMadeQuizList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
