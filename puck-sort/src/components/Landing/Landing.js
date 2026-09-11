import React from 'react';
import { useTeamContext } from '../../context/TeamContext';

/**
 * Landing
 *
 * Full-screen hero shown when the app first loads. Introduces
 * PuckSort and leads into the Roster tab via a single CTA.
 */
const Landing = ({ onEnter }) => {
  const { players, setActiveTab } = useTeamContext();

  const handleEnter = () => {
    setActiveTab('roster');
    onEnter();
  };

  return (
    <div className="landingView">
      <div className="rinkBackdrop">
        <div className="rinkCircle rinkCircle--center"></div>
        <div className="rinkCircle rinkCircle--left"></div>
        <div className="rinkCircle rinkCircle--right"></div>
        <div className="rinkLine rinkLine--blue-left"></div>
        <div className="rinkLine rinkLine--blue-right"></div>
        <div className="rinkLine rinkLine--red"></div>
      </div>

      <div className="landingContent">
        <div className="landingBadge">
          <i className="fas fa-snowflake"></i> New Season, New Rosters
        </div>

        <div className="landingLogo">
          <i className="fas fa-hockey-puck landingLogoIcon"></i>
          <h1 className="landingTitle">PuckSort</h1>
        </div>

        <p className="landingTagline">
          Build balanced teams, every game night.
        </p>
        <p className="landingSubtext">
          PuckSort is a modern application designed to simplify hockey team management.
          Perfect for league organizers who need to create balanced teams each week and distribute rosters
          with minimal hassle.
        </p>

        <button className="landingCta" onClick={handleEnter}>
          <i className="fas fa-arrow-right-to-bracket"></i> Enter Roster
        </button>

        {players.length > 0 && (
          <p className="landingReturning">
            <i className="fas fa-users"></i> {players.length} player{players.length === 1 ? '' : 's'} already on your roster
          </p>
        )}
      </div>
    </div>
  );
};

export default Landing;
