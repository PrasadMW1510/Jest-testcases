import { OrderedMap, fromJS } from 'immutable';
import { USER_TYPE, PASSWORD_TYPES } from 'containers/App/constants';
import {
  checkProgramImg,
  formatDate,
  fromJSToMap,
  createPasswordToolTipText,
  isUserTypeAdminOrTech,
  isValidEmail,
  sortData,
  isStrictlyNumeric,
} from '../utilities';

jest.mock('immutable', () => ({
  OrderedMap: jest.fn(),
  fromJS: jest.fn(i => i),
}));

describe('utilities utils', () => {
  describe('formatDate', () => {
    const expectedDate = '5/24/1985';

    it('inputDate is not a valid date', () => {
      expect(formatDate('abc')).toBeNull();
    });

    it('date is in yyyy-MM-dd format', () => {
      expect(formatDate('1985-05-24')).toEqual(expectedDate);
    });

    it('date has invalid number combo', () => {
      expect(formatDate('1982-99-97')).toBeNull();
    });
  });

  describe('js to map', () => {
    it('should convert to an OrderedMap', () => {
      const collection = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const key = 'id';

      fromJSToMap(collection, key);

      expect(OrderedMap).toHaveBeenCalledWith([
        ['1', { id: 1 }],
        ['2', { id: 2 }],
        ['3', { id: 3 }],
      ]);

      collection.forEach(item => {
        expect(fromJS).toHaveBeenCalledWith(item);
      });
    });
  });

  describe('createPasswordToolTipText', () => {
    let configsArray = null;

    it('configs length is 0', () => {
      configsArray = [];
      expect(createPasswordToolTipText(configsArray, PASSWORD_TYPES.Complex)).toEqual('');
    });

    describe('configs length is not 0', () => {
      beforeEach(() => {
        configsArray = [
          {
            config: [
              {
                $: {
                  id: PASSWORD_TYPES.Complex,
                },
                password_min_len: ['8'],
                password_max_len: ['16'],
                password_enforce_numeric: ['true'],
                password_enforce_special_chars: ['false'],
                password_enforce_mixed_case: ['true'],
              },
              {
                $: {
                  id: PASSWORD_TYPES.Medium,
                },
                password_min_len: ['6'],
                password_max_len: ['16'],
                password_enforce_numeric: ['true'],
                password_enforce_special_chars: ['false'],
                password_enforce_mixed_case: ['false'],
              },
              {
                $: {
                  id: PASSWORD_TYPES.Simple,
                },
                password_min_len: ['3'],
                password_max_len: ['16'],
                password_enforce_numeric: ['false'],
                password_enforce_special_chars: ['false'],
                password_enforce_mixed_case: ['false'],
              },
            ],
          },
        ];
      });

      it('configType is complex', () => {
        const complexText =
          "Passwords must contain between 8 and 16 characters and cannot be only the user's first or last name or a combination of the two. Passwords must also contain at least one upper case letter and one lower case letter, and one numeral.";
        expect(createPasswordToolTipText(configsArray, PASSWORD_TYPES.Complex)).toEqual(
          complexText
        );
      });

      it('configType is medium', () => {
        const mediumText =
          "Passwords must contain between 6 and 16 characters and cannot be only the user's first or last name or a combination of the two. Passwords must also contain at least one numeral.";
        expect(createPasswordToolTipText(configsArray, PASSWORD_TYPES.Medium)).toEqual(mediumText);
      });

      it('configType is simple', () => {
        const simpleText =
          "Passwords must contain between 3 and 16 characters and cannot be only the user's first or last name or a combination of the two.";
        expect(createPasswordToolTipText(configsArray, PASSWORD_TYPES.Simple)).toEqual(simpleText);
      });
    });
  });

  describe('Utility function isUserTypeAdminOrTech', () => {
    it('should return true for Administrator', () => {
      expect(isUserTypeAdminOrTech('Administrator')).toEqual(true);
      expect(isUserTypeAdminOrTech(USER_TYPE.Administrator)).toEqual(true);
    });

    it('should return true for Tech', () => {
      expect(isUserTypeAdminOrTech('Tech')).toEqual(true);
      expect(isUserTypeAdminOrTech(USER_TYPE.Tech)).toEqual(true);
    });

    it('should return false for Student', () => {
      expect(isUserTypeAdminOrTech('Student')).toEqual(false);
      expect(isUserTypeAdminOrTech(USER_TYPE.Student)).toEqual(false);
    });

    it('should return false for Teacher', () => {
      expect(isUserTypeAdminOrTech('Teacher')).toEqual(false);
      expect(isUserTypeAdminOrTech(USER_TYPE.Teacher)).toEqual(false);
    });

    it('should return false for some other string', () => {
      expect(isUserTypeAdminOrTech('OtherString is userName')).toEqual(false);
    });
  });

  describe('isValidEmail', () => {
    it('no @ or .', () => {
      expect(isValidEmail('123homecom')).toBeFalsy();
    });

    it('no .', () => {
      expect(isValidEmail('123@homecom')).toBeFalsy();
    });

    it('no @', () => {
      expect(isValidEmail('123home.com')).toBeFalsy();
    });

    it('valid email address', () => {
      expect(isValidEmail('123@home.com')).toBeTruthy();
    });
  });

  describe('checkProgramImg ', () => {
    it('R180NG', () => {
      expect(checkProgramImg('R180NG')).toBe('IMAGE_MOCK');
    });

    it('RTNG', () => {
      expect(checkProgramImg('RTNG')).toBe('IMAGE_MOCK');
    });

    it('S44NG', () => {
      expect(checkProgramImg('S44NG')).toBe('IMAGE_MOCK');
    });

    it('', () => {
      const commId = '';
      expect(checkProgramImg('')).toBe(commId);
    });
  });

  describe('sortData', () => {
    it('should sort different types', () => {
      expect(sortData(null, 'a')).toEqual(1);
      expect(sortData('a', null)).toEqual(-1);
      expect(sortData('a', 'A')).toEqual(sortData('A', 'a'));
      expect(sortData(['a'], ['A'])).toEqual(sortData(['A'], ['a']));
      expect(sortData(['2'], ['27'])).toEqual(-1);
      expect(sortData(['27'], ['2'])).toEqual(1);
      expect(sortData('27', '2')).toEqual(1);
      expect(sortData('1', 'JB 043 Test')).toEqual(-1);
      expect(sortData('\u2713', '')).toEqual(-1);
    });
  });

  describe('isStrictlyNumeric', () => {
    it('numeric returns correctly', () => {
      expect(isStrictlyNumeric('987')).toBeTruthy();
    });

    it('non-numeric returns correctly', () => {
      expect(isStrictlyNumeric('45%')).toBeFalsy();
    });
  });
});
