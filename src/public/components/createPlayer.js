const createPlayer = () => {
  const wrap = document.createElement('form');
  wrap.classList.add('createPlayer__container', 'animate__animated', 'animate__fadeIn');
  // Contenedor de datos de jugadores
  const inpContainerP1 = document.createElement('div');
  inpContainerP1.classList.add('createPlayer__input-container');
  const labelP1 = document.createElement('label');
  labelP1.innerText = 'Player 1 name';
  const inputP1 = document.createElement('input');
  inputP1.autocomplete = 'off';
  inputP1.name = 'p1';
  inpContainerP1.appendChild(labelP1);
  inpContainerP1.appendChild(inputP1);
  const inpContainerP2 = document.createElement('div');
  inpContainerP2.classList.add('createPlayer__input-container');
  const labelP2 = document.createElement('label');
  labelP2.innerText = 'Player 2 name';
  const inputP2 = document.createElement('input');
  inputP2.autocomplete = 'off';
  inputP2.name = 'p2';
  inpContainerP2.appendChild(labelP2);
  inpContainerP2.appendChild(inputP2);
  // Mensaje de error
  const errorMessageP1 = document.createElement('small');
  errorMessageP1.innerText = 'The name of the player is required';
  inpContainerP1.appendChild(errorMessageP1);
  const errorMessageP2 = document.createElement('small');
  errorMessageP2.innerText = 'The name of the player is required';
  inpContainerP2.appendChild(errorMessageP2);
  // Botón de confirmar
  const confirmBtn = document.createElement('button');
  confirmBtn.classList.add('btn', 'btn-primary');
  confirmBtn.type = 'submit';
  confirmBtn.innerText = 'Confirm';

  wrap.appendChild(inpContainerP1);
  wrap.appendChild(inpContainerP2);
  wrap.appendChild(confirmBtn);
  createPlayerEvents(wrap);

  return wrap;
}

// Variable con el estado general del juego
let gameState = null;

const createPlayerEvents = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validación de campos de texto
    e.target.children[0].children[2].classList.toggle('error', !inputValidation(e.target[0].value));
    e.target.children[1].children[2].classList.toggle('error', !inputValidation(e.target[1].value));

    if (document.querySelector('.error')) return;

    // Creación de jugadores
    const player1 = { uid: 601, name: e.target[0].value, score: 0, cells: [] }
    const player2 = { uid: 602, name: e.target[1].value, score: 0, cells: [] }
    // Se inicializa y crea el juego
    initGameState(player1, player2);
    gameState = getGameState();
    // Establecer componente game
    setComponent(game(player1, player2));
  });
}


