/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as Selectors from 'containers/ResourcesPage/selectors';
import defaultSaga, * as Saga from '../saga';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
import * as activitySelector from '../selectors';

describe('ResourcesActivityContainer Saga', () => {
  let generator = null;
  let app = null;
  let mockEpochTime = null;
  let mockGetResource = null;
  let mockGetAppId = null;
  let error = null;
  let mockAppSelected = null;
  let mockSAMBuildVersion = null;

  beforeEach(() => {
    mockSAMBuildVersion = jest.fn();
    mockAppSelected = jest.fn();
    mockEpochTime = 1516120801689;
    app = 'DTM_NOW';
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
    jest.spyOn(activitySelector, 'makeSelectAppSelected').mockReturnValue(mockAppSelected);
    jest.spyOn(Selectors, 'makeSelectSAMBuildVersion').mockReturnValue(mockSAMBuildVersion);
  });

  describe('verify default saga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('GET_APP_BASED_RESOURCE IS CALLED', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_APP_BASED_RESOURCE, Saga.getSamResourceByApp)
      );
    });

    it('GET_ITS_APPS IS CALLED', () => {
      expect(generator.next().value).toEqual(takeLatest(Constants.GET_ITS_APPS, Saga.getItsApps));
    });

    it('POST Resource type', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.POST_RESOURCE_TYPE, Saga.postResourcesBasedInfo)
      );
    });
  });

  describe('Get resource manager based on app', () => {
    beforeEach(() => {
      mockGetResource = {
        available_standards: [
          {
            grades: [{ grade: ['k', '1'] }],
            locales: [{ locale: ['AK', 'AL'] }],
          },
        ],
        resource_program_id: ['49'],
        resource_program_name: ['SMI'],
        resource_supertypes: [
          {
            resource_supertype: [
              {
                resource_types: [
                  {
                    resource_types: [
                      {
                        resource_subtype: [''],
                        type_description: [''],
                        type_id: ['GEN0600'],
                        type_name: ['Research Reports'],
                      },
                    ],
                    supertype_description: [''],
                    supertype_id: ['TOP0300'],
                    supertype_name: ['For professional development and administration'],
                  },
                  {
                    resource_types: [
                      {
                        resource_subtype: [''],
                        type_description: [''],
                        type_id: ['GEN1500'],
                        type_name: ['Assessment'],
                      },
                      {
                        resource_subtype: [''],
                        type_description: [
                          'Use logs, checklists, tracking charts, and conference forms for monitoring student progress.',
                        ],
                        type_id: ['GEN0800'],
                        type_name: ['Classroom Management/Teacher Resources'],
                      },
                    ],
                    supertype_description: [''],
                    supertype_id: ['TOP0100'],
                    supertype_name: ['For Whole/Small Group Instruction'],
                  },
                ],
              },
            ],
          },
        ],
      };
      error = {};
      generator = Saga.getSamResourceByApp({ app });
    });

    it('Get app based resources', () => {
      expect(generator.next().value).toEqual(call(Request.getAppResources, app, mockEpochTime));
      expect(generator.next(mockGetResource).value).toEqual(
        put(Actions.getAppBasedResourceSuccess(mockGetResource))
      );
    });

    it('Error in getting app based resources', () => {
      expect(generator.next().value).toEqual(call(Request.getAppResources, app, mockEpochTime));
      expect(generator.throw(error).value).toEqual(put(Actions.getAppBasedResourceFailure(error)));
    });
  });

  describe('verify when the resources is a empty string', () => {
    beforeEach(() => {
      mockGetResource = '';
      generator = Saga.getSamResourceByApp({ app });
    });

    it('Verify for empty output', () => {
      expect(generator.next().value).toEqual(call(Request.getAppResources, app, mockEpochTime));
      expect(generator.next(mockGetResource).value).toEqual(
        put(Actions.getAppBasedResourceSuccess({}))
      );
    });
  });

  describe('Get list of ITS apps', () => {
    beforeEach(() => {
      mockGetAppId = {
        appId: ['R180_A', 'R180_B'],
      };
      error = {};
      generator = Saga.getItsApps();
    });

    it('Get ITS apps success', () => {
      expect(generator.next().value).toEqual(call(Request.getITSApps, mockEpochTime));
      expect(generator.next(mockGetAppId).value).toEqual(
        put(Actions.getITSAppsSuccess(mockGetAppId))
      );
    });

    it('Get ITS apps failure', () => {
      expect(generator.next().value).toEqual(call(Request.getITSApps, mockEpochTime));
      expect(generator.throw(error).value).toEqual(put(Actions.getITSAppsFailure(error)));
    });
  });

  describe('post resource manager', () => {
    let err = null;
    let resource = null;
    let mockResponse = null;
    let activity = null;
    beforeEach(() => {
      resource = {
        resource_type: 'test',
        program_id: null,
        samversion: null,
      };
      mockResponse = {
        program_id: '1234',
        resource_type: 'test',
      };
      activity = 'advanced';
      err = 'invalid post';
      generator = Saga.postResourcesBasedInfo({ resource, activity });
    });
    it('verify the get call', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(mockAppSelected));
      expect(generator.next().value).toEqual(select(mockSAMBuildVersion));
      expect(generator.next().value).toEqual(
        call(
          Request.postResourcesObjectInfo,
          mockEpochTime,
          Saga.ResourcesInfoRequestPayload(resource, '1234', '9987'),
          activity
        )
      );
      expect(generator.next(mockResponse).value).toEqual(
        put(Actions.postResourcesBasedOnIdSuccess(mockResponse))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('verify get call failure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(mockAppSelected));
      expect(generator.next().value).toEqual(select(mockSAMBuildVersion));
      expect(generator.next().value).toEqual(
        call(
          Request.postResourcesObjectInfo,
          mockEpochTime,
          Saga.ResourcesInfoRequestPayload(resource, '1234', '9987'),
          activity
        )
      );
      expect(generator.throw(err).value).toEqual(put(Actions.postResourcesBasedOnIdFailure(err)));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
});
