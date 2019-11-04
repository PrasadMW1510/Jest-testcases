/**
 *
 * TeacherAccessTable
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { ITEMS_PER_PAGE } from 'containers/TeacherAccessTableContainer/constants';
import SAMGrid from 'components/SAMGrid';
import SAMLinkButton from 'components/SAMLinkButton';
import SAMButton from 'components/SAMButton';
import LoadingBar from 'components/LoadingBar';
import { ScrollSync } from 'react-virtualized';
import './TeacherAccessTable.scss';

export default class TeacherAccessTable extends React.Component {
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
      const checked =
        this.props.headers &&
        this.props.headers[columnIndex] &&
        !!this.props.headers[columnIndex].checked;
      headerText = (
        <div style={{ display: 'flex' }}>
          <div>
            <div className={`teacher-enrollment__grid-header-title ${errorClassName}`}>
              <span>{list[rowIndex] && list[rowIndex][columnIndex]}</span>
            </div>
            <div className="teacher-enrollment__grid-input">
              <input
                type="checkbox"
                data-header
                checked={checked}
                value={checked}
                data-column={columnIndex}
                data-row={rowIndex}
                readOnly
              />{' '}
            </div>
          </div>
        </div>
      );
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
      const checked = cellHtml === true;
      className += ' teacher-enrollment__grid-tally';
      cellHtml = (
        <input
          type="checkbox"
          checked={checked}
          value={checked}
          data-column={columnIndex}
          data-row={rowIndex}
          readOnly
        />
      );
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
      this.props.teacherEnrollRequest(actionPayload);
      this.props.handleTabReset();
    });
  };

  handleTeacherAccessSave = () => {
    this.props.teacherAccessSaveRequest(false, this.state.currentPage);
  };

  handleTeacherAccessSaveAndReturn = () => {
    this.props.teacherAccessSaveRequest(true, this.state.currentPage);
  };

  render() {
    const columnCount = this.props.headers.length + 1;
    const fixedColumnCount = 1;
    const { currentPage } = this.state;
    const {
      error,
      isDataInitialized,
      isDataLoading,
      paginationData: immPaginationData,
    } = this.props;
    const paginatorItemClass = isDataLoading ? 'disabled' : '';
    const totalItemCount = immPaginationData.itemCount;
    const startItemNumber = ITEMS_PER_PAGE * (currentPage - 1) + 1;
    const classes = `teacher-enrollment ${isDataLoading ? 'teacher-enrollment--loading' : ''}`;
    // Specify a unique key so the sroll position resets to the top of
    // scrollbar when the user changes current pagination page.
    const dataTableKey = `data-pg-${currentPage}`;
    let endItemNumber = ITEMS_PER_PAGE * currentPage;
    if (endItemNumber > totalItemCount) {
      endItemNumber = totalItemCount;
    }
    return (
      <div className={classes}>
        {typeof error === 'object' &&
          error.total_seats && <div className="teacher-enrollment__error">{error.total_seats}</div>}
        <div className="teacher-enrollment-header">
          Use the check boxes to enable or remove user access to HMH teacher products. Use the check
          box at the top of each column to enable access for all teachers in that product.
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
        <div className="teacher-enrollment-footer">
          <div className="teacher-enrollment-footer__buttons">
            {this.props.isolateTab && (
              <SAMButton
                id="cancel"
                buttonClassModifier="teacher-enrollment-cancel__btn"
                onClickHandler={this.props.handleCancel}
              >
                Cancel
              </SAMButton>
            )}
            <SAMLinkButton to="/roster" buttonClassModifier="teacher-enrollment-cancel__btn">
              Cancel & Return
            </SAMLinkButton>
            {this.props.isolateTab && (
              <Fragment>
                <SAMButton
                  buttonClassModifier="teacher-enrollment-cancel__btn"
                  onClickHandler={this.handleTeacherAccessSave}
                  isPrimaryButton
                >
                  Save
                </SAMButton>
                <SAMButton
                  buttonClassModifier="teacher-enrollment-cancel__btn"
                  onClickHandler={this.handleTeacherAccessSaveAndReturn}
                  isPrimaryButton
                >
                  Save & Return
                </SAMButton>
              </Fragment>
            )}
          </div>
          <div className="teacher-enrollment__pagination">
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
    );
  }
}

TeacherAccessTable.defaultProps = {
  isDataLoading: false,
  isDataInitialized: false,
  paginationData: {
    itemCount: 0,
  },
  isolateTab: false,
};

TeacherAccessTable.propTypes = {
  error: PropTypes.any,
  headers: PropTypes.any,
  teacherAccessSaveRequest: PropTypes.func,
  footers: PropTypes.any,
  gridList: PropTypes.any,
  handleToggle: PropTypes.func.isRequired,
  teacherEnrollRequest: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  isDataLoading: PropTypes.bool.isRequired,
  isDataInitialized: PropTypes.bool.isRequired,
  paginationData: PropTypes.object.isRequired,
  isolateTab: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleTabIsolate: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleTabReset: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
};
