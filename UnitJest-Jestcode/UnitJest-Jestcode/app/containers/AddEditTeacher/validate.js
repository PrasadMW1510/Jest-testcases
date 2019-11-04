import editAdminValidate from 'containers/EditAdminContainer/validate';
import getErrorMsg from 'utils/slmsErrors';

const validate = values => {
  // The first part of the teacher validate is the same as the admin validate
  const errors = editAdminValidate(values);
  const classes = values.get('classes');

  if (!classes || classes.size === 0) {
    errors.classes = getErrorMsg(161);
  }

  return errors;
};

export default validate;
