/**
 *
 * ContentPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'components/LoadingBar';

import './ContentPanel.scss';

const ContentPanel = ({ children, loading, ...other }) => {
  const showLoading = () => ({ display: loading ? 'flex' : 'none' });
  const showContent = () => ({ display: loading ? 'none' : 'block' });

  return (
    <div className="content-panel" {...other}>
      <div className="content-panel__loading-bar" style={showLoading()}>
        <LoadingBar />
      </div>
      <div style={showContent()}>{children}</div>
    </div>
  );
};

ContentPanel.defaultProps = {
  loading: false,
};

ContentPanel.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};

export default ContentPanel;
