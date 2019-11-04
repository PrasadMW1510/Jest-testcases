/**
 *
 * ResourcesItsview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getBaseUrl } from 'utils/request';

import './ResourcesITSView.scss';

function ResourcesITSView(props) {
  const getITSLaunchInteractive = sessionId => {
    const siteInfo = getBaseUrl().replace('/slms', '');
    return `${siteInfo}/subcommander/AutoLogin?zone=DTS&sid=${sessionId}`;
  };

  return (
    <div className="its-view">
      <span className="its-view__header">Interactive Teaching System (ITS)</span>
      <div className="its-view__content">
        {props.appInfo[0].text1[0]}
        <div className="its-view__content">
          {props.appInfo[0].text2[0]}
          <div className="its-view__button">
            <a href={getITSLaunchInteractive(props.sessionId)} target="_blank">
              <button className="its-view__button-content">
                Launch Interactive Teaching System
              </button>
            </a>
          </div>
          <div className="its-view__bottom">
            {`${props.appInfo[0].text3[0]} `}
            <a href={props.appInfo[0].ref_guide_url[0]} target="_blank">
              click here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

ResourcesITSView.propTypes = {
  appInfo: PropTypes.array.isRequired,
  sessionId: PropTypes.string,
};

export default ResourcesITSView;
