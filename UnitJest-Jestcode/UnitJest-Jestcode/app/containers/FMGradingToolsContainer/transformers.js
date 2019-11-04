import { COHORT_TYPE } from 'containers/App/constants';

export function FMStudentOperationRepresentation(studentOperations, cohortType) {
  let students;
  switch (cohortType) {
    case COHORT_TYPE.Student:
      students = studentOperations[0].get_student_operation_response[0].student;
      if (!students) {
        return [];
      }

      return students.map(student => ({
        Students: `${student.name[0]['given.name'][0]}, ${student.name[0]['family.name'][0]}`,
        Operation: student.operation[0],
        FastFacts: student.fast_facts[0],
        FocusFacts: student.focus_facts[0],
      }));

    case COHORT_TYPE.Teacher:
      students = studentOperations[0].get_student_operation_response[0].teacher[0].students;
      break;

    case COHORT_TYPE.Class:
      students = studentOperations[0].get_student_operation_response[0].class[0].students;
      break;

    case COHORT_TYPE.Group:
      students = studentOperations[0].get_student_operation_response[0].group[0].students;
      break;

    default:
      return [];
  }

  const res = [];

  students.forEach(student => {
    if (typeof student === 'object') {
      res.push({
        Students: `${student.student[0].name[0]['given.name'][0]}, ${
          student.student[0].name[0]['family.name'][0]
        }`,
        Operation: student.student[0].operation[0],
        FastFacts: student.student[0].fast_facts[0],
        FocusFacts: student.student[0].focus_facts[0],
      });
    }
  });
  return res;
}

export function FMGeneratePdfReportData(apiReportData, cohortType) {
  return apiReportData[0].report[0][cohortType][0].url[0];
}
