import React from 'react';
import PropTypes from 'prop-types';

function MissionCard({ name, year, country, destination }) {
  return (
    <div className="misscard" data-testid="mission-card">
      <p data-testid="mission-name">
        {`Missão: ${name}`}
      </p>
      <p data-testid="mission-year">{`Ano: ${year}`}</p>
      <p data-testid="mission-country">{`País de origem: ${country}`}</p>
      <p data-testid="mission-destination">{`Destino: ${destination}`}</p>
    </div>);
}

MissionCard.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};
export default MissionCard;
