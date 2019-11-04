import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ProficiencyBandDataTable from '../ProficiencyBandDataTable';

describe('ProficiencyBandDataTable', () => {
  let wrapper = null;
  const mockBandValueTranslator = jest.fn();
  const mockHandleBlurBandHighValue = jest.fn();
  const mockHandleChangeBandHighValue = jest.fn();
  const mockImmBandReferenceData = fromJS([
    { defaultName: '(no name)' },
    { defaultName: 'Below Basic' },
    { defaultName: 'Basic' },
    { defaultName: 'Proficient' },
    { defaultName: 'Advanced' },
  ]);
  const mockImmBandsEnabled = fromJS([false, true, true, true, true]);
  const mockImmGrades = fromJS([
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
  ]);
  const mockImmInvalidHighs = fromJS([
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
    [true, false, true, false, false],
  ]);

  describe('standard render', () => {
    beforeAll(() => {
      wrapper = shallow(
        <ProficiencyBandDataTable
          bandValueTranslator={mockBandValueTranslator}
          handleBlurBandHighValue={mockHandleBlurBandHighValue}
          handleChangeBandHighValue={mockHandleChangeBandHighValue}
          immBandReferenceData={mockImmBandReferenceData}
          immBandsEnabled={mockImmBandsEnabled}
          immGrades={mockImmGrades}
          immInvalidHighs={mockImmInvalidHighs}
          isEditable
          numberOfTrailingColumns={1}
          startingGradeIndex={1}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
