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
  describe('getSGClassDataRequest', () => {
    beforeEach(() => {
      generator = Saga.getSGClassDataRequest();
    });
    it('getSGClassDataRequest', () => {
      const ServiceResponse = {
        output_data: [
          {
            classes: [
              {
                class: [
                  {
                    display_name: ['name1'],
                    class_id: ['class1'],
                  },
                ],
              },
            ],
          },
        ],
      };

      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toMatchSnapshot();
    });
  });
  describe('getSGClassGridListDataRequest', () => {
    const classId = {};
    beforeEach(() => {
      generator = Saga.getSGClassGridListDataRequest(classId);
    });
    it('getSGClassGridListDataRequest if', () => {
      const ServiceResponse = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_name: ['name1', 'name2'],
                    user_id: ['class1'],
                    work_item_id: ['12'],
                    academic_goal: ['hhh'],
                    behavioral_goal: ['behavior'],
                    link: ' ',
                  },
                ],
              },
            ],
          },
        ],
      };
      const response = [
        {
          studentId: 'class1',
          id: '12',
          student_name: 'name1',
          goals: 'hhh',
          link: ' ',
          behaviour_goal: 'behavior',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setClassSGGridRequestSuccess(response)));
    });
    it('getSGClassGridListDataRequest else ', () => {
      const ServiceResponse = {
        output_data: [
          {
            students: [''],
          },
        ],
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setClassSGGridRequestSuccess([])));
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_PORTFOLIO_SG_CLASSES, Saga.getSGClassDataRequest),
          takeLatest(
            Constants.GET_PORTFOLIO_SG_CLASSES_GOAL_LIST,
            Saga.getSGClassGridListDataRequest
          ),
        ])
      );
    });
  });
});
