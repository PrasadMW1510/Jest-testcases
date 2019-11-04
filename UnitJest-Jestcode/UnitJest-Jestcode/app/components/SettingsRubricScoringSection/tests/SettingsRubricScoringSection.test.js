import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { COHORT_TYPE } from 'containers/App/constants';

import SettingsRubricScoringSection from '../index';

describe('<SettingsRubricScoringSection />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockHandleChangeDescription = jest.fn();
  const mockHandleChangeLabel = jest.fn();
  const mockHandleSetInitialValues = jest.fn();
  const mockReinitializeEditorComplete = jest.fn();
  const mockSettingsOnScreen = {
    open_resp_grading: [
      {
        grading_rubric: ['2'],
        grade_options: [
          {
            grade_option: {
              score: ['2'],
              label: ['Satisfactory'],
              description: 'Satisfactory 2 pt grade option here',
            },
          },
          {
            grade_option: {
              score: ['1'],
              label: ['Insufficient'],
              description: 'Insufficient 2 pt grade option here',
            },
          },
        ],
      },
      {
        grading_rubric: ['4'],
        grade_options: [
          {
            grade_option: {
              score: ['4'],
              label: ['Expert'],
              description: 'Expert 4 pt grade option here',
            },
          },
          {
            grade_option: {
              score: ['3'],
              label: ['Proficient'],
              description: 'Proficient 4 pt grade option here',
            },
          },
          {
            grade_option: {
              score: ['2'],
              label: ['Novice'],
              description: 'Novice 4 pt grade option here',
            },
          },
          {
            grade_option: {
              score: ['1'],
              label: ['Insufficient'],
              description: 'Insufficient 4 pt grade option here',
            },
          },
        ],
      },
    ],
    writing_prompt_grading: [
      {
        grading_rubric: ['6'],
        grade_options: [
          {
            grade_option: {
              score: ['6'],
              label: ['Expert'],
              description: 'Expert 6 pt grade option here',
            },
          },
          {
            grade_option: {
              score: ['5'],
              label: ['Well Done'],
              description: 'Well Done 6 pt grade option here',
            },
          },
          {
            grade_option: {
              score: ['4'],
              label: ['Almost There'],
              description: 'Almost There 6 pt grade option here',
            },
          },
          {
            grade_option: {
              score: ['3'],
              label: ['Making Strides'],
              description: 'Making Strides 6 pt grade option here',
            },
          },
          {
            grade_option: {
              score: ['2'],
              label: ['On the Way'],
              description: 'On the Way 6 pt grade option here',
            },
          },
          {
            grade_option: {
              score: ['1'],
              label: ['Getting Started'],
              description: 'Getting Started 6 pt grade option here',
            },
          },
        ],
      },
    ],
  };

  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeEach(() => {
    wrapper = shallow(
      <SettingsRubricScoringSection
        cohortType={COHORT_TYPE.District}
        handleChangeDescription={mockHandleChangeDescription}
        handleChangeLabel={mockHandleChangeLabel}
        handleSetInitialValues={mockHandleSetInitialValues}
        reinitializeEditorComplete={mockReinitializeEditorComplete}
        settingsOnScreen={mockSettingsOnScreen}
      />
    );
    wrapperInstance = wrapper.instance();
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handle onChangeRubricTab', () => {
    expect(mockHandleSetInitialValues).not.toHaveBeenCalled();
    wrapperInstance.onChangeRubricTab();
    expect(mockHandleSetInitialValues).toHaveBeenCalled();
  });

  it('should handle get2PointGradeOptions ', () => {
    const res = wrapperInstance.get2PointGradeOptions();
    expect(res).not.toBeNull();
    expect(res.length).toEqual(2);
  });

  it('should handle get4PointGradeOptions ', () => {
    const res = wrapperInstance.get4PointGradeOptions();
    expect(res).not.toBeNull();
    expect(res.length).toEqual(4);
  });

  it('should handle get6PointGradeOptions ', () => {
    const res = wrapperInstance.get6PointGradeOptions();
    expect(res).not.toBeNull();
    expect(res.length).toEqual(6);
  });

  it('should render2PointScoring', () => {
    expect(wrapperInstance.render2PointScoring()).toMatchSnapshot();
  });

  it('should render4PointScoring', () => {
    expect(wrapperInstance.render4PointScoring()).toMatchSnapshot();
  });

  it('should render6PointScoring', () => {
    expect(wrapperInstance.render6PointScoring()).toMatchSnapshot();
  });
});
