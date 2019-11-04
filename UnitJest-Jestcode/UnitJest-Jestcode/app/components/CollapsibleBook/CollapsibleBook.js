/**
 *
 * CollapsibleBook
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './CollapsibleBook.scss';

class CollapsibleBook extends React.Component {
  unCheck = e => {
    if (
      this.props.selectedata &&
      this.props.selectedata.findIndex(selItem => selItem === e.target.value) > -1
    ) {
      e.target.nextSibling.classList.remove('collapsible-book__checkbox--checked');
    } else {
      e.target.nextSibling.classList.add('collapsible-book__checkbox--checked');
    }
    this.props.callbackFromParent(e.target.value);
  };

  isChecked = id => {
    const index =
      this.props.selectedata && this.props.selectedata.findIndex(selItem => selItem === id[0]);
    if (index > -1) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <section className="collapsible-book__wrapper">
        {this.props.data && (
          <ul className="collapsible-book-list-container">
            {this.props.data.map(item => (
              <li key={item.id} className="collapsible-book-list-names">
                <input
                  id={item.name}
                  className="collapsible-book-input"
                  type="checkbox"
                  value={item.id}
                  onChange={this.unCheck}
                  checked={this.isChecked(item.id)}
                />
                {this.isChecked(item.id) === true && (
                  <span
                    className="collapsible-book__checkbox collapsible-book__checkbox--checked"
                    id={item.id}
                  />
                )}
                {this.isChecked(item.id) === false && (
                  <span className="collapsible-book__checkbox" id={item.id} />
                )}
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}

CollapsibleBook.propTypes = {
  data: PropTypes.array,
  selectedata: PropTypes.array,
  callbackFromParent: PropTypes.func,
};
export default CollapsibleBook;
