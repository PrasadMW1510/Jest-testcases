/**
 *
 * PortfolioTreeMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import folderImage from 'images/yellow_folder.png';
import OpenFolderImage from 'images/open_yellow_folder.png';
import fileImage from 'images/file.png';

const TreebeardDecorator = ({ style, node }) => {
  if (node.name === 'Loading') {
    return node.name;
  }
  const iconType = node.children ? 'folder' : 'file-text';
  const iconClass = `fa fa-${iconType}`;
  let nodeIcon = null;
  switch (iconType) {
    case 'folder':
      nodeIcon = node.toggled ? OpenFolderImage : folderImage;
      break;
    default:
      nodeIcon = fileImage;
      break;
  }
  return (
    <div style={style.base} className="portfolio-treenode">
      <div style={style.title} className="portfolio-treenode">
        <i className={iconClass}>
          <img style={{ width: '18px' }} alt="" src={nodeIcon} />
        </i>
        {node.name}
      </div>
    </div>
  );
};

TreebeardDecorator.propTypes = {
  style: PropTypes.object,
  node: PropTypes.object,
};

export default TreebeardDecorator;
