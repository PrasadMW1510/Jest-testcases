import { fromJS } from 'immutable';
import { makeSelectFormErrors, makeSelectSubmitErrors } from '../selectors';
import { FORM_EDIT_ADMIN } from '../constants';

describe('selectEditAdminContainerDomain', () => {
  it('should select the form errors', () => {
    const form = fromJS({
      [FORM_EDIT_ADMIN]: {
        syncErrors: { foo: 'custom error for the foo field.' },
      },
    });
    const mockedState = fromJS({
      form,
    });
    expect(makeSelectFormErrors()(mockedState)).toEqual(
      form.getIn([FORM_EDIT_ADMIN, 'syncErrors'])
    );
  });

  it('should select the submitErrors', () => {
    const form = fromJS({
      [FORM_EDIT_ADMIN]: {
        submitErrors: { foo: 'custom error for the foo field.' },
      },
    });
    const mockedState = fromJS({
      form,
    });
    expect(makeSelectSubmitErrors()(mockedState)).toEqual(
      form.getIn([FORM_EDIT_ADMIN, 'submitErrors'])
    );
  });
});
