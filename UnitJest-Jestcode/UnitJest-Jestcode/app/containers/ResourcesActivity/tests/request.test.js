import * as ResourceAPI from 'utils/request';
import * as Request from '../request';

// mock out the API module and define implementation later
jest.mock('utils/request', () => ({
  getResourceObject: {
    get: jest.fn().mockReturnValue(Promise.resolve()),
    post: jest.fn().mockReturnValue(Promise.resolve()),
  },
}));

describe('Resource API Request', () => {
  describe('getAppResources', () => {
    beforeEach(() => {
      ResourceAPI.getResourceObject.get.mockReturnValue(
        Promise.resolve({ page_init: { resource_program: [{}] } })
      );
    });

    it('should call getAppResources, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.getAppResources('DTM_NOW', '1515784560485').then(res => {
        expect(ResourceAPI.getResourceObject.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getIts', () => {
    beforeEach(() => {
      ResourceAPI.getResourceObject.get.mockReturnValue(
        Promise.resolve({
          output: { output_data: [{ its_data: [{ its_enabled_apps: [{ application: [{}] }] }] }] },
        })
      );
    });

    it('should call getITSApps, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.getITSApps('1515784560485').then(res => {
        expect(ResourceAPI.getResourceObject.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('postResourcesObjectInfo', () => {
    beforeEach(() => {
      ResourceAPI.getResourceObject.post.mockReturnValue(
        Promise.resolve({
          resource_search_results: {
            output: { test: '' },
          },
        })
      );
    });

    it('should call postResourcesObject shoudl return a value', () => {
      expect.assertions(3);
      return Request.postResourcesObjectInfo('1515784560485', 'resource').then(res => {
        expect(ResourceAPI.getResourceObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
