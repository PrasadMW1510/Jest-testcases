/**
 *
 * ManageSma
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';
import { sortData } from 'utils/utilities';

import './ManageSma.scss';

class ManageSma extends React.Component {
  componentDidMount = () => {};

  getColumns = () => {
    const columns = [
      {
        Header: 'Name',
        sortable: false,
        id: 'name',
        width: 200,
        accessor: 'name',
      },
      {
        Header: 'Location',
        sortable: false,
        id: 'url',
        width: 265,
        accessor: 'url',
      },
      {
        Header: '',
        sortable: false,
        className: 'rt-td__link',
        width: 75,
        Cell: row => (
          <span
            role="link"
            className="manage-sma__table-link"
            tabIndex={0} // eslint-disable-next-line no-underscore-dangle
            onClick={() => this.handleEdit(row)}
          >
            Edit
          </span>
        ),
      },
      {
        Header: '',
        sortable: false,
        className: 'rt-td__link',
        width: 100,
        Cell: row => (
          <span
            role="link"
            className="manage-sma__table-link"
            tabIndex={0} // eslint-disable-next-line no-underscore-dangle
            onClick={() => this.handleDelete(row)}
          >
            Delete
          </span>
        ),
      },
      {
        Header: '',
        sortable: false,
        className: 'rt-td__link',
        width: 100,
        Cell: row => (
          <span
            role="link"
            className="manage-sma__table-link"
            tabIndex={0}
            onClick={() => this.handleMap(row)}
          >
            Map
          </span>
        ),
      },
    ];
    return columns;
  };

  getData = () => {
    const sortedData = this.props.mediaServers
      .map(mediaServer => ({
        name: mediaServer.name[0],
        url: mediaServer.capabilities[0].capability[0].url[0],
      }))
      .sort((a, b) => sortData(a.name, b.name));

    return sortedData.map(server => ({
      name: this.renderStringWithToolTipPositioned(server.name, 50, 'right'),
      url: this.renderStringWithToolTipPositioned(server.url, 65, 'right'),
    }));
  };

  handleEdit = () => {};

  handleMap = () => {};

  renderStringWithToolTipPositioned = (text, characterLimit, position) => {
    if (text.length > characterLimit) {
      return (
        <a className={`rt-td__tooltip rt-td__tooltip--${position}`} data-tip={text}>
          <div className="rt-td__truncated-block">{text}</div>
        </a>
      );
    }
    return text;
  };

  render() {
    return (
      <div className="roster-content-panel roster-content-panel--white manage-sma-panel--white">
        <h4 className="manage-sma__header-text">Manage Software Media Accelerators (SMAs)</h4>
        <span className="manage-sma__text-direction">
          The SMA is a cache server for product media. Use this screen to manage SMAs and to map
          schools to SMA servers.
        </span>
        <div className="manage-sma__add-sma">
          <span className="manage-sma__add-sma-right" role="link">
            Add an SMA
          </span>
        </div>
        <SAMTable
          className="manage-sma-table"
          columns={this.getColumns()}
          data={this.getData()}
          pageSize={this.props.mediaServers.length}
        />
      </div>
    );
  }
}

ManageSma.propTypes = {
  mediaServers: PropTypes.array.isRequired,
};

export default ManageSma;
