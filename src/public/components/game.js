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
    setToken(e.target);
  });
}

const setToken = (cell) => {
  setTime();
  const gameState = getGameState();
  const cellNumber = Number(cell.attributes['cell'].value);
  if (gameState.cells.includes(cellNumber)) {
    const token = document.createElement('div');
    token.classList.add('game__token');
    if (gameState.turn === 601) {
      token.classList.add('game__token-red');
      gameState.turn = 602;
    } else if (gameState.turn === 602) {
      token.classList.add('game__token-blue');
      gameState.turn = 601;
    }
    cell.appendChild(token);
    gameState.cells = gameState.cells.filter(c => c !== cellNumber);
    if (cellNumber < 70) {
      gameState.cells.push(cellNumber + 10);
    }
    saveGameState(gameState);
  }
}

const setTime = () => {
  setInterval(() => {
    console.log('D');
    document.getElementById('time').innerText = Number(document.getElementById('time').innerText) - 1;
  }, 1000);
}