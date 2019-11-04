/**
 * Test  sagas
 */

import { takeLatest, put, select, call, all } from 'redux-saga/effects';
import moment from 'moment';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */

describe('Portfolio Page Container Saga', () => {
  let generator = null;
  let loginDataSelector = null;
  let profileSessionIdSelector = null;
  let profileUserIdSelector = null;
  let profileUserTypeSelector = null;
  const err = 'mock error';
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    profileUserTypeSelector = jest.fn();
    loginDataSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserType').mockReturnValue(profileUserTypeSelector);
  });
  describe('getClassDataRequest', () => {
    beforeEach(() => {
      generator = Saga.getClassDataRequest();
    });

    it('getClassDataRequestSuccess', () => {
      const ServiceResponse = {
        output_data: [
          {
            classes: [
              {
                class: [
                  {
                    display_name: ['name1', 'name2'],
                    class_id: ['class1'],
                    communityIds: ['commID'],
                  },
                ],
              },
            ],
          },
        ],
      };
      const response = [
        {
          community_id: 'commID',
          id: 'class1',
          name: 'name1',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.getClassDataRequestSuccess(response)));
    });
    it('getClassDataRequestFailure', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });

  describe('getAssignmentMetaData', () => {
    beforeEach(() => {
      generator = Saga.getAssignmentMetaData();
    });

    it('setStudentAssignmentRequestSuccess with graded false bool', () => {
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
                      className: 'className',
                      assignment: 'assign',
                      from: 'from',
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
          id: '12',
          date: '10/01/2018',
          classId: 'classID',
          className: 'className',
          assignment: 'assign',
          from: 'from',
          kind: undefined,
          student: 'className',
          community_id: 'commId',
          graded: false,
          createdForClass: 'createdClass',
          workItemId: '12',
          read: 'false',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentAssignmentRequestSuccess(response)));
    });
    it('setStudentAssignmentRequestSuccess with graded false string', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [
              {
                workItemMetadata: [
                  {
                    $: {
                      read: 'false',
                      graded: 'false',
                      workItemId: '12',
                      dateSubmitted: '10/01/2018',
                      classId: 'classID',
                      className: 'className',
                      assignment: 'assign',
                      from: 'from',
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
          id: '12',
          date: '10/01/2018',
          classId: 'classID',
          className: 'className',
          assignment: 'assign',
          from: 'from',
          community_id: 'commId',
          kind: undefined,
          student: 'className',
          graded: 'false',
          createdForClass: 'createdClass',
          workItemId: '12',
          read: 'false',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentAssignmentRequestSuccess(response)));
    });
    it('setStudentAssignmentRequestSuccess with graded false string else condition', () => {
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
      expect(generator.next(ServiceResponse).value).toMatchSnapshot();
    });
    it('setStudentAssignmentRequestFailure', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('getStudentSubmissionMetaData', () => {
    const data = {};
    beforeEach(() => {
      generator = Saga.getStudentSubmissionMetaData(data);
    });

    it('getClassDataRequestSuccess kind', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [
              {
                workItemMetadata: [
                  {
                    $: {
                      read: 'false',
                      graded: 'false',
                      kind: 'SoftwareSubmission',
                      workItemId: '12',
                      dateSubmitted: moment().format('YYYY-MM-DD'),
                      classId: 'classID',
                      className: 'className',
                      assignment: 'assign',
                      from: 'from',
                      communityId: 'commId',
                      createdForClass: 'createdClass',
                      studentLastName: 'hhh',
                      studentFirstName: 'jjj',
                      studentId: 'kkk',
                      checkWeek: true,
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
          community_id: 'commId',
          id: '12',
          assignment: 'assign',
          classId: 'classID',
          communityId: 'commId',
          createdForClass: 'createdClass',
          date: moment().format('YYYY-MM-DD'),
          from: 'from',
          graded: 'false',
          kind: 'SoftwareSubmission',
          read: 'false',
          workItemId: '12',
          student: 'hhh, jjj',
          studentId: 'kkk',
        },
      ];
      const counts = {
        submissions: 1,
        newThisWeek: 1,
        unreadCount: 1,
        assunreadCount: 0,
        asssubmissions: 0,
        assnewThisWeek: 0,
      };
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess(response)));
      const putDescriptor2 = generator.next(counts).value;
      expect(putDescriptor2).toEqual(put(Actions.setStudentSetCount(counts)));
    });
    it('getClassDataRequestSuccess kind', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [
              {
                workItemMetadata: [
                  {
                    $: {
                      read: 'false',
                      graded: 'false',
                      kind: 'ClassAssignment',
                      workItemId: '12',
                      dateSubmitted: moment().format('YYYY-MM-DD'),
                      classId: 'classID',
                      className: 'className',
                      assignment: 'assign',
                      from: 'from',
                      communityId: 'commId',
                      createdForClass: 'createdClass',
                      studentLastName: 'hhh',
                      studentFirstName: 'jjj',
                      studentId: 'kkk',
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
          community_id: 'commId',
          id: '12',
          assignment: 'assign',
          classId: 'classID',
          communityId: 'commId',
          createdForClass: 'createdClass',
          date: moment().format('YYYY-MM-DD'),
          from: 'from',
          graded: 'false',
          kind: 'ClassAssignment',
          read: 'false',
          workItemId: '12',
          student: 'hhh, jjj',
          studentId: 'kkk',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess(response)));
    });
    it('setStudentAssignmentRequestFailure', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });

  describe('getPortfolioClassByCommunityID', () => {
    beforeEach(() => {
      generator = Saga.getPortfolioClassByCommunityID();
    });

    it('getPortfolioClassByCommunityID', () => {
      const ServiceResponse = {
        output_data: [
          {
            classes: [
              {
                class: [
                  {
                    class_id: ['0'],
                    display_name: ['displayname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      const getEnrolmentByCommunityIdResponse = [
        {
          output_data: [
            {
              students: [
                {
                  student: [
                    {
                      applications: [
                        {
                          application: [
                            {
                              app_id: -1,
                              name: 'appname',
                            },
                          ],
                        },
                      ],
                      student_id: ['student_id'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      const responseProgramList = ['-1'];
      const expectedResponseCommunidIDResponse = [
        {
          class_id: '0',
          class_name: 'displayname',
          student: [
            {
              appData: [
                {
                  app_id: undefined,
                  name: 'a',
                },
              ],
              studentid: 'student_id',
            },
          ],
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.next(ServiceResponse).value).toMatchSnapshot();
      const putDescriptor1 = generator.next(getEnrolmentByCommunityIdResponse).value;
      expect(putDescriptor1).toEqual(
        put(Actions.setProgramListSuccess(expectedResponseCommunidIDResponse))
      );
      const putDescriptor2 = generator.next(responseProgramList).value;
      expect(putDescriptor2).toEqual(put(Actions.setProgramListForTabSuccess([undefined])));
    });
    it('getPortfolioClassByCommunityID applications is null', () => {
      const ServiceResponse = {
        output_data: [
          {
            classes: [
              {
                class: [
                  {
                    class_id: ['0'],
                    display_name: ['displayname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      const getEnrolmentByCommunityIdResponse = [
        {
          output_data: [
            {
              students: [
                {
                  student: [
                    {
                      applications: [''],
                      student_id: ['student_id'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      const responseProgramList = [];
      const expectedResponseCommunidIDResponse = [
        {
          class_id: '0',
          class_name: 'displayname',
          student: [
            {
              appData: [],
              studentid: 'student_id',
            },
          ],
        },
      ];

      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.next(ServiceResponse).value).toMatchSnapshot();
      const putDescriptor1 = generator.next(getEnrolmentByCommunityIdResponse).value;
      expect(putDescriptor1).toEqual(
        put(Actions.setProgramListSuccess(expectedResponseCommunidIDResponse))
      );
      const putDescriptor2 = generator.next(responseProgramList).value;
      expect(putDescriptor2).toEqual(put(Actions.setProgramListForTabSuccess(responseProgramList)));
    });
    it('getPortfolioClassByCommunityID application id is not -1', () => {
      const ServiceResponse = {
        output_data: [
          {
            classes: [
              {
                class: [
                  {
                    class_id: ['0'],
                    display_name: ['displayname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      const getEnrolmentByCommunityIdResponse = [
        {
          output_data: [
            {
              students: [
                {
                  student: [
                    {
                      applications: [
                        {
                          application: [
                            {
                              app_id: -1,
                              name: 'appname',
                            },
                            {
                              app_id: -2,
                              name: 'appname',
                            },
                          ],
                        },
                      ],
                      student_id: ['student_id'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      const responseProgramList = ['-1'];
      const expectedResponseCommunidIDResponse = [
        {
          class_id: '0',
          class_name: 'displayname',
          student: [
            {
              appData: [
                {
                  app_id: undefined,
                  name: 'a',
                },
                {
                  app_id: undefined,
                  name: 'a',
                },
              ],
              studentid: 'student_id',
            },
          ],
        },
      ];

      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.next(ServiceResponse).value).toMatchSnapshot();
      const putDescriptor1 = generator.next(getEnrolmentByCommunityIdResponse).value;
      expect(putDescriptor1).toEqual(
        put(Actions.setProgramListSuccess(expectedResponseCommunidIDResponse))
      );
      const putDescriptor2 = generator.next(responseProgramList).value;
      expect(putDescriptor2).toEqual(put(Actions.setProgramListForTabSuccess([undefined])));
    });
    it('getPortfolioClassByCommunityIDFailure', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('getStudentDataSubmissions', () => {
    beforeEach(() => {
      generator = Saga.getStudentDataSubmissions();
    });

    it('should successfully run', () => {
      const ServiceResponse = {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
        user_type: ['adfgg'],
      };

      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(ServiceResponse.session_id).value).toEqual(
        select(profileUserIdSelector)
      );
      expect(generator.next(ServiceResponse.user_id).value).toEqual(
        select(profileUserTypeSelector)
      );

      expect(generator.next(ServiceResponse.user_type).value).toEqual(
        call(
          Request.getStudentSubmissionsData,
          ServiceResponse.session_id,
          ServiceResponse.user_id,
          ServiceResponse.user_type
        )
      );
      const mockSubmissions = ['test'];
      expect(generator.next(mockSubmissions).value).toEqual(
        put(Actions.getStudentSubmissionSuccess(mockSubmissions))
      );
    });
    it('getStudentSubmissionSuccess err part', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });

  describe('getRubricDefenitions', () => {
    beforeEach(() => {
      generator = Saga.getRubricDefenitions();
    });

    it('should successfully run', () => {
      const messageObj = '<>';
      const ServiceResponse = {
        session_id: 'UserIDVal',
        user_id: '<>',
      };
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.next(messageObj).value).toEqual(
        call(Request.getRubricData, ServiceResponse.session_id, ServiceResponse.user_id, messageObj)
      );
      expect(generator.next(messageObj).value).toEqual(
        put(Actions.getRubricDefenitionSuccess(messageObj))
      );
    });
    it('getRubricDefenitionSuccess err part', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_CLASS_DATA, Saga.getClassDataRequest),
          takeLatest(Constants.GET_STUDENT_SUBMISSION_META_DATA, Saga.getStudentSubmissionMetaData),
          takeLatest(Constants.GET_ASSIGNMENT_META_DATA, Saga.getAssignmentMetaData),
          takeLatest(Constants.GET_STUDENT_SUBMITTIONS, Saga.getStudentDataSubmissions),
          takeLatest(
            Constants.GET_PORTFOLIO_CLASS_BY_COMMUNITYID,
            Saga.getPortfolioClassByCommunityID
          ),
          takeLatest(Constants.GET_RUBRIC_DEFENITIONS, Saga.getRubricDefenitions),
        ])
      );
    });
  });
});
