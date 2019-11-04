/*
 *
 * LoadingController actions
 *
 */

import { SHOW_LOADING, HIDE_LOADING } from './constants';

/**
 * Show the app level loading
 *
 * @returns {{type}}
 */
export function showLoading() {
  return {
    type: SHOW_LOADING,
  };
}

/**
 * Hide the app level loading
 *
 * @returns {{type}}
 */
export function hideLoading() {
  return {
    type: HIDE_LOADING,
  };
}
