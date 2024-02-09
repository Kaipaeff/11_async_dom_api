const starWars = {

  // --- Search Methods ---

  searchCharacters: (query) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.dev/api/people/?search=${query}`)
        .then(response => response.json())
        .then(characters => resolve(characters))
        .catch(err => console.log('searchCharacters error: ', err));
    });
  },

  searchPlanets: (query) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.dev/api/planets/?search=${query}`)
        .then(response => response.json())
        .then(planets => resolve(planets))
        .catch(err => console.log('searchPlanets error: ', err));
    });
  },

  searchSpecies: (query) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.dev/api/species/?search=${query}`)
        .then(response => response.json())
        .then(species => resolve(species))
        .catch(err => console.log('searchSpecies error: ', err));
    });
  },

  // --- Get By Id Methods ---

  getCharactersById: async (id) => (await (
    await fetch(`https://swapi.dev/api/people/${id}`)
  ).json()),

  getPlanetsById: async (id) => (await (
    await fetch(`https://swapi.dev/api/planets/${id}`)
  ).json()),

  getSpeciesById: async (id) => (await (
    await fetch(`https://swapi.dev/api/species/${id}`)
  ).json()),

  getFilmsById: async (id) => (await (
    await fetch(`https://swapi.dev/api/films/${id}`)
  ).json()),
}
