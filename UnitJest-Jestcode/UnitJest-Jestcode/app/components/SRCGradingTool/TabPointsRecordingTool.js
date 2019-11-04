import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';
import SAMLinkButton from 'components/SAMLinkButton';

class TabPointsRecordingTool extends Component {
  columns = [
    {
      Header: () => <span onChange={this.handleChange}>Points Redeemed</span>,
      id: 'Points Redeemed',
      accessor: 'Points Redeemed',
      width: 210,
    },
    {
      Header: () => <span onChange={this.handleChange}>Date Redeemed</span>,
      id: 'Date Redeemed',
      accessor: 'Date Redeemed',
      width: 210,
    },
    {
      Header: () => <span onChange={this.handleChange}>Entered By</span>,
      id: 'Entered By',
      accessor: 'Entered By',
      width: 320,
    },
  ];
  render() {
    const { profileInfo, pointsData } = this.props;
    return (
      <div className="src-points__recording-tool-content">
        <span className="quiz-score__instruction-text">
          {profileInfo.first_name} {profileInfo.last_name}
        </span>
        <span className="points-score__students-stats">
          Points Earned to Date: {pointsData.earnedToDate}
        </span>
        <span className="points-score__students-stats">
          Points Used to Date: {pointsData.usedToDate}
        </span>
        <span className="points-score__students-stats">
          Points Available: {pointsData.available}
        </span>
        <div className="inline-text__points-summary">
          <span className="points-score__points-summary-text">Points Usage Summary</span>
          <button className="points-score__redeem-points-link">Redeem Points</button>
        </div>
        <SAMTable
          className="src-points-summary__table"
          columns={this.columns}
          hasCheckboxes={false}
        />
        <SAMLinkButton
          to="/roster"
          id="cancelAndReturn"
          buttonClassModifier="quiz-score__cancel-button"
        >
          Cancel & Return
        </SAMLinkButton>
        <div />
      </div>
    );
  }
}

TabPointsRecordingTool.propTypes = {
  profileInfo: PropTypes.object.isRequired,
  pointsData: PropTypes.object.isRequired,
};

export default TabPointsRecordingTool;
