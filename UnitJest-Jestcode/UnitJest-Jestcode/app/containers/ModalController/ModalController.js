/**
 *
 * ModalController
 * Put all your modals here.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { makeSelectGlobal } from 'containers/App/selectors';
import ErrorModalContainer from 'containers/ErrorModalContainer/Loadable';
import makeSelectModalController, {
  selectOpenModals,
  selectOpenModalData,
  selectOpenModalType,
} from './selectors';
import reducer from './reducer';
import * as Config from './config';

/**
 * Clones a list of modal components, adding keys (because the modals are all sibling elements) and
 * the data that each one relies on from Redux.
 *
 * Note:  It's tempting to try to use an HOC for this, however this method is invoked dynamically
 * during the render of ModalController, which is not suitable for HOC's (see
 * https://reactjs.org/docs/higher-order-components.html ).
 *
 * @param components The list of components to decorate
 * @param modalControllerState The modal controller state object, as retrieved from Redux.
 */
const cloneWithDataAndKeys = (components, modalControllerState) =>
  components.map((component, keyIndex) =>
    React.cloneElement(component, {
      data: selectOpenModalData(modalControllerState, keyIndex),
      key: selectOpenModalType(modalControllerState, keyIndex),
    })
  );

export function ModalController(props) {
  // Error modals have the highest precedence. Show an error modal only if logged in.
  if (props.global.get('error') && props.global.get('currentUser')) {
    // TODO  simple toString might not be robust enough 5/23/2018
    let err = props.global.get('error');
    if (typeof err !== 'string') err = err.toString();
    return <ErrorModalContainer error={err} shouldLogout />;
  }
  const openModals = selectOpenModals(props.modalController);
  let modalsToBeRendered = openModals.map(
    openModal => Config.MODAL_ID_MAPPINGS[openModal.modalType]
  );
  modalsToBeRendered = cloneWithDataAndKeys(modalsToBeRendered, props.modalController);
  return <React.Fragment>{modalsToBeRendered}</React.Fragment>;
}

ModalController.propTypes = {
  modalController: PropTypes.object.isRequired,
  global: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modalController: makeSelectModalController(),
  global: makeSelectGlobal(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'modalController', reducer });

export default compose(withReducer, withConnect)(ModalController);
