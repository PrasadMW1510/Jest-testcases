/**
 * Utility methods, e.g. normalizers, parsers, and formatters
 * used with redux-form.
 */

/**
 * Redux-form normalizer for zip codes:
 * Allows digits, spaces, and dashes; between 1 and 10 characters
 *
 * @param newValue New value in the input field
 * @param previousValue Previous value in the input field
 * @returns {*}
 */
export const normalizeZipCode = (newValue, previousValue) => {
  const isValid = /^[0-9\s-]{0,10}$/.test(newValue);
  return isValid ? newValue : previousValue;
};
