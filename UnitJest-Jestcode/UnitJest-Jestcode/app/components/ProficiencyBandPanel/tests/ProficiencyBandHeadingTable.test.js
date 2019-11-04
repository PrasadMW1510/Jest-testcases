import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ProficiencyBandHeadingTable from '../ProficiencyBandHeadingTable';

describe('ProficiencyBandHeadingTable', () => {
  let wrapper = null;
  const mockHandleChangeBandName = jest.fn();
  const mockImmBandReferenceData = fromJS([
    { defaultName: '(no name)' },
    { defaultName: 'Below Basic' },
    { defaultName: 'Basic' },
    { defaultName: 'Proficient' },
    { defaultName: 'Advanced' },
  ]);
  const mockImmBandNames = fromJS(['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']);
  const mockImmBandsEnabled = fromJS([false, true, true, true, true]);

  describe('editable heading table without showing asterisks', () => {
    beforeAll(() => {
      wrapper = shallow(
        <ProficiencyBandHeadingTable
          handleChangeBandName={mockHandleChangeBandName}
          immBandNames={mockImmBandNames}
          immBandReferenceData={mockImmBandReferenceData}
          immBandsEnabled={mockImmBandsEnabled}
          isEditable
          numberOfTrailingColumns={1}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should handle band name change correctly', () => {
      const ev = {
        target: {
          getAttribute: () => 3,
          value: 'New Band Name',
        },
      };
      wrapper.instance().handleChangeBandName(ev);
      expect(mockHandleChangeBandName).toHaveBeenCalledWith({
        bandIndex: 3,
        value: 'New Band Name',
      });
    });
  });

  describe('read-only heading table and showing asterisks', () => {
    beforeAll(() => {
      wrapper = shallow(
        <ProficiencyBandHeadingTable
          handleChangeBandName={mockHandleChangeBandName}
          immBandNames={mockImmBandNames}
          immBandReferenceData={mockImmBandReferenceData}
          immBandsEnabled={mockImmBandsEnabled}
          isEditable={false}
          numberOfTrailingColumns={1}
          shouldBandShowAsterisk={() => true}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
