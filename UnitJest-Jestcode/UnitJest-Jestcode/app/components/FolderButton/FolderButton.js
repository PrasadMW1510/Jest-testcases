/**
 *
 * FolderButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './FolderButton.scss';

function FolderButton(props) {
  return (
    <Link to={props.link} className="folder-btn">
      <div className="folder-btn__body">
        <img alt={props.folderTitle} src={props.imgSrc} />
        <div>{props.folderTitle}</div>
      </div>
    </Link>
  );
}

FolderButton.propTypes = {
  link: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  folderTitle: PropTypes.string,
};

export default FolderButton;
