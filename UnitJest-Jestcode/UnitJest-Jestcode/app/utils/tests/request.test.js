/**
 * Created by luib <Brian.Lui@hmhco.com> on 11/21/17.
 */
/**
 * Test the request function
 */

import axios from 'axios';
import cookie from 'react-cookies';
import * as xml2js from 'xml2js';
import API, {
  xmlToJSON,
  getBaseUrl,
  responseInterceptor,
  formResponseInterceptor,
  requestInterceptor,
  resourceResponseInterceptor,
  getBaseResourceUrl,
  getBaseUrlWithoutSlms,
  baseUrlWithoutSlms,
} from '../request';
import * as Constants from '../constants';

// mock out the xml2js module and define implementation later
jest.mock('xml2js', () => ({
  parseString: jest.fn((xmlString, callback) => {
    callback(undefined, { output: 'foobar' });
  }),
  Builder: jest.fn(() => ({
    buildObject: jest.fn(() => 'dataUpdated'),
  })),
}));

// mock out the axios module and define implementation later
jest.mock('axios', () => ({
  get: jest.fn(),
  create: jest.fn(() => ({
    interceptors: {
      response: {
        use: jest.fn(),
      },
      request: {
        use: jest.fn(),
      },
    },
    defaults: {
      headers: {
        post: [],
      },
    },
  })),
}));

// mock out the react-cookies module and define implementation later
jest.mock('react-cookies', () => ({
  load: jest.fn(),
}));

