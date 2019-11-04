import { fromJS } from 'immutable';
import validate from '../validate';

describe('validate', () => {
  it('should return no validation errors when all fields are valid', () => {
    const values = fromJS({
      sis_id: 'foo-123',
      first_name: 'Foo',
      last_name: 'Bar',
      grade: 'PK',
      user_name: 'foo-bar',
      password: 'foo-pw',
      password_confirm: 'foo-pw',
      birth_date: '1/1/2000',
      classes: fromJS({ foo: true }),
    });
    const errors = validate(values);
    expect(Object.keys(errors).length).toEqual(0);
  });
  describe('Required fields', () => {
    it('should return an error when a required field is missing', () => {
      const values = fromJS({});
      const errors = validate(values);
      // Required fields
      expect(errors.sis_id).toBeDefined();
      expect(errors.first_name).toBeDefined();
      expect(errors.last_name).toBeDefined();
      expect(errors.grade).toBeDefined();
      expect(errors.user_name).toBeDefined();
      expect(errors.password).toBeDefined();
      expect(errors.password_confirm).toBeDefined();
      expect(errors.classes).toBeDefined();
    });
  });
  describe('password', () => {
    it('should return a password error when password & password confirm field do not match', () => {
      const values = fromJS({
        password: 'foo',
        password_confirm: 'bar',
      });
      const errors = validate(values);
      expect(errors.password).toBeDefined();
    });
  });
  describe('birth date', () => {
    it('should return a birth date error when birth date is not in form mm/dd/yyyy', () => {
      const values = fromJS({
        birth_date: 'dec 1, 1999',
      });
      const errors = validate(values);
      expect(errors.birth_date).toBeDefined();
    });
    it('should not return a birth date error when birth date is in form mm/dd/yyyy', () => {
      const values = fromJS({
        birth_date: '12/1/1999',
      });
      const errors = validate(values);
      expect(errors.birth_date).toBeUndefined();
    });
    it('should accept leading zeros in mm/dd/yyyy', () => {
      const values = fromJS({
        birth_date: '02/01/1999',
      });
      const errors = validate(values);
      expect(errors.birth_date).toBeUndefined();
    });
  });
});
