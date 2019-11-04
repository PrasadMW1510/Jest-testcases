/**
 *
 * HeaderImage
 *
 */

import React from 'react';
import myImage from 'images/SLMS_logo.jpg';

import './HeaderImage.scss';

const HeaderImage = () => <img className="header-img" src={myImage} alt="SAM" />;

HeaderImage.propTypes = {};

export default HeaderImage;
