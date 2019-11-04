import { fromJS } from 'immutable';
import validate from '../validate';

describe('validate', () => {
  it('should return no errors when all fields are valid', () => {
    const values = fromJS({
      name: 'my class',
      grades: [1, 2, 3],
    });
    const errors = validate(values);
    expect(Object.keys(errors).length).toEqual(0);
  });
  describe('name', () => {
    it('should return a name error when there is no name value', () => {
      const values = fromJS({});
      const errors = validate(values);
      expect(errors.name).toBeDefined();
    });
    it('should return a name error when the name value is white space', () => {
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
