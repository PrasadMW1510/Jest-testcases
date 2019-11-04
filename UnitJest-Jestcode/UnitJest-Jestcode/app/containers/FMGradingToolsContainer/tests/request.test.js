import { getBaseUrlWithoutSlmsObject } from 'utils/request';
import { COHORT_TYPE } from 'containers/App/constants';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  getBaseUrlWithoutSlmsObject: {
    get: jest.fn().mockReturnValue(Promise.resolve()),
    post: jest.fn().mockReturnValue(Promise.resolve()),
  },
  getBaseUrlWithoutSlms: () => 'www.baseurl.com/',
}));

describe('FMGradingToolsContainer API request', () => {
  describe('Get FM Student Operations', () => {
    beforeEach(() => {
      getBaseUrlWithoutSlmsObject.get.mockReturnValue(
        Promise.resolve({ output: { output_data: [{ studentOperations: [{}] }] } })
      );
    });

    it('should get the correct response', () => {
      const mockParams = {
        sessionId: 'sessionId',
        cohortType: COHORT_TYPE.Student,
        cohortId: 'cohortId',
        schoolId: 'schoolId',
      };

      return Request.getFMStudentOperation(mockParams).then(res => {
        expect(getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('Generating FM PDF worksheets', () => {
    beforeEach(() => {
      getBaseUrlWithoutSlmsObject.get.mockReturnValue(
        Promise.resolve({ output: { output_data: [{ report: [{}] }] } })
      );
    });

    it('should get the correct response', () => {
      const mockParams = {
        sessionId: 'sessionId',
        cohortId: 'cohortId',
        cohortType: COHORT_TYPE.Student,
        current: true,
        addition: false,
        subtraction: false,
        multiplication: false,
        division: false,
        problemType: '1digit',
        orientation: 'horizontal',
        answerKey: false,
        remainder: false,
      };

      return Request.FMGeneratePdfReport(mockParams).then(res => {
        expect(getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });

    it('should get the correct response when current is false', () => {
      const mockParams = {
        sessionId: 'sessionId',
        cohortId: 'cohortId',
        cohortType: COHORT_TYPE.Student,
        current: false,
        addition: true,
        subtraction: false,
        multiplication: false,
        division: false,
        problemType: '1digit',
        orientation: 'horizontal',
        answerKey: false,
        remainder: false,
      };

      return Request.FMGeneratePdfReport(mockParams).then(res => {
        expect(getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('displayGeneratedReport', () => {
    it('should open a new window with the pdf URL', () => {
      jest.spyOn(window, 'open').mockImplementation(() => {});
      const pdfURL = 'pdfworksheetlink.pdf';
      Request.displayGeneratedReport(pdfURL);
      expect(window.open).toHaveBeenCalledWith(`www.baseurl.com/${pdfURL}`, '_blank');
      window.open.mockRestore();
    });
  });
});
