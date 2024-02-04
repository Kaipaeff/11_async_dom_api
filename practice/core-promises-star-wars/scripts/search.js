// Методы, которые могут пригодиться:
// starWars.searchCharacters(query), 
// starWars.searchPlanets(query), 
// starWars.searchSpecies(query).
// starWars.getCharactersById(id), 
// starWars.getPlanetsById(id), 
// starWars.getSpeciesById(id)

// Тут ваш код.

const input = document.querySelector('.input');
const searchButton = document.querySelector('#byQueryBtn');
const resultContainer = document.querySelector('#result-container');
const content = document.querySelector('#content');
const loader = document.querySelector('.spinner');
const deleteButton = document.querySelector('.delete');


function isLoading(visible) {
  loader.style.visibility = visible ? 'visible' : 'hidden';
}

function resultContainerVisible(visible) {
  resultContainer.style.visibility = visible ? 'visible' : 'hidden';
}

function updateResult(data) {
  content.innerHTML = '';

  data.results.forEach(character => {
    const characterElement = document.createElement('p');
    characterElement.textContent = character.name;
    content.appendChild(characterElement);
    resultContainerVisible(true);
  });
}


async function performSearch() {
  const query = input.value;

  try {
    isLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const searchResult = await starWars.searchCharacters(query);
    updateResult(searchResult);
  } catch (error) {
    console.error('Error searching:', error);
  } finally {
    isLoading(false);
  }
}


function handleSearch(event) {
  if (input.value) {
    if (
      (event.type === 'click' && event.target === searchButton) ||
      (event.type === 'keydown' && event.key === 'Enter')) {
      performSearch();
    }
  }
}

searchButton.addEventListener('click', handleSearch);
document.addEventListener('keydown', handleSearch);


function handleDelete() {
  content.innerHTML = '';
  resultContainerVisible(false);
}

deleteButton.addEventListener('click', handleDelete)
