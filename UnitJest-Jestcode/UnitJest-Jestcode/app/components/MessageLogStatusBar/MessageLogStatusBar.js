/**
 *
 * MessageLogStatusBar
 *
 */

import React from 'react';

import './MessageLogStatusBar.scss';

function MessageLogStatusBar() {
  return (
    <div className="msg-log__statusbar">
      <div className="ack-span">0 acknowledgments</div>
      <div className="notify-span">0 notifications</div>
      <div className="alerts-span">0 alerts</div>
      <div className="reminders-span">0 reminders</div>
    </div>
  );
}

MessageLogStatusBar.propTypes = {};

export default MessageLogStatusBar;
