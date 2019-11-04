/**
 * Test  sagas
 */
import { takeLatest, put, all } from 'redux-saga/effects';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('InboxContainer Saga', () => {
  let generator = null;
  let loginDataSelector = null;
  let profileSessionIdSelector = null;
  let profileUserIdSelector = null;
  const err = 'mock error';
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    loginDataSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });
  describe('getStudentSubmissionTreeData', () => {
    beforeEach(() => {
      generator = Saga.getInBoxClassDataRequest();
      expect(generator.next().value).toMatchSnapshot();
    });
    it('setInBoxGridRequestSuccess with success', () => {
      const makeSelectInboxContainer = {
        inBoxClassData: [
          {
            children: [],
          },
        ],
      };

      const response = {
        output_data: [
          {
            classes: [
              {
                class: [
                  {
                    name: ['student'],
                    class_id: ['lastname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(makeSelectInboxContainer).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.setInBoxGridRequestSuccess(makeSelectInboxContainer.inBoxClassData))
      );
    });
    it('getGradeDataRequest with Error', () => {
      const schoolList = {
        treeData: [],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
    it('setInBoxGridRequestSuccess with undefined', () => {
      const makeSelectInboxContainer = {
        inBoxClassData: [
          {
            children: [],
          },
        ],
      };

      const response = {
        output_data: [
          {
            classes: [
              {
                class: undefined,
              },
            ],
          },
        ],
      };
      expect(generator.next(makeSelectInboxContainer).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(put(Actions.setInBoxGridRequestSuccess([])));
    });
  });
  describe('getStudentSubmissionMetaData', () => {
    const data = {
      classId: 'jjj',
    };
    beforeEach(() => {
      generator = Saga.getStudentSubmissionMetaData(data);
    });
    it('setClassRequestSuccess', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [
              {
                workItemMetadata: [
                  {
                    $: {
                      workItemId: '12',
                      dateSubmitted: '10/01/2018',
                      assignment: 'assign',
                      from: 'from',
                      link: '',
                      studentId: 'jjj',
                      studentLastName: 'hhh',
                      studentFirstName: 'jjj',
                    },
                  },
                ],
              },
            ],
          },
        ],
      };
      const response = [
        {
          id: 'jjj',
          assignment: 'assign',
          date: '10/01/2018',
          from: 'from',
          link: ' ',
          workItemId: '12',
          student: 'jjj hhh',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess(response)));
    });
    it('setStudentRequestSuccess else condition', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [''],
          },
        ],
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess([])));
    });
    it('getGradeDataRequest with Error', () => {
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });

  describe('getStudentListForClass', () => {
    const classId = {
      classId: 'jjj',
    };
    beforeEach(() => {
      generator = Saga.getStudentListForClass(classId);
    });
    it('setClassRequestSuccess', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [
              {
                workItemMetadata: [
                  {
                    $: {
                      workItemId: '12',
                      dateSubmitted: '10/01/2018',
                      assignment: 'assign',
                      from: 'from',
                      link: ' ',
                      studentId: 'jjj',
                      studentLastName: 'hhh',
                      studentFirstName: 'jjj',
                    },
                  },
                ],
              },
            ],
          },
        ],
      };
      const response = [
        {
          id: 'jjj',
          assignment: 'assign',
          date: '10/01/2018',
          from: 'from',
          link: ' ',
          workItemId: '12',
          student: 'hhh jjj',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess(response)));
    });
    it('setStudentRequestSuccess else condition', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [''],
          },
        ],
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess([])));
    });
    it('getGradeDataRequest with Error', () => {
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('setTreeAndGridData', () => {
    const data = {
      newData: 'jjj',
    };
    beforeEach(() => {
      generator = Saga.setTreeAndGridData(data);
    });
    it('setTreeAndGridData', () => {
      const response = {
        inBoxClassData: ['hiii', 'hii', 'hi'],
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next(response).value).toMatchSnapshot();
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_INBOX_CLASS_TREELIST, Saga.getInBoxClassDataRequest),
          takeLatest(Constants.GET_STUDENT_SUBMISSION_META_DATA, Saga.getStudentSubmissionMetaData),
          takeLatest(Constants.GET_STUDENT_LIST_CLASS, Saga.getStudentListForClass),
          takeLatest(Constants.SET_TEMP_GRIDDATA_WITH_TREE, Saga.setTreeAndGridData),
        ])
      );
    });
  });
});
