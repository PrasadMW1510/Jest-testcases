/**
 *
 * NavBarWithModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { showModal } from 'containers/ModalController/actions';
import NavBar, { NavItem } from 'components/NavBar';
import { OK_CANCEL_MODAL } from 'containers/ModalController/constants';

import './NavBarWithModalContainer.scss';

export class NavBarWithModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.tabs[0].id,
    };
  }

  handleTabClick = e => {
    e.preventDefault();
    this.props.showModal(OK_CANCEL_MODAL, {
      cancelLabel: this.props.cancelLabel,
      message: this.renderOkCancelModalMessage(),
      modalClassName: this.props.modalOverrideClassName,
      okLabel: this.props.okLabel,
      onOk: this.modalHandleOnOk,
      onOkParam: e.currentTarget.id,
      onCancel: this.modalHandleOnCancel,
      onCancelParam: this.state,
    });
  };

  modalHandleOnOk = activeTab => {
    if (this.props.onOkHandler) this.props.onOkHandler();
    this.setState({ activeTab });
  };

  modalHandleOnCancel = () => {
    if (this.props.onCancelHandler) this.props.onCancelHandler();
  };

  renderOkCancelModalMessage = () => <span>{this.props.message}</span>;

  renderChildren = () => {
    let renderFunction = null;

    this.props.tabs.forEach(tab => {
      if (tab.id === this.state.activeTab) {
        renderFunction = tab.renderFunction;
      }
    });

    return renderFunction();
  };

  render() {
    const { overrideClassName, tabs } = this.props;
    const { activeTab } = this.state;

    const classesNavBar = `nav-bar-with-modal__tabs ${overrideClassName}`;

    return (
      <div>
        <NavBar activeItemId={activeTab} className={classesNavBar} theme="tabs" palette="orange">
          {tabs.map(({ label, id }) => (
            <NavItem id={id} key={id} onClick={this.handleTabClick}>
              {label}
            </NavItem>
          ))}
        </NavBar>
        <div className="nav-bar-with-modal__tab-content">{this.renderChildren()}</div>
      </div>
    );
  }
}

NavBarWithModalContainer.defaultProps = {
  cancelLabel: 'No',
  modalOverrideClassName: '',
  message:
    'This action will cause you to lose any unsaved changes that you have made in the Grade Recording table. Would you like to continue?',
  okLabel: 'Yes',
  overrideClassName: '',
};

NavBarWithModalContainer.propTypes = {
  cancelLabel: PropTypes.string,
  message: PropTypes.string,
  modalOverrideClassName: PropTypes.string,
  onCancelHandler: PropTypes.func,
  okLabel: PropTypes.string,
  onOkHandler: PropTypes.func,
  overrideClassName: PropTypes.string,
  showModal: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
};

const withConnect = connect(null, { showModal });

export default compose(withConnect)(NavBarWithModalContainer);
