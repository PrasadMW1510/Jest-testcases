import { createSelector } from 'reselect';

/**
 * Direct selector to the certificateInfo state domain
 */
const selectCertificateInfo = state => state.get('certificateInfo');

/**
 * Default selector used by ProgramcertificateContainer
 */
const makeSelectCertificateInfo = () => createSelector(selectCertificateInfo, substate => substate);

export default makeSelectCertificateInfo;
export { selectCertificateInfo };
