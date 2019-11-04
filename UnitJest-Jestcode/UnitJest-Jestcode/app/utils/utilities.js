import { OrderedMap, fromJS } from 'immutable';
import { USER_TYPE } from 'containers/App/constants';
import r180ng from 'images/gateway_assets/btn_r180ng.png';
import rtngEnabled from 'images/gateway_assets/rtng_enabled.jpg';
import s44img from 'images/gateway_assets/btn_s44.png';

/**
 * formats date from yyyy-MM-dd to MM/dd/yyyy format
 *
 * @param inputDate
 * @returns {*}
 */
export const formatDate = inputDate => {
  // TODO: Eventually abandon this in favor of a third-party date library like 'moment'.
  let returnDate = null;
  let [year, month, date] = String(inputDate).split('-');
  year = year.length === 4 && parseInt(year, 10);
  month = parseInt(month, 10);
  date = parseInt(date, 10);
  // check number ranges
  if (year >= 1900 && (month <= 12 && month >= 1 && date <= 31 && date >= 1)) {
    returnDate = `${month}/${date}/${year}`;
  }
  return returnDate;
};

/**
 * Converts an iterable collection to a Map with the id extracted as the property name
 *
 * @param collection iterable collection
 * @param key the key to be extracted
 * @returns {*|Immutable.OrderedMap<any, any>|Immutable.OrderedMap<string, any>}
 */
export const fromJSToMap = (collection, key) =>
  OrderedMap(collection.map(item => [item[key].toString(), fromJS(item)]));

/**
 * Creates the password tool tip text based on configs definition and configType
 *
 * @param configs
 * @param configType
 * @returns {string}
 */
export const createPasswordToolTipText = (configs, configType) => {
  if (configs.length === 0) {
    return '';
  }

  const configObj = configs[0].config.filter(obj => obj.$.id === configType);

  const minLength = configObj[0].password_min_len[0];
  const maxLength = configObj[0].password_max_len[0];

  const enforceNumeric = configObj[0].password_enforce_numeric[0] === 'true';
  const enforceSpecialChars = configObj[0].password_enforce_special_chars[0] === 'true';
  const enforceMixedCase = configObj[0].password_enforce_mixed_case[0] === 'true';

  const requiredFirstSentence = `Passwords must contain between ${minLength} and ${maxLength} characters and cannot be only the user's first or last name or a combination of the two.`;
  const moreRestrictionsLeadInPhrase = ' Passwords must also contain at least one ';

  let passwordToolTip = '';

  // Password stringency requires only a minimum length:
  if (!enforceMixedCase && !enforceNumeric && !enforceSpecialChars) {
    passwordToolTip = requiredFirstSentence;
  }

  // Password stringency: must have mixed-case letters and a numeral
  if (enforceMixedCase && enforceNumeric && !enforceSpecialChars) {
    passwordToolTip = `${requiredFirstSentence +
      moreRestrictionsLeadInPhrase}upper case letter and one lower case letter, and one numeral.`;
  }

  // Password stringency: must have a numeral
  if (!enforceMixedCase && enforceNumeric && !enforceSpecialChars) {
    passwordToolTip = `${requiredFirstSentence + moreRestrictionsLeadInPhrase}numeral.`;
  }

  /*
  The following are seemly not being used.
  Just in case we find out we need them later, I decided to comment them out.

  // Password stringency: must have mixed-case letters
  if (enforceMixedCase && !enforceNumeric && !enforceSpecialChars) {
    passwordToolTip = `${requiredFirstSentence +
      moreRestrictionsLeadInPhrase}upper case and one lower case letter.`;
  }

  // Password stringency: mixed-case letters & numeral & spec char
  if (enforceMixedCase && enforceNumeric && enforceSpecialChars) {
    passwordToolTip = `${requiredFirstSentence +
      moreRestrictionsLeadInPhrase}upper case and one lower case letter, one numeral, and one of the following special characters: -, _, @, ^, or ~.`;
  }

  // Password stringency: must have mixed-case letters & spec char
  if (enforceMixedCase && !enforceNumeric && enforceSpecialChars) {
    passwordToolTip = `${requiredFirstSentence +
      moreRestrictionsLeadInPhrase}upper case and one lower case letter, and one of the following special characters: -, _, @, ^, or ~.`;
  }

  // Password stringency: must have a numeral and spec char
  if (!enforceMixedCase && enforceNumeric && enforceSpecialChars) {
    passwordToolTip = `${requiredFirstSentence +
      moreRestrictionsLeadInPhrase}numeral, and one of the following special characters: -, _, @, ^, or ~.`;
  }

  // Password stringency: must have spec char
  if (!enforceMixedCase && !enforceNumeric && enforceSpecialChars) {
    passwordToolTip = `${requiredFirstSentence +
      moreRestrictionsLeadInPhrase}of the following special characters: -, _, @, ^, or ~.`;
  }
  */

  return passwordToolTip;
};

/**
 * Returns true if a userType is  Admin or Tech user Type
 *
 * @param userType
 * @returns {boolean}
 */
export const isUserTypeAdminOrTech = userType =>
  userType === USER_TYPE.Administrator || userType === USER_TYPE.Tech;

/**
 * Validates if a string is in email format
 * Returns true, if it is a valid email format
 *
 * @param emailToValidate
 * @returns {boolean}
 */
export const isValidEmail = emailToValidate => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailToValidate).toLowerCase());
};

export const hasBlankString = formFieldObject =>
  !formFieldObject || formFieldObject.toString().trim().length === 0;

// sorts Data for table and grids

export const sortData = (a, b) => {
  /* eslint-disable no-param-reassign */
  a = a === null || a === undefined ? '' : a;
  b = b === null || b === undefined ? '' : b;

  a = Array.isArray(a) && Number(a[0]) > 0 ? Number(a[0]) : a;
  b = Array.isArray(b) && Number(b[0]) > 0 ? Number(b[0]) : b;

  a = typeof a === 'string' ? a.toLowerCase() : a;
  b = typeof b === 'string' ? b.toLowerCase() : b;

  // Most of the data ind SAM the table reads are in array ['MySampleData'] format
  // this line was added from the original defaultSortMethod in react-table

  a = Array.isArray(a) && typeof a[0] === 'string' ? a[0].toLowerCase() : a;
  b = Array.isArray(b) && typeof b[0] === 'string' ? b[0].toLowerCase() : b;

  /* eslint-enable no-param-reassign */
  // sort data before blanks
  if (a !== '' && b === '') {
    return -1;
  }
  if (b !== '' && a === '') {
    return 1;
  }
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  // returning 0, undefined or any falsey value will use subsequent sorts or
  // the index as a tiebreaker
  return 0;
};

export const checkProgramImg = commId => {
  switch (commId) {
    case 'R180NG':
      return r180ng;
    case 'RTNG':
      return rtngEnabled;
    case 'S44NG':
      return s44img;
    default:
      return '';
  }
};

/* can be used to transform server data to html. This resolves the problem of symbol element
codes showing as the literal codes, instead of the desired symbols the codes represent i.e.
&#174; should appear as a trademark symbol */

export const decodeHtml = html => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const isStrictlyNumeric = valAsString => /^[0-9\b]+$/.test(valAsString);
