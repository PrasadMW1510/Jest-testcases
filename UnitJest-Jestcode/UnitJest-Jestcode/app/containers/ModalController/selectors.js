import { createSelector } from 'reselect';

/**
 * Direct selector to the modalController state domain
 */
const selectModalControllerDomain = state => state.get('modalController');

/**
 * Simple Selectors
 *
 * These methods are too basic to memoize, and return quick properties off of the local Redux state.
 *
 */

const selectOpenModals = modalControllerState => modalControllerState.get('openModals');

/**
 * Dynamic Selectors
 *
 * These methods are parameterized, and as such, cannot be implemented with reselect.
 */

const selectOpenModalData = (modalControllerState, modalIndex) =>
  modalControllerState.getIn(['openModals', modalIndex]).data;

const selectOpenModalType = (modalControllerState, modalIndex) =>
  modalControllerState.getIn(['openModals', modalIndex]).modalType;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ModalController
 */

const makeSelectModalController = () =>
  createSelector(selectModalControllerDomain, substate => substate);

export default makeSelectModalController;
export { selectModalControllerDomain, selectOpenModals, selectOpenModalData, selectOpenModalType };
