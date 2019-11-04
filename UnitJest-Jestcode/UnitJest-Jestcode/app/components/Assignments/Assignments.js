import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';

import PropTypes from 'prop-types';
import ResultsTable from './ResultsTable';
import './Assignments.scss';

export class Assignments extends React.Component {
  state = {
    searchBy: 'Title',
    searchResultsIdsChecked: [],
    selectedrows: [],
    selectAll: false,
    searchFilterInfo: '',
    currentIndex: null,
    showAssignmentUpdate: false,
    assignmentName: '',
    isGradeValidForAssignment: true,
  };

  toggleAllCheckboxes = (isChecked, itemIds) => {
    this.setState({
      searchResultsIdsChecked: itemIds,
      selectAll: isChecked,
    });
  };

  handleRowSelections = (isChecked, itemId, row) => {
    if (isChecked) {
      this.state.selectedrows.push(row);
    } else {
      const Index = this.state.searchResultsIdsChecked.findIndex(element => element === itemId);
      this.state.selectedrows.splice(Index, 1);
    }
  };

  handleClick = (clickedValue, isEditable, index, metaData) => {
    const postData = { classId: clickedValue, isEditable, currentIndex: index, metaData };
    this.props.showIreadModal(postData);
  };

  handleNewAssignmentClick = (clickedValue, isEditable, index) => {
    const postData = {
      classId: clickedValue,
      isEditable,
      currentIndex: index,
      newassignment: this.props.data[0],
      newclassId: this.props.assignmentcontainer.classId,
    };
    if (this.props.assignmentcontainer.communityId === 'S44JR') {
      if (this.props.assignmentcontainer.classId) {
        const filterClassesFn = program =>
          program.class_id === this.props.assignmentcontainer.classId;
        const grades = this.props.programList.filter(filterClassesFn)[0].class_id.split(',');
        let isGradeValidForAssignment = true;
        grades.forEach(grade => {
          isGradeValidForAssignment = (grade === '1' || grade === '2') && isGradeValidForAssignment;
        });
        this.setState({
          isGradeValidForAssignment,
        });
      } else {
        this.props.showIreadAddModal(postData);
      }
    }

    if (
      this.props.data &&
      this.props.data.length > 0 &&
      this.props.assignmentcontainer.communityId === 'R180NG'
    ) {
      this.props.showRead180NgAssaignmentModal(postData);
    }
    if (
      this.props.data &&
      this.props.data.length === 0 &&
      (this.props.assignmentcontainer.communityId === 'M180' ||
        this.props.assignmentcontainer.communityId === 'M180Y2')
    ) {
      this.setState({ showAssignmentUpdate: true });
    }
    if (this.props.assignmentcontainer.communityId === 'M180,M180Y2,S44JR,S44NG') {
      this.props.showCatchAllClassModal(postData);
    }
    if (
      this.props.data &&
      this.props.data.length > 0 &&
      this.props.assignmentcontainer.communityId === 'S44NG'
    ) {
      this.props.showRead180NgAssaignmentModal(postData);
    }
    return 'modelOpened';
  };
  closeAssignmentUpdate = () => {
    this.setState({ showAssignmentUpdate: false });
  };

  closeGradeWarning = () => {
    this.setState({ isGradeValidForAssignment: true });
  };

  render() {
    return (
      <div>
        <div className="assignment-btn">
          <div
            tabIndex="-1"
            role="button"
            className="assignments-add-btn"
            onClick={() => {
              this.handleNewAssignmentClick('', true);
            }}
          >
            Add Assignments
          </div>
        </div>
        <ResultsTable
          data={this.props.data}
          toggleAllCheckboxes={this.toggleAllCheckboxes}
          handleClick={this.handleClick}
          searchResultsIdsChecked={this.state.searchResultsIdsChecked}
          handleRowSelections={this.handleRowSelections}
          handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
          selectAll={this.state.selectAll}
        />
        <SAMModal
          isOpen={this.state.showAssignmentUpdate}
          modalClassModifier="modal--assignments-savescreen-warning"
        >
          <div className="modal--assignments-savewrapper-heading" />
          <div className="modal--assignments-savewrapper-warning">
            Assignments are not available for Math180 Classes.
            <div className="read180ngsave-innerpage-button modal-assignments-okbtns">
              <SAMButton isPrimaryButton onClickHandler={this.closeAssignmentUpdate}>
                OK
              </SAMButton>
            </div>
          </div>
        </SAMModal>

        <SAMModal
          isOpen={!this.state.isGradeValidForAssignment}
          modalClassModifier="portfolio-grade-invalid"
        >
          <div>
            <div className="portfolio-grade-invalid-heading"> </div>
            <div className="portfolio-grade-invalid-txt">
              iRead Oral Reading Fluency Assessments are available for students in Grade 1 and 2
              only.
            </div>
            <div className="portfolio-grade-invalid-btn">
              <SAMButton onClickHandler={this.closeGradeWarning}>OK </SAMButton>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

Assignments.propTypes = {
  showIreadModal: PropTypes.func,
  data: PropTypes.array.isRequired,
  showIreadAddModal: PropTypes.func,
  showRead180NgAssaignmentModal: PropTypes.func,
  assignmentcontainer: PropTypes.object,
  showCatchAllClassModal: PropTypes.func,
  programList: PropTypes.any,
};

export default Assignments;
