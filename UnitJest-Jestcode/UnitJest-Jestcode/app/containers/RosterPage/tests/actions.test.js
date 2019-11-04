import { handleSelectProgram } from '../actions';
import { SELECT_PROGRAM } from '../constants';

describe('select Program Action', () => {
  it('has a type of SELECT_PROGRAM', () => {
    const expected = {
      type: SELECT_PROGRAM,
    };
    expect(handleSelectProgram()).toEqual(expected);
  });
});
