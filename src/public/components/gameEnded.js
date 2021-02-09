const gameEnded = (player1, player2) => {
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
  const titleWinner = document.createElement('h2');
  titleWinner.classList.add('gameEnded__winner');
  titleWinner.innerText = 'Winner';
  wrap.appendChild(titleWinner);
  // Nombre del ganador
  const winner = document.createElement('h1');
  // Establecer nombre del ganador basándose en la propiedad winner del objeto player
  const gameState = JSON.parse(localStorage.getItem('gameState'));
  winner.innerText = (gameState.winner === 601) ? player1.name :  player2.name;
  wrap.appendChild(winner);
  // Contenedor de botones
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('gameEnded__btn-container');
  // Botones
  const btnPlayAgain = document.createElement('button');
  btnPlayAgain.classList.add('btn', 'btn-primary');
  btnPlayAgain.innerText = 'Play again';
  const btnRevenge = document.createElement('button');
  btnRevenge.classList.add('btn', 'btn-primary');
  btnRevenge.innerText = 'Revenge';
  const btnBackMainMenu = document.createElement('button');
  btnBackMainMenu.classList.add('btn', 'btn-phone');
  btnBackMainMenu.innerText = 'Go to main menu';

  buttonContainer.appendChild(btnPlayAgain);
  buttonContainer.appendChild(btnRevenge);
  buttonContainer.appendChild(btnBackMainMenu);

  wrap.appendChild(buttonContainer);

  return wrap;
}