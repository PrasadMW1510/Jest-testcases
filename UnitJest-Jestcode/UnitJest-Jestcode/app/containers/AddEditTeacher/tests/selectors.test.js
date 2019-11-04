import { fromJS } from 'immutable';
import { makeSelectFormErrors, makeSelectSubmitErrors } from '../selectors';
import { FORM_TEACHER_PROFILE } from '../constants';

describe('selectAddEditTeacherDomain', () => {
  it('should select the form errors', () => {
    const form = fromJS({
      [FORM_TEACHER_PROFILE]: {
        syncErrors: { foo: 'custom error for the foo field.' },
      },
    });
    const mockedState = fromJS({
      form,
    });
    expect(makeSelectFormErrors()(mockedState)).toEqual(
      form.getIn([FORM_TEACHER_PROFILE, 'syncErrors'])
    );
  });

  it('should select the submitErrors', () => {
    const form = fromJS({
      [FORM_TEACHER_PROFILE]: {
        submitErrors: { foo: 'custom error for the foo field.' },
      },
    });
    const mockedState = fromJS({
      form,
    });
    expect(makeSelectSubmitErrors()(mockedState)).toEqual(
      form.getIn([FORM_TEACHER_PROFILE, 'submitErrors'])
    );
  });
});
