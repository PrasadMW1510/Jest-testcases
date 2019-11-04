import React from 'react';
import { BOOK_EXPERT_URL } from 'utils/externalLinkConstants';
import './BookExpert.scss';

export class BookExpert extends React.Component {
  render() {
    return (
      <div className="book-expert-page">
        <a href={BOOK_EXPERT_URL} target="_blank" className="book-expert-button">
          BOOK EXPERT ONLINE
        </a>
      </div>
    );
  }
}

export default BookExpert;
