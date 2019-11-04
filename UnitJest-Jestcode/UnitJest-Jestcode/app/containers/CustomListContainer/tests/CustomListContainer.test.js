import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { CustomListContainer } from '../CustomListContainer';

describe('<CustomListContainer />', () => {
  let wrapper = null;
  let wrapper1 = null;

  let props = null;
  const mockexportCustomQuizRequest = jest.fn();
  const mockhandleTitleClick = jest.fn();

  beforeEach(() => {
    props = {
      searchResultsContainer: {
        selectedItems: [
          {
            _id: ['7bj95dlpefk21ljc2o399idb_2efa7f0'],
            QuizAuthor: [''],
            GuidedReadingLevel: ['Z'],
            LexileSort: ['900'],
            QuizTeacherMade: ['true'],
            Points: ['22'],
            Lexile: ['900'],
            QuizInstalled: ['true'],
            CollectionName: [''],
            Words: ['150000'],
            Author: [{ FirstName: ['Cassandra'], LastName: ['Lease'] }],
            QuizID: ['7bj95dlpefk21ljc2o399idb_2efa7f0'],
            Copies: ['0'],
            ReadingLevel: [6.2],
            Title: ['Monsterhearts'],
            Type: ['1'],
            ID: ['7bj95dlpefk21ljc2o399idb_2efa7f0'],
            QuizActive: ['true'],
          },
          {
            _id: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
            QuizAuthor: [''],
            GuidedReadingLevel: ['Z'],
            LexileSort: ['1000'],
            QuizTeacherMade: ['true'],
            Points: ['30'],
            Lexile: ['1000'],
            QuizInstalled: ['true'],
            CollectionName: [''],
            Words: ['150000'],
            Author: [{ FirstName: ['Cassandra'], LastName: ['Lease'] }],
            QuizID: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
            Copies: ['0'],
            ReadingLevel: ['6.2'],
            Title: ['Monsterhearts'],
            Type: ['1'],
            ID: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
            QuizActive: ['true'],
          },
        ],
      },
      clearSelectedCustomList: jest.fn(),
      getselectedbookresults: jest.fn(),
      showPrintQuizModal: jest.fn(),
      activateQuizModal: jest.fn(),
      deactivateQuizModal: jest.fn(),
      handleExportTeacherQuizModal: jest.fn(),
      showPrintBookLabelModal: jest.fn(),
      showPrintQuizAndAnswerKeyModal: jest.fn(),
    };
    const props1 = {
      ...props,
      searchResultsContainer: {
        selectedItems: [],
      },
    };
    wrapper = shallow(
      <CustomListContainer
        {...props}
        exportCustomQuizRequest={mockexportCustomQuizRequest}
        handleTitleClick={mockhandleTitleClick}
      />
    );
    wrapper1 = shallow(
      <CustomListContainer
        {...props1}
        exportCustomQuizRequest={mockexportCustomQuizRequest}
        handleTitleClick={mockhandleTitleClick}
      />
    );
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  it('should call handleTitleClick ', () => {
    wrapper.instance().handleTitleClick();
  });
  it('should call viewExportHTML  ', () => {
    wrapper.instance().viewExportHTML();
    expect(mockexportCustomQuizRequest).toHaveBeenCalled();
  });
  it('should call viewExportHTML else ', () => {
    wrapper1.instance().viewExportHTML();
    expect(mockexportCustomQuizRequest).toHaveBeenCalled();
  });
  it('should call closeNoTitlesToPrintModal  ', () => {
    wrapper.instance().closeNoTitlesToPrintModal();
    expect(wrapper.state('noDataToExportHTML')).toEqual(false);
  });
});
