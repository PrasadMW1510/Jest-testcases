import * as Actions from '../actions';

describe('AddEditAstudent Actions', () => {
  describe('Initialize student (load meta data & student profile)', () => {
    it('should return the correct constant for initializing form request', () => {
      expect(Actions.initializeStudentFormRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for initializing form request success', () => {
      expect(Actions.initializeStudentFormRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for initializing form request failure', () => {
      const error = { type: 'my error' };
      expect(Actions.initializeStudentFormRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for a "save student" request', () => {
      const studentObj = { first_name: 'Foo' };
      expect(Actions.saveStudentRequest(studentObj)).toMatchSnapshot();
    });

    it('should return the correct constant for a "save student" request success', () => {
      expect(Actions.saveStudentRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for a "save student" request failure', () => {
      const error = { type: 'my error' };
      expect(Actions.saveStudentRequestFailure(error)).toMatchSnapshot();
    });
  });
});
