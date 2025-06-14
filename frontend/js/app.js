document.addEventListener('DOMContentLoaded', () => {
  const charactersContainer = document.getElementById('characters-container');
  const loadBtn = document.getElementById('load-btn');
  const searchInput = document.getElementById('search');
  const loader = document.getElementById('loader');
  const pagination = document.getElementById('pagination');
  
  let currentPage = 1;
  let totalPages = 1;
  let allCharacters = [];

  // Cargar personajes
  loadBtn.addEventListener('click', () => {
    currentPage = 1;
    fetchCharacters();
  });

  // Buscar personajes
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length > 2) {
      filterCharacters(searchTerm);
    } else if (searchTerm.length === 0 && allCharacters.length > 0) {
      displayCharacters(allCharacters);
    }
  });

  // Función para obtener personajes de la API
  async function fetchCharacters() {
    try {
      loader.classList.remove('hidden');
      charactersContainer.innerHTML = '';
      
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
      const data = await response.json();
      
      allCharacters = data.results;
      totalPages = data.info.pages;
      
      displayCharacters(allCharacters);
      setupPagination();
    } catch (error) {
      console.error('Error al obtener personajes:', error);
      charactersContainer.innerHTML = '<p class="error">Error al cargar los personajes. Intenta nuevamente.</p>';
    } finally {
      loader.classList.add('hidden');
    }
  }

  // Función para filtrar personajes
  function filterCharacters(searchTerm) {
    const filtered = allCharacters.filter(character => 
      character.name.toLowerCase().includes(searchTerm)
    );
    displayCharacters(filtered);
  }

  // Función para mostrar personajes
  function displayCharacters(characters) {
    charactersContainer.innerHTML = characters.map(character => `
      <div class="character-card">
        <img 
          src="${character.image}" 
          alt="${character.name}" 
          class="character-image"
          onerror="this.src='https://via.placeholder.com/300x200?text=Imagen+no+disponible'"
        >
        <div class="character-info">
          <h3 class="character-name">${character.name}</h3>
          <p class="character-species">Especie: ${character.species}</p>
          <p class="character-status">Estado: ${character.status}</p>
        </div>
      </div>
    `).join('');
  }

  // Función para configurar paginación
  function setupPagination() {
    pagination.innerHTML = '';
    
    if (currentPage > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.textContent = 'Anterior';
      prevBtn.addEventListener('click', () => {
        currentPage--;
        fetchCharacters();
      });
      pagination.appendChild(prevBtn);
    }
    
    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    pageInfo.style.margin = '0 10px';
    pageInfo.style.lineHeight = '35px';
    pagination.appendChild(pageInfo);
    
    if (currentPage < totalPages) {
      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Siguiente';
      nextBtn.addEventListener('click', () => {
        currentPage++;
        fetchCharacters();
      });
      pagination.appendChild(nextBtn);
    }
  }
});