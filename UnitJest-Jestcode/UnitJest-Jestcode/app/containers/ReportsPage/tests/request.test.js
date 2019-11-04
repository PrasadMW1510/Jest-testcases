import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('Report List', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ reports: [{ report: {} }] }] }));
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      expect.assertions(3);
      return Request.getReportList('asdfa123aa', 'schoolid', 'jdoe').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});

describe('Get report id', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({ output_data: [{ report: [{ $: { id: 'testid' } }] }] })
      );
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      expect.assertions(3);
      return Request.getReportId('typeid', 'baseUrl', 'url', 'pdf_qs', jest.fn()).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('string');
      });
    });
  });
});
