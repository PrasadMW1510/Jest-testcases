import { call, put, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { fromJS } from 'immutable';
import defaultSaga, * as Saga from '../saga';

import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('InboxModalContainer Saga', () => {
  let generator = null;
  let loginDataSelector = null;
  let profileSessionIdSelector = null;
  let profileUserIdSelector = null;
  let profileUserTypeSelector = null;
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    loginDataSelector = jest.fn().mockReturnValue(fromJS({ session_id: ['abdecf'] }));
    profileUserTypeSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserType').mockReturnValue(profileUserTypeSelector);
  });

  describe('getStudentQuestionDataRequest', () => {
    const filepath = {
      path: ['inbox'],
    };
    beforeEach(() => {
      generator = Saga.getStudentQuestionDataRequest(filepath);
    });

    it('getSearchResultsRequestsuccess', () => {
      expect(generator.next().value).toEqual(
        call(Request.getStudentQuestionRequestData, filepath.path[0])
      );
      expect(generator.next(filepath).value).toEqual(
        put(Actions.getStudentQuestionDataSuccess(filepath))
      );
    });

    it('getSearchResultsRequestFailure', () => {
      const error = 'mock error';
      expect(generator.next().value).toEqual(
        call(Request.getStudentQuestionRequestData, filepath.path[0])
      );
      expect(generator.throw(error).value).toEqual(
        put(Actions.getStudentQuestionDataFailure(error))
      );
    });
  });

  describe('saveStudentEvaluationData', () => {
    const inputparams = {
      evData: {
        communityID: 'kjdn_jsa',
      },
      postdata: 'kjkn_nbxb',
    };
    beforeEach(() => {
      generator = Saga.saveStudentEvaluationData(inputparams);
    });

    it('getSearchResultsRequestsuccess', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.next().value).toEqual(
        call(
          Request.saveStudentEvaluationDataRequest,
          undefined,
          inputparams.evData.communityID,
          inputparams.postdata
        )
      );
      expect(generator.next().value).toEqual(put(Actions.saveStudentEvalulationDataSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('getSearchResultsRequestfailure', () => {
      const error = 'mock error';
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next('SessionIDVal').value).toMatchSnapshot();
      expect(generator.throw(error).value).toEqual(put(hideLoading()));
    });
  });

  describe('getStudentProgramDetailsDataRequest when mSkillsWorkItem is undefined', () => {
    let mockSearchOpts;
    let store = null;
    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_type: ['teacher'],
        },
        profile: {
          school_id: ['my_school'],
        },
      });
      mockSearchOpts = {
        programdata: {},
      };
      generator = Saga.getStudentProgramDetailsDataRequest(mockSearchOpts);
    });

    it('should successfully run', () => {
      const serviceResponse = {
        output_data: [
          {
            workItems: [
              {
                mSkillsWorkItem: [
                  {
                    mSkillsQuestion1: [
                      {
                        question: 'question1',
                      },
                    ],
                    mSkillsQuestion2: [
                      {
                        question: 'question2',
                      },
                    ],
                    mSkillsQuestion3: [
                      {
                        question: 'question3',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const mockQuestions = ['question1Answer', 'question2Answer', 'question3Answer'];
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login'])).value).toEqual(
        call(
          Request.getStudentProgramDetailsDataRequestData,
          mockSearchOpts.programdata,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0]),
          store.getIn(['login', 'user_type', 0])
        )
      );
      expect(generator.next(serviceResponse).value).toEqual(
        put(Actions.getStudentProgramDetailsDataSuccess(serviceResponse))
      );

      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('question1Answer').value).toMatchSnapshot();
      expect(generator.next('question2Answer').value).toMatchSnapshot();
      expect(generator.next('question3Answer').value).toEqual(
        put(Actions.getStudentQuestionDataSuccess(mockQuestions))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('should successfully run with Question3 undefined', () => {
      const serviceResponse = {
        output_data: [
          {
            workItems: [
              {
                mSkillsWorkItem: [
                  {
                    mSkillsQuestion1: [
                      {
                        question: 'question1',
                      },
                    ],
                    mSkillsQuestion2: [
                      {
                        question: 'question2',
                      },
                    ],
                    mSkillsQuestion3: undefined,
                  },
                ],
              },
            ],
          },
        ],
      };
      const mockQuestions = ['question1Answer', 'question2Answer'];
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login'])).value).toEqual(
        call(
          Request.getStudentProgramDetailsDataRequestData,
          mockSearchOpts.programdata,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0]),
          store.getIn(['login', 'user_type', 0])
        )
      );
      expect(generator.next(serviceResponse).value).toEqual(
        put(Actions.getStudentProgramDetailsDataSuccess(serviceResponse))
      );
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('question1Answer').value).toMatchSnapshot();
      expect(generator.next('question2Answer').value).toEqual(
        put(Actions.getStudentQuestionDataSuccess(mockQuestions))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('should unsuccessfully run with Question is null', () => {
      const serviceResponse = {
        output_data: [
          {
            workItems: [
              {
                mSkillsWorkItem: [
                  {
                    mSkillsQuestion1: [
                      {
                        question: 'question1',
                      },
                    ],
                    mSkillsQuestion2: null,
                    mSkillsQuestion3: [
                      {
                        question: 'question3',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login'])).value).toEqual(
        call(
          Request.getStudentProgramDetailsDataRequestData,
          mockSearchOpts.programdata,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0]),
          store.getIn(['login', 'user_type', 0])
        )
      );
      expect(generator.next(serviceResponse).value).toEqual(
        put(Actions.getStudentProgramDetailsDataSuccess(serviceResponse))
      );
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next('question1Answer').value).toEqual(put(hideLoading()));
    });

    it('should unsuccessfully run with service response mSkillsWorkItem null', () => {
      const serviceResponse = {
        output_data: [
          {
            workItems: [
              {
                mSkillsWorkItem: '',
              },
            ],
          },
        ],
      };
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toMatchSnapshot();
      expect(generator.next(store.getIn(['login'])).value).toEqual(
        call(
          Request.getStudentProgramDetailsDataRequestData,
          mockSearchOpts.programdata,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0]),
          store.getIn(['login', 'user_type', 0])
        )
      );
      expect(generator.next(serviceResponse).value).toEqual(
        put(Actions.getStudentProgramDetailsDataSuccess(serviceResponse))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toMatchSnapshot();
    });
  });

  describe('getStudentProgramDetailsDataRequest when Error', () => {
    let mockSearchOpts;
    const err = 'mock error';
    beforeEach(() => {
      mockSearchOpts = {
        programdata: {},
      };
      generator = Saga.getStudentProgramDetailsDataRequest(mockSearchOpts);
    });

    it('should throw error', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next('sessionID').value).toMatchSnapshot();
      expect(generator.next('userID').value).toMatchSnapshot();
      expect(generator.next('userType').value).toMatchSnapshot();
      expect(generator.throw(err).value).toEqual(put(hideLoading()));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(
          Constants.GET_STUDENT_PROGRAM_DETAIL_REQUEST,
          Saga.getStudentProgramDetailsDataRequest
        )
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(
          Constants.GET_STUDENT_SKILL_ASSESTMENT_QUESTION,
          Saga.getStudentQuestionDataRequest
        )
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.SAVE_STUDENT_EVALUATION_DATA, Saga.saveStudentEvaluationData)
      );
    });
  });
});
