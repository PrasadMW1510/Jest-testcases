import { fromJS } from 'immutable';
import * as AppSelectors from 'containers/App/selectors';
import {
  makeSelectFormErrors,
  makeSelectFormServerErrors,
  makeSelectFormMetaData,
  makeSelectFormMetaDataGrades,
  makeSelectFormMetaDataStudents,
  makeSelectFormMetaDataTeachers,
} from '../selectors';
import {
  FIELD_SELECTED_STUDENTS,
  FORM_CLASS_PROFILE,
  META_DATA_GRADES,
  META_DATA_STUDENTS,
  META_DATA_TEACHERS,
} from '../constants';

describe('AddEditClass Selectors', () => {
  const syncErrors = fromJS({ foo: 'custom error for the foo field.' });
  const serverErrors = fromJS({ serverFoo: 'custom server error.' });
  const metaGrades = fromJS({ grade1: true, grade2: true });
  const metaStudents = fromJS({ student1: true, student2: true });
  const metaTeachers = fromJS({ teacher1: true, teacher2: true });
  const metaApplications = fromJS({ app1: true, app2: true });
  const valueStudentsSelected = fromJS({ selected1: true, selected2: true });
  const form = fromJS({
    [FORM_CLASS_PROFILE]: {
      syncErrors,
      values: {
        [FIELD_SELECTED_STUDENTS]: valueStudentsSelected,
        serverErrors,
        metaData: {
          [META_DATA_GRADES]: metaGrades,
          [META_DATA_STUDENTS]: metaStudents,
          [META_DATA_TEACHERS]: metaTeachers,
        },
      },
    },
  });
  const mockedState = fromJS({ form });
  let mockProgramsSelect;

  beforeEach(() => {
    mockProgramsSelect = jest.fn().mockReturnValue(metaApplications);
    jest.spyOn(AppSelectors, 'makeSelectProgramAvailableData').mockReturnValue(mockProgramsSelect);
  });

  describe('makeSelects', () => {
    it('should select the form errors', () => {
      expect(makeSelectFormErrors()(mockedState)).toEqual(syncErrors);
    });
    it('should select the form server errors', () => {
      expect(makeSelectFormServerErrors()(mockedState)).toEqual(serverErrors);
    });
    it('should select the form grade meta data', () => {
      expect(makeSelectFormMetaDataGrades()(mockedState)).toEqual(metaGrades);
    });
    it('should select the form student meta data', () => {
      expect(makeSelectFormMetaDataStudents()(mockedState)).toEqual(metaStudents);
    });
    it('should select the form teacher meta data', () => {
      expect(makeSelectFormMetaDataTeachers()(mockedState)).toEqual(metaTeachers);
    });
    it('should select all the form meta data', () => {
      expect(makeSelectFormMetaData()(mockedState)).toEqual(
        fromJS({
          applications: metaApplications,
          grades: metaGrades,
          students: metaStudents,
          teachers: metaTeachers,
        })
      );
    });
  });
});
