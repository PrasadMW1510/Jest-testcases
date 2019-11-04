import { fromJS } from 'immutable';
import makeSelectStudentWorkProgramsContainer from '../selectors';

describe('Student Work Program container selector', () => {
  it('should select the StudentWorkProgramsContainer', () => {
    const studentWorkProgramsContainer = fromJS({
      studentWorkProgramsContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      studentWorkProgramsContainer,
    });

    expect(makeSelectStudentWorkProgramsContainer()(mockedState)).toEqual(
      studentWorkProgramsContainer.toJS()
    );
  });
});
