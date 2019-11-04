import getErrorMsg from 'utils/slmsErrors';

const validate = values => {
  const errors = {};
  const classes = values.get('classes');
  const sisId = values.get('sis_id');
  const firstName = values.get('first_name');
  const lastName = values.get('last_name');
  const grade = values.get('grade');
  const userName = values.get('user_name');
  const password = values.get('password');
  const passwordConfirm = values.get('password_confirm');
  const dob = values.get('birth_date');

  if (!sisId || sisId.trim().length === 0) {
    errors.sis_id = getErrorMsg(132);
  }

  if (!firstName || firstName.trim().length === 0) {
    errors.first_name = getErrorMsg(110);
  }

  if (!lastName || lastName.trim().length === 0) {
    errors.last_name = getErrorMsg(120);
  }

  if (!grade || grade.trim().length === 0) {
    errors.grade = getErrorMsg(133);
  }

  if (!userName || userName.trim().length === 0) {
    errors.user_name = getErrorMsg(130);
  }

  if (!password || password.trim().length === 0) {
    errors.password = getErrorMsg(134);
  } else if (password && password.trim().length > 0 && password !== passwordConfirm) {
    errors.password = getErrorMsg(142);
    errors.password_confirm = true;
  }

  if (!passwordConfirm || passwordConfirm.trim().length === 0) {
    errors.password_confirm = true;
  }

  if (dob && !validateDate(dob)) {
    errors.birth_date = getErrorMsg(141);
  }

  if (!classes || !classes.size) {
    errors.classes = getErrorMsg(150);
  }

  return errors;
};

// TODO Move to form utils
// Check if date is in form mm/dd/yyyy
function validateDate(d) {
  const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3[01])\/\d{4}$/;
  return dateRegex.test(d);
}

export default validate;
