import { fromJS } from 'immutable';
import * as Transformers from '../transformers';

describe('RISettingContainer transformers', () => {
  describe('proficiencyBandsToFormRepresentation', () => {
    const apiProficiencyBandData = {
      bands: [
        {
          band: [
            {
              grade: [
                {
                  high: ['1', { _: '100' }],
                  low: ['-999998', { _: '5' }],
                  num: ['0'],
                },
                {
                  high: ['999998'],
                  low: ['2'],
                  num: ['1'],
                },
              ],
              enabled: ['true'],
              is_proficient_band: ['false'],
              name: [
                'name1',
                {
                  _: 'defaultName1',
                },
              ],
              num: [2],
            },
            {
              grade: [
                {
                  high: ['100'],
                  low: ['3'],
                  num: ['0'],
                },
                {
                  high: ['999998'],
                  low: ['101'],
                  num: ['1'],
                },
              ],
              enabled: ['false'],
              is_proficient_band: ['true'],
              name: [
                'name2',
                {
                  _: 'defaultName2',
                },
              ],
              num: [1],
            },
          ],
        },
      ],
      show_asterisks: ['true'],
    };

    it('should transform API => Form representation correctly', () => {
      expect(
        Transformers.proficiencyBandsToFormRepresentation(apiProficiencyBandData)
      ).toMatchSnapshot();
    });
  });

  describe('proficiencyBandsToApiRepresentation', () => {
    const immMockProficiencyBandDataWithAsterisks = fromJS({
      bandNames: ['(no name)', 'Below Basic', 'Basic', 'Proficient', ''],
      bandReferenceData: [
        { defaultName: 'no default', number: '5' },
        { defaultName: 'Below Basic', number: '4' },
        { defaultName: 'Basic', number: '3' },
        { defaultName: 'Proficient', number: '2' },
        { defaultName: 'Advanced', number: '1' },
      ],
      bandsEnabled: [false, true, true, true, true],
      grades: [
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: -999998, low: -999998, defaultInfo: { high: -999998, low: -999998 } },
            { high: 189, low: -999998, defaultInfo: { high: 189, low: -999998 } },
            { high: 530, low: 190, defaultInfo: { high: 530, low: 190 } },
            { high: 999998, low: 531, defaultInfo: { high: 999998, low: 531 } },
          ],
          number: '0',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: -999998, low: -999998, defaultInfo: { high: -999998, low: -999998 } },
            { high: 189, low: -999998, defaultInfo: { high: 189, low: -999998 } },
            { high: 530, low: 190, defaultInfo: { high: 530, low: 190 } },
            { high: 999998, low: 531, defaultInfo: { high: 999998, low: 531 } },
          ],
          number: '1',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 219, low: -999998, defaultInfo: { high: 219, low: -999998 } },
            { high: 419, low: 220, defaultInfo: { high: 419, low: 220 } },
            { high: 650, low: 420, defaultInfo: { high: 650, low: 420 } },
            { high: 999998, low: 651, defaultInfo: { high: 999998, low: 651 } },
          ],
          number: '2',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 329, low: -999998, defaultInfo: { high: 329, low: -999998 } },
            { high: 519, low: 330, defaultInfo: { high: 519, low: 330 } },
            { high: 820, low: 520, defaultInfo: { high: 820, low: 520 } },
            { high: 999998, low: 821, defaultInfo: { high: 999998, low: 821 } },
          ],
          number: '3',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 539, low: -999998, defaultInfo: { high: 539, low: -999998 } },
            { high: 739, low: 540, defaultInfo: { high: 739, low: 540 } },
            { high: 940, low: 740, defaultInfo: { high: 940, low: 740 } },
            { high: 999998, low: 941, defaultInfo: { high: 999998, low: 941 } },
          ],
          number: '4',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 619, low: -999998, defaultInfo: { high: 619, low: -999998 } },
            { high: 829, low: 620, defaultInfo: { high: 829, low: 620 } },
            { high: 1010, low: 830, defaultInfo: { high: 1010, low: 830 } },
            { high: 999998, low: 1011, defaultInfo: { high: 999998, low: 1011 } },
          ],
          number: '5',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 729, low: -999998, defaultInfo: { high: 729, low: -999998 } },
            { high: 924, low: 730, defaultInfo: { high: 924, low: 730 } },
            { high: 1070, low: 925, defaultInfo: { high: 1070, low: 925 } },
            { high: 999998, low: 1071, defaultInfo: { high: 999998, low: 1071 } },
          ],
          number: '6',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 769, low: -999998, defaultInfo: { high: 769, low: -999998 } },
            { high: 969, low: 770, defaultInfo: { high: 969, low: 770 } },
            { high: 1120, low: 970, defaultInfo: { high: 1120, low: 970 } },
            { high: 999998, low: 1121, defaultInfo: { high: 999998, low: 1121 } },
          ],
          number: '7',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 789, low: -999998, defaultInfo: { high: 789, low: -999998 } },
            { high: 1009, low: 790, defaultInfo: { high: 1009, low: 790 } },
            { high: 1185, low: 1010, defaultInfo: { high: 1185, low: 1010 } },
            { high: 999998, low: 1186, defaultInfo: { high: 999998, low: 1186 } },
          ],
          number: '8',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 849, low: -999998, defaultInfo: { high: 849, low: -999998 } },
            { high: 1049, low: 850, defaultInfo: { high: 1049, low: 850 } },
            { high: 1260, low: 1050, defaultInfo: { high: 1260, low: 1050 } },
            { high: 999998, low: 1261, defaultInfo: { high: 999998, low: 1261 } },
          ],
          number: '9',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 889, low: -999998, defaultInfo: { high: 889, low: -999998 } },
            { high: 1079, low: 890, defaultInfo: { high: 1079, low: 890 } },
            { high: 1335, low: 1080, defaultInfo: { high: 1335, low: 1080 } },
            { high: 999998, low: 1336, defaultInfo: { high: 999998, low: 1336 } },
          ],
          number: '10',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 984, low: -999998, defaultInfo: { high: 984, low: -999998 } },
            { high: 1184, low: 985, defaultInfo: { high: 1184, low: 985 } },
            { high: 1385, low: 1185, defaultInfo: { high: 1385, low: 1185 } },
            { high: 999998, low: 1386, defaultInfo: { high: 999998, low: 1386 } },
          ],
          number: '11',
        },
        {
          bandRanges: [
            { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
            { high: 984, low: -999998, defaultInfo: { high: 984, low: -999998 } },
            { high: 1184, low: 985, defaultInfo: { high: 1184, low: 985 } },
            { high: 1385, low: 1185, defaultInfo: { high: 1385, low: 1185 } },
            { high: 999998, low: 1386, defaultInfo: { high: 999998, low: 1386 } },
          ],
          number: '12',
        },
      ],
      proficientBandIndex: 3,
      shouldShowAsterisks: true,
    });

    it('should transform Form => API representation correctly', () => {
      expect(
        Transformers.proficiencyBandsToApiRepresentation(immMockProficiencyBandDataWithAsterisks)
      ).toMatchSnapshot();
    });
  });

  describe('programSettingsToApiRepresentation', () => {
    it('should transform settings correctly for API post', () => {
      const formProgramSettingObj = {
        allow_min_days_between_tests: ['1'],
        choose_reading_interests: ['1'],
        est_reading_level: ['1'],
        limit_reading_to_installed_quizzes: ['0'],
        max_books_in_reading_list: ['30'],
        min_days_between_tests: ['30'],
        require_practice_test: ['1'],
        see_reading_list: ['1'],
        show_lexile_after_test: ['1'],
      };
      expect(
        Transformers.programSettingsToApiRepresentation(formProgramSettingObj)
      ).toMatchSnapshot();
    });
  });

  describe('transformLexile', () => {
    it('should transform undefined correctly', () => {
      expect(Transformers.transformLexile(undefined)).toEqual('?');
    });

    it('should transform 999998 correctly', () => {
      expect(Transformers.transformLexile(999998)).toEqual('1700+');
    });

    it('should transform negatives correctly', () => {
      expect(Transformers.transformLexile(-1)).toEqual('BR');
    });

    it('should transform regular values correctly', () => {
      expect(Transformers.transformLexile(1095)).toEqual('1095');
    });
  });
});
