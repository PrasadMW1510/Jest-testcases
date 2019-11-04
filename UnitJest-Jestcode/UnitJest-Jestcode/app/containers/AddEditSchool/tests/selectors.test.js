import { fromJS } from 'immutable';
import {
  makeSelectAllFormMetaData,
  makeSelectGradesForDistrict,
  makeSelectFormErrors,
  makeSelectFormServerErrors,
  makeSelectSchoolYearDates,
  makeSelectSubmitErrors,
} from '../selectors';
import { FORM_SCHOOL_PROFILE, META_DATA_GRADES } from '../constants';

describe('Add a School selectors', () => {
  it('should select the grade list', () => {
    const form = fromJS({
      [FORM_SCHOOL_PROFILE]: {
        values: {
          metaData: {
            [META_DATA_GRADES]: { grade1: true, grade2: true },
          },
        },
      },
    });
    const mockedState = fromJS({
      form,
    });
    expect(makeSelectGradesForDistrict()(mockedState)).toEqual(
      form.getIn([FORM_SCHOOL_PROFILE, 'values', 'metaData', META_DATA_GRADES])
    );
  });

  it('should select the form errors', () => {
    const form = fromJS({
      [FORM_SCHOOL_PROFILE]: {
        syncErrors: { foo: 'custom error for the foo field.' },
      },
    });
    const mockedState = fromJS({
      form,
    });
    expect(makeSelectFormErrors()(mockedState)).toEqual(
      form.getIn([FORM_SCHOOL_PROFILE, 'syncErrors'])
    );
  });

  it('should select the submit errors', () => {
    const form = fromJS({
      [FORM_SCHOOL_PROFILE]: {
        submitErrors: { foo: 'custom error for the foo field.' },
      },
    });
    const mockedState = fromJS({
      form,
    });
    expect(makeSelectSubmitErrors()(mockedState)).toEqual(
      form.getIn([FORM_SCHOOL_PROFILE, 'submitErrors'])
    );
  });

  it('should select the school year dates errors', () => {
    const form = fromJS({
      [FORM_SCHOOL_PROFILE]: {
        syncErrors: { foo: 'custom error for the foo field.' },
      },
    });
    const mockedState = fromJS({
      form,
    });
    makeSelectSchoolYearDates()(mockedState);
  });

  it('should select the form server errors', () => {
    const form = fromJS({
      [FORM_SCHOOL_PROFILE]: {
        values: { serverErrors: 'Custom server error here.' },
      },
    });
    const mockedState = fromJS({
      form,
    });
    expect(makeSelectFormServerErrors()(mockedState)).toEqual(
      form.getIn([FORM_SCHOOL_PROFILE, 'values', 'serverErrors'])
    );
  });

  it('should select all the form meta data', () => {
    const metaGrades = fromJS({ grade1: true, grade2: true });
    const form = fromJS({
      [FORM_SCHOOL_PROFILE]: {
        values: {
          metaData: {
            [META_DATA_GRADES]: metaGrades,
          },
        },
      },
    });
    const mockedState = fromJS({
      form,
    });
    expect(makeSelectAllFormMetaData()(mockedState)).toEqual(fromJS({ grades: metaGrades }));
  });
});
