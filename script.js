const grid = document.getElementById('pokedex-grid');
const input = document.getElementById('guess-input');
const scoreDisplay = document.getElementById('score');

let pokemonList = []; // Stores {id, name, image, found: false}
let foundCount = 0;

async function initGame() {
    // 1. Fetch names and images for the first 151
    // Using a loop or a limit query to the PokéAPI
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await res.json();

    pokemonList = data.results.map((p, index) => ({
        id: index + 1,
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        found: false
    }));

    // 2. Create the empty slots in the UI
    renderGrid();
}

function renderGrid() {
    grid.innerHTML = pokemonList.map(p => `
        <div class="pokemon-slot" id="slot-${p.id}">
            <span class="dex-number">#${p.id}</span>
            <img src="${p.image}" class="hidden" id="img-${p.id}">
            <p class="name-label" id="name-${p.id}">???</p>
        </div>
    `).join('');
}

// 3. The Input Listener
input.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();
    
    // Check if the input matches any unfound Pokemon
    const match = pokemonList.find(p => p.name === value && !p.found);

    if (match) {
        match.found = true;
        foundCount++;
        
        // Update UI
        document.getElementById(`img-${match.id}`).classList.remove('hidden');
        document.getElementById(`name-${match.id}`).innerText = match.name.toUpperCase();
        document.getElementById(`slot-${match.id}`).classList.add('found');
        
        // Reset input and update score
        e.target.value = '';
        scoreDisplay.innerText = foundCount;
    }
});

initGame();
