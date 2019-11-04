import getErrorMsg from 'utils/slmsErrors';
import { isValidEmail } from 'utils/utilities';

const validate = values => {
  const errors = {};
  const districtUserId = values.get('district_user_id');
  const firstName = values.get('first_name');
  const lastName = values.get('last_name');
  const email = values.get('email');
  const username = values.get('user_name');
  const password = values.get('password');
  const confirmPassword = values.get('password_confirm');

  if (!districtUserId || districtUserId.trim().length === 0) {
    errors.district_user_id = getErrorMsg(236);
  }

  if (!firstName || firstName.trim().length === 0) {
    errors.first_name = getErrorMsg(110);
  }

  if (!lastName || lastName.trim().length === 0) {
    errors.last_name = getErrorMsg(120);
  }

  if (!email || email.trim().length === 0 || !isValidEmail(email)) {
    errors.email = getErrorMsg(140);
  }

  if (!username || username.trim().length === 0) {
    errors.user_name = getErrorMsg(130);
  }

  if (username && username.trim().length > 0 && username.trim().length < 3) {
    errors.user_name = getErrorMsg(129);
  }

  if (!password || password.trim().length === 0) {
    errors.password = getErrorMsg(134);
  }

  if (!confirmPassword || confirmPassword.trim().length === 0) {
    errors.password_confirm = getErrorMsg(142);
  }

  if (password && confirmPassword && password !== confirmPassword) {
    errors.password = getErrorMsg(142);
    errors.password_confirm = true;
  }

  return errors;
};

export default validate;
