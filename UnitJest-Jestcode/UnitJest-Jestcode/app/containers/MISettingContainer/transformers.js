import { STARTING_GRADE_INDEX } from 'components/MISetting/constants';

export function transformScore(rawScore, boundaryId, defaultBandName) {
  if (isNaN(rawScore)) {
    return '?';
  }
  if (defaultBandName === 'Advanced' && boundaryId === 1) {
    return `${rawScore}+`;
  }
  if (rawScore === -999998) {
    return 'EM400';
  }
  if (rawScore < 0) {
    return `EM${Math.abs(rawScore)}`;
  }
  return rawScore.toString();
}

export function proficiencyBandsToApiRepresentation(immFormProficiencyBandData) {
  const immBandNames = immFormProficiencyBandData.get('bandNames');
  const immBandReferenceData = immFormProficiencyBandData.get('bandReferenceData');
  const immBandsEnabled = immFormProficiencyBandData.get('bandsEnabled');
  const numberOfBands = immBandReferenceData.size;
  const immGrades = immFormProficiencyBandData.get('grades');
  const numberOfGrades = immGrades.size;
  const proficientBandIndex = immFormProficiencyBandData.get('proficientBandIndex');
  const apiBands = Array(numberOfBands);
  immBandReferenceData.forEach((immBandReferenceInfo, bandIndex) => {
    const bandIsEnabled = immBandsEnabled.get(bandIndex);
    apiBands[bandIndex] = {
      enabled: [bandIsEnabled],
      is_proficient_band: [proficientBandIndex === bandIndex],
      num: [immBandReferenceInfo.get('number')],
    };
    // only include the 'name' prop if it's actually populated
    if (immBandNames.get(bandIndex)) {
      apiBands[bandIndex].name = [immBandNames.get(bandIndex)];
    }
    // the API only requires grade band ranges if the band is enabled
    if (bandIsEnabled) {
      const apiGrades = [];
      for (let gradeIndex = STARTING_GRADE_INDEX; gradeIndex < numberOfGrades; gradeIndex += 1) {
        const immGrade = immGrades.get(gradeIndex);
        const immGradeBand = immGrade.getIn(['bandRanges', bandIndex]);
        let gradeNum = immGrade.get('number');
        if (gradeNum === '0') {
          gradeNum = 'K';
        }
        apiGrades.push({
          high: [transformScore(immGradeBand.get('high'))],
          low: [immGradeBand.get('low')],
          num: [gradeNum],
        });
      }
      apiBands[bandIndex].grade = apiGrades;
    }
  });
  return {
    output: {
      output_data: {
        getAdvancedSettings: {
          smi_proficiency_bands: {
            band: apiBands,
          },
        },
      },
    },
  };
}

export function proficiencyBandsToFormRepresentation(apiProficiencyBandData) {
  const apiBands = apiProficiencyBandData.band;
  const numberOfBands = apiBands.length;
  const numberOfGrades = apiBands[0].grade.length;
  const bandNames = Array(numberOfBands);
  const bandReferenceData = Array(numberOfBands);
  const bandsEnabled = Array(numberOfBands);
  const grades = Array(numberOfGrades);
  let proficientBandIndex = null;
  apiBands.forEach((apiBand, bandIndex) => {
    // the API response orders the bands from high to low, so the index
    // that we'll use for the element in our array is inverted
    const sortedBandIndex = numberOfBands - (bandIndex + 1);
    bandNames[sortedBandIndex] = apiBand.name[0];
    bandReferenceData[sortedBandIndex] = {
      defaultName: apiBand.name[1]._,
      number: apiBand.num[0],
    };
    bandsEnabled[sortedBandIndex] = apiBand.enabled[0] === 'true';
    apiBand.grade.forEach((apiBandGrade, gradeIndex) => {
      let grade = grades[gradeIndex];
      if (!grade) {
        grade = {
          bandRanges: Array(numberOfBands),
          number: apiBandGrade.num[0],
        };
        grades[gradeIndex] = grade;
      }
      const apiBandGradeDefaultHigh = apiBandGrade.high[1] && apiBandGrade.high[1]._;
      const apiBandGradeDefaultLow = apiBandGrade.low[1] && apiBandGrade.low[1]._;
      let defaultInfo = null;
      if (apiBandGradeDefaultLow && apiBandGradeDefaultHigh) {
        defaultInfo = {
          high: parseInt(apiBandGradeDefaultHigh, 10),
          low: parseInt(apiBandGradeDefaultLow, 10),
        };
      }
      grade.bandRanges[sortedBandIndex] = {
        defaultInfo,
        high: parseInt(apiBandGrade.high[0], 10),
        low: parseInt(apiBandGrade.low[0], 10),
      };
    });
    if (apiBand.is_proficient_band[0] === 'true') {
      proficientBandIndex = sortedBandIndex;
    }
  });
  return {
    bandNames,
    bandReferenceData,
    bandsEnabled,
    grades,
    proficientBandIndex,
  };
}

export function programSettingsToApiRepresentation(formProgramSettingObj) {
  const flattenedProgramSettingObj = {};
  Object.keys(formProgramSettingObj).forEach(formProgramSettingKey => {
    flattenedProgramSettingObj[formProgramSettingKey] =
      formProgramSettingObj[formProgramSettingKey][0];
  });
  // don't provide the custom days text field if it's empty
  if (flattenedProgramSettingObj.custom_days === '') {
    delete flattenedProgramSettingObj.custom_days;
  }
  const apiProgramSettingObj = {
    settings: {
      ...flattenedProgramSettingObj,
    },
  };
  return apiProgramSettingObj;
}
