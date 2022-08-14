import React from 'react';
import PropTypes from 'prop-types';

function PlanetCard({ planetSize, planetName, planetImage }) {
  return (
    <div data-testid="planet-card" className="planetCard">
      <p data-testid="planet-name">{planetName}</p>
      <img src={ planetImage } alt={ `Planeta ${planetName}` } width={ planetSize } />
    </div>);
}

PlanetCard.propTypes = {
  planetName: PropTypes.string.isRequired,
  planetImage: PropTypes.string.isRequired,
  planetSize: PropTypes.string.isRequired,
};

export default PlanetCard;
