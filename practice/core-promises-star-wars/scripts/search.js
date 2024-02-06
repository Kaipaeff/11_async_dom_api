const selectQuery = document.querySelector('.select-query-input');
const selectId = document.querySelector('.select-id-input');

const queryInput = document.querySelector('.query-input');
const idInput = document.querySelector('.id-input');

const searchByQueryBtn = document.querySelector('#byQueryBtn');
const searchByIdBtn = document.querySelector('#byIdBtn');

const queryInputClearBtn = document.querySelector('#queryInputClearBtn');
const idInputClearBtn = document.querySelector('#idInputClearBtn');

const resultContainer = document.querySelector('#result-container');
const headerTitle = document.querySelector('.message-header-title');
const content = document.querySelector('#content');
const resultContainerRemoveBtn = document.querySelector('#remove-container');

const loader = document.querySelector('.spinner');


function isLoading(visible) {
  loader.style.visibility = visible ? 'visible' : 'hidden';
}

function resultContainerVisible(visible) {
  resultContainer.style.visibility = visible ? 'visible' : 'hidden';
}


async function updateResult(data) {
  content.innerHTML = '';
  if (!Array.isArray(data.results)) {
    data.results = [data.results];
  } else if (!data.results.length) {
    content.innerText = 'Object not found in the selected section';
    resultContainerVisible(true);
    headerTitle.textContent = 'Not found';
    return;
  }

  let characterInfo = '';
  const selectedIdOption = selectId.options[selectId.selectedIndex].value;
  for (const character of data.results) {
    if (selectedIdOption === 'films') {
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
        if (key === 'name') continue;
        characterInfo += `<p>${key}: ${character[key]}</p>`;
        count++;
      }
    }
    headerTitle.textContent = character.title || character.name || 'Primary';
  }
  content.innerHTML = characterInfo;
  resultContainerVisible(true);
}


async function searchByQuery() {
  try {
    isLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    let searchByQueryResult;
    const selectedQueryOption = selectQuery.options[selectQuery.selectedIndex].value;
    const query = queryInput.value;
    switch (selectedQueryOption) {
      case 'people':
        searchByQueryResult = await starWars.searchCharacters(query);
        break;
      case 'planets':
        searchByQueryResult = await starWars.searchPlanets(query);
        break;
      case 'species':
        searchByQueryResult = await starWars.searchSpecies(query);
        break;
    }
    updateResult(searchByQueryResult);
    // console.log('searchByQueryResult:', searchByQueryResult);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading(false);
  }
}


async function searchById() {
  try {
    isLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    let searchByIdResult;
    const selectedIdOption = selectId.options[selectId.selectedIndex].value;
    const id = idInput.value;
    switch (selectedIdOption) {
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
    if (Object.prototype.toString.call(searchByIdResult) === '[object Object]') {
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
  if ((event.type === 'click' && (event.target === searchByQueryBtn || event.target === searchByIdBtn)) ||
    (event.type === 'keydown' && event.key === 'Enter')) {
    if (event.target === searchByQueryBtn && queryInput.value || event.type === 'keydown' && event.key === 'Enter' && queryInput.value) {
      searchByQuery();
    } else if (event.target === searchByIdBtn && idInput.value || event.type === 'keydown' && event.key === 'Enter' && idInput.value) {
      searchById();
    }
  } else if (event.type === 'click' && event.target === resultContainerRemoveBtn) {
    resultContainerVisible(false);
  } else if (event.type === 'click' && event.target === queryInputClearBtn && queryInput.value) {
    queryInput.value = '';
    resultContainerVisible(false);
  } else if (event.type === 'click' && event.target === idInputClearBtn && idInput.value) {
    idInput.value = '';
    resultContainerVisible(false);
  }
}

document.addEventListener('click', handleSearch);
document.addEventListener('keydown', handleSearch);
