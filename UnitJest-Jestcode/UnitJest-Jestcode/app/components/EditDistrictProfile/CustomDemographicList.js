/**
 *
 * CustomDemographicList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as ModalConstants from 'containers/ModalController/constants';
import SAMTable from 'components/SAMTable';
import './CustomDemographicList.scss';

class CustomDemographicList extends React.Component {
  constructor(props) {
    super(props);
    this.table = null;
  }

  handleEditDemographic = demographicToEdit => {
    const selectedIndex = this.props.demographics.findIndex(
      demographic => demographic.name === demographicToEdit
    );

    this.props.showModal(ModalConstants.ADD_DEMOGRAPHIC_MODAL, {
      editMode: true,
      demographicToEdit,
      demographicList: this.props.demographics,
      selectedIndex,
    });
  };

  handleDeleteDemographic = demographicToDelete => {
    const selectedIndex = this.props.demographics.findIndex(
      demographic => demographic.name === demographicToDelete
    );

    this.props.showModal(ModalConstants.ADD_DEMOGRAPHIC_MODAL, {
      deleteMode: true,
      demographicToDelete,
      demographicList: this.props.demographics,
      selectedIndex,
    });
  };
  renderEmptyTable = () => (
    <div className="custom-demographics-table__no-data">
      <div className="custom-demographics-table__no-data-text" />
    </div>
  );

  renderTableData = () =>
    this.props.demographics.map(rowData => ({
      _id: rowData.name,
      ...rowData,
    }));

  render() {
    const columns = [
      {
        Header: 'Custom',
        id: 'name',
        width: 180,
        accessor: 'name',
      },
      {
        Header: '',
        width: 100,
        accessor: 'edit',
        Cell: row => (
          <span
            role="link"
            className="custom-demographic-list__table-link"
            tabIndex={0}
            onClick={() => this.handleEditDemographic(row.original.name)}
          >
            edit
          </span>
        ),
      },
      {
        Header: '',
        accessor: 'delete',
        width: 100,
        Cell: row => (
          <span
            role="link"
            className="custom-demographic-list__table-link"
            tabIndex={0}
            onClick={() => this.handleDeleteDemographic(row.original.name)}
          >
            delete
          </span>
        ),
      },
    ];
    return (
      <SAMTable
        ref={node => (this.table = node)}
        className="custom-demographics-table"
        columns={columns}
        data={this.renderTableData()}
        renderEmptyTable={this.renderEmptyTable}
        pageSize={this.props.demographics.length}
        sortable={false}
      />
    );
  }
}

CustomDemographicList.defaultProps = {
  demographics: [],
};

CustomDemographicList.propTypes = {
  demographics: PropTypes.array,
  showModal: PropTypes.array,
};

export default CustomDemographicList;
