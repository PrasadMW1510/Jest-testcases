/**
 *
 * LinkToExternalSAMApp
 *
 */

import React from 'react';
import { getBaseUrl } from 'utils/request';
import PropTypes from 'prop-types';

function LinkToExternalSAMApp({ relativeUrlPath = '', queryParamList = [], linkText }) {
  let fullUrl = getBaseUrl().concat('/', relativeUrlPath);
  const encodedQueryString = queryParamList
    .map(entry => `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1])}`)
    .join('&');
  if (encodedQueryString) {
    fullUrl = fullUrl.concat('?', encodedQueryString);
  }
  return (
    <a href={fullUrl} target="_blank">
      {linkText}
    </a>
  );
}

LinkToExternalSAMApp.propTypes = {
  relativeUrlPath: PropTypes.string,
  queryParamList: PropTypes.array,
  linkText: PropTypes.string.isRequired,
};

export default LinkToExternalSAMApp;
