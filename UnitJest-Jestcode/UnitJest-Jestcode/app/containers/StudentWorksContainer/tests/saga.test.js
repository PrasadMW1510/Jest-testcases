/**
 * Test  sagas
 */

import { takeLatest, call, put, select, all } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */

describe('Profile Page Container Saga', () => {
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

  describe('getSchoolDataRequest', () => {
    const distId = 'jjj_iii';
    const messageObj = '<>';
    beforeEach(() => {
      generator = Saga.getSchoolDataRequest(distId);
    });
    it('getSchoolDataRequestSuccess', () => {
      const ServiceResponse = {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
      };

      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(ServiceResponse.session_id).value).toEqual(
        select(profileUserIdSelector)
      );
      expect(generator.next(ServiceResponse.user_id).value).toEqual(
        call(
          Request.getPortfolioClassData,
          ServiceResponse.session_id,
          ServiceResponse.user_id,
          distId,
          messageObj
        )
      );
      const mockSubmissions = ['test'];
      expect(generator.next(mockSubmissions).value).toEqual(
        put(Actions.getSchoolDataRequestSuccess(mockSubmissions))
      );
    });
    it('setStudentRequestSuccess err part', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('getStudentSubmissionNodeData', () => {
    const data = {
      data: [],
    };
    beforeEach(() => {
      generator = Saga.getStudentSubmissionNodeData(data);
    });
    it('setStudentRequestSuccess with call length >0 and graded to be true', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [
              {
                workItemMetadata: [
                  {
                    $: {
                      graded: 'true',
                      workItemId: '12',
                      dateSubmitted: '10/01/2018',
                      assignment: 'assign',
                      from: 'from',
                      communityId: 'commId',
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
          id: 'kkk',
          assignment: 'assign',
          communityId: 'commId',
          date: '10/01/2018',
          from: 'from',
          graded: 'true',
          workItemId: '12',
          student: 'hhh, jjj',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess(response)));
    });
    it('setStudentRequestSuccess with call length >0 and graded to be false', () => {
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
                      communityId: 'commId',
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
          id: 'kkk',
          assignment: 'assign',
          communityId: 'commId',
          date: '10/01/2018',
          from: 'from',
          graded: 'false',
          workItemId: '12',
          student: 'hhh, jjj',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess(response)));
    });
    it('setStudentRequestSuccess with call length <0', () => {
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
    it('setStudentRequestSuccess err part', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('getStudentSubmissionMetaData', () => {
    const data = {
      classId: ['ooo'],
    };
    beforeEach(() => {
      generator = Saga.getStudentSubmissionMetaData(data);
    });
    it('setStudentRequestSuccess with call length >0 and graded to be true', () => {
      const ServiceResponse = {
        output_data: [
          {
            workItemsMetadata: [
              {
                workItemMetadata: [
                  {
                    $: {
                      graded: 'true',
                      workItemId: '12',
                      dateSubmitted: '10/01/2018',
                      assignment: 'assign',
                      from: 'from',
                      communityId: 'commId',
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
          id: 'kkk',
          assignment: 'assign',
          communityId: 'commId',
          kind: undefined,
          studentId: 'kkk',
          date: '10/01/2018',
          from: 'from',
          graded: 'true',
          workItemId: '12',
          student: 'hhh, jjj',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess(response)));
    });
    it('setStudentRequestSuccess with call length >0 and graded to be false', () => {
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
                      communityId: 'commId',
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
          id: 'kkk',
          kind: undefined,
          studentId: 'kkk',
          assignment: 'assign',
          communityId: 'commId',
          date: '10/01/2018',
          from: 'from',
          graded: 'false',
          workItemId: '12',
          student: 'hhh, jjj',
        },
      ];
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(ServiceResponse).value;
      expect(putDescriptor1).toEqual(put(Actions.setStudentRequestSuccess(response)));
    });
    it('setStudentRequestSuccess with call length <0', () => {
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
    it('setStudentRequestSuccess err part', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('getGradeDataRequest', () => {
    let inputSchoolID = {
      schoolid: ['org_id'],
    };

    beforeEach(() => {
      generator = Saga.getGradeDataRequest(inputSchoolID);

      expect(generator.next().value).toMatchSnapshot();
    });

    it('getGradeDataRequest with success', () => {
      const schoolList = {
        treeData: [
          {
            org_id: ['org_id'],
          },
        ],
      };

      const response = {
        output_data: [
          {
            grades: [
              {
                grade: [
                  {
                    full_name: ['full name'],

                    name: ['name'],
                  },
                ],
              },
            ],
          },
        ],
      };

      const passInputToPut = [
        {
          org_id: ['org_id'],

          children: [
            {
              name: 'full name',

              full_name: 'name',

              children: [],
            },
          ],

          toggled: true,
        },
      ];

      expect(generator.next(schoolList).value).toMatchSnapshot();

      expect(generator.next('SessionIDVal').value).toMatchSnapshot();

      expect(generator.next('UserIDVal').value).toMatchSnapshot();

      const putDescriptor1 = generator.next(response).value;

      expect(putDescriptor1).toEqual(
        put(Actions.getGradeDataRequestSuccess(passInputToPut, inputSchoolID))
      );

      const putDescriptor2 = generator.next().value;

      expect(putDescriptor2).toEqual(put(Actions.setGradeDataRequestSuccess('org_id')));
    });

    it('getGradeDataRequest with success OrdId is not equal to SchoolID', () => {
      const schoolList = {
        treeData: [
          {
            org_id: ['org_id_Change'],

            toggled: false,
          },
        ],
      };

      const response = {
        output_data: [
          {
            grades: [
              {
                grade: [
                  {
                    full_name: ['full name'],

                    name: ['name'],
                  },
                ],
              },
            ],
          },
        ],
      };

      const passInputToPut = [
        {
          org_id: ['org_id_Change'],

          toggled: false,
        },
      ];

      expect(generator.next(schoolList).value).toMatchSnapshot();

      expect(generator.next('SessionIDVal').value).toMatchSnapshot();

      expect(generator.next('UserIDVal').value).toMatchSnapshot();

      const putDescriptor1 = generator.next(response).value;

      expect(putDescriptor1).toEqual(
        put(Actions.getGradeDataRequestSuccess(passInputToPut, inputSchoolID))
      );

      const putDescriptor2 = generator.next().value;

      expect(putDescriptor2).toEqual(put(Actions.setGradeDataRequestSuccess('org_id')));
    });

    it('getGradeDataRequest with success OrdId is not equal to SchoolID and does not have toggled Property on state', () => {
      const schoolList = {
        treeData: [
          {
            org_id: ['org_id_Change'],
          },
        ],
      };

      const response = {
        output_data: [
          {
            grades: [
              {
                grade: [
                  {
                    full_name: ['full name'],

                    name: ['name'],
                  },
                ],
              },
            ],
          },
        ],
      };

      const passInputToPut = [
        {
          org_id: ['org_id_Change'],
        },
      ];

      expect(generator.next(schoolList).value).toMatchSnapshot();

      expect(generator.next('SessionIDVal').value).toMatchSnapshot();

      expect(generator.next('UserIDVal').value).toMatchSnapshot();

      const putDescriptor1 = generator.next(response).value;

      expect(putDescriptor1).toEqual(
        put(Actions.getGradeDataRequestSuccess(passInputToPut, inputSchoolID))
      );

      const putDescriptor2 = generator.next().value;

      expect(putDescriptor2).toEqual(put(Actions.setGradeDataRequestSuccess('org_id')));
    });

    it('getGradeDataRequest with success treeData is null and userType is not  SCHOOL USER', () => {
      const schoolList = {
        treeData: [],
      };

      inputSchoolID = {
        schoolid: ['org_id'],
      };

      const response = {
        output_data: [
          {
            grades: [
              {
                grade: [
                  {
                    full_name: ['full name'],

                    name: ['name'],
                  },
                ],
              },
            ],
          },
        ],
      };

      const passInputToPut = [];

      expect(generator.next(schoolList).value).toMatchSnapshot();

      expect(generator.next('SessionIDVal').value).toMatchSnapshot();

      expect(generator.next('UserIDVal').value).toMatchSnapshot();

      const putDescriptor1 = generator.next(response).value;

      expect(putDescriptor1).toEqual(
        put(Actions.getGradeDataRequestSuccess(passInputToPut, inputSchoolID))
      );

      const putDescriptor2 = generator.next().value;

      expect(putDescriptor2).toEqual(put(Actions.setGradeDataRequestSuccess('org_id')));
    });

    it('getGradeDataRequest with success treeData is null and userType is SCHOOL USER', () => {
      const schoolList = {
        treeData: [],
      };

      inputSchoolID = {
        schoolid: ['org_id'],

        userType: Constants.SCHOOL_USER,
      };

      generator = Saga.getGradeDataRequest(inputSchoolID);

      expect(generator.next().value).toMatchSnapshot();

      const response = {
        output_data: [
          {
            grades: [
              {
                grade: [
                  {
                    full_name: ['full name'],

                    name: ['name'],
                  },
                ],
              },
            ],
          },
        ],
      };

      const passInputToPut = [
        {
          name: 'full name',

          full_name: 'name',

          children: [],
        },
      ];

      expect(generator.next(schoolList).value).toMatchSnapshot();

      expect(generator.next('SessionIDVal').value).toMatchSnapshot();

      expect(generator.next('UserIDVal').value).toMatchSnapshot();

      const putDescriptor1 = generator.next(response).value;

      expect(putDescriptor1).toEqual(
        put(Actions.getGradeDataRequestSuccess(passInputToPut, inputSchoolID))
      );

      const putDescriptor2 = generator.next().value;

      expect(putDescriptor2).toEqual(put(Actions.setGradeDataRequestSuccess('org_id')));
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
  });
  // --------------------------------
  // -----------------------------------
  // ------------------------------------
  describe('getTeacherDataRequest', () => {
    let gradeid = {
      gradeId: 'org_id',
      adminType: Constants.ORG_SCHOOL,
    };

    beforeEach(() => {
      generator = Saga.getTeacherDataRequest(gradeid);

      expect(generator.next().value).toMatchSnapshot();
    });

    it('getTeacherDataRequest with success', () => {
      const schoolList = {
        selectedSchoolId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedSchoolId: 'org_id',
            children: [
              {
                name: 'lastname, firstname',
                full_name: 'org_id',
                children: [],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            users: [
              {
                user: [
                  {
                    last_name: ['lastname'],
                    first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(gradeid.gradeId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedGradeId('org_id')));
    });
    it('getTeacherDataRequest with success selectedschoolId not correct', () => {
      const schoolList = {
        selectedSchoolId: 'org_i',
        treeData: [
          {
            org_id: ['org_id'],
            selectedSchoolId: 'org_id',
            children: [
              {
                name: 'lastname, firstname',
                full_name: 'org_id',
                children: [],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            users: [
              {
                user: [
                  {
                    last_name: ['lastname'],
                    first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(gradeid.gradeId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedGradeId('org_id')));
    });

    it('getTeacherDataRequest with success selectedschoolId not correct', () => {
      const schoolList = {
        selectedSchoolId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedSchoolId: 'org_id',
            children: [
              {
                name: 'lastname, firstname',
                full_name: 'org_i',
                children: [],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            users: [
              {
                user: [
                  {
                    last_name: ['lastname'],
                    first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(gradeid.gradeId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedGradeId('org_id')));
    });
    it('getTeacherDataRequest with success when org_id is not present', () => {
      const schoolList = {
        selectedSchoolId: 'org_id',
        treeData: [
          {
            full_name: 'org_id',
            selectedSchoolId: 'org_id',
            children: [
              {
                name: 'lastname, firstname',
                full_name: 'org_id',
                children: [],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            users: [
              {
                user: [
                  {
                    last_name: ['lastname'],
                    first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(gradeid.gradeId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedGradeId('org_id')));
    });
    it('getTeacherDataRequest with success when org_id is not present else', () => {
      const schoolList = {
        selectedSchoolId: 'org_id',
        treeData: [
          {
            full_name: 'org_i',
            selectedSchoolId: 'org_id',
            children: [
              {
                name: 'lastname, firstname',
                full_name: 'org_id',
                children: [],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            users: [
              {
                user: [
                  {
                    last_name: ['lastname'],
                    first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(gradeid.gradeId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedGradeId('org_id')));
    });
    it('getTeacherDataRequest with success when admintype is not correct', () => {
      gradeid = {
        gradeId: 'org_id',
        adminType: 'ddd',
      };
      generator = Saga.getTeacherDataRequest(gradeid);

      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        treeData: [
          {
            full_name: 'org_i',
            selectedSchoolId: 'org_id',
            children: [
              {
                name: 'lastname, firstname',
                full_name: 'org_id',
                children: [],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            users: [
              {
                user: [
                  {
                    last_name: ['lastname'],
                    first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next('UserIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(gradeid.gradeId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedGradeId('org_id')));
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
  });
  // ------------------------------------------
  // -----------------------------------------
  // ---------------------------------------------
  // --------------------------------------------
  // -----------------------

  describe('getPortfolioClassDataRequest', () => {
    let teacherid = {
      teacherId: ['org_id'],
      adminType: Constants.ORG_SCHOOL,
    };

    beforeEach(() => {
      generator = Saga.getPortfolioClassDataRequest(teacherid);

      expect(generator.next().value).toMatchSnapshot();
    });

    it('getPortfolioClassDataRequest with success', () => {
      const schoolList = {
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [],
                user_id: ['org_id'],
              },
            ],
            toggled: true,
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
                    display_name: ['lastname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(teacherid.teacherId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedTeacherId('org_id')));
    });
    it('getPortfolioClassDataRequest with success userid not correct', () => {
      const schoolList = {
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [],
                user_id: ['org_i'],
              },
            ],
            toggled: true,
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
                    display_name: ['lastname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(teacherid.teacherId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedTeacherId('org_id')));
    });
    it('getPortfolioClassDataRequest with success fullname not correct', () => {
      const schoolList = {
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_i',
            children: [
              {
                full_name: 'org_id',
                children: [],
                user_id: ['org_i'],
              },
            ],
            toggled: true,
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
                    display_name: ['lastname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(teacherid.teacherId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedTeacherId('org_id')));
    });
    it('getPortfolioClassDataRequest with success when userType is correct', () => {
      teacherid = {
        teacherId: ['org_id'],
        adminType: 'ddd',
        userType: Constants.TEACHER_USER,
      };
      generator = Saga.getPortfolioClassDataRequest(teacherid);

      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [],
                user_id: ['org_id'],
              },
            ],
            toggled: true,
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
                    display_name: ['lastname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(teacherid.teacherId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedTeacherId('org_id')));
    });
    it('getPortfolioClassDataRequest with success when userType is wrong', () => {
      teacherid = {
        teacherId: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getPortfolioClassDataRequest(teacherid);

      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    user_id: ['org_id'],
                  },
                ],
                user_id: ['org_id'],
                toggled: true,
              },
            ],
            toggled: true,
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
                    display_name: ['lastname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(teacherid.teacherId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedTeacherId('org_id')));
    });
    it('getPortfolioClassDataRequest with success when userType is wrong', () => {
      teacherid = {
        teacherId: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getPortfolioClassDataRequest(teacherid);

      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    user_id: ['org_i'],
                  },
                ],
                user_id: ['org_id'],
                toggled: true,
              },
            ],
            toggled: true,
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
                    display_name: ['lastname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(teacherid.teacherId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedTeacherId('org_id')));
    });
    it('getPortfolioClassDataRequest with success when userType is wrong', () => {
      teacherid = {
        teacherId: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getPortfolioClassDataRequest(teacherid);

      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        selectedGradeId: 'org_i',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    user_id: ['org_i'],
                  },
                ],
                user_id: ['org_id'],
                toggled: true,
              },
            ],
            toggled: true,
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
                    display_name: ['lastname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(teacherid.teacherId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedTeacherId('org_id')));
    });
    it('getPortfolioClassDataRequest with success when userType is wrong', () => {
      teacherid = {
        teacherId: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getPortfolioClassDataRequest(teacherid);

      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_i',
        selectedGradeId: 'org_i',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    user_id: ['org_i'],
                  },
                ],
                user_id: ['org_id'],
                toggled: true,
              },
            ],
            toggled: true,
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
                    display_name: ['lastname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
      const putDescriptor2 = generator.next(teacherid.teacherId).value;
      expect(putDescriptor2).toEqual(put(Actions.setPortfolioSelectedTeacherId('org_id')));
    });
    it('getGradeDataRequest with Error', () => {
      const schoolList = {
        treeData: [],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  // --------------------========================
  // =====================================
  // ============================================
  describe('getStudentSubmissionTreeData', () => {
    let classId = {
      data: ['org_id'],
      adminType: Constants.ORG_SCHOOL,
    };

    beforeEach(() => {
      generator = Saga.getStudentSubmissionTreeData(classId);

      expect(generator.next().value).toMatchSnapshot();
    });

    it('getStudentSubmissionTreeData with success', () => {
      const schoolList = {
        selectedGradeId: 'org_id',
        selectedTeacherId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    class_id: ['org_id'],
                  },
                ],
                user_id: ['org_id'],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success classid not correct', () => {
      const schoolList = {
        selectedGradeId: 'org_id',
        selectedTeacherId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    class_id: ['org_i'],
                  },
                ],
                user_id: ['org_id'],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success userid not correct', () => {
      const schoolList = {
        selectedGradeId: 'org_id',
        selectedTeacherId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    class_id: ['org_i'],
                  },
                ],
                user_id: ['org_i'],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success fullname not correct', () => {
      const schoolList = {
        selectedGradeId: 'org_id',
        selectedTeacherId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_i',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    class_id: ['org_i'],
                  },
                ],
                user_id: ['org_i'],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success when admintype not correct', () => {
      classId = {
        data: ['org_id'],
        adminType: 'ddd',
        userType: Constants.TEACHER_USER,
      };
      generator = Saga.getStudentSubmissionTreeData(classId);
      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedGradeId: 'org_id',
        selectedTeacherId: 'org_id',
        treeData: [
          {
            class_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_i',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    class_id: ['org_i'],
                  },
                ],
                user_id: ['org_i'],
              },
            ],
            toggled: false,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success when admintype not correct', () => {
      classId = {
        data: ['org_id'],
        adminType: 'ddd',
        userType: Constants.TEACHER_USER,
      };
      generator = Saga.getStudentSubmissionTreeData(classId);
      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedGradeId: 'org_id',
        selectedTeacherId: 'org_id',
        treeData: [
          {
            class_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_i',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    class_id: ['org_i'],
                  },
                ],
                user_id: ['org_i'],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success when admintype not correct', () => {
      classId = {
        data: ['org_id'],
        adminType: 'ddd',
        userType: Constants.TEACHER_USER,
      };
      generator = Saga.getStudentSubmissionTreeData(classId);
      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedGradeId: 'org_id',
        selectedTeacherId: 'org_id',
        treeData: [
          {
            class_id: ['org_i'],
            selectedGradeId: 'org_id',
            full_name: 'org_i',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    class_id: ['org_i'],
                  },
                ],
                user_id: ['org_i'],
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success when admintype not correct', () => {
      classId = {
        data: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getStudentSubmissionTreeData(classId);
      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        selectedTeacherId: 'org_id',
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    user_id: ['org_id'],
                    children: [
                      {
                        class_id: ['org_id'],
                        children: [],
                        toggled: true,
                      },
                    ],
                    toggled: true,
                  },
                ],
                user_id: ['org_i'],
                toggled: true,
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success when admintype not correct', () => {
      classId = {
        data: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getStudentSubmissionTreeData(classId);
      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        selectedTeacherId: 'org_id',
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    user_id: ['org_id'],
                    children: [
                      {
                        class_id: ['org_id'],
                        children: [],
                        toggled: false,
                      },
                    ],
                    toggled: true,
                  },
                ],
                user_id: ['org_i'],
                toggled: true,
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success when admintype not correct', () => {
      classId = {
        data: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getStudentSubmissionTreeData(classId);
      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        selectedTeacherId: 'org_id',
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    user_id: ['org_id'],
                    children: [
                      {
                        class_id: ['org_i'],
                        children: [],
                      },
                    ],
                    toggled: true,
                  },
                ],
                user_id: ['org_i'],
                toggled: true,
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success when admintype not correct', () => {
      classId = {
        data: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getStudentSubmissionTreeData(classId);
      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        selectedTeacherId: 'org_id',
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    user_id: ['org_i'],
                    children: [
                      {
                        class_id: ['org_id'],
                        children: [],
                      },
                    ],
                    toggled: true,
                  },
                ],
                user_id: ['org_i'],
                toggled: true,
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success when admintype not correct', () => {
      classId = {
        data: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getStudentSubmissionTreeData(classId);
      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        selectedTeacherId: 'org_id',
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_id'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_i',
                children: [
                  {
                    user_id: ['org_id'],
                    children: [
                      {
                        class_id: ['org_id'],
                        children: [],
                      },
                    ],
                    toggled: true,
                  },
                ],
                user_id: ['org_i'],
                toggled: true,
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getPortfolioClassDataRequest with success when admintype not correct', () => {
      classId = {
        data: ['org_id'],
        adminType: 'ddd',
        userType: 'ddd',
      };
      generator = Saga.getStudentSubmissionTreeData(classId);
      expect(generator.next().value).toMatchSnapshot();
      const schoolList = {
        selectedSchoolId: 'org_id',
        selectedTeacherId: 'org_id',
        selectedGradeId: 'org_id',
        treeData: [
          {
            org_id: ['org_i'],
            selectedGradeId: 'org_id',
            full_name: 'org_id',
            children: [
              {
                full_name: 'org_id',
                children: [
                  {
                    user_id: ['org_id'],
                    children: [
                      {
                        class_id: ['org_id'],
                        children: [],
                      },
                    ],
                    toggled: true,
                  },
                ],
                user_id: ['org_i'],
                toggled: true,
              },
            ],
            toggled: true,
          },
        ],
      };

      const response = {
        output_data: [
          {
            students: [
              {
                student: [
                  {
                    student_id: ['student'],
                    student_last_name: ['lastname'],
                    student_first_name: ['firstname'],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      const putDescriptor1 = generator.next(response).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getTeacherDataRequestSuccess(schoolList.treeData))
      );
    });
    it('getGradeDataRequest with Error', () => {
      const schoolList = {
        treeData: [],
      };
      expect(generator.next(schoolList).value).toMatchSnapshot();
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.throw(err).value).toMatchSnapshot();
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_SCHOOL_DATA, Saga.getSchoolDataRequest),
          takeLatest(Constants.GET_GRADE_DATA, Saga.getGradeDataRequest),
          takeLatest(Constants.GET_TEACHERS_DATA, Saga.getTeacherDataRequest),
          takeLatest(Constants.GET_PORTFOLIO_CLASS_DATA, Saga.getPortfolioClassDataRequest),
          takeLatest(
            Constants.GET_STUDENT_SUBMISSION_META_DATA_SW,
            Saga.getStudentSubmissionMetaData
          ),
          takeLatest(
            Constants.GET_PORTFOLIO_STUDENT_ENROLMENT_TREE_DATA,
            Saga.getStudentSubmissionTreeData
          ),
          takeLatest(Constants.SET_PORTFOLIO_STUDENT_NODE_LIST, Saga.getStudentSubmissionNodeData),
        ])
      );
    });
  });
});
