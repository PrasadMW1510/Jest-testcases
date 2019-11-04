import { createSelector } from 'reselect';
import { sortData } from 'utils/utilities';
import { Iterable } from 'immutable';
import { FORM_EDIT_DISTRICT_PROFILE } from './constants';

/**
 * Direct selector to the editDistrictProfileContainer state domain
 */
const selectEditDistrictProfileContainerDomain = state => state.get('editDistrictProfileContainer');

/**
 * Other specific selectors
 */

export const makeSelectDistrictTimeZones = () =>
  createSelector(selectEditDistrictProfileContainerDomain, substate => {
    let timeZones;
    if (substate) {
      const allTimeZones = substate.get('timeZones');
      if (Iterable.isIterable(allTimeZones) && allTimeZones.get('time_zones')) {
        const legacyTimeZones = allTimeZones
          .get('time_zones')
          .getIn([0, 'scholastic', 0, 'time_zone'])
          .toJS();

        const javaTimeZones = allTimeZones
          .get('time_zones')
          .getIn([0, 'java', 0, 'time_zone'])
          .toJS();

        const sortedLegacyTimeZones = legacyTimeZones.sort(sortData);
        const sortedJavaTimeZones = javaTimeZones.sort(sortData);

        timeZones = sortedLegacyTimeZones.concat(sortedJavaTimeZones);
      }
    }

    return timeZones;
  });

export const makeSelectCustomDemographics = () =>
  createSelector(
    selectEditDistrictProfileContainerDomain,
    substate => substate && substate.toJS().customDemographics
  );

const selectForms = state => state.get('form');

export const makeSelectFormErrors = () =>
  createSelector(
    selectForms,
    formState => formState && formState.getIn([FORM_EDIT_DISTRICT_PROFILE, 'syncErrors'])
  );

export const makeSelectSubmitErrors = () =>
  createSelector(
    selectForms,
    formState => formState && formState.getIn([FORM_EDIT_DISTRICT_PROFILE, 'submitErrors'])
  );

/**
 * Default selector used by EditDistrictProfileContainer
 */

export const makeSelectEditDistrictProfileContainer = () =>
  createSelector(selectEditDistrictProfileContainerDomain, substate => substate && substate.toJS());
