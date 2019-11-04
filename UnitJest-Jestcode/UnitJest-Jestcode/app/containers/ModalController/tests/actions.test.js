import * as Actions from '../actions';

describe('ModalController actions', () => {
  it('should return the correct constant for show modal', () => {
    expect(Actions.showModal('asdf')).toMatchSnapshot();
  });

  it('should return the correct constant for show modal but no type provided', () => {
    expect(Actions.showModal()).toMatchSnapshot();
  });

  it('should return the correct constant for hide modal', () => {
    expect(Actions.hideModal()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz CollectionNames', () => {
    expect(Actions.showEditQuizCollectionNames()).toMatchSnapshot();
  });
  describe('should return the correct constant for the about link modal', () => {
    it('passed with no data', () => {
      expect(Actions.showReactivateClassModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showReactivateClassModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the about show iread modal', () => {
    it('passed with no data', () => {
      expect(Actions.showIreadModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showIreadModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the about show iread student work modal', () => {
    it('passed with no data', () => {
      expect(Actions.showIReadStudentWorkModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showIReadStudentWorkModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the about show system 44 student goals modal', () => {
    it('passed with no data', () => {
      expect(Actions.showSystem44StudentGoalsModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showSystem44StudentGoalsModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the about link modal', () => {
    it('passed with no data', () => {
      expect(Actions.showAboutLinkModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showAboutLinkModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the about link modal', () => {
    it('passed with no data', () => {
      expect(Actions.showReactivateClassModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showReactivateClassModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the about link modal', () => {
    it('passed with no data', () => {
      expect(Actions.showR180NGTopicsSkipModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showR180NGTopicsSkipModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the about link modal', () => {
    it('passed with no data', () => {
      expect(Actions.showR180NGSkipSegmentModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showR180NGSkipSegmentModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the about link modal', () => {
    it('passed with no data', () => {
      expect(Actions.showReactivateSchoolModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showReactivateSchoolModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the about link modal', () => {
    it('passed with no data', () => {
      expect(Actions.showReactivateClassModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showReactivateClassModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  it('should return the correct constant for show class form modal', () => {
    expect(Actions.showClassFormModal()).toMatchSnapshot();
  });

  it('should return the deactivate user modal', () => {
    expect(Actions.showDeactivateUserModal()).toMatchSnapshot();
  });
  it('should return the deactivate user success message modal', () => {
    expect(Actions.showDeactivateUserSuccessModal()).toMatchSnapshot();
  });

  it('should return the deactivate group modal', () => {
    expect(Actions.showDeactivateGroupModal()).toMatchSnapshot();
  });
  it('should return the deactivate group success message modal', () => {
    expect(Actions.showDeactivateGroupSuccessModal()).toMatchSnapshot();
  });

  it('should return the correct constant for show student form modal', () => {
    expect(Actions.showStudentFormModal()).toMatchSnapshot();
  });

  describe('should return the correct constant for the edit district admin modal warning', () => {
    it('passed with no data', () => {
      expect(Actions.showEditAdminModalWarning()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showEditAdminModalWarning({ data: '123' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the show reactivate class modal', () => {
    it('passed with no data', () => {
      expect(Actions.showReactivateClassModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showReactivateClassModal({ data: '123' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the show reactivate class modal', () => {
    it('passed with no data', () => {
      expect(Actions.showCatchAllClassModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showCatchAllClassModal({ data: '123' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the show reactivate class modal', () => {
    it('passed with no data', () => {
      expect(Actions.showIreadAddModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showIreadAddModal({ data: '123' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the show reactivate class modal', () => {
    it('passed with no data', () => {
      expect(Actions.showRead180NgAssaignmentModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showRead180NgAssaignmentModal({ data: '123' })).toMatchSnapshot();
    });
  });
  it('should return the correct constant for show logout modal', () => {
    expect(Actions.showLogoutModal()).toMatchSnapshot();
  });

  describe('should return the correct constant for the message modal', () => {
    it('passed with no data', () => {
      expect(Actions.showMessageLogModal()).toMatchSnapshot();
    });

    it('passed with data', () => {
      expect(Actions.showMessageLogModal({ data: 'testData' })).toMatchSnapshot();
    });
  });
  describe('should return the correct constant for the set Student Level Modal', () => {
    it('passed with no data', () => {
      expect(Actions.showProgramSettingSetStudentLevelModal()).toMatchSnapshot();
    });

    it('should return the correct constant for the set Student Level Modal', () => {
      expect(
        Actions.showProgramSettingSetStudentLevelModal({ data: 'testdata' })
      ).toMatchSnapshot();
    });
    it('passed with no data', () => {
      expect(Actions.showR180NGTopicsStageModal()).toMatchSnapshot();
    });

    it('should return the correct constant for the set Student Level Modal', () => {
      expect(Actions.showR180NGTopicsStageModal({ data: 'testdata' })).toMatchSnapshot();
    });
  });
  it('should return the correct constant for "Add a School" form modal', () => {
    expect(Actions.showSchoolFormModal()).toMatchSnapshot();
  });

  it('should return the correct constant for the search modal', () => {
    expect(Actions.showSearchModal()).toMatchSnapshot();
  });

  it('should return the correct constant for the show teacher form modal', () => {
    expect(Actions.showTeacherFormModal()).toMatchSnapshot();
  });

  it('should return the correct constant for the show warning to Modal', () => {
    expect(Actions.showWarningModal()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz CollectionNames', () => {
    expect(Actions.showEditQuizCollectionNames()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz activateQuizModal', () => {
    expect(Actions.activateQuizModal()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz deactivateQuizModal', () => {
    expect(Actions.deactivateQuizModal()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showTeacherMadeQuiz', () => {
    expect(Actions.showTeacherMadeQuiz()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showPrintQuizModal', () => {
    expect(Actions.showPrintQuizModal()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showPrintBookLabelModal', () => {
    expect(Actions.showPrintBookLabelModal()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showR180NGTopicsStageModal', () => {
    expect(Actions.showR180NGTopicsStageModal()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showPrintQuizAndAnswerKeyModal', () => {
    expect(Actions.showPrintQuizAndAnswerKeyModal({ data: 'hhh' })).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showReactivateSchoolModal', () => {
    expect(Actions.showReactivateSchoolModal()).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showReactivateSchoolModal', () => {
    expect(Actions.showReactivateSchoolModal({ data: 'hhh' })).toMatchSnapshot();
  });
  it('passed with no data', () => {
    expect(Actions.showR180NGTopicsSkipModal()).toMatchSnapshot();
  });

  it('passed with data', () => {
    expect(Actions.showR180NGTopicsSkipModal({ data: 'testData' })).toMatchSnapshot();
  });
  it('passed with no data', () => {
    expect(Actions.showR180NGSkipSegmentModal()).toMatchSnapshot();
  });

  it('passed with data', () => {
    expect(Actions.showReactivateSchoolModal({ data: 'testData' })).toMatchSnapshot();
  });
  it('passed with no data', () => {
    expect(Actions.showReactivateSchoolModal()).toMatchSnapshot();
  });

  it('passed with data', () => {
    expect(Actions.showR180NGSkipSegmentModal({ data: 'testData' })).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showR180NGTopicsStageModal', () => {
    expect(Actions.showR180NGTopicsStageModal({ data: 'hhh' })).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showPrintQuizAndAnswerKeyModal', () => {
    expect(Actions.showPrintQuizAndAnswerKeyModal()).toMatchSnapshot();
  });
  it('passed with data', () => {
    expect(Actions.showPrintQuizModal({ data: '123' })).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz showR180NGTopicsStageModal', () => {
    expect(Actions.showR180NGTopicsStageModal()).toMatchSnapshot();
  });
  it('passed with data', () => {
    expect(Actions.showR180NGTopicsStageModal({ data: '123' })).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz handleExportTeacherQuizModal', () => {
    expect(Actions.handleExportTeacherQuizModal()).toMatchSnapshot();
  });
  it('passed with data', () => {
    const rowData = {
      ID: 'ggg',
      QuizTeacherMade: '',
    };
    const module = {};
    const checkedIDLength = '';
    expect(
      Actions.getSearchResultDetailsRequest(rowData, module, checkedIDLength)
    ).toMatchSnapshot();
  });
  it('passed with data', () => {
    const rowData = {
      ID: 'ggg',
      QuizTeacherMade: '',
    };
    const rowPage = 'roe';
    const rowIndex = '2';
    const allRows = 'rrrr';
    expect(Actions.showInboxProgram(rowData, rowPage, rowIndex, allRows)).toMatchSnapshot();
  });
  it('should return the correct constant for the show EditQuiz handleExportTeacherQuizModal', () => {
    expect(Actions.handleExportTeacherQuizModal()).toMatchSnapshot();
  });

  describe('should return correct constant for the searchClassAssignModal', () => {
    it('passed with data', () => {
      const mockRefresh = jest.fn();
      expect(
        Actions.showSearchClassAssignModal({
          data: {
            cohortsToAssign: [],
            searchRefreshOnSave: mockRefresh,
            cohortTypeLabel: 'Teacher',
          },
        })
      ).toMatchSnapshot();
    });
    it('passed without data', () => {
      expect(Actions.showSearchClassAssignModal()).toMatchSnapshot();
    });
  });

  describe('should return correct constant for the search delete account modal', () => {
    it('passed with data', () => {
      const mockRefresh = jest.fn();
      expect(
        Actions.showAccountDeleteModal({
          data: {
            cohortsToDelete: ['asdfghjkl'],
            searchRefreshOnSave: mockRefresh,
          },
        })
      ).toMatchSnapshot();
    });
    it('passed without data', () => {
      expect(Actions.showAccountDeleteModal()).toMatchSnapshot();
    });
  });
});
