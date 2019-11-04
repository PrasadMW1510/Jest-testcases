import { takeLatest, put, all } from 'redux-saga/effects';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('TeacherMadeQuizContainer Saga', () => {
  let generator = null;
  let loginDataSelector = null;
  let profileSessionIdSelector = null;
  let profileUserIdSelector = null;
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    loginDataSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
  });
  // describe('getPfAssignClassDataRequest', () => {
  //   beforeEach(() => {
  //     generator = Saga.getPfAssignClassDataRequest();
  //   });
  //   it('setClassRequestSuccess', () => {
  //     const ServiceResponse = {
  //       output_data: [
  //         {
  //           classes: [
  //             {
  //               class: [
  //                 {
  //                   display_name: ['name1', 'name2'],
  //                   class_id: ['class1'],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //     const response = [
  //       {
  //         id: 'class1',
  //         type: 'PfAsignment',
  //         name: 'name1',
  //       },
  //     ];
  //     expect(generator.next().value).toMatchSnapshot();
  //     expect(generator.next('SessionIDVal').value).toMatchSnapshot();
  //     expect(generator.next('UserIDVal').value).toMatchSnapshot();
  //     const putDescriptor1 = generator.next(ServiceResponse).value;
  //     expect(putDescriptor1).toEqual(put(Actions.setClassRequestSuccess(response)));
  //   });
  // });
  describe('getPfAssignClassGridDataRequest', () => {
    const classId = {};
    beforeEach(() => {
      generator = Saga.getPfAssignClassGridDataRequest(classId);
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
                      read: 'false',
                      graded: false,
                      workItemId: '12',
                      dateSubmitted: '10/01/2018',
                      classId: 'classID',
                      assignment: 'assign',
                      from: 'from',
                      link: ' ',
                      communityId: 'commId',
                      createdForClass: 'createdClass',
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
          id: 'classID',
          date: '10/01/2018',
          classId: 'classID',
          assignment: 'assign',
          from: 'from',
          community_id: 'commId',
          graded: false,
          link: ' ',
          student: undefined,
          createdForClass: 'createdClass',
          workItemId: '12',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setClassGridRequestSuccess(response)));
    });
    it('setClassRequestSuccess', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [
              {
                workItemMetadata: undefined,
              },
            ],
          },
        ],
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setClassGridRequestSuccess([])));
    });
    it('setClassRequestSuccess err part', () => {
      const err = 'mockerror';
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  // describe('saveAssignmentRequest', () => {
  //   beforeEach(() => {
  //     generator = Saga.saveAssignmentRequest();
  //   });
  //   it('setClassRequestSuccess', () => {
  //     const ServiceResponse = {
  //       output_data: [
  //         {
  //           classes: [
  //             {
  //               class: [
  //                 {
  //                   display_name: ['name1', 'name2'],
  //                   class_id: ['class1'],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //     expect(generator.next().value).toMatchSnapshot();
  //     expect(generator.next('SessionIDVal').value).toMatchSnapshot();
  //     expect(generator.next(ServiceResponse).value).toMatchSnapshot();
  //   });
  // });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          // takeLatest(Constants.GET_PORTFOLIO_ASSIGNMENT_CLASSES, Saga.getPfAssignClassDataRequest),
          takeLatest(
            Constants.GET_PORTFOLIO_ASSIGNMENT_CLASSES_ASS_LIST,
            Saga.getPfAssignClassGridDataRequest
          ),
        ])
      );
    });
  });
});
