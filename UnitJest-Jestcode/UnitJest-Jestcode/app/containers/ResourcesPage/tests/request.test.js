/*
 * Test the Application functions
 */

import API, { getResourceObject } from 'utils/request';
import axios from 'axios';
import * as Request from '../request';

// mock out the API module and define implementation later
jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
  getResourceObject: {
    post: jest.fn().mockReturnValue(Promise.resolve()),
  },
}));
jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('Application API Request', () => {
  beforeEach(() => {
    API.get.mockReturnValue(Promise.resolve({ output_data: [{ menu_options: [{}] }] }));
  });

  it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
    expect.assertions(3);
    return Request.getSlmsApplication('dskflanlja').then(res => {
      expect(API.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});

describe('build info', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(
      Promise.resolve({ data: { buildInfo: { build_info: { build_number: ['2.2'] } } } })
    );
  });

  it('should return build info', () => {
    expect.assertions(3);
    return Request.getBuildInfo('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});

describe('get resource post value', () => {
  beforeEach(() => {
    getResourceObject.post.mockReturnValue(
      Promise.resolve({
        resource_search_results: {
          output: { test: '' },
        },
      })
    );
  });

  it('should call postResourcesObject should return a value', () => {
    expect.assertions(3);
    return Request.quickSearchPostResources('1515784560485', 'resource').then(res => {
      expect(getResourceObject.post).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
