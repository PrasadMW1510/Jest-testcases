/**
 *
 * UsageSummary
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { COHORT_TYPE, USER_ORG, USER_TYPE } from 'containers/App/constants';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import SAMGrid from 'components/SAMGrid';
import { ScrollSync } from 'react-virtualized';
import ExpandableComponent from 'components/ExpandableComponent/ExpandableComponent';
import './UsageSummary.scss';
import * as Constants from '../../containers/UsageSummaryContainer/constants';

export default class UsageSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tableData: this.props.tableData, selectedCell: { rowIndex: 0, columnIndex: 0 } };

    this.Grid = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tableData !== nextProps.tableData) {
      this.setState({ tableData: nextProps.tableData });
      if (this.Grid) {
        if (this.Grid.SAMGrid) {
          this.Grid.SAMGrid.recomputeGridSize();
          this.Footer.SAMGrid.recomputeGridSize();
        }
        this.Grid.forceUpdate();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.tableData !== prevProps.tableData) {
      if (this.Grid) {
        this.Grid.forceUpdate();
      }
    }
  }

  handleGridHeaderClick = (rowIndex, columnIndex, sortKey) => {
    this.props.onGridHeaderClick(this.state.tableData, rowIndex, columnIndex, sortKey);
  };

  // example of layout column index, rowindex
  // the list size is 9
  // [0,0, 1,0, 2,0]
  // [0,1, 1,1, 2,1]
  // [0,2, 1,2, 2,2]

  createGridHeaderCell = (columnIndex, rowIndex, list, key, style) => {
    let selectedClassName = '';
    let className = '';

    if (
      this.props.selectedCell.rowIndex === rowIndex &&
      this.props.selectedCell.columnIndex === columnIndex
    ) {
      selectedClassName = 'usage-summary__grid-header--selected';
    }

    const cellStyle = { ...style, display: 'flex', alignSelf: 'center' };
    className = 'usage-summary__grid-header';
    const headerText = list[rowIndex][columnIndex];
    return (
      <div
        key={key}
        role="gridcell"
        style={cellStyle}
        className={`${className} ${selectedClassName}`}
        onClick={() => this.handleGridHeaderClick(rowIndex, columnIndex, headerText)}
        tabIndex={0}
      >
        {headerText}
      </div>
    );
  };

  // example of layout column index, rowindex
  // the list size is 9
  // [0,0, 1,0, 2,0]
  // [0,1, 1,1, 2,1]
  // [0,2, 1,2, 2,2]

  createGridBodyCell = (columnIndex, rowIndex, list, key, style) => {
    let className = 'usage-summary__grid-cell';

    if (columnIndex > 0) {
      className += ' usage-summary__grid-tally';
    }

    return (
      <div key={key} style={style} className={className}>
        {list[rowIndex][columnIndex]}
      </div>
    );
  };

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const { smartBarSelections, loginData } = this.props;
    const cohortType = smartBarSelections.getIn(['selectedCohType']);

    const courses = this.props.headers.map(header => header[0]);

    const gridData = this.state.tableData.map(item => {
      const columnKey = Array.isArray(item.key) ? item.key : [item.key];
      const columnData = this.props.data[columnKey];
      const splitKey = [columnKey[0].split(Constants.SPLIT_IDENTIFIER)[0]];
      const column = splitKey.concat(columnData);

      return column;
    });

    const orgType = loginData.getIn(['user_org', 0]);
    const userType = loginData.getIn(['user_type', 0]);

    let firstColumn = [COHORT_TYPE.School];

    if (
      cohortType === COHORT_TYPE.School ||
      cohortType === COHORT_TYPE.Grade ||
      cohortType === COHORT_TYPE.Teacher
    ) {
      firstColumn = [COHORT_TYPE.Class];
    } else if (cohortType === COHORT_TYPE.Class || cohortType === COHORT_TYPE.Group) {
      firstColumn = [COHORT_TYPE.Student];
    } else if (orgType === USER_ORG.District && isUserTypeAdminOrTech(userType)) {
      firstColumn = [COHORT_TYPE.School];
    } else if (userType === USER_TYPE.Teacher) {
      firstColumn = [COHORT_TYPE.Class];
    } else if (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType)) {
      firstColumn = [COHORT_TYPE.Class];
    }

    const headers = firstColumn.concat(courses);

    const gridList = [headers];

    gridData.forEach(gridRow => {
      gridList.push(gridRow);
    });

    let cell;

    // example of layout column index, rowindex
    // the list size is 9
    // [0,0, 1,0, 2,0]
    // [0,1, 1,1, 2,1]
    // [0,2, 1,2, 2,2]

    if (rowIndex === 0) {
      cell = this.createGridHeaderCell(columnIndex, rowIndex, gridList, key, style);
    }

    if (gridData.length && rowIndex > 0) {
      cell = this.createGridBodyCell(columnIndex, rowIndex, gridList, key, style);
    }

    return cell;
  };

  // grid above
  // [0,0, 1,0, 2,0]
  // [0,1, 1,1, 2,1]
  // [0,2, 1,2, 2,2]

  // footer below
  // [0,0, 1,0, 2,0]

  // Connected with scroll sync
  // https://github.com/bvaughn/react-virtualized/blob/master/docs/ScrollSync.md

  footerRenderer = ({ key, style, rowIndex, columnIndex }) => {
    const { smartBarSelections, loginData, totals } = this.props;

    if (totals.length > 1) {
      let totalsType;

      const cohortType = smartBarSelections.getIn(['selectedCohType']);
      const orgType = loginData.getIn(['user_org', 0]);
      const userType = loginData.getIn(['user_type', 0]);

      if (cohortType === COHORT_TYPE.School) {
        totalsType = COHORT_TYPE.School;
      } else if (cohortType === COHORT_TYPE.Grade) {
        totalsType = COHORT_TYPE.Grade;
      } else if (cohortType === COHORT_TYPE.Teacher) {
        totalsType = COHORT_TYPE.Teacher;
      } else if (cohortType === COHORT_TYPE.Class) {
        totalsType = COHORT_TYPE.Class;
      } else if (cohortType === COHORT_TYPE.Group) {
        totalsType = COHORT_TYPE.Group;
      } else if (userType === USER_TYPE.Teacher) {
        totalsType = COHORT_TYPE.Teacher;
      } else if (orgType === USER_ORG.District && isUserTypeAdminOrTech(userType)) {
        totalsType = COHORT_TYPE.District;
      } else if (orgType === USER_ORG.School && isUserTypeAdminOrTech(userType)) {
        totalsType = COHORT_TYPE.School;
      } else {
        totalsType = COHORT_TYPE.School;
      }

      totalsType = `${totalsType} totals`;

      const totalsRow = [totalsType];

      const footerRow = totalsRow.concat(this.props.totals);
      const list = [footerRow];
      const tallyClassName = columnIndex !== 0 ? 'usage-summary__grid-footer-tally' : '';
      const cellStyle = { ...style, height: 20 };

      return (
        <div
          key={key}
          style={cellStyle}
          className={`usage-summary__grid-footer-cell ${tallyClassName}`}
        >
          {list[rowIndex][columnIndex]}
        </div>
      );
    }
    return null;
  };

  calculateRowHeight({ index }) {
    let height = 20;
    if (index === 0) {
      height = 70;
    }
    return height;
  }

  calculateColumnWidth = ({ index }) => {
    let width = 120;

    const cohortType = this.props.smartBarSelections.getIn(['selectedCohType']);

    const isClassesOrGroupSelected =
      cohortType === COHORT_TYPE.Class || cohortType === COHORT_TYPE.Group;

    if (index === 0 && isClassesOrGroupSelected) {
      width = 200;
    }
    return width;
  };

  render() {
    const { smartBarSelections, headers } = this.props;

    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    let fixedColumnCount = 1;
    const columnCount = headers.length + 1;

    if (cohortType === COHORT_TYPE.School || cohortType === COHORT_TYPE.Grade) {
      fixedColumnCount = 2;
    }

    if (this.props.studentView) {
      return (
        <div className="usage-summary__container">
          <div className="usage-table__header">
            <span className="usage-table__left">Usage Summary</span>
          </div>

          <ExpandableComponent items={this.props.studentItems} />
        </div>
      );
    }

    return (
      <div className="usage-summary__container">
        <div className="usage-table__header">
          <span className="usage-table__left">Usage Summary</span>
        </div>

        <div className="usage-summary__grid">
          <ScrollSync>
            {({ onScroll, scrollLeft }) => (
              <div className="usage-summary__grid-container">
                <div className="usage-summary__grid-body">
                  <SAMGrid
                    className="usage-summary__grid"
                    ref={grid => (this.Grid = grid)}
                    cellRenderer={this.cellRenderer}
                    columnCount={columnCount}
                    columnWidth={this.calculateColumnWidth}
                    fixedColumnCount={fixedColumnCount}
                    fixedRowCount={1}
                    rowCount={this.props.dataKeys.length + 1}
                    rowHeight={this.calculateRowHeight}
                    rowWidth={100}
                    height={150}
                    width={750}
                    scrollLeft={scrollLeft}
                    {...this.props}
                  />
                </div>
                <SAMGrid
                  className="usage-summary__grid-footer"
                  ref={footer => (this.Footer = footer)}
                  cellRenderer={this.footerRenderer}
                  columnCount={columnCount}
                  columnWidth={this.calculateColumnWidth}
                  rowCount={1}
                  fixedColumnCount={fixedColumnCount}
                  fixedRowCount={0}
                  height={35}
                  rowHeight={() => 20}
                  rowWidth={100}
                  width={750}
                  onScroll={onScroll}
                  {...this.props}
                />
              </div>
            )}
          </ScrollSync>
        </div>
      </div>
    );
  }
}

UsageSummary.propTypes = {
  headers: PropTypes.array.isRequired,
  tableData: PropTypes.array,
  data: PropTypes.object,
  dataKeys: PropTypes.array,
  onGridHeaderClick: PropTypes.func,
  selectedCell: PropTypes.object,
  smartBarSelections: PropTypes.object.isRequired,
  loginData: PropTypes.object.isRequired,
  studentView: PropTypes.string,
  studentItems: PropTypes.array,
  totals: PropTypes.array,
};
