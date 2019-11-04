import getErrorMsg from 'utils/slmsErrors';

const validate = values => {
  const errors = {};
  const grades = values.get('grades');
  const name = values.get('name');

  if (!name || name.trim().length === 0) {
    errors.name = getErrorMsg(136);
  }
  if (!grades || grades.size === 0) {
    errors.grades = getErrorMsg(152);
  }
  return errors;
};

export default validate;
