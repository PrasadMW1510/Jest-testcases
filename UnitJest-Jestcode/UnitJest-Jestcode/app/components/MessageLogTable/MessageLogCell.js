/**
 *
 * MessageLogCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getBaseUrl } from 'utils/request';

const MessageLogCell = ({ rowData, link, onShowMeClick }) => {
  const showMeClick = e => {
    e.preventDefault();

    const payloadType = rowData.payload[0].$.type;
    const payloadData = rowData.payload[0]._;

    switch (payloadType) {
      case 'url': {
        // TODO: extracting/splitting the base URL into a set of constants, one of which is the context path, i.e., /slms
        // getBaseUrl() returns url with /slms at the end. This will remove that.
        let baseURL = getBaseUrl();
        baseURL = baseURL.substr(0, baseURL.length - 5);
        window.open(baseURL + payloadData);
        break;
      }
      case 'text':
        onShowMeClick({ payloadData });
        break;
      default:
        break;
    }
  };

  let cell;

  cell = (
    <div className="msg-log-table__message-td-cell">
      <span>{rowData.message_title}</span>
    </div>
  );

  if (link) {
    cell = (
      <div className="msg-log-table__message-td-cell ">
        <button className="msg-log-table__message-col-link-button" onClick={showMeClick}>
          Show me ...
        </button>
      </div>
    );
  }

  return cell;
};

MessageLogCell.propTypes = {
  link: PropTypes.bool,
  rowData: PropTypes.object,
  onShowMeClick: PropTypes.func,
};

export default MessageLogCell;
