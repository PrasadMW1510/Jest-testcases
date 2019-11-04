import * as API from 'utils/request';
import * as Request from '../request';
jest.mock('utils/request', () => ({
  getBaseUrlWithoutSlmsObject: {
    get: jest.fn().mockReturnValue(Promise.resolve()),
    post: jest.fn().mockReturnValue(Promise.resolve()),
  },
  post: jest.fn().mockReturnValue(Promise.resolve()),
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));
describe('R180NGTopic API Request', () => {
  describe('Program Setting for r180ng Group Data', () => {
    describe('stubbing successful response getProgramSetting Group Data', () => {
      beforeEach(() => {
        API.getBaseUrlWithoutSlmsObject.get.mockReturnValue(
          Promise.resolve({ output: { output_data: [{ topic_cds: [{ topic_cd: [{}] }] }] } })
        );
      });

      it('Should get ProgramSetting', () => {
        expect.assertions(3);
        return Request.getGroupTopicsR180NG('Ab2345', '12345', 'teacher', '345345').then(res => {
          expect(API.getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
    describe('stubbing successful response getProgramSetting Group Data', () => {
      beforeEach(() => {
        API.getBaseUrlWithoutSlmsObject.get.mockReturnValue(
          Promise.resolve({ output: { output_data: [{ topic_cds: [{ topic_cd: [{}] }] }] } })
        );
      });

      it('Should get ProgramSetting', () => {
        expect.assertions(3);
        return Request.getDistrictTopicsR180NG('Ab2345', '12345').then(res => {
          expect(API.getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
    describe('installed stages for r180ng topic Data', () => {
      describe('stubbing successful response get installed stages for r180ng topics', () => {
        beforeEach(() => {
          API.getBaseUrlWithoutSlmsObject.get.mockReturnValue(
            Promise.resolve({ output: { output_data: [{ installed_stages: [{ stage: [{}] }] }] } })
          );
        });

        it('Should get ProgramSetting', () => {
          expect.assertions(3);
          return Request.geInstalledStagesR180NG('Ab2345', '').then(res => {
            expect(API.getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
            expect(res).toBeDefined();
            expect(typeof res).toBe('object');
          });
        });
      });
    });
  });
});
