/**
 *
 * Asynchronously loads the component for TeacherMadeQuizQuestions
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
