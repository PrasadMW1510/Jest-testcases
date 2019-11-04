/**
 *
 * About-Sam-Link-Modal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import samlogoIcon from 'images/SAM-logo.jpg';
import SAM_SERVER_NAME from 'components/AboutSamLinkModal/constants';
import './AboutSamLinkModal.scss';
import { getServerName } from '../../utils/request';

function AboutSamLinkModal(props) {
  function renderDropList() {
    return props.item.map(product => (
      <div className="asl-link-modal-table-container__rows" key={product.name}>
        <input
          className="asl-link-modal-table-container__triangle"
          type="checkbox"
          defaultChecked=""
          name="tabs2"
          id={product.name}
        />

        <label
          key={product}
          className="asl-link-modal-table-container__prodname"
          htmlFor={product.name}
        >
          {product.name} <span>(v </span> {product.version} <span>)</span>{' '}
        </label>
        <div className="asl-link-modal-table-container__content">
          <div className="asl-link-modal-table-details">
            <div className="asl-link-modal-table-details__enabled">
              {'Enabled: '}
              <span className="asl-link-modal-table-details__enabledspan">
                {getEnabledText(product.Enabled)}
              </span>
            </div>
            <span>{'SERVER'}</span>
            <div className="asl-link-modal-table-details__server">
              {'server build number: '}
              {product.version}
              <br />
            </div>
            {/* To Do waiting for business approval <span >{'CLIENT'}</span>*/}
            {/* <div className="asl-link-modal-table-details__client">{'client build number: '} <br /> {'client build date: '}<br /> </div>*/}
            {renderMediaInfo(product.MediaBuildNumber)}
            <div className="asl-link-modal-table-details__supernumber">
              {'Supernumber: '}{' '}
              <span className="asl-link-modal-table-details__supernumberspan">
                {product.supernumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  }
  function renderSamVersion() {
    return props.item.filter(e => e.name === SAM_SERVER_NAME).map(e => e.version);
  }
  function getEnabledText(text) {
    if (text === 'true') {
      return 'yes';
    }

    return 'no';
  }
  function renderMediaInfo(media) {
    if (!(media === '')) {
      return (
        <div>
          <span>{'MEDIA'}</span>
          <div className="asl-link-modal-table-details__media">
            {'media build number: '} {media}{' '}
          </div>
        </div>
      );
    }
    return null;
  }
  return (
    <SAMModal
      isOpen={props.isOpen}
      contentLabel="About SAM"
      modalClassModifier="asl-link-sam-modal"
    >
      <div className="asl-link-modal-container">
        <div className="asl-link-modal-header-modal">
          <img
            className="asl-link-modal-header-modal__img"
            key="samlogo"
            alt="samlogo"
            src={samlogoIcon}
            height="100%"
            width="40%"
            position="absolute"
          />
          <span className="asl-link-modal-header-modal__version">
            {' '}
            Version {renderSamVersion()}{' '}
          </span>
        </div>
        <div className="asl-link-modal-table-container">{renderDropList(props.item)}</div>
        <div className="asl-link-modal-footer-modal">
          <span className="asl-link-modal-footer-modal__url">
            SAM Server address: {getServerName()}
          </span>
          <button className="asl-link-modal-footer-modal__close" onClick={props.onOk}>
            Close
          </button>
        </div>
      </div>
    </SAMModal>
  );
}

AboutSamLinkModal.propTypes = {
  isOpen: PropTypes.bool,
  onOk: PropTypes.func,
  item: PropTypes.array.isRequired,
};

export default AboutSamLinkModal;
