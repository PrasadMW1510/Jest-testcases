/**
 *
 * StudentEnrollmentTable
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { fromJS } from 'immutable';
import { ITEMS_PER_PAGE } from 'containers/StudentEnrollmentTableContainer/constants';
import { COHORT_TYPE } from 'containers/App/constants';

import SAMGrid from 'components/SAMGrid';
import SAMLinkButton from 'components/SAMLinkButton';
import SAMButton from 'components/SAMButton';
import LoadingBar from 'components/LoadingBar';
import { ScrollSync } from 'react-virtualized';
import './StudentEnrollmentTable.scss';

export default class StudentEnrollmentTable extends React.Component {
  constructor(props) {
    super(props);
    this.Grid = null;
    this.state = {
      currentPage: 1,
    };
  }

  createGridHeaderCell = (columnIndex, rowIndex, list, key, style) => {
    let selectedClassName = '';
    let className = '';
    const listFooter = this.props.footers;
    const cellStyle = { ...style, display: 'flex', alignSelf: 'center' };
    let headerText = list[rowIndex] && list[rowIndex][columnIndex];

    if (rowIndex === 0 && columnIndex === 0) {
      selectedClassName = 'teacher-enrollment__grid-header--selected';
    }

    const errorClassName =
      listFooter && listFooter[columnIndex] < 0 ? 'teacher-enrollment__header-cell--error' : '';

    className = 'teacher-enrollment__grid-header';
    if (columnIndex > 0) {
      const checked = !!(
        this.props.headers &&
        this.props.headers[columnIndex] &&
        !!this.props.headers[columnIndex].checked
      );
      const disabled =
        list[rowIndex] && list[rowIndex][columnIndex] && list[rowIndex][columnIndex].anyDisabled;
      headerText = (
        <div style={{ display: 'flex' }}>
          <div>
            <div className={`teacher-enrollment__grid-header-title ${errorClassName}`}>
              <span>
                {list[rowIndex] && list[rowIndex][columnIndex] && list[rowIndex][columnIndex].label}
              </span>
            </div>
            <div className="teacher-enrollment__grid-input">
              <input
                type="checkbox"
                data-header
                checked={!!checked}
                value={!!checked}
                data-column={columnIndex}
                data-row={rowIndex}
                disabled={disabled}
                readOnly
              />{' '}
            </div>
          </div>
        </div>
      );
    }

    if (columnIndex === 0 && list.length > 0 && typeof list[0][0] !== 'string') {
      return '';
    }

    return (
      <div
        key={key}
        role="gridcell"
        className={`${className} ${selectedClassName}`}
        style={cellStyle}
        tabIndex={0}
      >
        {headerText}
      </div>
    );
  };

  createGridBodyCell = (columnIndex, rowIndex, list, key, style) => {
    let className = 'teacher-enrollment__grid-cell';
    let cellHtml = list[rowIndex] && list[rowIndex][columnIndex];
    if (columnIndex > 0 && list) {
      const cellProps = list[rowIndex] && list[rowIndex][columnIndex];
      className += ' teacher-enrollment__grid-tally';
      cellHtml = (
        <input
          type="checkbox"
          data-column={columnIndex}
          data-row={rowIndex}
          readOnly
          {...cellProps}
          value={!!(cellProps && cellProps.checked)}
          checked={!!(cellProps && cellProps.checked)}
        />
      );
    }

    if (columnIndex === 0 && list.length > 0 && typeof list[0][0] !== 'string') {
      return '';
    }

    return (
      <div key={key} style={style} className={className}>
        {cellHtml}
      </div>
    );
  };

  footerRenderer = ({ key, style, rowIndex, columnIndex }) => {
    const list = [this.props.footers];
    const tallyClassName = columnIndex !== 0 ? 'teacher-enrollment__grid-footer-tally' : '';
    const cellStyle = { ...style, height: 20 };
    const errorClassName =
      list && list[rowIndex] && list[rowIndex][columnIndex] < 0
        ? 'teacher-enrollment__cell--error'
        : '';
    return (
      <div
        key={key}
        style={cellStyle}
        className={`teacher-enrollment__grid-footer-cell ${tallyClassName} ${errorClassName}`}
      >
        {list[rowIndex] && list[rowIndex][columnIndex]}
      </div>
    );
  };

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const gridList = this.props.gridList;
    let cell;
    if (rowIndex === 0) {
      cell = this.createGridHeaderCell(columnIndex, rowIndex, this.props.gridList, key, style);
    }

    if (gridList.length && rowIndex > 0) {
      cell = this.createGridBodyCell(columnIndex, rowIndex, this.props.gridList, key, style);
    }

    return cell;
  };

  calculateRowHeight({ index }) {
    let height = 20;
    if (index === 0) {
      height = 70;
    }
    return height;
  }

  handlePageChange = newPageNumber => {
    const actionPayload = {
      currentPage: newPageNumber - 1,
    };
    this.setState({ currentPage: newPageNumber }, () => {
      this.props.studentEnrollRequest(actionPayload);
      this.props.handleTabReset();
    });
  };

  handleStudentEnrollSave = () => {
    this.props.studentEnrollSaveRequest(false, this.state.currentPage);
  };

  handleStudentEnrollSaveAndReturn = () => {
    this.props.studentEnrollSaveRequest(true, this.state.currentPage);
  };

  handleStudentViewEnrollSave = () => {
    this.props.studentViewEnrollSaveRequest(false, this.state.currentPage);
  };

  handleStudentViewEnrollSaveAndReturn = () => {
    this.props.studentViewEnrollSaveRequest(true, this.state.currentPage);
  };

  renderStudentView = () => {
    const studentList = [];
    if (this.props.gridList && this.props.gridList[0]) {
      for (let index = 0; index < this.props.gridList[0].length; index += 1) {
        const item = this.props.gridList[1] && this.props.gridList[1][index];
        const itemHeader = this.props.gridList[0][index];
        studentList.push(
          <tr key={index}>
            <td>
              <input
                className="student-view-input"
                type="checkbox"
                id={`student-products_${index}`}
                data-row={index}
                {...typeof item === 'object' && item}
                onChange={this.props.handleStudentViewToggle}
                readOnly
                value={!!(typeof item === 'object' ? item.checked : item)}
                checked={!!(typeof item === 'object' ? item.checked : item)}
              />
              <label className="student-view-list" htmlFor={`student-products_${index}`}>
                {typeof itemHeader === 'object' && itemHeader.label}
              </label>
            </td>
          </tr>
        );
      }
    }
    return studentList;
  };

  render() {
    const columnCount = this.props.headers.length + 1;
    const fixedColumnCount = 1;
    const { currentPage } = this.state;
    const { isDataInitialized, isDataLoading, paginationData: immPaginationData } = this.props;
    const paginatorItemClass = isDataLoading ? 'disabled' : '';
    const totalItemCount = immPaginationData.itemCount;
    const startItemNumber = ITEMS_PER_PAGE * (currentPage - 1) + 1;
    const classes = `teacher-enrollment ${isDataLoading ? 'teacher-enrollment--loading' : ''}`;
    const dataTableKey = `data-pg-${currentPage}`;
    let endItemNumber = ITEMS_PER_PAGE * currentPage;
    if (endItemNumber > totalItemCount) {
      endItemNumber = totalItemCount;
    }

    return (
      <div>
        {this.props.smartBarSelections.getIn(['selectedCohType']) === COHORT_TYPE.Student && (
          <div className={classes}>
            <div className="student-enrollment-header">Manage Student Enrollment</div>
            <div className="student-enrollment-header__subset">
              Use the check boxes to enroll or unenroll students in HMH programs.
            </div>
            {isDataInitialized &&
              isDataLoading && (
                <div className="teacher-enrollment__loading">
                  <LoadingBar />
                </div>
              )}
            <div className="student-view-container">
              <table className="student-view">
                <thead>
                  <tr className="student-view-header">
                    <th className="student-view-header__label">
                      Enroll this student in the following application(s):
                    </th>
                  </tr>
                </thead>
                <tbody className="student-view-body">{this.renderStudentView()}</tbody>
              </table>
            </div>

            <div className="student-enrollment-footer__studentview">
              <div className="student-enrollment-footer__buttons">
                {this.props.isolateTab && (
                  <SAMButton
                    id="cancel"
                    buttonClassModifier="student-enrollment-cancel__btn"
                    onClickHandler={this.props.handleCancel}
                  >
                    Cancel
                  </SAMButton>
                )}
                <SAMLinkButton to="/roster" buttonClassModifier="student-enrollment-cancel__btn">
                  Cancel & Return
                </SAMLinkButton>
                {this.props.isolateTab && (
                  <Fragment>
                    <SAMButton
                      buttonClassModifier="student-enrollment-cancel__btn"
                      onClickHandler={this.handleStudentViewEnrollSave}
                      isPrimaryButton
                    >
                      Save
                    </SAMButton>
                    <SAMButton
                      buttonClassModifier="student-enrollment-cancel__btn"
                      onClickHandler={this.handleStudentViewEnrollSaveAndReturn}
                      isPrimaryButton
                    >
                      Save & Return
                    </SAMButton>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        )}
        {this.props.smartBarSelections.getIn(['selectedCohType']) !== COHORT_TYPE.Student && (
          <div className={classes}>
            <div className="teacher-enrollment-header">
              Use the check boxes to enroll or unenroll students in HMH programs. Use the check box
              at the top of each column to enroll all students in that program.
            </div>
            {isDataInitialized &&
              isDataLoading && (
                <div className="teacher-enrollment__loading">
                  <LoadingBar />
                </div>
              )}
            <ScrollSync>
              {({ onScroll, scrollLeft }) => (
                <div className="teacher-enrollment__grid">
                  <div className="teacher-enrollment__grid-body" onChange={this.props.handleToggle}>
                    <SAMGrid
                      className="teacher-enrollment__grid"
                      ref={grid => (this.Grid = grid)}
                      cellRenderer={this.cellRenderer}
                      columnCount={columnCount}
                      columnWidth={120}
                      fixedColumnCount={fixedColumnCount}
                      fixedRowCount={1}
                      rowCount={this.props.gridList.length}
                      rowHeight={this.calculateRowHeight}
                      rowWidth={100}
                      height={300}
                      width={740}
                      key={dataTableKey}
                      scrollLeft={scrollLeft}
                      {...this.props}
                    />
                  </div>
                  <SAMGrid
                    className="teacher-enrollment__grid-footer"
                    ref={footer => (this.Footer = footer)}
                    cellRenderer={this.footerRenderer}
                    columnCount={this.props.headers.length}
                    columnWidth={120}
                    rowCount={1}
                    fixedColumnCount={fixedColumnCount}
                    fixedRowCount={0}
                    height={40}
                    rowHeight={() => 20}
                    rowWidth={100}
                    width={740}
                    onScroll={onScroll}
                    {...this.props}
                  />
                </div>
              )}
            </ScrollSync>
            <div className="student-enrollment-footer">
              <div className="student-enrollment-footer__buttons">
                {this.props.isolateTab && (
                  <SAMButton
                    id="cancel"
                    buttonClassModifier="student-enrollment-cancel__btn"
                    onClickHandler={this.props.handleCancel}
                  >
                    Cancel
                  </SAMButton>
                )}
                <SAMLinkButton to="/roster" buttonClassModifier="student-enrollment-cancel__btn">
                  Cancel & Return
                </SAMLinkButton>
                {this.props.isolateTab && (
                  <Fragment>
                    <SAMButton
                      buttonClassModifier="student-enrollment-cancel__btn"
                      onClickHandler={this.handleStudentEnrollSave}
                      isPrimaryButton
                    >
                      Save
                    </SAMButton>
                    <SAMButton
                      buttonClassModifier="student-enrollment-cancel__btn"
                      onClickHandler={this.handleStudentEnrollSaveAndReturn}
                      isPrimaryButton
                    >
                      Save & Return
                    </SAMButton>
                  </Fragment>
                )}
              </div>
              <div className="student-enrollment__pagination">
                {' '}
                {totalItemCount >= 0 && (
                  <div className="teacher-enrollment__item-accumulator">
                    {`Items ${startItemNumber} through ${endItemNumber} of ${totalItemCount}`}
                  </div>
                )}
                <Pagination
                  activePage={currentPage}
                  firstPageText="first"
                  itemClass={paginatorItemClass}
                  itemsCountPerPage={ITEMS_PER_PAGE}
                  lastPageText="last"
                  nextPageText="next"
                  onChange={this.handlePageChange}
                  pageRangeDisplayed={3}
                  prevPageText="prev"
                  totalItemsCount={totalItemCount}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

StudentEnrollmentTable.defaultProps = {
  isDataLoading: false,
  isDataInitialized: false,
  gridList: [],
  headers: [],
  paginationData: {
    itemCount: 0,
  },
  isolateTab: false,
  smartBarSelections: fromJS({}),
};

StudentEnrollmentTable.propTypes = {
  headers: PropTypes.any,
  studentEnrollSaveRequest: PropTypes.func,
  footers: PropTypes.any,
  gridList: PropTypes.any,
  handleToggle: PropTypes.func.isRequired,
  handleStudentViewToggle: PropTypes.func.isRequired,
  studentEnrollRequest: PropTypes.func.isRequired,
  studentViewEnrollSaveRequest: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  smartBarSelections: PropTypes.object,
  isDataLoading: PropTypes.bool.isRequired,
  isDataInitialized: PropTypes.bool.isRequired,
  paginationData: PropTypes.object.isRequired,
  isolateTab: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleTabIsolate: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleTabReset: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
};
