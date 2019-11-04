import { fromJS } from 'immutable';
import validate from '../validate';

describe('validate', () => {
  let completeValues = null;

  beforeEach(() => {
    completeValues = fromJS({
      grades: [1, 2, 3],
      gradingPeriodEnd: ['2018-03-15', '2018-03-30'],
      gradingPeriodStart: ['2018-03-03', '2018-03-16'],
      name: 'my class',
      numGradingPeriods: 2,
      schoolNumber: '29458ab18',
      schoolTypes: [{ '0': true }, { '3': true }],
      schoolYearEnd: '2018-03-30',
      schoolYearStart: '2018-03-03',
      schoolContactLastName: 'Bananas',
      schoolContactFirstName: 'Johnny',
      schoolContactEmail: 'jbananas@school.org',
      schoolContactAddressLine1: '100 Banana Ave.',
      schoolContactCity: 'Bananaville',
      schoolContactState: 'BA',
      schoolContactZip: '00000',
      schoolContactPhoneNumber: '5555555555',
    });
  });

  it('should return no errors when all fields are valid', () => {
    const errors = validate(completeValues);
    expect(Object.keys(errors).length).toEqual(0);
  });

  it('should return missing school year start error', () => {
    const newValues = completeValues.set('schoolYearStart', null);
    const errors = validate(newValues);
    expect(errors.schoolYearStart).toBeTruthy();
    expect(errors.popupErrorFieldName).toEqual('schoolYearStart');
    expect(errors.hasImperativeNotificationErrors).toBeFalsy();
  });

  it('should return missing school year end error', () => {
    const newValues = completeValues.set('schoolYearEnd', null);
    const errors = validate(newValues);
    expect(errors.schoolYearEnd).toBeTruthy();
    expect(errors.popupErrorFieldName).toEqual('schoolYearEnd');
    expect(errors.hasImperativeNotificationErrors).toBeFalsy();
  });

  it('should return school year end before start error', () => {
    const newValues = completeValues.set('schoolYearStart', '2018-04-03');
    const errors = validate(newValues);
    expect(errors.schoolYearEnd).toBeTruthy();
    expect(errors.popupErrorFieldName).toEqual('schoolYearEnd');
    expect(errors.hasImperativeNotificationErrors).toBeTruthy();
  });

  // TODO: The following test logs an ugly moment warning in the console, about
  // deprecated date formats; thus it's commented out for now.  See if there's some way
  // to get to 100% coverage without logging this warning.
  /* it('should return grading period start invalid', () => {
    const newValues = completeValues.setIn(['gradingPeriodStart', 1], '45/99/1000');
    const errors = validate(newValues);
    expect(errors['gradingPeriodStart[1]']).toBeTruthy();
    expect(errors.popupErrorFieldName).toEqual('gradingPeriodStart[1]');
    expect(errors.hasImperativeNotificationErrors).toBeFalsy();
  }); */

  it('should return grading period start before previous end error', () => {
    const newValues = completeValues.setIn(['gradingPeriodStart', 1], '2018-03-13');
    const errors = validate(newValues);
    expect(errors['gradingPeriodStart[1]']).toBeTruthy();
    expect(errors.popupErrorFieldName).toEqual('gradingPeriodStart[1]');
    expect(errors.hasImperativeNotificationErrors).toBeTruthy();
  });

  it('should return grading period outside of school year date range', () => {
    const newValues = completeValues.setIn(['gradingPeriodStart', 0], '2018-03-01');
    const errors = validate(newValues);
    expect(errors['gradingPeriodStart[0]']).toBeTruthy();
    expect(errors.popupErrorFieldName).toEqual('gradingPeriodStart[0]');
    expect(errors.hasImperativeNotificationErrors).toBeTruthy();
  });

  it('should return missing grading period date error', () => {
    const newValues = completeValues.setIn(['gradingPeriodEnd', 1], null);
    const errors = validate(newValues);
    expect(errors['gradingPeriodEnd[1]']).toBeTruthy();
    expect(errors.popupErrorFieldName).toEqual('gradingPeriodEnd[1]');
    expect(errors.hasImperativeNotificationErrors).toBeFalsy();
  });

  describe('school name', () => {
    it('should return a schoolName error when there is no schoolName value', () => {
      const values = fromJS({});
      const errors = validate(values);
      expect(errors.name).toBeDefined();
    });
    it('should return a schoolName error when the schoolName value is white space', () => {
      const values = fromJS({
        name: '  ',
      });
      const errors = validate(values);
      expect(errors.name).toBeDefined();
    });
  });

  describe('grades', () => {
    it('should return a grades error when there is no grades value', () => {
      const values = fromJS({});
      const errors = validate(values);
      expect(errors.grades).toBeDefined();
    });
    it('should return a grades error when the grades value is empty', () => {
      const values = fromJS({
        grades: [],
      });
      const errors = validate(values);
      expect(errors.grades).toBeDefined();
    });
  });
});