describe('request utils', () => {
  describe('xml2js', () => {
    it('should parse xml to JSON', () => {
      expect.assertions(1);

      return xmlToJSON('<xml></xml>').then(() => {
        expect(xml2js.parseString).toHaveBeenCalled();
      });
    });

    it('should handle parser errors', () => {
      xml2js.parseString.mockImplementation((xmlString, callback) => {
        callback('invalid xml');
      });

      expect.assertions(2);

      return xmlToJSON('<xml></xml>').catch(e => {
        expect(xml2js.parseString).toHaveBeenCalled();
        expect(e).toBeDefined();
      });
    });
  });

  it('should define a default export', () => {
    expect(axios.create).toHaveBeenCalled();
    expect(API).toBeDefined();
  });

  describe('base url', () => {
    const browserURL = 'localhost';
    let originalEnv = null;
    let originalLocation = null;
    let serverCookieUrl = null;

    // these tests modify the testing environment, so we need to back it up and restore it after each test
    beforeAll(() => {
      originalEnv = process.env.NODE_ENV;
      originalLocation = window.location;
    });

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
      window.location = originalLocation;
    });

    beforeEach(() => {
      Object.defineProperty(window.location, 'origin', {
        writable: true,
        value: browserURL,
      });

      serverCookieUrl = 'https://h501000002.education.scholastic.com';
    });

    it('should define an API object with a valid base URL', () => {
      expect(getBaseUrl()).toEqual('https://h511000002.education.scholastic.com/slms');
    });

    it('should handle local dev builds', () => {
      process.env.NODE_ENV = 'development';
      expect(getBaseUrl()).toEqual('https://h511000002.education.scholastic.com/slms');
    });

    it('should handle sam based resource Url', () => {
      expect(getBaseResourceUrl()).toEqual('https://samresources.education.scholastic.com');
    });
    it('should handle sam based resource Url', () => {
      expect(getBaseUrlWithoutSlms()).toEqual('https://h511000002.education.scholastic.com');
    });
    it('should use cookie provided base url', () => {
      cookie.load.mockReturnValue(serverCookieUrl);
      expect(getBaseUrl()).toEqual(serverCookieUrl);
    });
  });

  describe('response interceptor', () => {
    let response = null;
    let xmlResponse = null;

    beforeEach(() => {
      response = {
        output: { command_status: [{ result_code: ['0'], error_data: [{ error_code: [] }] }] },
      };
      xmlResponse = { data: '<xml></xml>' };

      xml2js.parseString.mockImplementation((xmlString, callback) => {
        callback(undefined, response);
      });
    });

    it('should return JSON data on valid data', () => {
      expect.assertions(1);

      return responseInterceptor(xmlResponse).then(res => {
        expect(res).toEqual(response.output);
      });
    });

    it('should return an error on an invalid response for unknown error codes', () => {
      expect.assertions(1);

      response.output.command_status[0].result_code[0] = '-';
      response.output.command_status[0].error_data[0].error_code[0] = '-999';
      response.output.command_status[0].error_data[0].error_message = [Constants.UNKNOWN_API_ERR];

      return responseInterceptor(xmlResponse).catch(res => {
        expect(res).toEqual(Constants.UNKNOWN_API_ERR);
      });
    });

    it('should return an error on an invalid response for adding an existing class', () => {
      expect.assertions(1);

      response.output.command_status[0].result_code[0] = '-1';
      response.output.command_status[0].error_data[0].error_code[0] = '-32';
      response.output.command_status[0].error_data[0].error_message = [
        'Server error message goes here.',
      ];

      return responseInterceptor(xmlResponse).catch(res => {
        expect(res).toEqual('This field is already in use. Try an alternate value.');
      });
    });

    it('should return an error on an invalid response for invalid login', () => {
      expect.assertions(1);

      response.output.command_status[0].result_code[0] = '-1';
      response.output.command_status[0].error_data[0].error_code[0] = '-302';
      response.output.command_status[0].error_data[0].error_message = [
        'Server error message goes here.',
      ];

      return responseInterceptor(xmlResponse).catch(res => {
        expect(res).toEqual(Constants.INVALID_CREDENTIALS_ERR);
      });
    });
  });

  describe('form response interceptor', () => {
    let response = null;
    let xmlResponse = null;
    let errorObj = null;

    describe('there is an error array', () => {
      beforeEach(() => {
        response = {
          output: {
            command_status: [
              {
                result_code: ['0'],
                error_data: [
                  {
                    error: [
                      {
                        error_source: ['password'],
                        error_code: ['-33'],
                        error_message: [''],
                      },
                      {
                        error_source: ['user_name'],
                        error_code: [123],
                        error_message: ['user_name error message'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        };

        errorObj = {
          password: true,
          user_name: 'user_name error message',
        };
        xmlResponse = { data: '<xml></xml>' };

        xml2js.parseString.mockImplementation((xmlString, callback) => {
          callback(undefined, response);
        });
      });

      it('should return JSON data on valid data', () => {
        expect.assertions(1);

        return formResponseInterceptor(xmlResponse).then(res => {
          expect(res).toEqual(response.output);
        });
      });

      it('should return correct error object on failure', () => {
        expect.assertions(1);

        response.output.command_status[0].result_code[0] = '-1';

        return formResponseInterceptor(xmlResponse).catch(res => {
          expect(res).toEqual(errorObj);
        });
      });
    });

    describe('there is not an error array', () => {
      beforeEach(() => {
        response = {
          output: {
            command_status: [
              {
                result_code: ['0'],
                error_data: [
                  {
                    error_code: [123],
                    error_message: ['error message'],
                  },
                ],
              },
            ],
          },
        };

        errorObj = { error: 'error message' };
        xmlResponse = { data: '<xml></xml>' };

        xml2js.parseString.mockImplementation((xmlString, callback) => {
          callback(undefined, response);
        });
      });

      it('should return JSON data on valid data', () => {
        expect.assertions(1);

        return formResponseInterceptor(xmlResponse).then(res => {
          expect(res).toEqual(response.output);
        });
      });

      it('should return correct error object on failure', () => {
        expect.assertions(1);

        response.output.command_status[0].result_code[0] = '-1';

        return formResponseInterceptor(xmlResponse).catch(res => {
          expect(res).toEqual(errorObj);
        });
      });
    });
  });

  describe('request interceptor', () => {
    describe('data is an object', () => {
      let configMock = null;
      beforeEach(() => {
        configMock = {
          data: {
            testData: 'testDataMock',
          },
        };
      });

      it('update the data', () => {
        expect(requestInterceptor(configMock)).toEqual({ data: 'dataUpdated' });
      });
    });

    it('data is not an object', () => {
      const configMock = { data: 'dataMock' };
      expect(requestInterceptor(configMock)).toEqual(configMock);
    });
  });

  describe('resourceResponseInterceptor', () => {
    let response = null;
    let xmlResponse = null;

    beforeEach(() => {
      response = { output: { command_status: [''], output_data: [''] } };
      xmlResponse = {
        data: '<output><command_status></command_status><output_data></output_data></output>',
      };
      xml2js.parseString.mockImplementation((xmlString, callback) => {
        callback(undefined, response);
      });
    });

    it('Final response to match xmlResponse', () => {
      expect.assertions(1);
      return resourceResponseInterceptor(xmlResponse).then(res => {
        expect(res).toEqual(response);
      });
    });
  });

  describe('baseUrlWithoutSlms', () => {
    let response = null;
    let xmlResponse = null;

    beforeEach(() => {
      response = { output: { command_status: [''], output_data: [''] } };
      xmlResponse = {
        data: '<output><command_status></command_status><output_data></output_data></output>',
      };
      xml2js.parseString.mockImplementation((xmlString, callback) => {
        callback(undefined, response);
      });
    });

    it('Final response to match xmlResponse', () => {
      expect.assertions(1);
      return baseUrlWithoutSlms(xmlResponse).then(res => {
        expect(res).toEqual(response);
      });
    });
  });
});
