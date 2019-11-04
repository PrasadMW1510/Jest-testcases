import {
  getSum,
  mapAcademicGoalDataModel,
  validateBehaviourControls,
  mapBehaviouralGoalDataModel,
  getFormattedDate,
} from '../common';

describe('AdminToolsPageUtils', () => {
  it('it should exists getSum', () => {
    const control = {
      whole_group_score: [2],
      small_group_score: [3],
      independent_reading_score: [4],
      software_score: [5],
    };
    const getSumComponent = getSum(control);
    expect(getSumComponent).toBe(14);
  });
  it('it should exists mapAcademicGoalDataModel', () => {
    const academicGoalData = [
      {
        goal_name: ['decoding'],
        benchmark1_value: ['a'],
        benchmark2_value: ['b'],
        benchmark3_value: ['c'],
        benchmark4_value: ['d'],
      },
      {
        goal_name: ['spelling'],
        benchmark1_value: ['a'],
        benchmark2_value: ['b'],
        benchmark3_value: ['c'],
        benchmark4_value: ['d'],
      },
      {
        goal_name: ['independent reading'],
        benchmark1_value: ['a'],
        benchmark2_value: ['b'],
        benchmark3_value: ['c'],
        benchmark4_value: ['d'],
      },
    ];
    const getSumComponent = mapAcademicGoalDataModel(academicGoalData);
    expect(getSumComponent).toEqual([
      ['a', 'b', 'c', 'd'],
      ['a', 'b', 'c', 'd'],
      ['a', 'b', 'c', 'd'],
    ]);
  });
  it('it should exists mapAcademicGoalDataModel', () => {
    const academicGoalData = [
      {
        goal_name: ['decoding1'],
        benchmark1_value: ['a'],
        benchmark2_value: ['b'],
        benchmark3_value: ['c'],
        benchmark4_value: ['d'],
      },
      {
        goal_name: ['spelling1'],
        benchmark1_value: ['a'],
        benchmark2_value: ['b'],
        benchmark3_value: ['c'],
        benchmark4_value: ['d'],
      },
      {
        goal_name: ['independent reading1'],
        benchmark1_value: ['a'],
        benchmark2_value: ['b'],
        benchmark3_value: ['c'],
        benchmark4_value: ['d'],
      },
    ];
    const getSumComponent = mapAcademicGoalDataModel(academicGoalData);
    expect(getSumComponent).toEqual([[], [], []]);
  });
  it('it should exists validateBehaviourControls ', () => {
    const behaviouralGoalsControls = [
      {
        whole_group_score: [2],
        small_group_score: [3],
        independent_reading_score: [4],
        software_score: [5],
      },
    ];
    const validateBehaviourControlsComponent = validateBehaviourControls(behaviouralGoalsControls);
    expect(validateBehaviourControlsComponent).toBe(true);
  });
  it('it should exists mapBehaviouralGoalDataModel', () => {
    const behaviouralGoalData = [
      {
        goal_name: ['respect'],
        whole_group_score: [10],
        small_group_score: [10],
        independent_reading_score: [10],
        software_score: [10],
      },
    ];
    const mapBehaviouralGoalDataModelComponent = mapBehaviouralGoalDataModel(behaviouralGoalData);
    expect(mapBehaviouralGoalDataModelComponent).toEqual([
      undefined,
      {
        goal_name: ['respect'],
        independent_reading_score: [10],
        small_group_score: [10],
        software_score: [10],
        total: 40,
        whole_group_score: [10],
      },
    ]);
  });
  it('it should exists mapBehaviouralGoalDataModel', () => {
    const behaviouralGoalData = [
      {
        goal_name: ['responsibility'],
        whole_group_score: [10],
        small_group_score: [10],
        independent_reading_score: [10],
        software_score: [10],
      },
    ];
    const mapBehaviouralGoalDataModelComponent = mapBehaviouralGoalDataModel(behaviouralGoalData);
    expect(mapBehaviouralGoalDataModelComponent).toEqual([
      {
        goal_name: ['responsibility'],
        independent_reading_score: [10],
        small_group_score: [10],
        software_score: [10],
        total: 40,
        whole_group_score: [10],
      },
    ]);
  });
  it('it should exists mapBehaviouralGoalDataModel', () => {
    const behaviouralGoalData = [
      {
        goal_name: ['effort'],
        whole_group_score: [10],
        small_group_score: [10],
        independent_reading_score: [10],
        software_score: [10],
      },
    ];
    const mapBehaviouralGoalDataModelComponent = mapBehaviouralGoalDataModel(behaviouralGoalData);
    expect(mapBehaviouralGoalDataModelComponent).toEqual([
      undefined,
      undefined,
      {
        goal_name: ['effort'],
        independent_reading_score: [10],
        small_group_score: [10],
        software_score: [10],
        total: 40,
        whole_group_score: [10],
      },
    ]);
  });
  it('it should exists mapBehaviouralGoalDataModel', () => {
    const behaviouralGoalData = [
      {
        goal_name: ['effort1'],
        whole_group_score: [10],
        small_group_score: [10],
        independent_reading_score: [10],
        software_score: [10],
      },
    ];
    const mapBehaviouralGoalDataModelComponent = mapBehaviouralGoalDataModel(behaviouralGoalData);
    expect(mapBehaviouralGoalDataModelComponent).toEqual([]);
  });
  it('it should exists getFormattedDate', () => {
    const month = '0';
    const day = '7';
    const year = '2018';
    const date = {
      getMonth() {
        return month;
      },
      getDate() {
        return day;
      },
      getFullYear() {
        return year;
      },
    };
    const getFormattedDateComponent = getFormattedDate(date);
    expect(getFormattedDateComponent).toBe('07/01/2018');
  });
});
