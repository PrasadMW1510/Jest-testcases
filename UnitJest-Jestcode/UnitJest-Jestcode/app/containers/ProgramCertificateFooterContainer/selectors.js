import { createSelector } from 'reselect';

/**
 * Direct selector to the certificatePrintPdfContainer state domain
 */
const selectCertificatePrintPdfContainerDomain = state => state.get('certificatePrint');

/**
 * Other specific selectors
 */

/**
 * Default selector used by CertificatePrintPdfContainer
 */

const makeSelectCertificatePrintPdfContainer = () =>
  createSelector(selectCertificatePrintPdfContainerDomain, substate => substate);

export default makeSelectCertificatePrintPdfContainer;
export { selectCertificatePrintPdfContainerDomain };
