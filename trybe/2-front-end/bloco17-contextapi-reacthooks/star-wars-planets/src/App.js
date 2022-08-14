import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchPlanets, filtrarPlanetas } from './hooks';

function App() {
  const [planets, setPlanets] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );
  const [filter, setFilter] = useState([]);
  const [fields, setFields] = useState(['population',
    'rotation_period',
    'orbital_period',
    'diameter',
    'surface_water']);
  useEffect(() => {
    fetchPlanets().then((data) => {
      setPlanets(data);
      setFilteredPlanets(data.results);
    });
  }, []);
  useEffect(() => {
    if (filter === []) {
      fetchPlanets().then((data) => {
        setPlanets(data);
        setFilteredPlanets(data.results);
      });
      setFields(['population',
        'rotation_period',
        'orbital_period',
        'diameter',
        'surface_water']);
    } else {
      filter.forEach( // filtra o fields com base em cada coluna que ja foi usada
        (filtro) => setFields((prev) => prev.filter((item) => item !== filtro.column)),
      );
      const planetsAfterFilter = filter.reduce(filtrarPlanetas, planets.results);
      setFilteredPlanets(planetsAfterFilter);
    }
  }, [filter]);
  useEffect(() => {
    setFilterByNumericValues(
      { column: fields[0], comparison: 'maior que', value: 0 },
    );
  }, [fields]);
  return (
    <main>
      <header>
        <h1>Filtrar tabela: </h1>
        <input
          data-testid="name-filter"
          onChange={ (e) => setFilterInput(e.target.value) }
          placeholder="text filter"
        />
        <br />
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          onChange={ (e) => setFilterByNumericValues(
            { ...filterByNumericValues, column: e.target.value },
          ) }
        >
          {fields.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => setFilterByNumericValues(
            { ...filterByNumericValues, comparison: e.target.value },
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          onChange={ (e) => setFilterByNumericValues(
            { ...filterByNumericValues, value: e.target.value },
          ) }
          value={ filterByNumericValues.value }
        />

        <button
          type="submit"
          data-testid="button-filter"
          onClick={ () => {
            setFilter([...filter, filterByNumericValues]);
          } }
        >
          Add Filter
        </button>
        {filter.map((filtro, i) => (
          <div key={ i } data-testid="filter">
            <p>{`${filtro.column} ${filtro.comparison} ${filtro.value}`}</p>
            <button
              type="button"
              onClick={ () => setFilter((prev) => prev
                .filter((item) => item !== filtro)) }
            >
              X
            </button>
          </div>
        )) }
        {filter && (
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => setFilter([]) }
          >
            Remover filtragem
          </button>
        )}
      </header>
      <table>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
        {filteredPlanets ? filteredPlanets
          .filter((planet) => planet.name.includes(filterInput))
          .map((planet) => (
            <tr key={ planet.url }>
              <th>{planet.name}</th>
              <th>{planet.rotation_period}</th>
              <th>{planet.orbital_period}</th>
              <th>{planet.diameter}</th>
              <th>{planet.climate}</th>
              <th>{planet.gravity}</th>
              <th>{planet.terrain}</th>
              <th>{planet.surface_water}</th>
              <th>{planet.population}</th>
              <th>{planet.films}</th>
              <th>{planet.created}</th>
              <th>{planet.edited}</th>
              <th>{planet.url}</th>
            </tr>
          )) : null}
      </table>
    </main>
  );
}

export default App;
