/**
 *
 * MessageLog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import MessageLogTable from 'components/MessageLogTable';
import MessageLogFilter from 'components/MessageLogFilter';
import { ALL_PRODUCT_FILTER } from 'containers/MessageContainer/constants';

import './MessageLog.scss';

class MessageLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageIdsChecked: [],
      productFilter: ALL_PRODUCT_FILTER,
      selectAll: false,
    };
  }

  handleRowCheckboxOnChange = (isChecked, messageId) => {
    this.setState(previousState => {
      let messageIdsChecked = previousState.messageIdsChecked;

      if (isChecked) {
        messageIdsChecked.push(messageId);
      } else {
        messageIdsChecked = messageIdsChecked.filter(element => element !== messageId);
      }

      return { messageIdsChecked };
    });
  };

  toggleAllCheckboxes = (isChecked, messageIds) => {
    this.setState({
      messageIdsChecked: messageIds,
      selectAll: isChecked,
    });
  };

  handleDeleteClicked = e => {
    e.preventDefault();

    if (this.state.messageIdsChecked.length > 0) {
      this.props.handleDeleteOnClick(this.state.messageIdsChecked);

      this.setState({
        messageIdsChecked: [],
        selectAll: false,
      });
    }
  };

  handleProductFilter = product => {
    // We need to clear out the messageIdsChecked from state when we select a filter
    this.setState({ messageIdsChecked: [], productFilter: product, selectAll: false });
  };

  filterMessages = value => {
    // If we are filtering by all products we want to return true.
    if (this.state.productFilter === ALL_PRODUCT_FILTER) {
      return true;
    }

    return this.state.productFilter === value.product[0];
  };

  render() {
    return (
      <div className="msg-log">
        <MessageLogFilter
          productsAvailable={this.props.productsAvailable}
          handleProductFilter={this.handleProductFilter}
        />

        <MessageLogTable
          messages={this.props.messages.filter(this.filterMessages)}
          messageIdsChecked={this.state.messageIdsChecked}
          selectAll={this.state.selectAll}
          handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
          onShowMeClick={this.props.onShowMeClick}
          toggleAllCheckboxes={this.toggleAllCheckboxes}
        />
        <div className="msg-log__footer">
          <button onClick={this.handleDeleteClicked} className="msg-log__delete-btn">
            Delete Checked
          </button>
          {
            // TODO: This is not working in Flash SAM, so we are ignoring it right now.
            /* <div className="msg-log__statusbar-wrapper">
            <MessageLogStatusBar />
          </div>*/
          }
        </div>
      </div>
    );
  }
}

MessageLog.defaultProps = {
  messages: [],
  productsAvailable: [],
};

MessageLog.propTypes = {
  messages: PropTypes.array,
  productsAvailable: PropTypes.array,
  handleDeleteOnClick: PropTypes.func.isRequired,
  onShowMeClick: PropTypes.func.isRequired,
};

export default MessageLog;
