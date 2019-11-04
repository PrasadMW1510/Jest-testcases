/**
 *
 * ResourcesModalStateView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import { getBaseResourceUrl } from 'utils/request';

import './ResourcesModalStateView.scss';

class ResourcesModalStateView extends React.Component {
  handleCancel = () => {
    this.props.updateResourcesModalStatus(false);
  };

  openDownloadableLink = standardId =>
    `${getBaseResourceUrl()}/ResourceManager/previewstandard.spr?_page=0&objectId=${standardId}`;

  updateStandardResource = () =>
    this.props.item.getIn(['standard_list', 'standard']).map(standard => {
      const gradeCount = standard.getIn(['standard_grades', 0, 'grade']).size;
      return (
        <div key={standard.getIn(['standard_id', 0])}>
          <div className="resources-state-modal__display-bottom">
            <div className="resources-state-modal__display-header-no-data">
              <a
                href={this.openDownloadableLink(standard.getIn(['standard_id', 0]))}
                target="_blank"
              >
                Download
              </a>
            </div>
            <div className="resources-state-modal__display-correlation resources-state-modal__body-contant-padding">
              {standard.getIn(['standard_name', 0])}
            </div>
            <div className="resources-state-modal__display-header-no-data resources-state-modal__body-contant-padding">
              <span>
                Grades{' '}
                {standard.getIn(['standard_grades', 0, 'grade']).map((grade, index) => {
                  if (gradeCount === index + 1) {
                    return grade;
                  }
                  return `${grade}, `;
                })}
              </span>
            </div>
          </div>
        </div>
      );
    });

  render() {
    return (
      <SAMModal
        isOpen={this.props.modalStatus}
        contentLabel="Resources Results"
        modalClassModifier="resources-state-modal"
      >
        <div className="resources-state-modal__header">Standards Results</div>
        <div className="resources-state-modal__title-text resources-state-modal__title-padding">
          Program:<span className="resources-state-modal__title-value resources-state-modal__title-value--program">
            {this.props.resourceName}
          </span>
        </div>
        <div className="resources-state-modal__title-text">
          State:<span className="resources-state-modal__title-value resources-state-modal__title-value--state">
            {this.props.itemGradeState.state}
          </span>
        </div>
        <div className="resources-state-modal__title-text">
          Grade:<span className="resources-state-modal__title-value resources-state-modal__title-value--grade">
            {this.props.itemGradeState.grade}
          </span>
        </div>
        <div className="resources-state-modal__title-description resources-state-modal__title-padding">
          Click on the link below to open a Correlations document.
        </div>
        <div className="resources-state-modal__display">
          <div className="resources-state-modal__display-header">
            <button className="resources-state-modal__display-header-no-data" />
            <button className="resources-state-modal__display-header-correlation">
              Correlations Document
            </button>
            <button className="resources-state-modal__display-header-no-data">Grade</button>
          </div>
          {!this.props.item.getIn(['standard_list', 'standard', 0]) && (
            <p className="resources-state-modal__display-no-response">
              No standards match the search criteria. Click close and check your search criteria.
            </p>
          )}
          {this.props.item.getIn(['standard_list', 'standard', 0]) && this.updateStandardResource()}
        </div>
        <SAMButton
          buttonClassModifier="resources-state-modal__footer-button"
          onClickHandler={this.handleCancel}
        >
          Close
        </SAMButton>
      </SAMModal>
    );
  }
}

ResourcesModalStateView.propTypes = {
  item: PropTypes.object.isRequired,
  updateResourcesModalStatus: PropTypes.func,
  modalStatus: PropTypes.bool.isRequired,
  itemGradeState: PropTypes.object.isRequired,
  resourceName: PropTypes.string.isRequired,
};

export default ResourcesModalStateView;
