/**
 *
 * SAMTable
 * This is the generic table that other tables extend over.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { sortData } from 'utils/utilities';

// Import React Table
import ReactTable, { ReactTableDefaults } from 'react-table';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import './SAMTable.scss';

const CheckboxTable = checkboxHOC(ReactTable);

class SAMTable extends React.Component {
  isSelected = id => this.props.checkedIds.includes(id);

  toggleAll = () => {
    const selection = [];
    if (!this.props.selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      currentRecords.forEach(item => {
        // eslint-disable-next-line no-underscore-dangle
        selection.push(item._original._id);
      });
    }

    this.props.toggleAllCheckboxes(!this.props.selectAll, selection);
  };

  toggleSelection = key => {
    const selection = [...this.props.checkedIds];
    const keyIndex = selection.indexOf(key);
    let checked = true;

    if (keyIndex >= 0) {
      checked = false;
    }
    this.props.handleRowCheckboxOnChange(checked, key);
  };

  defaultSortMethod = (a, b) => sortData(a, b);

  render() {
    const {
      columns,
      className,
      hasCheckboxes,
      data,
      renderEmptyTable,
      selectAll,
      pageSize,
      sortable,
    } = this.props;
    // If there is no data, renderEmptyTable element is rendered
    // as a body of the table
    let body = renderEmptyTable;

    if (data && data.length > 0) {
      body = ReactTableDefaults.TbodyComponent;
    }

    return (
      <div className={className}>
        {!hasCheckboxes && (
          <ReactTable
            data={data}
            columns={columns}
            resizable={false}
            pageSize={pageSize}
            showPagination={false}
            sortable={sortable}
            TbodyComponent={body}
            defaultSortMethod={this.defaultSortMethod}
            {...this.props}
          />
        )}
        {hasCheckboxes && (
          <CheckboxTable
            ref={node => (this.checkboxTable = node)}
            data={
              data // eslint-disable-line no-return-assign
            }
            columns={columns}
            selectType="checkbox"
            resizable={false}
            toggleSelection={this.toggleSelection}
            selectAll={selectAll}
            isSelected={this.isSelected}
            toggleAll={this.toggleAll}
            pageSize={pageSize}
            showPagination={false}
            defaultSortMethod={this.defaultSortMethod}
            TbodyComponent={body}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

SAMTable.defaultProps = {
  checkedIds: [],
  data: [],
  selectAll: false,
  pageSize: 0,
  sortable: true,
};

SAMTable.propTypes = {
  checkedIds: PropTypes.array,
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  hasCheckboxes: PropTypes.bool,
  renderEmptyTable: PropTypes.func,
  handleRowCheckboxOnChange: PropTypes.func,
  toggleAllCheckboxes: PropTypes.func,
  selectAll: PropTypes.bool,
  sortable: PropTypes.bool,
  pageSize: PropTypes.number,
};

export default SAMTable;
