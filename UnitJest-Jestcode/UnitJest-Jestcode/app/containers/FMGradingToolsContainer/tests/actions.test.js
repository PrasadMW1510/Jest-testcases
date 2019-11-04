import * as Actions from '../actions';

describe('FMGradingToolsContainer Actions', () => {
  it('should request student operations correctly', () => {
    expect(Actions.FMStudentOperationRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for FMStudentOperationRequestSuccess with params', () => {
    const studentOperations = [
      {
        Students: 'studentfirst, studentlast',
        Operation: 'Addition',
        FastFacts: '96',
        FocusFacts: '0',
      },
    ];

    expect(Actions.FMStudentOperationRequestSuccess(studentOperations)).toMatchSnapshot();
  });

  it('should return the correct constant for FMGeneratePdfReport with params', () => {
    const state = {
      current: true,
      addition: false,
      subtraction: false,
      multiplication: false,
      division: false,
      answerKey: false,
      remainder: false,
      problemType: '1digit',
      orientation: 'horizontal',
    };

    expect(Actions.FMGeneratePdfReport(state)).toMatchSnapshot();
  });
});
