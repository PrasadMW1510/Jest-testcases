import { fromJS } from 'immutable';
import { FIELD_SUBMIT_ERRORS } from 'components/StudentForm/constants';
import { makeSelectFormErrors, makeSelectFormServerErrors } from '../selectors';
import { FORM_STUDENT_PROFILE } from '../constants';

describe('AddEditStudent Selectors', () => {
  const syncErrors = fromJS({ foo: 'custom error for the foo field.' });
  const serversErrors = fromJS({ bar: 'custom error for the bar field.' });
  const form = fromJS({
    [FORM_STUDENT_PROFILE]: {
      syncErrors,
      [FIELD_SUBMIT_ERRORS]: serversErrors,
    },
  });
  const mockedState = fromJS({ form });
  describe('makeSelects', () => {
    it('should select the form errors', () => {
      expect(makeSelectFormErrors()(mockedState)).toEqual(syncErrors);
    });
    it('should select the server errors', () => {
      expect(makeSelectFormServerErrors()(mockedState)).toEqual(serversErrors);
    });
  });
});
