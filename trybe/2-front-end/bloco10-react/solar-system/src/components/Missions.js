import React from 'react';
import MissionCard from './MissionCard';
import Title from './Title';
import missions from '../data/missions';

function Missions() {
  return (
    <div data-testid="missions">
      <Title headline="Missões" />
      <div className="flexbox">
        {missions.map(
          (miss) => (<MissionCard
            name={ miss.name }
            year={ miss.year }
            country={ miss.country }
            destination={ miss.destination }
            key={ miss.name }
          />),
        )}

      </div>
    </div>);
}

export default Missions;
