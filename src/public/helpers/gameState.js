// Inicializar estado del juego
const initGameState = (player1, player2) => {
  // Celdas disponibles, inicialmente hasta el número 8
  const cells = [];
  for (let i = 1; i <= 8; i++) {
    cells.push(i);
  }
  const gameState = {
    players: [player1, player2],
    turn: player1.uid,
    winner: undefined,
    cells: cells
  }
  // Guardar el estado del juego
  saveGameState(gameState);
}

// Guardar el estado del juego
const saveGameState = (state) => {
  localStorage.setItem('gameState', JSON.stringify(state));
}

// Obtener el estado del juego
const getGameState = () => {
  return JSON.parse(localStorage.getItem('gameState'));
}