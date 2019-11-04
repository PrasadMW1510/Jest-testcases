import { getBaseUrlWithoutSlmsObject } from 'utils/request';
import * as Request from '../request';

// mock out the API module and define implementation later
jest.mock('utils/request', () => ({
  getBaseUrlWithoutSlmsObject: {
    get: jest.fn().mockReturnValue(Promise.resolve()),
    post: jest.fn().mockReturnValue(Promise.resolve()),
  },
}));

describe('RSkillsCC requests', () => {
  describe('getRSkillsCCTestAssignment', () => {
    beforeEach(
      getBaseUrlWithoutSlmsObject.get.mockReturnValue(
        Promise.resolve({ output: { output_data: [{ stages: [{ mockData: 'mockData' }] }] } })
      )
    );

    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      Request.getRSkillsCCTestAssignment('mockSessionId').then(res => {
        expect(getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('postRSkillsCCSetTestAssignments', () => {
    beforeEach(
      getBaseUrlWithoutSlmsObject.get.mockReturnValue(
        Promise.resolve({ output: { output_data: [{ results: [{ mockData: 'mockData' }] }] } })
      )
    );

    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      Request.postRSkillsCCSetTestAssignments('mockSessionId', 'mockData').then(res => {
        expect(getBaseUrlWithoutSlmsObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
