let score = 0;
let currentPokemon = '';

async function fetchPokemon() {
  const id = Math.floor(Math.random() * 151) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const sprite = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
    currentPokemon = data.name;

    const img = document.getElementById('pokemon-img');
    img.src = sprite;
    img.style.filter = 'brightness(0)';

    document.getElementById('message').textContent = '';
    document.getElementById('guess').value = '';

  } catch (error) {
    console.error('Error fetching Pokémon:', error);
  }
}

function checkGuess() {
    const userGuess = document.getElementById('guess').value.trim().toLowerCase();
    const correctName = currentPokemon.toLowerCase();
  
    const img = document.getElementById('pokemon-img');
    const message = document.getElementById('message');
  
    if (userGuess === correctName) {
      message.textContent = '¡Correcto! Es ' + currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1) + '!';
      message.style.color = 'green';
      img.style.filter = 'brightness(1)';
  
      // 🎯 Aumenta puntos
      score++;
      document.getElementById('score').textContent = `Puntos: ${score}`;
  
    } else {
      message.textContent = '¡Incorrecto! Intenta de nuevo.';
      message.style.color = 'red';
    }
  }
  

// Eventos
document.getElementById('guess-button').addEventListener('click', checkGuess);
document.getElementById('new-button').addEventListener('click', fetchPokemon);

// Al cargar la página
fetchPokemon();
