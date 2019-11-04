import { getBaseUrlWithoutSlmsObject, getBaseUrlWithoutSlms } from 'utils/request';
/**
 * Gets FM student operation
 */

export const getFMStudentOperation = ({ sessionId, cohortId, cohortType, schoolId }) =>
  getBaseUrlWithoutSlmsObject
    .get('/fasttmath/FMDatabaseAccess', {
      params: {
        sid: sessionId,
        command: 'get_student_operation',
        cohort_type: cohortType.toLowerCase(),
        cohort_id: cohortId,
        school_id: schoolId,
      },
    })
    .then(response => response.output.output_data);

// https://h511000002.education.scholastic.com/fasttmath/FMDatabaseAccess?
// sid=p7gua9n76mo2sle53bjubifv_2efa7f0&
// command=get_student_operation&
// cohort_type=student&
// cohort_id=2m97pcmk441dvr50bh7b0311_2efa7f0&
// school_id=SMS&output_format=raw

export const FMGeneratePdfReport = ({
  sessionId,
  cohortId,
  cohortType,
  current,
  addition,
  subtraction,
  multiplication,
  division,
  problemType,
  orientation,
  answerKey,
  remainder,
}) =>
  getBaseUrlWithoutSlmsObject
    .get('/fasttmath/FMReportAccess', {
      params: {
        sid: sessionId,
        command: 'get_report_pdf',
        report_type_id: 'fm_10',
        cohort_type: cohortType.toLowerCase(),
        cohort_id: cohortId,
        date_range: 'StartOfOperation',
        current: current || '',
        addition: addition || '',
        subtraction: subtraction || '',
        multiplication: multiplication || '',
        division: division || '',
        problem_type: problemType,
        orientation,
        remainder: remainder || '',
        answer_key: answerKey || '',
        output_format: 'raw',
      },
    })
    .then(response => response.output.output_data);

// http://h511000002.education.scholastic.com/fasttmath/FMReportAccess?
// sid=ud2cj4r2m3vadqiqtj453lco_2efa7f0&
// command=get_report_pdf&
// report_type_id=fm_10&
// cohort_type=student&
// cohort_id=iu0tvsbr670pfe1rl2i6fl3m_2efa7f0&
// date_range=StartOfOperation&
// current=true&
// addition=&
// subtraction=&
// multiplication=&
// division=&
// problem_type=1digit&
// orientation=horizontal&
// remainder=&
// answer_key=&
// output_format=raw

export const displayGeneratedReport = apiReportUrl => {
  window.open(`${getBaseUrlWithoutSlms()}${apiReportUrl}`, '_blank');
};
