let currentPokemon = null;

async function loadNewPokemon() {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    
    currentPokemon = data;
    const imgElement = document.getElementById('pokemon-image');
    imgElement.src = data.sprites.other['official-artwork'].front_default;
    imgElement.classList.remove('revealed');
}

function checkGuess() {
    const userGuess = document.getElementById('guess-input').value.toLowerCase();
    if (userGuess === currentPokemon.name) {
        document.getElementById('message').innerText = "Correct! It's " + currentPokemon.name.toUpperCase();
        document.getElementById('pokemon-image').classList.add('revealed');
    } else {
        document.getElementById('message').innerText = "Try again!";
    }
}

loadNewPokemon();
