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
import 'components/SAMTable/SAMTable.scss';

const CheckboxTable = checkboxHOC(ReactTable);

class BooksTable extends React.Component {
  isSelected = id =>
    this.props.checkedIds.length > 0 &&
    this.props.checkedIds.filter(checkedId => checkedId[0] === id[0]).length > 0;

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
    this.props.toggleAllCheckboxes(!this.props.selectAll, selection, this.props.data);
  };

  toggleSelection = (key, shift, row) => {
    const selection = [...this.props.checkedIds];
    const keyIndex = selection.indexOf(key);
    let checked = true;

    if (keyIndex >= 0) {
      checked = false;
    }
    this.props.handleRowSelections(checked, key, row);
    this.props.handleRowCheckboxOnChange(checked, key, row);
  };

  ref = node => {
    this.checkboxTable = node;
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

    if (data.length > 0) {
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
            defaultSorted={[
              {
                id: 'Title',
                desc: false,
              },
            ]}
            {...this.props}
          />
        )}
        {hasCheckboxes && (
          <CheckboxTable
            ref={this.ref}
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
            TbodyComponent={body}
            defaultSortMethod={this.defaultSortMethod}
            defaultSorted={[
              {
                id: 'Title',
                desc: false,
              },
            ]}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

BooksTable.defaultProps = {
  checkedIds: [],
  data: [],
  selectAll: false,
  pageSize: 0,
  sortable: true,
};

BooksTable.propTypes = {
  checkedIds: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  hasCheckboxes: PropTypes.bool,
  renderEmptyTable: PropTypes.func.isRequired,
  handleRowCheckboxOnChange: PropTypes.func,
  handleRowSelections: PropTypes.func,
  toggleAllCheckboxes: PropTypes.func,
  selectAll: PropTypes.bool.isRequired,
  sortable: PropTypes.bool.isRequired,
  pageSize: PropTypes.number,
};

export default BooksTable;
