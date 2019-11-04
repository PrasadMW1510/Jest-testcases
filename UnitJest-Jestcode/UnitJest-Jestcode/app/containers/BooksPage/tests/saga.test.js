/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
import defaultSaga from '../saga';

describe('BooksPage Saga', () => {
  let generator = null;

  beforeEach(() => {
    generator = defaultSaga();
  });

  it('Expect to do nothing', () => {
    expect(generator.next().value).toBeUndefined();
  });
});
