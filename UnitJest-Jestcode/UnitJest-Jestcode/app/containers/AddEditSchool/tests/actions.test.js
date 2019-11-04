import * as Actions from '../actions';

describe('AddEditSchool actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for getting meta data request', () => {
      expect(Actions.getMetaDataRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for getting meta data request success', () => {
      expect(Actions.getMetaDataRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for getting meta data request failure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.getMetaDataRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for absent grade list in district', () => {
      expect(Actions.gradeListForDistrict()).toMatchSnapshot();
    });

    it('should return the correct constant for populated grade list in district', () => {
      const grades = [{ name: 'PK', full_name: 'Pre-K' }];
      expect(Actions.gradeListForDistrict(grades)).toMatchSnapshot();
    });

    it('should return the correct constant for adding a school request', () => {
      const schoolObj = { name: 'my school' };
      expect(Actions.saveSchoolRequest(schoolObj)).toMatchSnapshot();
    });

    it('should return the correct constant for adding a school request success', () => {
      expect(Actions.saveSchoolRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for adding a school request failure', () => {
      const error = { type: 'my custom error' };
      expect(Actions.saveSchoolRequestFailure(error)).toMatchSnapshot();
    });
  });
});
