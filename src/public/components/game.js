const game = (player1, player2) => {
  gameState = getGameState();
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
  player.classList.add('red-turn');
  player.innerText = 'Red\'s turn';
  // Tiempo
  const timeContainer = document.createElement('div');
  const timeCounter = document.createElement('span');
  timeCounter.setAttribute('id', 'time');
  timeCounter.innerText = 30;

  const timeText = document.createElement('small');
  timeText.innerText = 'remaining time';
  // Barra decorativa
  const borderBottom = document.createElement('div');
  borderBottom.classList.add('game__border-bottom');

  // Tablero
  const board = document.createElement('div');
  board.classList.add('game__board');
  let boardRow = null;
  for (let i = 64; i > 0; i--) {
    // Filas
    if (i % 8 === 0) {
      boardRow = document.createElement('div');
      boardRow.classList.add('game__board-row');
      board.appendChild(boardRow);
    }
    // Celdas
    const boardCell = document.createElement('div');
    boardCell.classList.add('game__board-cell');
    // Número de celdas
    // Únicamente usado para pruebas
      const cellN = document.createElement('span');
      cellN.innerText = i;
      boardCell.appendChild(cellN);

    // Asignación de id de las celdas
    boardCell.setAttribute('cell', i);
    // Asignación del evento a cada celda
    cellsEvents(boardCell);
    boardRow.appendChild(boardCell);
  }
  // Botón de rendición
  const surrenderBtn = document.createElement('button');
  surrenderBtn.classList.add('btn', 'btn-phone');
  surrenderBtn.innerText = 'Surrender';
  gameEvents(surrenderBtn);

  timeContainer.appendChild(timeCounter);
  timeContainer.appendChild(timeText);

  turnContainer.appendChild(player);
  turnContainer.appendChild(timeContainer);
  turnContainer.appendChild(borderBottom);

  wrap.appendChild(turnContainer);
  wrap.appendChild(board);
  wrap.appendChild(surrenderBtn);
  setTimeout(() => {
    time = setTime();
  }, 500);
  return wrap;
}

const gameEvents = (btnSurrender) => {
  // Rendición del jugador en turno
  btnSurrender.addEventListener('click', () => {
    const surrendered = gameState.turn;
    if (surrendered === 601) {
      endGame(602);
    } else if(surrendered === 602) {
      endGame(601);
    }
  })
}

const cellsEvents = (boardCell) => {
  boardCell.addEventListener('click', (e) => {
    const cell = e.target,
    cellNumber = Number(cell.attributes['cell'].value);
    const token = setToken(cellNumber);
    if (token) {
      cell.appendChild(token);
      // Se elimina la celda seleccionada
      removeCell(cellNumber);
      // Limpieza del contador de tiempo
      time = setTime();
      // Guardar estado del juego
      saveGameState(gameState);
    }
  });
}

// Variable con el tiempo restante del turno actual
let time = undefined;

const setToken = (cellNumber) => {
  // Validación de celda disponible
  if (gameState.cells.includes(cellNumber)) {
    // Crear ficha del jugador
    const token = document.createElement('div');
    token.classList.add('game__token');
    if (gameState.turn === 601) {
      // Ficha del jugador ROJO
      token.classList.add('game__token-red');
      // Agregar celda a la lista de celdas del jugador ROJO
      gameState.players[0].cells.push(cellNumber);
      // Validación para conocer si el jugador ROJO ha ganado al tener más de 4 celdas marcadas
      if (gameState.players[0].cells.length > 3) {
        if (verticalLine(gameState.players[0].cells)  || horizontalLine(gameState.players[0].cells) || diagonalLineRight(gameState.players[0].cells) || diagonalLineLeft(gameState.players[0].cells)) {
          return endGame(601);
        };
      }
      // Cambio de turno al jugador AZUL
      setTurn(602);
    } else if (gameState.turn === 602) {
      // Ficha del jugador AZUL
      token.classList.add('game__token-blue');
      // Agregar celda a la lista de celdas del jugador AZUL
      gameState.players[1].cells.push(cellNumber);
      // Validación para conocer si el jugador AZUL ha ganado al tener más de 4 celdas marcadas
      if (gameState.players[1].cells.length > 3) {
        if (verticalLine(gameState.players[1].cells) || horizontalLine(gameState.players[1].cells) || diagonalLineRight(gameState.players[1].cells) || diagonalLineLeft(gameState.players[1].cells)) {
          return endGame(602);
        };
      }
      // Cambio de turno al jugador ROJO
      setTurn(601);
    }

    return token;
  }
}

// Terminar el juego
const endGame = (uidWinner) => {
  // Validación para conocer si existe un ganador
  if (uidWinner) {
    gameState.winner = gameState.players.find(player => {
      if (player.uid === uidWinner) {
        // Aumentar marcador del ganador
        player.score++;
        return player;
      }
    }).name;
    gameState.state = 'Winner';
  } else {
    gameState.state = 'Tie';
  }
  saveGameState(gameState);
  // Eliminar el contador de tiempo
  resetTime();
  // Mostrar el componente GameEnded
  setComponent(gameEnded(gameState.players[0], gameState.players[1]));
}

const setTurn = (newTurn) => {
  // Cambio de turno
  gameState.turn = newTurn;
  // Cambio de nombre al cambiar el turno
  const player = gameState.players.find(player => player.uid === newTurn);
  if (player.uid === 601) {
    document.getElementById('player-turn').innerText = 'Red\'s turn';
    document.getElementById('player-turn').classList.remove('blue-turn');
    document.getElementById('player-turn').classList.add('red-turn');
  } else if (player.uid === 602) {
    document.getElementById('player-turn').innerText = 'Blue\'s turn';
    document.getElementById('player-turn').classList.remove('red-turn');
    document.getElementById('player-turn').classList.add('blue-turn');
  }
}

const removeCell = (cellNumber) => {
  // Se elimina la celda seleccionada
  gameState.cells = gameState.cells.filter(cell => cell !== cellNumber);
  if (cellNumber < 57) {
    // Agregar nueva celda disponible
    gameState.cells.push(cellNumber + 8);
  }
  if (gameState.cells.length === 0) {
    endGame(null);
  }
}

const setTime = () => {
  // Limpieza del contador de tiempo
  resetTime();
  if (time) {
    // Reinicio del contador de tiempo
    document.getElementById('time').innerText = 30;
  }
  return setInterval(() => {
    let turnTime = Number(document.getElementById('time').innerText);
    if (turnTime > 0) {
      turnTime = turnTime - 1;
    } else {
      turnTime = 30;
      /* Cambio de turno en caso de que se cumpla la cuenta regresiva
       de los 30 segundos sin que un jugador haya puesto su ficha */
      if (gameState.turn === 601) {
        setTurn(602);
      } else if (gameState.turn === 602) {
        setTurn(601);
      }
    }
    document.getElementById('time').innerText = turnTime;
  }, 1000);
}

const resetTime = () => {
  // Limpieza del contador de tiempo
  if (time) {
    clearInterval(time);
  }
}