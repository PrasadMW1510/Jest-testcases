/*
 *
 * ModalController reducer
 *
 */
import { fromJS } from 'immutable';
import { SHOW_MODAL, HIDE_MODAL } from './constants';

const initialState = fromJS({
  openModals: [],
});

const newOpenModal = (state, action) => {
  // see if the modal type is already open; if so, prevent opening it again
  let openModals = state.get('openModals');
  const isAlreadyOpen = !!openModals.find(openModal => openModal.modalType === action.modalType);
  if (!isAlreadyOpen) {
    const newOpenModals = openModals.push({
      modalType: action.modalType,
      data: action.data,
    });
    openModals = state.set('openModals', newOpenModals);
  } else {
    openModals = state;
  }
  return openModals;
};

const closeTopModal = state => {
  const newOpenModals = state.get('openModals').pop();
  return state.set('openModals', newOpenModals);
};

function modalControllerReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return newOpenModal(state, action);
    case HIDE_MODAL:
      return closeTopModal(state);
    default:
      return state;
  }
}

export default modalControllerReducer;
