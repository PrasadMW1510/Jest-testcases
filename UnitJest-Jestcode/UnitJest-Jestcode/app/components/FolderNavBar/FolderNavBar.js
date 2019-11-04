/**
 *
 * FolderNavBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import PortfolioFolder from 'images/portfolio-folder.png';
import BooksFolder from 'images/books-folder.png';
import ResourcesFolder from 'images/resources-folder.png';
import ReportsFolder from 'images/reports-folder.png';
import RosterFolder from 'images/roster-folder.png';
import FolderButton from 'components/FolderButton';
import { USER_TYPE } from 'containers/App/constants';
import { ITS_PDF_LINK } from 'utils/externalLinkConstants';

import './FolderNavBar.scss';

function FolderNavBar(props) {
  const onITSButtonClick = e => {
    e.preventDefault();
    window.open(ITS_PDF_LINK);
  };

  return (
    <div className="folder-navbar">
      <span>
        <FolderButton link="/roster" imgSrc={RosterFolder} folderTitle="Roster" />
        <FolderButton link="/reports" imgSrc={ReportsFolder} folderTitle="Reports" />
        <FolderButton link="/resources" imgSrc={ResourcesFolder} folderTitle="Resources" />
        <FolderButton link="/books" imgSrc={BooksFolder} folderTitle="Books" />
        <FolderButton link="/" imgSrc={PortfolioFolder} folderTitle="Portfolio" />
      </span>
      {props.profileUserType === USER_TYPE.Teacher && (
        <button className="folder-navbar__its-link" onClick={onITSButtonClick}>
          Click here to learn how to access and use the READ180 Interactive Teacher System (ITS).
        </button>
      )}
    </div>
  );
}

FolderButton.defaultProps = {
  profileUserType: '',
};

FolderNavBar.propTypes = {
  profileUserType: PropTypes.string,
};

export default FolderNavBar;
