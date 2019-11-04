/**
 *
 * Asynchronously loads the component for ExportTeacherMadeQuizzesContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
