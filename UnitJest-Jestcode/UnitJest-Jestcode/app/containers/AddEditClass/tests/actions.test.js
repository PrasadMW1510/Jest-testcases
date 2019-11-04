import * as Actions from '../actions';

describe('AddEditClass Actions', () => {
  describe('Save a class', () => {
    it('should return the correct constant for saving a class request', () => {
      const classObj = { name: 'my class' };
      expect(Actions.saveClassRequest(classObj)).toMatchSnapshot();
    });

    it('should return the correct constant for saving a class request success', () => {
      expect(Actions.saveClassRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for saving a class request failure', () => {
      const error = { type: 'my error' };
      expect(Actions.saveClassRequestFailure(error)).toMatchSnapshot();
    });
  });
  describe('Initialize class (load meta data & class profile)', () => {
    it('should return the correct constant for initializing form request', () => {
      const classObj = { name: 'my class' };
      expect(Actions.initializeClassFormRequest(classObj)).toMatchSnapshot();
    });

    it('should return the correct constant for initializing form request success', () => {
      expect(Actions.initializeClassFormRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for initializing form request failure', () => {
      const error = { type: 'my error' };
      expect(Actions.initializeClassFormRequestFailure(error)).toMatchSnapshot();
    });
  });
});
