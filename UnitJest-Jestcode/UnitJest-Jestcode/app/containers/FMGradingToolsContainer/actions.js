import * as Constants from './constants';

export function FMStudentOperationRequest() {
  return {
    type: Constants.FM_STUDENT_OPERATION_REQUEST,
  };
}

export function FMStudentOperationRequestSuccess(studentOperations) {
  return {
    type: Constants.FM_STUDENT_OPERATION_REQUEST_SUCCESS,
    studentOperations,
  };
}

export function FMGeneratePdfReport(formState) {
  return {
    type: Constants.FM_GENERATE_PDF_REPORT,
    ...formState,
  };
}
