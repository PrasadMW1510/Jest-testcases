import React from 'react';
import PropTypes from 'prop-types';
import btnM180 from 'images/gateway_assets/btn_M180.png';
import btnM180Y2 from 'images/gateway_assets/btn_M180Y2.png';
import btnfm from 'images/gateway_assets/btn_fm.png';
import btnR180NG from 'images/gateway_assets/btn_r180ng.png';
import btnS44 from 'images/gateway_assets/btn_s44.png';
import btniRead from 'images/gateway_assets/btniRead.png';
import rtngenabled from 'images/gateway_assets/rtng_enabled.jpg';

const SearchResultsEditCell = ({ rowData }) => {
  const cell = (
    <div className="search-results-table__result-td-cell">
      <button className="search-results-table__result-col-button">
        {String(rowData.communityId) === String('M180') &&
          String(rowData.assignment) === String('Simulation') && (
            <img className="inboxprogram-coursebutton" src={btnM180} alt="M180" />
          )}
        {String(rowData.communityId) === String('M180Y2') &&
          String(rowData.assignment) === String('Simulation') && (
            <img className="inboxprogram-coursebutton" src={btnM180Y2} alt="M180Y2" />
          )}
        {String(rowData.communityId) === String('M180') &&
          String(rowData.assignment) === String('mSkills Assessment') && (
            <img className="inboxprogram-coursebutton" src={btnfm} alt="mSkills Assessment" />
          )}
        {String(rowData.communityId) === String('M180Y2') &&
          String(rowData.assignment) === String('mSkills Assessment') && (
            <img className="inboxprogram-coursebutton" src={btnfm} alt="mSkills Assessment" />
          )}
        {String(rowData.communityId) === String('S44JR') && (
          <img className="inboxprogram-coursebutton" src={btniRead} alt="S44JR" />
        )}
        {String(rowData.communityId) === String('R180NG') && (
          <img className="inboxprogram-coursebutton" src={btnR180NG} alt="R180NG" />
        )}
        {String(rowData.communityId) === String('S44NG') && (
          <img className="inboxprogram-coursebutton" src={btnS44} alt="S44NG" />
        )}
        {String(rowData.communityId) === String('RTNG') && (
          <img className="inboxprogram-coursebutton" src={rtngenabled} alt="RTNG" />
        )}
      </button>
    </div>
  );

  return cell;
};

SearchResultsEditCell.propTypes = {
  rowData: PropTypes.object,
  handleStudent: PropTypes.func,
};

export default SearchResultsEditCell;
