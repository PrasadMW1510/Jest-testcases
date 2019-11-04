import { fromJS } from 'immutable';
import moment from 'moment';
import { TITLE_1_STATUS_LIST } from 'components/SchoolForm/constants';
import {
  extractValue,
  parseDate,
  transformSchoolDataForForm,
  transformSchoolMapForPost,
} from '../transformers';

describe('School form transformers', () => {
  it('should add grading periods correctly', () => {
    const schoolMap = fromJS({
      gradingPeriodEnd: ['2018-03-15', '2018-03-29'],
      gradingPeriodStart: ['2018-03-05', '2018-03-16'],
      numGradingPeriods: 2,
    });
    const schoolApiBody = transformSchoolMapForPost(schoolMap, 'districtId');
    expect(schoolApiBody.organization.school_info.grading_periods).toBeTruthy();
  });

  it('should parse dates correctly', () => {
    const parsedDate = parseDate('2/1/2018');
    expect(parsedDate).toEqual(moment({ month: 1, date: '1', year: '2018' }));
  });

  it('should extract value from array correctly', () => {
    const arrayVal = ['some val'];
    const transformedVal = extractValue(arrayVal);
    expect(transformedVal).toEqual('some val');
  });

  it('should extract ids of nested data', () => {
    const defaultValues = {
      schoolTypes: {},
      schoolContactAddressLine1: undefined,
      schoolContactAddressLine2: undefined,
      schoolContactAddressLine3: undefined,
      schoolContactCity: undefined,
      schoolContactEmail: undefined,
      schoolContactFirstName: undefined,
      schoolContactLastName: undefined,
      schoolContactMiddleName: undefined,
      schoolContactPhoneNumber: undefined,
      schoolContactState: undefined,
      schoolContactTitle: undefined,
      schoolContactZip: undefined,
      schoolYearEnd: null,
      schoolYearStart: null,
      title1Status: 'None',
    };
    const schoolData = transformSchoolDataForForm({
      name: 'some name',
      school_info: [
        {
          grades: [
            {
              grade: [{ name: 'grade-1' }, { name: 'grade-2' }],
            },
          ],
          grading_periods: [
            {
              grading_period: [
                {
                  start_date: ['2/1/2018'],
                  end_date: ['2/20/2018'],
                },
              ],
            },
          ],
          school_period: [
            {
              start_date: ['2/1/2018'],
              end_date: ['2/20/2018'],
            },
          ],
          school_number: 'some school number',
          school_types: [],
          title_1_status: TITLE_1_STATUS_LIST[0].id,
        },
      ],
    });
    expect(schoolData).toEqual(
      Object.assign({}, defaultValues, {
        grades: {
          'grade-1': true,
          'grade-2': true,
        },
        gradingPeriodEnd: [moment({ month: 1, date: '20', year: '2018' })],
        gradingPeriodStart: [moment({ month: 1, date: '1', year: '2018' })],
        name: 'some name',
        numGradingPeriods: 1,
        schoolNumber: 'some school number',
        schoolYearEnd: moment({ month: 1, date: '20', year: '2018' }),
        schoolYearStart: moment({ month: 1, date: '1', year: '2018' }),
      })
    );
  });
});
