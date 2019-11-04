/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import * as GlobalSelectors from 'containers/App/selectors';
import * as AppConstants from 'containers/App/constants';
import defaultSaga, * as Saga from '../saga';
import * as Request from '../request';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('FADSettings Get Settings Saga', () => {
  let store = null;
  const err = null;
  let generator = null;
  let loginSelector = null;
  let cohortTypeSelector = null;
  let cohortIdSelector = null;
  let result = null;
  const sessionId = 'abcde';
  const userId = 'fghijkl';
  const cohortId = '12345';
  const cohortType = AppConstants.COHORT_TYPE.District;
  beforeEach(() => {
    loginSelector = jest
      .fn()
      .mockReturnValue(fromJS({ session_id: [sessionId], user_id: [userId] }));
    cohortTypeSelector = jest.fn().mockReturnValue(cohortType);
    cohortIdSelector = jest.fn().mockReturnValue({ id: cohortId });
    jest.spyOn(GlobalSelectors, 'makeSelectLoginData').mockReturnValue(loginSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectCohortType').mockReturnValue(cohortTypeSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectCohortTypeCohortId').mockReturnValue(cohortIdSelector);
    result = [{ show_retake_final_assessment_option: 0 }];
    store = fromJS({
      login: { session_id: [sessionId], user_id: [userId] },
      cohortType,
      cohortId: { id: [cohortId] },
    });
    generator = Saga.getFADSettingsFlow();
  });

  it('Should handle successful get settings request', () => {
    expect(generator.next().value).toEqual(select(loginSelector));
    expect(generator.next(store.get('login')).value).toEqual(select(cohortTypeSelector));
    expect(generator.next(AppConstants.COHORT_TYPE.District).value).toEqual(
      select(cohortIdSelector)
    );
    expect(generator.next({ id: cohortId }).value).toEqual(
      call(
        Request.getFADSettings,
        store.getIn(['login', 'session_id', 0]),
        cohortType,
        store.getIn(['cohortId', 'id', 0])
      )
    );
    expect(generator.next(result).value).toEqual(put(Actions.getSettingsSuccess(result)));
    expect(generator.next().done).toBeTruthy();
  });

  it('Should handle failed get settings request', () => {
    expect(generator.next().value).toEqual(select(loginSelector));
    expect(generator.next(store.get('login')).value).toEqual(select(cohortTypeSelector));
    expect(generator.next(AppConstants.COHORT_TYPE.District).value).toEqual(
      select(cohortIdSelector)
    );
    expect(generator.next({ id: cohortId }).value).toEqual(
      call(
        Request.getFADSettings,
        store.getIn(['login', 'session_id', 0]),
        cohortType,
        store.getIn(['cohortId', 'id', 0])
      )
    );
    expect(generator.next(result).value).toEqual(put(Actions.getSettingsSuccess(result)));
    expect(generator.throw(err).value).toEqual(put(Actions.getSettingsFailure(err)));
    expect(generator.next().done).toBeTruthy();
  });
});

describe('FADSettings Set Settings Saga', () => {
  let store = null;
  const err = null;
  let generator = null;
  let loginSelector = null;
  let cohortTypeSelector = null;
  let cohortIdSelector = null;
  let result = null;
  const sessionId = 'abcde';
  const userId = 'fghijkl';
  const cohortId = '12345';
  const retake = false;
  const reset = false;
  const cohortType = AppConstants.COHORT_TYPE.District;
  beforeEach(() => {
    loginSelector = jest
      .fn()
      .mockReturnValue(fromJS({ session_id: [sessionId], user_id: [userId] }));
    cohortTypeSelector = jest.fn().mockReturnValue(cohortType);
    cohortIdSelector = jest.fn().mockReturnValue({ id: cohortId });
    jest.spyOn(GlobalSelectors, 'makeSelectLoginData').mockReturnValue(loginSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectCohortType').mockReturnValue(cohortTypeSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectCohortTypeCohortId').mockReturnValue(cohortIdSelector);
    result = [{ show_retake_final_assessment_option: 0 }];
    store = fromJS({
      login: { session_id: [sessionId], user_id: [userId] },
      cohortType,
      cohortId: { id: [cohortId] },
    });
    generator = Saga.setFADSettingsFlow({ retake, reset });
  });

  it('Should handle successful get settings request', () => {
    expect(generator.next().value).toEqual(select(loginSelector));
    expect(generator.next(store.get('login')).value).toEqual(select(cohortTypeSelector));
    expect(generator.next(AppConstants.COHORT_TYPE.District).value).toEqual(
      select(cohortIdSelector)
    );
    expect(generator.next({ id: cohortId }).value).toEqual(
      call(
        Request.setFADsettings,
        store.getIn(['login', 'session_id', 0]),
        cohortType,
        store.getIn(['cohortId', 'id', 0]),
        retake,
        reset
      )
    );
    expect(generator.next(result).value).toEqual(put(Actions.setSettingsSuccess(result)));
    expect(generator.next().done).toBeTruthy();
  });

  it('Should handle failed get settings request', () => {
    expect(generator.next().value).toEqual(select(loginSelector));
    expect(generator.next(store.get('login')).value).toEqual(select(cohortTypeSelector));
    expect(generator.next(AppConstants.COHORT_TYPE.District).value).toEqual(
      select(cohortIdSelector)
    );
    expect(generator.next({ id: cohortId }).value).toEqual(
      call(
        Request.setFADsettings,
        store.getIn(['login', 'session_id', 0]),
        cohortType,
        store.getIn(['cohortId', 'id', 0]),
        retake,
        reset
      )
    );
    expect(generator.next(result).value).toEqual(put(Actions.setSettingsSuccess(result)));
    expect(generator.throw(err).value).toEqual(put(Actions.setSettingsFailure(err)));
    expect(generator.next().done).toBeTruthy();
  });
});

describe('defaultSaga', () => {
  let generator = null;
  beforeEach(() => {
    generator = defaultSaga();
  });

  it('All calls are made', () => {
    expect(generator.next().value).toEqual(
      takeLatest(Constants.FAD_GET_SETTINGS_REQUEST, Saga.getFADSettingsFlow)
    );
    expect(generator.next().value).toEqual(
      takeLatest(Constants.FAD_SET_SETTINGS_REQUEST, Saga.setFADSettingsFlow)
    );
  });
});
