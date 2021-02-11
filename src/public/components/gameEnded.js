const gameEnded = (player1, player2) => {
  gameState = getGameState();
  const wrap = document.createElement('div');
  wrap.classList.add('gameEnded__ended-container', 'animate__animated', 'animate__fadeIn');
  // Título score
  const titleScore = document.createElement('h2');
  titleScore.classList.add('gameEnded__score');
  titleScore.innerText = 'Score';
  wrap.appendChild(titleScore);
  // Componente Score
  wrap.appendChild(score(player1, player2));
  // Título winner
  const titleGameState = document.createElement('h2');
  titleGameState.classList.add('gameEnded__winner');
  titleGameState.innerText = gameState.state;
  wrap.appendChild(titleGameState);
  // Nombre del ganador
  const winner = document.createElement('h1');
  // Establecer nombre del ganador basándose en la propiedad winner del objeto player
  winner.innerText = gameState.winner || '';
  wrap.appendChild(winner);
  // Contenedor de botones
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('gameEnded__btn-container');
  // Botones
  const btnPlayAgain = document.createElement('button');
  btnPlayAgain.classList.add('btn', 'btn-primary');
  btnPlayAgain.innerText = 'Play again';
  const btnBackMainMenu = document.createElement('button');
  btnBackMainMenu.classList.add('btn', 'btn-phone');
  btnBackMainMenu.innerText = 'Go to main menu';

  gameEndedEvents(btnPlayAgain, btnBackMainMenu);

  buttonContainer.appendChild(btnPlayAgain);
  buttonContainer.appendChild(btnBackMainMenu);

  wrap.appendChild(buttonContainer);

  return wrap;
}

const gameEndedEvents = (btnPlayAgain, btnBackMainMenu) => {
  btnPlayAgain.addEventListener('click', () => {
    initGameState(gameState.players[0], gameState.players[1]);
    setComponent(game(gameState.players[0], gameState.players[1]));
  });

  btnBackMainMenu.addEventListener('click', () => {
    setComponent(mainMenu());
  })
}