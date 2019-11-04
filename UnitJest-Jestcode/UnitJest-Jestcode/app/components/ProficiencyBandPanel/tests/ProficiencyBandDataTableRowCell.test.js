import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ProficiencyBandDataTableRowCell from '../ProficiencyBandDataTableRowCell';

describe('ProficiencyBandDataTableRowCell', () => {
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

  describe('editable cell', () => {
    beforeAll(() => {
      wrapper = shallow(
        <ProficiencyBandDataTableRowCell
          bandIndex={1}
          bandName="Basic"
          bandValueTranslator={mockBandValueTranslator}
          gradeNumber="3"
          handleBlurBandHighValue={mockHandleBlurBandHighValue}
          handleChangeBandHighValue={mockChangeBandHighValue}
          high={100}
          highIsValid
          isEditable
          key="Basic"
          low={-999998}
        />
      );
    });

    it('editable cell should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handleBlurBandHighValue runs correctly', () => {
      const ev = {
        target: {
          value: '150',
        },
      };
      const mockHandlerParam = {
        bandIndex: 1,
        gradeNumber: '3',
        value: 150,
      };
      wrapper.instance().handleBlurBandHighValue(ev);
      expect(mockHandleBlurBandHighValue).toHaveBeenCalledWith(mockHandlerParam);
    });

    it('handleChangeBandHighValue runs correctly', () => {
      const ev = {
        target: {
          value: '150',
        },
      };
      const mockHandlerParam = {
        bandIndex: 1,
        gradeNumber: '3',
        value: 150,
      };
      wrapper.instance().handleChangeBandHighValue(ev);
      expect(mockChangeBandHighValue).toHaveBeenCalledWith(mockHandlerParam);
    });
  });

  describe('read-only cell', () => {
    it('should render different high/low values correctly', () => {
      wrapper = shallow(
        <ProficiencyBandDataTableRowCell
          bandIndex={1}
          bandName="Basic"
          bandValueTranslator={mockBandValueTranslator}
          gradeNumber="3"
          handleBlurBandHighValue={mockHandleBlurBandHighValue}
          handleChangeBandHighValue={mockChangeBandHighValue}
          high={100}
          highIsValid
          isEditable={false}
          key="Basic"
          low={-999998}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render same high/low values correctly', () => {
      wrapper = shallow(
        <ProficiencyBandDataTableRowCell
          bandIndex={1}
          bandName="Basic"
          bandValueTranslator={mockBandValueTranslator}
          gradeNumber="3"
          handleBlurBandHighValue={mockHandleBlurBandHighValue}
          handleChangeBandHighValue={mockChangeBandHighValue}
          high={100}
          highIsValid
          isEditable={false}
          key="Basic"
          low={100}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render zero high value correctly', () => {
      wrapper = shallow(
        <ProficiencyBandDataTableRowCell
          bandIndex={1}
          bandName="Basic"
          bandValueTranslator={mockBandValueTranslator}
          gradeNumber="3"
          handleBlurBandHighValue={mockHandleBlurBandHighValue}
          handleChangeBandHighValue={mockChangeBandHighValue}
          high={0}
          highIsValid
          isEditable={false}
          key="Basic"
          low={-999998}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly with invalid highs and no bandValueTranslator', () => {
      wrapper = shallow(
        <ProficiencyBandDataTableRowCell
          bandIndex={1}
          bandName="Basic"
          gradeNumber="3"
          handleBlurBandHighValue={mockHandleBlurBandHighValue}
          handleChangeBandHighValue={mockChangeBandHighValue}
          high={NaN}
          highIsValid={false}
          isEditable
          key="Basic"
          low={-999998}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
