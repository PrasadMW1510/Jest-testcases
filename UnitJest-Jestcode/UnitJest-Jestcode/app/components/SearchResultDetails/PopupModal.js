import React from 'react';
import './SearchResultDetails.scss';

class PopupModal extends React.Component {
  render() {
    return (
      <div>
        <div className="pop-up-container">
          <h4 className="error">ERROR</h4>
          <p className="error-msg">
            The page could not be loaded due to an error(s):<br />
            There was a server error. You can try again or, if the problem persists, contact your
            technical administrator.
          </p>
        </div>
      </div>
    );
  }
}

export default PopupModal;
