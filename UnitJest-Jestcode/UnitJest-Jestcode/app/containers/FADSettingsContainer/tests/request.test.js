import { getBaseUrlWithoutSlmsObject } from 'utils/request';
import * as Request from '../request';

getBaseUrlWithoutSlmsObject.get = jest.fn().mockReturnValue(Promise.resolve());
getBaseUrlWithoutSlmsObject.post = jest.fn().mockReturnValue(Promise.resolve());

describe('FAD Get Settings', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      getBaseUrlWithoutSlmsObject.get.mockReturnValue(
        Promise.resolve({ output: { output_data: [{ getSettings: [{ advanced_settings: {} }] }] } })
      );
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      Request.getFADSettings('asdfa123aa', 'schoolid', 'jdoe').then(res => {
        expect(getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
describe('FAD Set Settings', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      getBaseUrlWithoutSlmsObject.post.mockReturnValue(
        Promise.resolve({ output_data: [{ setSettings: [{ result: {} }] }] })
      );
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      Request.setFADsettings('asdfa123aa', 'schoolid', 'jdoe', '0', '0').then(res => {
        expect(getBaseUrlWithoutSlmsObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
