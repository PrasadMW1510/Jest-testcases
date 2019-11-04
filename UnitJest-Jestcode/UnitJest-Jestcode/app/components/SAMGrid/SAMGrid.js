/**
 *
 * SAMGrid
 * This is the generic grid that other grids extend over.
 *
 */

import { MultiGrid } from 'react-virtualized';
import 'react-virtualized/styles.css';

import React from 'react';
import PropTypes from 'prop-types';

import './SAMGrid.scss';

class SAMGrid extends React.Component {
  constructor() {
    super();
    this.SAMGrid = null;
  }
  render() {
    return (
      <MultiGrid
        ref={grid => (this.SAMGrid = grid)}
        cellRenderer={this.props.cellRenderer}
        columnWidth={this.props.columnWidth}
        columnCount={this.props.columnCount}
        fixedColumnCount={this.props.fixedColumnCount}
        fixedRowCount={this.props.fixedRowCount}
        height={this.props.height}
        rowHeight={this.props.rowHeight}
        rowWidth={this.props.rowWidth}
        rowCount={this.props.rowCount}
        width={this.props.width}
        {...this.props}
      />
    );
  }
}

SAMGrid.propTypes = {
  cellRenderer: PropTypes.func,
  columnCount: PropTypes.number,
  columnWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  height: PropTypes.number,
  fixedColumnCount: PropTypes.number,
  fixedRowCount: PropTypes.number,
  rowCount: PropTypes.number,
  rowHeight: PropTypes.func,
  rowWidth: PropTypes.number,
  width: PropTypes.number,
};

export default SAMGrid;
