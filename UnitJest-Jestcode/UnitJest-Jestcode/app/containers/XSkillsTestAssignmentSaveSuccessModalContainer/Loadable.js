/**
 *
 * Asynchronously loads the component for XSkillsTestAssignmentSaveSuccessModalContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
