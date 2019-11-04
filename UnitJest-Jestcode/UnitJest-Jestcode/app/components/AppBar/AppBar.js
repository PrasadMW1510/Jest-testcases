import React from 'react';
import './AppBar.scss';
import ProgramAvailableBarContainer from '../../containers/ProgramAvailableBarContainer/ProgramAvailableBarContainer';
import AboutSamLinkContainer from '../../containers/AboutSamLinkContainer/AboutSamLinkContainer';

function AppBar() {
  return (
    <div className="app-bar">
      <ProgramAvailableBarContainer />
      <AboutSamLinkContainer />
    </div>
  );
}

export default AppBar;
