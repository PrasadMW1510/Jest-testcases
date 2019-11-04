/**
 *
 * AboutSamLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './AboutSamLink.scss';

const AboutSamLink = ({ item, onAboutSAMClick }) => {
  const AboutSAMClick = e => {
    e.preventDefault();
    onAboutSAMClick({ item });
  };

  return (
    <div>
      <button onClick={AboutSAMClick} className="asl-btn-link">
        <span className="asl-btn-span">About SAM </span>
      </button>
    </div>
  );
};

AboutSamLink.propTypes = {
  item: PropTypes.array,
  onAboutSAMClick: PropTypes.func.isRequired,
};

export default AboutSamLink;
