import { fromJS } from 'immutable';
import getErrorMsg from 'utils/slmsErrors';
import validate from '../validate';

describe('validate', () => {
  let values = null;
  let errors = null;

  it('should return no errors when all fields are valid', () => {
    values = fromJS({
      district_user_id: 'mockDistrictUserId',
      first_name: 'mockFirstName',
      last_name: 'mockLastName',
      email: 'mockEmail@email.com',
      user_name: 'mockUsername',
      password: 'mockPassword',
      password_confirm: 'mockPassword',
    });

    errors = validate(values);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  describe('district_user_id', () => {
    it('should return a district_user_id error when there is no district_user_id value', () => {
      values = fromJS({});
      errors = validate(values);

      expect(errors.district_user_id).toEqual(getErrorMsg(236));
    });

    it('should return a district_user_id error when the district_user_id value is white space', () => {
      values = fromJS({
        district_user_id: '  ',
      });
      errors = validate(values);

      expect(errors.district_user_id).toEqual(getErrorMsg(236));
    });
  });

  describe('first_name', () => {
    it('should return a first_name error when there is no first_name value', () => {
      values = fromJS({});
      errors = validate(values);

      expect(errors.first_name).toEqual(getErrorMsg(110));
    });

    it('should return a first_name error when the first_name value is white space', () => {
      values = fromJS({
        first_name: '  ',
      });
      errors = validate(values);

      expect(errors.first_name).toEqual(getErrorMsg(110));
    });
  });

  describe('last_name', () => {
    it('should return a last_name error when there is no last_name value', () => {
      values = fromJS({});
      errors = validate(values);

      expect(errors.last_name).toEqual(getErrorMsg(120));
    });

    it('should return a last_name error when the last_name value is white space', () => {
      values = fromJS({
        last_name: '  ',
      });
      errors = validate(values);

      expect(errors.last_name).toEqual(getErrorMsg(120));
    });
  });

  describe('email', () => {
    it('should return a email error when there is no email value', () => {
      values = fromJS({});
      errors = validate(values);

      expect(errors.email).toEqual(getErrorMsg(140));
    });

    it('should return a email error when the email value is white space', () => {
      values = fromJS({
        email: '  ',
      });
      errors = validate(values);

      expect(errors.email).toEqual(getErrorMsg(140));
    });
  });

  describe('user_name', () => {
    it('should return a user_name error when there is no user_name value', () => {
      values = fromJS({});
      errors = validate(values);

      expect(errors.user_name).toEqual(getErrorMsg(130));
    });

    it('should return a user_name error when the user_name value is white space', () => {
      values = fromJS({
        user_name: '  ',
      });
      errors = validate(values);

      expect(errors.user_name).toEqual(getErrorMsg(130));
    });

    it('should return user_name error when user_name is less than 3 characters', () => {
      values = fromJS({
        user_name: 'ab',
      });
      errors = validate(values);

      expect(errors.user_name).toEqual(getErrorMsg(129));
    });
  });

  describe('password', () => {
    it('should return a password error when there is no password value', () => {
      values = fromJS({});
      errors = validate(values);

      expect(errors.password).toEqual(getErrorMsg(134));
    });

    it('should return a password error when the password value is white space', () => {
      values = fromJS({
        password: '  ',
      });
      errors = validate(values);

      expect(errors.password).toEqual(getErrorMsg(134));
    });
  });

  describe('password_confirm', () => {
    it('should return a password_confirm error when there is no password_confirm value', () => {
      values = fromJS({});
      errors = validate(values);

      expect(errors.password_confirm).toEqual(getErrorMsg(142));
    });

    it('should return a password_confirm error when the password_confirm value is white space', () => {
      values = fromJS({
        password_confirm: '  ',
      });
      errors = validate(values);

      expect(errors.password_confirm).toEqual(getErrorMsg(142));
    });
  });

  it('password and password_confirm dont match', () => {
    values = fromJS({
      password: 'mockPassword',
      password_confirm: 'mockPass',
    });
    errors = validate(values);

    expect(errors.password).toEqual(getErrorMsg(142));
    expect(errors.password_confirm).toBeTruthy();
  });
});
