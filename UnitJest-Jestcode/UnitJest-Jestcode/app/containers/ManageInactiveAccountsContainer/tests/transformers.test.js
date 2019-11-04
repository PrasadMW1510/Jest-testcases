import React from 'react';
import { CHECKMARK_IMAGE_SRC } from 'components/ManageInactiveAccounts/constants';
import { transformInactiveMembersResponse } from '../transformers';

describe('ManageInactiveAccountsContainer transformers', () => {
  describe('transformInactiveMembersResponse', () => {
    it('should transform absent cohort correctly', () => {
      const apiResponse = {
        item_count: [15],
        pagination_data: ['some paginated data'],
        output_data: [
          {
            districts: [null],
          },
        ],
      };
      const transformedResponse = transformInactiveMembersResponse(apiResponse);
      expect(transformedResponse.length).toEqual(0);
    });

    it('should transform ignored cohort correctly', () => {
      const apiResponse = {
        item_count: [15],
        pagination_data: ['some paginated data'],
        output_data: [
          {
            districts: [
              {
                district: [
                  {
                    name: ['district 1'],
                  },
                ],
              },
            ],
          },
        ],
      };
      const transformedResponse = transformInactiveMembersResponse(apiResponse);
      expect(transformedResponse.length).toEqual(0);
    });

    it('should transform students correctly', () => {
      const apiResponse = {
        item_count: [15],
        pagination_data: ['some paginated data'],
        output_data: [
          {
            students: [
              {
                user: [
                  {
                    first_name: ['student name first'],
                    last_name: ['student name last'],
                    user_name: ['a very long long username'],
                    sis_id: ['a very long long sis_id'],
                    is_attached: ['false'],
                    is_enrolled: ['false'],
                    user_id: ['userid1'],
                  },
                  {
                    first_name: ['first2'],
                    last_name: ['last2'],
                    user_name: ['username2'],
                    sis_id: ['sis_id2'],
                    is_attached: ['true'],
                    is_enrolled: ['true'],
                    user_id: ['userid2'],
                    applications: [
                      {
                        application: [
                          {
                            _: 'System 44',
                          },
                          {
                            _: 'FastMath',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const transformedResponse = transformInactiveMembersResponse(apiResponse);
      expect(transformedResponse.length).toEqual(2);
      let transformedUser = transformedResponse[0];
      expect(transformedUser).toEqual({
        _id: 1,
        // _id: 'userid1',
        enrollment: '',
        first_name: 'student name first',
        grade: '',
        last_name: 'student name last',
        name: (
          <a
            className="rt-td__tooltip rt-td__tooltip--right"
            data-tip="student name last, student name first"
          >
            <div className="rt-td__truncated-block">student name last, student name first</div>
          </a>
        ),
        status: 'Inactive',
        studentId: (
          <a className="rt-td__tooltip rt-td__tooltip--right" data-tip="a very long long sis_id">
            <div className="rt-td__truncated-block">a very long long sis_id</div>
          </a>
        ),
        userName: (
          <a className="rt-td__tooltip rt-td__tooltip--right" data-tip="a very long long username">
            <div className="rt-td__truncated-block">a very long long username</div>
          </a>
        ),
        user_id: 'userid1',
      });
      transformedUser = transformedResponse[1];
      expect(transformedUser).toEqual({
        _id: 2,
        enrollment: (
          <a className="rt-td__tooltip rt-td__tooltip--left" data-tip="System 44, FastMath">
            <img
              alt="checkmark"
              className="rt-td__enrollment-checkmark"
              src={CHECKMARK_IMAGE_SRC}
            />
          </a>
        ),
        first_name: 'first2',
        grade: '',
        last_name: 'last2',
        name: 'last2, first2',
        status: 'Active',
        studentId: 'sis_id2',
        userName: 'username2',
        user_id: 'userid2',
      });
    });

    it('should transform teachers correctly', () => {
      const apiResponse = {
        item_count: [15],
        pagination_data: ['some paginated data'],
        output_data: [
          {
            teachers: [
              {
                user: [
                  {
                    district_user_id: ['districtId'],
                    first_name: ['first'],
                    is_attached: ['false'],
                    last_name: ['last'],
                    user_name: ['username'],
                    user_id: ['userid1'],
                  },
                  {
                    district_user_id: ['a very long long districtId2'],
                    first_name: ['student name first2'],
                    is_attached: ['false'],
                    last_name: ['student name last2'],
                    school_name: ['a very long long schoolName2'],
                    user_name: ['a very long long username2'],
                    user_id: ['userid2'],
                  },
                ],
              },
            ],
          },
        ],
      };
      const transformedResponse = transformInactiveMembersResponse(apiResponse);
      expect(transformedResponse.length).toEqual(2);
      const transformedUser = transformedResponse[1];
      expect(transformedUser).toEqual({
        _id: 2,
        districtUserId: (
          <a
            className="rt-td__tooltip rt-td__tooltip--right"
            data-tip="a very long long districtId2"
          >
            <div className="rt-td__truncated-block">a very long long districtId2</div>
          </a>
        ),
        name: (
          <a
            className="rt-td__tooltip rt-td__tooltip--right"
            data-tip="student name last2, student name first2"
          >
            <div className="rt-td__truncated-block">student name last2, student name first2</div>
          </a>
        ),
        schoolName: (
          <a
            className="rt-td__tooltip rt-td__tooltip--left"
            data-tip="a very long long schoolName2"
          >
            <div className="rt-td__truncated-block">a very long long schoolName2</div>
          </a>
        ),
        userName: (
          <a className="rt-td__tooltip rt-td__tooltip--right" data-tip="a very long long username2">
            <div className="rt-td__truncated-block">a very long long username2</div>
          </a>
        ),
        user_id: 'userid2',
      });
    });

    it('should transform classes correctly', () => {
      const apiResponse = {
        item_count: [15],
        pagination_data: ['some paginated data'],
        output_data: [
          {
            classes: [
              {
                class: [
                  {
                    grades: [
                      {
                        grade: [
                          {
                            name: 'PK',
                          },
                          {
                            name: '3',
                          },
                        ],
                      },
                    ],
                    name: ['class 1'],
                    school_name: ['school 1'],
                    class_id: ['classid1'],
                  },
                  {
                    name: ['a very long long long class 2'],
                    class_id: ['classid2'],
                  },
                ],
              },
            ],
          },
        ],
      };
      const transformedResponse = transformInactiveMembersResponse(apiResponse);
      expect(transformedResponse.length).toEqual(2);
      let transformedClass = transformedResponse[0];
      expect(transformedClass).toEqual({
        _id: 1,
        grade: 'PK, 3',
        name: 'class 1',
        schoolName: 'school 1',
        class_id: 'classid1',
      });
      transformedClass = transformedResponse[1];
      expect(transformedClass).toEqual({
        _id: 2,
        grade: '',
        name: (
          <a
            className="rt-td__tooltip rt-td__tooltip--right"
            data-tip="a very long long long class 2"
          >
            <div className="rt-td__truncated-block">a very long long long class 2</div>
          </a>
        ),
        schoolName: <div className="rt-td__not-applicable">N/A</div>,
        class_id: 'classid2',
      });
    });

    it('should transform schools correctly', () => {
      const apiResponse = {
        item_count: [15],
        pagination_data: ['some paginated data'],
        output_data: [
          {
            schools: [
              {
                organization: [
                  {
                    grades: [
                      {
                        grade: [
                          {
                            name: 'PK',
                          },
                          {
                            name: '3',
                          },
                        ],
                      },
                    ],
                    name: ['a very long long long school 1'],
                    school_number: ['test school number 1'],
                    org_id: ['schoolid1'],
                  },
                  {
                    name: ['school 2'],
                    school_number: ['school no. 2'],
                    org_id: ['schoolid2'],
                  },
                ],
              },
            ],
          },
        ],
      };
      const transformedResponse = transformInactiveMembersResponse(apiResponse);
      expect(transformedResponse.length).toEqual(2);
      let transformedSchool = transformedResponse[0];
      expect(transformedSchool).toEqual({
        _id: 1,
        grade: 'PK, 3',
        name: (
          <a
            className="rt-td__tooltip rt-td__tooltip--right"
            data-tip="a very long long long school 1"
          >
            <div className="rt-td__truncated-block">a very long long long school 1</div>
          </a>
        ),
        schoolId: (
          <a className="rt-td__tooltip rt-td__tooltip--right" data-tip="test school number 1">
            <div className="rt-td__truncated-block">test school number 1</div>
          </a>
        ),
        org_id: 'schoolid1',
      });
      transformedSchool = transformedResponse[1];
      expect(transformedSchool).toEqual({
        _id: 2,
        grade: '',
        name: 'school 2',
        schoolId: 'school no. 2',
        org_id: 'schoolid2',
      });
    });
  });
});
