import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ProficiencyBandDataTableRow from '../ProficiencyBandDataTableRow';

describe('ProficiencyBandDataTableRow', () => {
  let wrapper = null;
  const mockBandValueTranslator = jest.fn(val => {
    if (val >= 1700) {
      return '1700+';
    }
    if (val < 0) {
      return 'BR';
    }
    return val.toString();
  });
  const mockHandleBlurBandHighValue = jest.fn();
  const mockChangeBandHighValue = jest.fn();
  const mockImmBandReferenceData = fromJS([
    { defaultName: '(no name)' },
    { defaultName: 'Below Basic' },
    { defaultName: 'Basic' },
    { defaultName: 'Proficient' },
    { defaultName: 'Advanced' },
  ]);
  const mockImmBandsEnabled = fromJS([false, true, true, true, true]);
  const mockImmBandRanges = fromJS([
    { high: 0, low: 0, defaultInfo: { high: 999999, low: -999999 } },
    { high: -999998, low: -999998, defaultInfo: { high: -999998, low: -999998 } },
    { high: 189, low: -999998, defaultInfo: { high: 189, low: -999998 } },
    { high: 530, low: 190, defaultInfo: { high: 530, low: 190 } },
    { high: 999998, low: 531, defaultInfo: { high: 999998, low: 531 } },
  ]);

  const mockImmInvalidHighsForGrade = fromJS([false, true, true, false, true]);

  beforeAll(() => {
    wrapper = shallow(
      <ProficiencyBandDataTableRow
        bandValueTranslator={mockBandValueTranslator}
        gradeNumber="5"
        handleBlurBandHighValue={mockHandleBlurBandHighValue}
        handleChangeBandHighValue={mockChangeBandHighValue}
        immBandReferenceData={mockImmBandReferenceData}
        immBandsEnabled={mockImmBandsEnabled}
        immBandRanges={mockImmBandRanges}
        immInvalidHighsForGrade={mockImmInvalidHighsForGrade}
        isEditable
        key="5"
        numberOfTrailingColumns={1}
      />
    );
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('isCellEditable method', () => {
    it('should return correctly when not editable', () => {
      const localWrapper = shallow(
        <ProficiencyBandDataTableRow
          bandValueTranslator={mockBandValueTranslator}
          gradeNumber="5"
          handleBlurBandHighValue={mockHandleBlurBandHighValue}
          handleChangeBandHighValue={mockChangeBandHighValue}
          immBandReferenceData={mockImmBandReferenceData}
          immBandsEnabled={mockImmBandsEnabled}
          immBandRanges={mockImmBandRanges}
          immInvalidHighsForGrade={mockImmInvalidHighsForGrade}
          isEditable={false}
          key="5"
          numberOfTrailingColumns={1}
        />
      );
      expect(localWrapper.instance().isCellEditable(1, 5, 1000)).toBeFalsy();
    });

    it('should return correctly when editable and in outer range', () => {
      expect(wrapper.instance().isCellEditable(4, 5, 550)).toBeFalsy();
    });

    it('should return correctly when editable and in normal range', () => {
      expect(wrapper.instance().isCellEditable(1, 5, 300)).toBeTruthy();
    });
  });
});
