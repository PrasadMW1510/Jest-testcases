/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { initialize, stopSubmit } from 'redux-form/immutable';
import { hideModal } from 'containers/ModalController/actions';
import { getProfileForSchoolAdmin } from 'containers/ProfilePageContainer/request';
import { updateUserData } from 'containers/App/actions';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import { TITLE_1_STATUS_LIST } from 'components/SchoolForm/constants';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import { transformSchoolDataForForm, transformSchoolMapForPost } from '../transformers';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';

describe('AddEditSchool Saga', () => {
  const err = 'mock error';
  const schoolId = 'school-123';
  const districtId = 'dist1';
  const sessionId = 'adsfczas111';
  const profileSessionIdSelector = jest.fn();
  const profileDistrictIdSelector = jest.fn();
  const metaDataGrades = 'grades data';
  const schoolObject = fromJS({
    name: 'foo',
    gradingPeriodEnd: ['2018-03-15'],
    gradingPeriodStart: ['2018-03-10'],
  });

  describe('initializeSchoolFormRequestFlow', () => {
    let generator = null;
    const schoolProfile = {
      name: 'foo school',
    };
    let mockSchoolIdSelectorSmartBar = null;

    beforeEach(() => {
      mockSchoolIdSelectorSmartBar = jest.fn();
      generator = Saga.initializeSchoolFormRequestFlow({ data: { edit: false } });
      jest
        .spyOn(SmartBarSelectors, 'makeSelectSchoolId')
        .mockReturnValue(mockSchoolIdSelectorSmartBar);
    });

    it('Should handle the loading flow successfully', () => {
      const metaData = {
        [Constants.META_DATA_GRADES]: metaDataGrades,
      };

      expect(generator.next().value).toEqual(call(Saga.getApiParams));
      expect(generator.next({ sessionId, districtId }).value).toEqual(
        all([
          call(Saga.loadMetaData, sessionId, districtId),
          call(Saga.getInitialState, sessionId, false, undefined),
        ])
      );
      expect(generator.next([metaData, schoolProfile]).value).toEqual(
        put(initialize(Constants.FORM_SCHOOL_PROFILE, fromJS({ ...schoolProfile, metaData })))
      );
      expect(generator.next().value).toEqual(put(Actions.initializeSchoolFormRequestSuccess()));
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle the loading flow when failure', () => {
      expect(generator.next().value).toEqual(call(Saga.getApiParams));
      expect(generator.throw(err).value).toEqual(
        put(Actions.initializeSchoolFormRequestFailure(err))
      );
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('Meta Data', () => {
    let generator;
    beforeEach(() => {
      generator = Saga.loadMetaData(sessionId, districtId);
    });

    it('Should handle successful loading meta data', () => {
      expect(generator.next().value).toEqual(
        all([call(Request.getGradeListForDistrict, sessionId, districtId)])
      );
      // Pass-in some mock returned data from `calls`
      const finalNext = generator.next([metaDataGrades]);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual({
        [Constants.META_DATA_GRADES]: metaDataGrades,
      });
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('Initial Form State - Add a School', () => {
    let mockSchoolIdSelector;
    let generator;
    beforeEach(() => {
      generator = Saga.getInitialState(sessionId, false);
      mockSchoolIdSelector = jest.fn();
      jest.spyOn(SmartBarSelectors, 'makeSelectSchoolId').mockReturnValue(mockSchoolIdSelector);
    });

    it('Should get initial state for an "Add School"', () => {
      const mockInitialDataFromServer = {
        contact_info: [{}],
        contact_person: [{}],
        school_info: [
          {
            grades: [],
            grading_periods: [{ grading_period: [] }],
            school_period: [],
            school_types: [],
            title_1_status: TITLE_1_STATUS_LIST[0].id,
          },
        ],
      };
      expect(generator.next().value).toEqual(call(Saga.getActiveSchool));
      const finalNext = generator.next(mockInitialDataFromServer);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual(transformSchoolDataForForm(mockInitialDataFromServer));
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('Initial Form State - Edit a School', () => {
    let mockSchoolIdSelector;
    let generator;
    beforeEach(() => {
      generator = Saga.getInitialState(sessionId, true);
      mockSchoolIdSelector = jest.fn();
      jest.spyOn(SmartBarSelectors, 'makeSelectSchoolId').mockReturnValue(mockSchoolIdSelector);
    });

    it('Should get initial state for an "Edit School"', () => {
      const mockInitialDataFromServer = {
        contact_info: [{}],
        contact_person: [{}],
        name: 'some school name',
        school_info: [
          {
            grades: [],
            grading_periods: [{ grading_period: [] }],
            school_period: [],
            school_types: [],
            title_1_status: TITLE_1_STATUS_LIST[0].id,
          },
        ],
      };
      expect(generator.next().value).toEqual(call(Saga.getActiveSchool));
      expect(generator.next(schoolId).value).toEqual(
        call(getProfileForSchoolAdmin, sessionId, schoolId)
      );
      const finalNext = generator.next(mockInitialDataFromServer);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual(transformSchoolDataForForm(mockInitialDataFromServer));
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('Saving Data', () => {
    let generator = null;
    let mockSchoolIdSelectorSmartBar = null;

    beforeEach(() => {
      mockSchoolIdSelectorSmartBar = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectSchoolId')
        .mockReturnValue(mockSchoolIdSelectorSmartBar);
    });

    it('Should handle adding a school successfully', () => {
      generator = Saga.handleSaveRequestFlow({ schoolObject });
      expect(generator.next().value).toEqual(call(Saga.getApiParams));
      expect(generator.next({ sessionId, districtId }).value).toEqual(call(Saga.getActiveSchool));
      expect(generator.next(schoolId).value).toEqual(
        call(
          Request.postAddSchool,
          sessionId,
          transformSchoolMapForPost(schoolObject, schoolId, districtId)
        )
      );
      expect(generator.next().value).toEqual(put(Actions.saveSchoolRequestSuccess()));
      expect(generator.next().value).toEqual(put(updateUserData()));
      expect(generator.next().value).toEqual(put(hideModal()));
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle editing a school successfully', () => {
      generator = Saga.handleSaveRequestFlow({ schoolObject, isEdit: true });
      expect(generator.next().value).toEqual(call(Saga.getApiParams));
      expect(generator.next({ sessionId, districtId }).value).toEqual(call(Saga.getActiveSchool));
      expect(generator.next(schoolId).value).toEqual(
        call(
          Request.postEditSchool,
          sessionId,
          transformSchoolMapForPost(schoolObject, schoolId, districtId)
        )
      );
      expect(generator.next().value).toEqual(put(Actions.saveSchoolRequestSuccess()));
      expect(generator.next().value).toEqual(put(updateUserData()));
      expect(generator.next().value).toEqual(put(hideModal()));
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle the saving flow when failure', () => {
      generator = Saga.handleSaveRequestFlow({ schoolObject });
      expect(generator.next().value).toEqual(call(Saga.getApiParams));
      expect(generator.throw(err).value).toEqual(
        put(stopSubmit(Constants.FORM_SCHOOL_PROFILE, err))
      );
      expect(generator.next().value).toEqual(put(Actions.saveSchoolRequestFailure(err)));
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('Get API Params', () => {
    let generator = null;
    beforeEach(() => {
      // mock the selectors
      jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
      jest
        .spyOn(Selectors, 'makeSelectProfileDistrictId')
        .mockReturnValue(profileDistrictIdSelector);
      generator = Saga.getApiParams();
    });

    it('Should handle returning API params', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(select(profileDistrictIdSelector));
      const finalNext = generator.next(districtId);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual({ sessionId, districtId });
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('Selected School Id', () => {
    let generator = null;
    const schoolIdSmartBarSelection = 'smartbar-selected-school-xyz';
    const profileOrgsData = fromJS([{ organization: [{ org_id: [schoolId], type: ['school'] }] }]);
    const profileOrgsDistrictData = fromJS([
      { organization: [{ org_id: ['district-123'], type: ['district'] }] },
    ]);
    let mockSchoolIdSelectorSmartBar = null;
    let mockProfileOrganizationData = null;
    beforeEach(() => {
      generator = Saga.getActiveSchool();
      mockSchoolIdSelectorSmartBar = jest.fn();
      mockProfileOrganizationData = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectSchoolId')
        .mockReturnValue(mockSchoolIdSelectorSmartBar);
      jest
        .spyOn(Selectors, 'makeSelectProfileOrganizationData')
        .mockReturnValue(mockProfileOrganizationData);
    });

    it('Should handle returning a schoolId when SmartBar is selected', () => {
      expect(generator.next().value).toEqual(select(mockSchoolIdSelectorSmartBar));
      const finalNext = generator.next(schoolIdSmartBarSelection);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual(schoolIdSmartBarSelection);
      expect(finalNext.done).toBeTruthy();
    });

    it('Should handle returning a schoolId when there is no smartbar selection and there is a school org_id', () => {
      expect(generator.next().value).toEqual(select(mockSchoolIdSelectorSmartBar));
      // No smartbar selection, pass-in null
      expect(generator.next(null).value).toEqual(select(mockProfileOrganizationData));
      const finalYield = generator.next(profileOrgsData);
      // Make sure returned data gets transformed into expected shape
      expect(finalYield.value).toEqual(schoolId);
      expect(finalYield.done).toBeTruthy();
    });

    it('Should return null when there is no smartbar selection and there is not a school org_id', () => {
      expect(generator.next().value).toEqual(select(mockSchoolIdSelectorSmartBar));
      // No smartbar selection, pass-in null
      expect(generator.next(null).value).toEqual(select(mockProfileOrganizationData));
      const finalYield = generator.next(profileOrgsDistrictData);
      // Make sure returned data gets transformed into expected shape
      expect(finalYield.value).toEqual(null);
      expect(finalYield.done).toBeTruthy();
    });
  });

  describe('defaultSaga', () => {
    let generator = null;
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            Constants.INITIALIZE_SCHOOL_FORM_REQUEST,
            Saga.initializeSchoolFormRequestFlow
          ),
          takeLatest(Constants.SAVE_SCHOOL_REQUEST, Saga.handleSaveRequestFlow),
          takeLatest(Constants.SAVE_SCHOOL_MIA_REQUEST, Saga.handleSaveMIARequestFlow),
        ])
      );
    });
  });
});
