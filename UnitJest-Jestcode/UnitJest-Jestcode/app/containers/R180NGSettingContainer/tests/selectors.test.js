import { fromJS } from 'immutable';
import { makeProgramSetting, makeEnrollmentSetting } from '../selectors';

describe('selectProgramSetting', () => {
  it('makeProgramSetting', () => {
    const r180NGProgramSettingData = fromJS({
      programSetting: { student_level: ['0'] },
    });
    const mockedState = fromJS({
      r180NGProgramSettingData,
    });
    expect(makeProgramSetting()(mockedState)).toEqual(r180NGProgramSettingData);
  });

  it('makeEnrollmentSetting', () => {
    const r180NGProgramSettingData = fromJS({
      programSetting: { student_level: ['0'] },
    });
    const mockedState = fromJS({
      r180NGProgramSettingData,
    });
    expect(makeEnrollmentSetting()(mockedState)).toEqual(r180NGProgramSettingData);
  });
});
