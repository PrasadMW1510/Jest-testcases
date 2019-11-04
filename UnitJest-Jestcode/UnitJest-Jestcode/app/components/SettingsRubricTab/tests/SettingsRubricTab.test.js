import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SettingsRubricTab from '../index';

describe('<SettingsRubricTab />', () => {
  let wrapper = null;
  const mockCohortType = 'District';
  const mockHandleChangeDescription = jest.fn();
  const mockHandleChangeLabel = jest.fn();
  const mockReinitializeEditorComplete = jest.fn();

  const mockGradingRubric = '2';
  const mockGradeOptions = [
    {
      grade_option: [
        {
          score: ['1'],
          label: ['advanced'],
          description: ['<p>student understands the words</p>'],
        },
      ],
    },
  ];

  beforeEach(() => {
    wrapper = shallow(
      <SettingsRubricTab
        cohortType={mockCohortType}
        handleChangeDescription={mockHandleChangeDescription}
        handleChangeLabel={mockHandleChangeLabel}
        gradeOptions={mockGradeOptions}
        gradingRubric={mockGradingRubric}
        reinitializeEditorComplete={mockReinitializeEditorComplete}
        title={'Some Title'}
      />
    );
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
