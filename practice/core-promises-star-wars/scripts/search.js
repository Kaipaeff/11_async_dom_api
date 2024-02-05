const selectName = document.querySelector('.select-name-input');
const selectId = document.querySelector('.select-id-input');

const nameInput = document.querySelector('.name-input');
const idInput = document.querySelector('.id-input');

const searchByNameBtn = document.querySelector('#byQueryBtn');
const searchByIdBtn = document.querySelector('#byIdBtn');
const deleteButton = document.querySelector('.delete');

const resultContainer = document.querySelector('#result-container');
const headerTitle = document.querySelector('.message-header-title');
const content = document.querySelector('#content');

const loader = document.querySelector('.spinner');


function isLoading(visible) {
  loader.style.visibility = visible ? 'visible' : 'hidden';
}

function resultContainerVisible(visible) {
  resultContainer.style.visibility = visible ? 'visible' : 'hidden';
}


async function updateResult(data) {
  content.innerHTML = '';

  const selectedOption = selectId.options[selectId.selectedIndex].value;

  if (Array.isArray(data.results) && !data.results.length) {
    content.innerText = 'Object not found in the selected section';
    resultContainerVisible(true);
    return;
  }

  if (!Array.isArray(data.results)) {
    data.results = [data];
  }

  let characterInfo = '';

  for (const character of data.results) {
    if (selectedOption === 'films') {
      characterInfo += `<p class="message-body-title">title: ${character.title}</p>`;
      characterInfo += `<p class="message-body-subtitle">episode: ${character.episode_id}</p>`;
      characterInfo += `<p class="message-body-info">annotation: ${character.opening_crawl}</p>`;
      characterInfo += `<p class="message-body-producer">producer: ${character.producer}</p>`;
      characterInfo += `<p class="message-body-director">director: ${character.director}</p>`;
      characterInfo += `<p class="message-body-release">release: ${character.release_date}</p>`;
    } else {
      if (character.homeworld) {
        try {
          const planetData = await starWars.getPlanetsById(character.homeworld.split('/').filter(Boolean).pop());
          character.homeworld = planetData.name;
        } catch (error) {
          console.error('Error fetching planet data:', error);
        }
      }

      let count = 0;
      for (const key in character) {
        if (count >= 10) break;
        characterInfo += `<p>${key}: ${character[key]}</p>`;
        count++;
      }
    }
    headerTitle.textContent = character.title || character.name || 'Primary';
  }
  content.innerHTML = characterInfo;
  resultContainerVisible(true);
}


async function searchByName() {
  const query = nameInput.value;
  const selectedOption = selectName.options[selectName.selectedIndex].value;

  try {
    isLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    let searchByNameResult;
    switch (selectedOption) {
      case 'people':
        searchByNameResult = await starWars.searchCharacters(query);
        break;
      case 'planets':
        searchByNameResult = await starWars.searchPlanets(query);
        break;
      case 'species':
        searchByNameResult = await starWars.searchSpecies(query);
        break;
    }

    updateResult(searchByNameResult);
    // console.log('searchByNameResult:', searchByNameResult);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading(false);
  }
}


async function searchById() {
  const id = idInput.value;
  const selectedOption = selectId.options[selectId.selectedIndex].value;

  try {
    isLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    let searchByIdResult;
    switch (selectedOption) {
      case 'people':
        searchByIdResult = await starWars.getCharactersById(id);
        break;
      case 'planets':
        searchByIdResult = await starWars.getPlanetsById(id);
        break;
      case 'species':
        searchByIdResult = await starWars.getSpeciesById(id);
        break;
      case 'films':
        searchByIdResult = await starWars.getFilmsById(id);
        break;
    }

    if (!Array.isArray(searchByIdResult) && Object.prototype.toString.call(searchByIdResult) === '[object Object]') {
      searchByIdResult.results = [searchByIdResult][0];
    }

    updateResult(searchByIdResult);
    // console.log('searchByIdResult:', searchByIdResult);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading(false);
  }
}


function handleSearch(event) {
  if ((event.type === 'click' && (event.target === searchByNameBtn || event.target === searchByIdBtn)) ||
    (event.type === 'keydown' && event.key === 'Enter')) {
    if (event.target === searchByNameBtn && nameInput.value || event.type === 'keydown' && event.key === 'Enter' && nameInput.value) {
      searchByName();
    } else if (event.target === searchByIdBtn && idInput.value || event.type === 'keydown' && event.key === 'Enter' && idInput.value) {
      searchById();
    }
  }
}

document.addEventListener('click', handleSearch);
document.addEventListener('keydown', handleSearch);

deleteButton.addEventListener('click', () => {
  content.innerHTML = '';
  resultContainerVisible(false);
})
