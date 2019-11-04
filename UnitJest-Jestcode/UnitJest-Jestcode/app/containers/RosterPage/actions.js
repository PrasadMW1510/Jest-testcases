/*
 *
 * RosterPage actions
 *
 */

import { SELECT_PROGRAM } from './constants';

export function handleSelectProgram(selectedProgram) {
  return {
    type: SELECT_PROGRAM,
    selectedProgram,
  };
}
