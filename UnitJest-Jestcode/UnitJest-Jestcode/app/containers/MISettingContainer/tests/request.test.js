import { getBaseUrlWithoutSlmsObject } from 'utils/request';
import { COHORT_TYPE } from 'containers/App/constants';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  getBaseUrlWithoutSlmsObject: {
    get: jest.fn().mockReturnValue(Promise.resolve()),
    post: jest.fn().mockReturnValue(Promise.resolve()),
  },
}));

describe('MISettingContainer API request', () => {
  const numAssertionsExpected = 3;

  describe('Get MI Settings', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        getBaseUrlWithoutSlmsObject.get.mockReturnValue(
          Promise.resolve({ output: { output_data: [{ getSettings: [{}] }] } })
        );
      });

      it('Non-grade settings', () => {
        const mockParams = {
          cohortId: 'cohortId',
          cohortType: COHORT_TYPE.School,
          sessionId: 'sessionId',
        };
        expect.assertions(numAssertionsExpected);
        return Request.getMISettings(mockParams).then(res => {
          expect(getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('Grade settings', () => {
        const mockParams = {
          cohortId: 'cohortId',
          schoolId: 'schoolId',
          sessionId: 'sessionId',
        };
        expect.assertions(numAssertionsExpected);
        return Request.getMISettingsForGrade(mockParams).then(res => {
          expect(getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Get MI Proficiency Band Data', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        getBaseUrlWithoutSlmsObject.get.mockReturnValue(
          Promise.resolve({
            output: { output_data: [{ getAdvancedSettings: [{ smi_proficiency_bands: [{}] }] }] },
          })
        );
      });

      it('Proficiency bands', () => {
        const apiParam = {
          cohortId: 'cohortId',
          cohortType: COHORT_TYPE.School,
          sessionId: 'sessionId',
        };
        expect.assertions(numAssertionsExpected);
        return Request.getMIProficiencyBandData(apiParam).then(res => {
          expect(getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Save MI Settings Tab', () => {
    beforeEach(() => {
      getBaseUrlWithoutSlmsObject.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
    });

    it('Non-grade settings', () => {
      const mockParams = {
        cohortId: 'cohortId',
        cohortType: COHORT_TYPE.School,
        programSettingsObj: {
          setting1: 'setting1',
          setting2: 'setting2',
        },
        sessionId: 'sessionId',
      };
      expect.assertions(numAssertionsExpected);
      return Request.postMISettings(mockParams).then(res => {
        expect(getBaseUrlWithoutSlmsObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });

    it('Grade settings', () => {
      const mockParams = {
        cohortId: 'cohortId',
        programSettingsObj: {
          setting1: 'setting1',
          setting2: 'setting2',
        },
        schoolId: 'schoolId',
        sessionId: 'sessionId',
      };
      expect.assertions(numAssertionsExpected);
      return Request.postMISettingsForGrade(mockParams).then(res => {
        expect(getBaseUrlWithoutSlmsObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('Save MI Advanced Settings Tab', () => {
    beforeEach(() => {
      getBaseUrlWithoutSlmsObject.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
    });

    it('should post proficiency band data correctly', () => {
      const mockParams = {
        districtId: 'districtId',
        proficiencyBandData: {
          setting1: 'setting1',
          setting2: 'setting2',
        },
        sessionId: 'sessionId',
      };
      expect.assertions(numAssertionsExpected);
      return Request.postMIProficiencyBandData(mockParams).then(res => {
        expect(getBaseUrlWithoutSlmsObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
