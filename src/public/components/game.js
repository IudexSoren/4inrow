const game = (player1, player2) => {
  const wrap = document.createElement('div');
  wrap.classList.add('game__game-container', 'animate__animated', 'animate__fadeIn');
  // Añadir componente Score
  wrap.appendChild(score(player1, player2));
  // Contenedor del turno actual
  const turnContainer = document.createElement('div');
  turnContainer.classList.add('game__player-turn-container');
  // Jugador en turno - Inicia el jugador 1
  const player = document.createElement('h3');
  player.setAttribute('id', 'player-turn');
  player.innerText = player1.name;
  // Tiempo
  const timeContainer = document.createElement('div');
  const time = document.createElement('span');
  time.setAttribute('id', 'time');
  time.innerText = 30;
  const timeText = document.createElement('small');
  timeText.innerText = 'remaining time';
  // Barra decorativa
  const borderBottom = document.createElement('div');
  borderBottom.classList.add('game__border-bottom');

  // Tablero
  const board = document.createElement('div');
  board.classList.add('game__board');
  for (let i = 7; i >= 0; i--) {
    // Filas
    const boardRow = document.createElement('div');
    boardRow.classList.add('game__board-row');
    for (let j = 8; j >= 1; j--) {
      // Celdas
      const boardCell = document.createElement('div');
      boardCell.classList.add('game__board-cell');
      // Asignación de id de las celdas
      boardCell.setAttribute('cell', (i > 0) ? `${ i }${ j }` : `${ j }`);
      gameEvents(boardCell);
      boardRow.appendChild(boardCell);
    }
    board.appendChild(boardRow);
  }
  // Botón de rendición
  const surrenderBtn = document.createElement('button');
  surrenderBtn.classList.add('btn', 'btn-primary', 'btn-phone');
  surrenderBtn.innerText = 'Surrender';

  timeContainer.appendChild(time);
  timeContainer.appendChild(timeText);

  turnContainer.appendChild(player);
  turnContainer.appendChild(timeContainer);
  turnContainer.appendChild(borderBottom);

  wrap.appendChild(turnContainer);
  wrap.appendChild(board);
  wrap.appendChild(surrenderBtn);

  return wrap;
}

const gameEvents = (boardCell) => {
  boardCell.addEventListener('click', (e) => {
    const cell = e.target;
    cell.appendChild(setToken(Number(cell.attributes['cell'].value)));
  });
}

// Variable con el tiempo restante del turno actual
let time = undefined;

const setToken = (cellNumber) => {
  if (gameState.cells.includes(cellNumber)) {
    // Crear ficha del jugador
    const token = document.createElement('div');
    token.classList.add('game__token');
    if (gameState.turn === 601) {
      // Ficha del jugador rojo
      token.classList.add('game__token-red');
      // Cambio de turno al jugador azul
      setTurn(602);
    } else if (gameState.turn === 602) {
      // Ficha del jugador azul
      token.classList.add('game__token-blue');
      // Cambio de turno al jugador rojo
      setTurn(601);
    }
    // Se elimina la celda seleccionada
    removeCell(cellNumber, gameState);
    // Limpieza del contador de tiempo
    time = setTime();
    // Guardar estado del juego
    saveGameState(gameState);
    return token;
  }
}

const setTurn = (newTurn) => {
  // Cambio de turno
  gameState.turn = newTurn;
}

const removeCell = (cellNumber) => {
  // Se elimina la celda seleccionada
  gameState.cells = gameState.cells.filter(c => c !== cellNumber);
  if (cellNumber < 70) {
    // Agregar nueva celda disponible
    gameState.cells.push(cellNumber + 10);
  }
}

const setTime = () => {
  // Limpieza del contador de tiempo
  if (time) {
    clearInterval(time);
    // Reinicio del contador de tiempo
    document.getElementById('time').innerText = 30;
  }
  return setInterval(() => {
    let turnTime = Number(document.getElementById('time').innerText);
    if (turnTime > 0) {
      turnTime = turnTime - 1;
    } else {
      turnTime = 30;
    }
    document.getElementById('time').innerText = turnTime;
  }, 1000);
}