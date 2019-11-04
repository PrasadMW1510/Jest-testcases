import React from 'react';
import './ActivateQuiz.scss';

class PopupModal extends React.Component {
  render() {
    return (
      <div>
        <div className="pop-up-container">
          <h4 className="error">ERROR</h4>
          <p className="error-msg">
            The page could not be loaded due to an error(s):<br />
            There was an error sending data to the server. Try clicking Save again. You can also
            click Cancel, reopen this window and try again.
          </p>
        </div>
      </div>
    );
  }
}

export default PopupModal;
