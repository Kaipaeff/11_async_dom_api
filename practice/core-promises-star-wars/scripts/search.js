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
const select = document.querySelector('.select');



function isLoading(visible) {
  loader.style.visibility = visible ? 'visible' : 'hidden';
}

function resultContainerVisible(visible) {
  resultContainer.style.visibility = visible ? 'visible' : 'hidden';
}


async function updateResult(data) {
  content.innerHTML = '';

  if (!data.results.length) {
    content.innerText = 'Запрашиваемый объект отсутствует в указанном разделе';
    resultContainerVisible(true);
    return;
  }

  for (const character of data.results) {
    if (character.homeworld) {
      try {
        const planetData = await starWars.getPlanetsById(character.homeworld.split('/').slice(-2, -1).pop());
        character.homeworld = planetData.name;
      } catch (error) {
        console.error('Error fetching planet data:', error);
      }
    }

    let characterInfo = '';
    for (const key in character) {
      characterInfo += `<p>${key}: ${character[key]}</p>`;
    }
    content.innerHTML = characterInfo;
  }
  resultContainerVisible(true);
}


async function performSearch() {
  const query = input.value;
  const selectedOption = select.options[select.selectedIndex].value;

  try {
    isLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    let searchResult;
    switch (selectedOption) {
      case 'people':
        searchResult = await starWars.searchCharacters(query);
        break;
      case 'planets':
        searchResult = await starWars.searchPlanets(query);
        break;
      case 'species':
        searchResult = await starWars.searchSpecies(query);
        break;
    }

    updateResult(searchResult);
    console.log('searchResult:', searchResult);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading(false);
  }
}


function handleSearch(event) {
  if (input.value &&
    ((event.type === 'click' && event.target === searchButton) ||
      (event.type === 'keydown' && event.key === 'Enter'))) {
    performSearch();
  }
}

searchButton.addEventListener('click', handleSearch);
document.addEventListener('keydown', handleSearch);

deleteButton.addEventListener('click', () => {
  content.innerHTML = '';
  resultContainerVisible(false);
})
