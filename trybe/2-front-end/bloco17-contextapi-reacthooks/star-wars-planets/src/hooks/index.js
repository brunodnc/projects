export async function fetchPlanets() {
  return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((raw) => raw.json());
}

export function filtrarPlanetas(total, filtro) {
  if (filtro.comparison === 'maior que') {
    return total.filter((planeta) => planeta[filtro.column] > Number(filtro.value));
  }
  if (filtro.comparison === 'menor que') {
    return total.filter((planeta) => planeta[filtro.column] < Number(filtro.value));
  }
  if (filtro.comparison === 'igual a') {
    return total.filter(
      (planeta) => Number(planeta[filtro.column]) === Number(filtro.value),
    );
  }
}
