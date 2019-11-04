import getErrorMsg from 'utils/slmsErrors';
import { isValidEmail } from 'utils/utilities';

const validate = values => {
  // Return an object with appropriate errors mapped to field-name keys --
  // or empty if no errors. For example, a field named `foo` would have a
  // corresponding key in the return error object `{foo: "my foo error"}`.
  const errors = {};

  // District Profile tab
  const name = values.get('name');
  const startOfDay = values.get('start_of_day');
  const endOfDay = values.get('end_of_day');

  if (!name || name.trim().length === 0) {
    errors.name = getErrorMsg(137);
  }
  // const schoolTypes = values.get(FORM_FIELD_NAMES.SchoolTypes);
  if (startOfDay > endOfDay || startOfDay === endOfDay) {
    errors.school_hours = getErrorMsg(-3);
  }

  // Contact Info tab
  const emailAddress1 = values.get('email_address1');

  if (!emailAddress1 || emailAddress1.trim().length === 0 || !isValidEmail(emailAddress1)) {
    errors.email_address1 = getErrorMsg(175);
  }

  return errors;
};

export default validate;
