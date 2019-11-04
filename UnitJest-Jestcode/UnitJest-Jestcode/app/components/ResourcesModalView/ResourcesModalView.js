/**
 *
 * ResourcesModalView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import { getBaseResourceUrl } from 'utils/request';

import './ResourcesModalView.scss';

const sortTerm = {
  term: 'resourceName',
  order: 'asc',
};
class ResourcesModalView extends React.Component {
  constructor() {
    super();
    this.state = { sortTerm };
  }

  handleClose = () => {
    this.props.updateResourcesModalStatus(false);
  };

  sortSearch = (term, event) => {
    event.preventDefault();
    const newTerm = this.state.sortTerm;
    if (newTerm.term !== term) {
      this.setState(
        {
          sortTerm: {
            ...this.state.sortTerm,
            term,
            order: 'asc',
          },
        },
        () => this.props.sortUpdater(this.state.sortTerm)
      );
    } else {
      const order = newTerm.order === 'asc' ? 'desc' : 'asc';
      this.setState(
        {
          sortTerm: {
            ...this.state.sortTerm,
            order,
          },
        },
        () => this.props.sortUpdater(this.state.sortTerm)
      );
    }
  };

  openDownloadableLink = resourceId =>
    `${getBaseResourceUrl()}/ResourceManager/previewresource.spr?_page=0&objectId=${resourceId}`;

  downloadableLinks = resourceInput =>
    resourceInput.get('resource').map(modalRes => {
      const gradeCount = modalRes.getIn(['resource_grades', 0, 'grade']).size;
      return (
        <div key={modalRes.getIn(['resource_id', 0])} className="resources-modal__content">
          <div className="resources-modal--download resources-modal__content--text">
            <a href={this.openDownloadableLink(modalRes.getIn(['resource_id', 0]))} target="_blank">
              Download
            </a>
          </div>
          <div className="resources-modal--resource-name resources-modal__content--text">
            <span>
              <div className="resources-modal__content-bold">
                {modalRes.getIn(['resource_name', 0])}
              </div>
              <div>{modalRes.getIn(['resource_desc', 0])}</div>
            </span>
          </div>
          <div className="resources-modal--resource-type resources-modal__content--text">
            <span>{modalRes.getIn(['resource_type', 0])}</span>
          </div>
          <div className="resources-modal--resource-type resources-modal__content--text">
            <span>{modalRes.getIn(['resource_programs', 0, 'program', 0, 'program_name', 0])}</span>
          </div>
          <div className="resources-modal--download resources-modal__content--text">
            <span>
              Grades{' '}
              {modalRes.getIn(['resource_grades', 0, 'grade']).map((grade, index) => {
                if (gradeCount === index + 1) {
                  return grade;
                }
                return `${grade}, `;
              })}
            </span>
          </div>
        </div>
      );
    });

  render() {
    return (
      <SAMModal
        isOpen={this.props.modalStatus}
        contentLabel="Resources Results"
        modalClassModifier="resources-modal"
      >
        <div className="resources-modal__header">Resources Search Results</div>
        <div className="resources-modal__title">
          Click a link below to open a Resource. You can sort Resources by each of the column
          headings.
        </div>
        <div className="resources-modal__display">
          <div className="resources-modal__display--header">
            <button className="resources-modal__button-non-click" />
            <button
              className={
                this.state.sortTerm.term === 'resourceName'
                  ? 'resources-modal__button--active resources-modal--resource-name'
                  : 'resources-modal__button resources-modal--resource-name'
              }
              onClick={event => this.sortSearch('resourceName', event)}
            >
              Resource Name
            </button>
            <button
              className={
                this.state.sortTerm.term === 'resourceType'
                  ? 'resources-modal__button--active'
                  : 'resources-modal__button'
              }
              onClick={event => this.sortSearch('resourceType', event)}
            >
              Resource Type
            </button>
            <button
              className={
                this.state.sortTerm.term === 'resourceProgram'
                  ? 'resources-modal__button--active'
                  : 'resources-modal__button'
              }
              onClick={event => this.sortSearch('resourceProgram', event)}
            >
              Program
            </button>
            <button className="resources-modal__button-non-click">Grade/Level</button>
          </div>
          <div className="resources-modal__display-body">
            {this.props.item.get('resource_search_results') &&
              this.downloadableLinks(this.props.item.get('resource_search_results'))}
            {!this.props.item.get('resource_search_results') && (
              <p className="resources-modal__display-no-response">
                No resource match the search criteria. Click close and check your search criteria.
              </p>
            )}
          </div>
        </div>
        <div className="resources-modal__footer">
          {this.props.item.get('resource_search_results') && (
            <span>
              Results 1 through{' '}
              {this.props.item.getIn(['resource_search_results', 'item_count', 0])} of
              {` ${this.props.item.getIn(['resource_search_results', 'item_count', 0])}`}
            </span>
          )}
          <SAMButton
            buttonClassModifier="resources-modal__footer-button"
            onClickHandler={this.handleClose}
          >
            Close
          </SAMButton>
        </div>
      </SAMModal>
    );
  }
}

ResourcesModalView.propTypes = {
  item: PropTypes.object.isRequired,
  updateResourcesModalStatus: PropTypes.func,
  modalStatus: PropTypes.bool.isRequired,
  sortUpdater: PropTypes.func,
};

export default ResourcesModalView;
