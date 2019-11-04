import { COHORT_TYPE } from 'containers/App/constants';
import * as Transformers from '../transformers';

describe('FMGradingTools transformers', () => {
  describe('FMStudentOperationRepresentation', () => {
    it('should provide the correct response when there are NO students in the student cohort', () => {
      const apiFMStudentOperationData = [
        {
          get_student_operation_response: [{}],
        },
      ];
      expect(
        Transformers.FMStudentOperationRepresentation(
          apiFMStudentOperationData,
          COHORT_TYPE.Student
        )
      ).toMatchSnapshot();
    });

    it('should provide the correct response when there are students in the student cohort', () => {
      const apiFMStudentOperationData = [
        {
          get_student_operation_response: [
            {
              student: [
                {
                  name: [{ 'given.name': ['studentfirst'], 'family.name': ['studentlast'] }],
                  operation: ['Addition'],
                  fast_facts: ['96'],
                  focus_facts: ['0'],
                },
              ],
            },
          ],
        },
      ];

      expect(
        Transformers.FMStudentOperationRepresentation(
          apiFMStudentOperationData,
          COHORT_TYPE.Student
        )
      ).toMatchSnapshot();
    });

    it('should provide the correct response when the cohort type is teacher', () => {
      const apiFMStudentOperationData = [
        {
          get_student_operation_response: [
            {
              teacher: [
                {
                  students: [
                    {
                      student: [
                        {
                          name: [
                            { 'given.name': ['studentfirst'], 'family.name': ['studentlast'] },
                          ],
                          operation: ['Addition'],
                          fast_facts: ['96'],
                          focus_facts: ['0'],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      expect(
        Transformers.FMStudentOperationRepresentation(
          apiFMStudentOperationData,
          COHORT_TYPE.Teacher
        )
      ).toMatchSnapshot();
    });

    it('should provide the correct response when the cohort type is class', () => {
      const apiFMStudentOperationData = [
        {
          get_student_operation_response: [
            {
              class: [
                {
                  students: [
                    {
                      student: [
                        {
                          name: [
                            { 'given.name': ['studentfirst'], 'family.name': ['studentlast'] },
                          ],
                          operation: ['Addition'],
                          fast_facts: ['96'],
                          focus_facts: ['0'],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      expect(
        Transformers.FMStudentOperationRepresentation(apiFMStudentOperationData, COHORT_TYPE.Class)
      ).toMatchSnapshot();
    });

    it('should provide the correct response when the cohort type is group', () => {
      const apiFMStudentOperationData = [
        {
          get_student_operation_response: [
            {
              group: [
                {
                  students: [
                    {
                      student: [
                        {
                          name: [
                            { 'given.name': ['studentfirst'], 'family.name': ['studentlast'] },
                          ],
                          operation: ['Addition'],
                          fast_facts: ['96'],
                          focus_facts: ['0'],
                        },
                      ],
                    },
                    '',
                  ],
                },
              ],
            },
          ],
        },
      ];

      expect(
        Transformers.FMStudentOperationRepresentation(apiFMStudentOperationData, COHORT_TYPE.Group)
      ).toMatchSnapshot();
    });

    it('should provide the correct response when the cohort type is invalid', () => {
      expect(
        Transformers.FMStudentOperationRepresentation([], 'invalidCohortType')
      ).toMatchSnapshot();
    });
  });

  describe('FMGeneratePdfReportData', () => {
    it('should match its snapshot', () => {
      const cohortType = COHORT_TYPE.Student;
      const apiReportData = [{ report: [{ student: [{ url: ['www.pdfurl.com'] }] }] }];
      expect(Transformers.FMGeneratePdfReportData(apiReportData, cohortType.toLowerCase()));
    });
  });
});
