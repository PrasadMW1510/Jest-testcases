/**
 *
 * Asynchronously loads the component for Math180SkillsQuestions
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
