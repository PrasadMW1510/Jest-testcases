/**
 *
 * BooksPage
 *
 */

import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import BooksTabBar from 'components/BooksTabBar';
import BookExpert from 'components/BookExpert';
import makeSelectBooksPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import BookQuizContainer from '../BookQuizContainer/BookQuizContainer';

export class BooksPage extends React.Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="book-page-wrapper">
        <BooksTabBar />
        <div>
          <Switch>
            <Route path={`${path}/expert`} component={BookExpert} />
            <Route path={`${path}/quiz`} component={BookQuizContainer} />
            <Redirect to={`${path}/expert`} />
          </Switch>
        </div>
      </div>
    );
    // <span>Implementation pending...</span>;
  }
}

BooksPage.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
};

const mapStateToProps = createStructuredSelector({
  bookspage: makeSelectBooksPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'booksPage', reducer });
const withSaga = injectSaga({ key: 'booksPage', saga });

export default compose(withReducer, withSaga, withConnect)(BooksPage);
