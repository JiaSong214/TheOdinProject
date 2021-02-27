const overlay = document.querySelector('.overlay');
const playerNameForm = document.querySelector('.playerName-form');
const resultBox = document.querySelector('.result');
const restartBtn = document.querySelector('.result__restart');

//GameBoard Module
const GameBoard = (function() {
  let board = [['', '', ''], ['', '', ''], ['', '', '']];

  function checkEmpty(row, column) {
    return board[row][column] === '';
  }

  function markOnBoard(mark, row, column) {
    board[row][column] = mark;
  }

  return {
    board,
    checkEmpty,
    markOnBoard,
  };
})();


//DisplayController Module
const DisplayController = (function() {

  let player1Name = '';
  let player2Name = '';

  //get players name from input
  function getInput() {
    player1Input = document.querySelector('#player1-name').value;
    player2Input = document.querySelector('#player2-name').value;

    player1Name = player1Input !== '' ? `O: ${player1Input}` : 'O: Player 1';
    player2Name = player2Input !== '' ? `X: ${player2Input}` : 'X: Player 2';

    putPlayersName(player1Name);
    putPlayersName(player2Name);

    document.querySelector('#player1-name').value = '';
    document.querySelector('#player2-name').value = '';

    return {
      player1Name,
      player2Name
    }
  }

  function getPlayersName() {
    return { player1Name, player2Name };
  }


  //put players name on screen
  function putPlayersName(playerName) {
    const playersTag = document.querySelector('.players');
    const playerTag = document.createElement('div');
    playerTag.classList.add(`players__player`);
    playerTag.textContent = playerName;
    playersTag.appendChild(playerTag);
  }


  function createBoard() {
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        let square = document.createElement('div');
        square.classList.add('gameBoard__square');
        square.setAttribute('data-index', `${i}-${j}`);
        square.addEventListener('click', function(e) {
          setMark(e);
        });
        
        document.querySelector('.gameBoard').append(square);
      }
    }
  }

  let markNumber = 0;

  function resetMark() {
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        GameBoard.markOnBoard('',i,j)
      }
    }
  }

  //create mark when player click square
  function setMark(e) {
    const markIndex = e.target.dataset.index;
    const [row, column] = markIndex.split('-').slice(0,2);

    if(GameBoard.checkEmpty(row, column)) {
      // make a mark in board array
      const mark = Game.getCurrentPlayer();
      GameBoard.markOnBoard(mark, row, column);

      //mark on screen
      e.target.textContent = mark;

      markNumber ++;

      console.log(GameBoard.board)

      Game.checkWin();
      Game.swapPlayer();
    }else {
      return false;
    }
  }

  function getMarkNumber() {
    return markNumber;
  }

  function resetMarkNumber() {
    markNumber = 0;
  }

return {
  getInput,
  getPlayersName,
  createBoard,
  getMarkNumber,
  resetMark,
  resetMarkNumber
};

})();


//handle form to get players name
playerNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  playerNameForm.classList.remove('active');
  overlay.classList.remove('active');

  DisplayController.getInput();
  DisplayController.createBoard();
});



//Player factory
function Player(name, mark) {
  return { name, mark };
}


//Game Module
const Game = (function() {

  const players = [
    Player('player1', 'O'),
    Player('player2', 'X')
  ]

  //default player
  let currentPlayer = players[0];
  let result = [];

  function getCurrentPlayer() {
    return currentPlayer.mark;
  }

  function swapPlayer() {
    return currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  function checkWin() {
    for(let i=0; i<3; i++){
      //check rows
      if(GameBoard.board[i][0] !== '' &&
        GameBoard.board[i][0] === GameBoard.board[i][1] &&
        GameBoard.board[i][0] === GameBoard.board[i][2]) {
          result.push(GameBoard.board[i][0]);

          console.log('rows', result)
      }

      //check columns
      if(GameBoard.board[0][i] !== '' &&
        GameBoard.board[0][i] === GameBoard.board[1][i] &&
        GameBoard.board[0][i] === GameBoard.board[2][i]) {
          result.push(GameBoard.board[0][i]);

          console.log('column', result)
      }
    
    }

    //check diagonals1
    if(GameBoard.board[0][0] !== '' &&
    GameBoard.board[0][0] === GameBoard.board[1][1] &&
    GameBoard.board[0][0] === GameBoard.board[2][2]) {
      result.push(GameBoard.board[0][0]);

      console.log('diagonals1', result)
    }

    //check diagonals2
    if(GameBoard.board[0][2] !== '' &&
      GameBoard.board[0][2] === GameBoard.board[1][1] &&
      GameBoard.board[0][2] === GameBoard.board[2][0]) {
        result.push(GameBoard.board[0][2]);

        console.log('diagonals2', result)
    }

    let howManyGame = DisplayController.getMarkNumber();

    if(result[0] !== undefined || howManyGame === 9){
      printWinner(result);
    }

  }

  function checkPlayer() {
    if(DisplayController.getMarkNumber() % 2 === 1){
      swapPlayer()
    }
  }


  function printWinner(result) {
    const winnerTag = document.querySelector('.result__winner');
    let playersName = DisplayController.getPlayersName();

    if(result.length > 1){
      winnerTag.textContent = `It was Tie!`;
    }else{
      if(result[0] === 'O'){
        winnerTag.textContent = `${playersName.player1Name} won!`;
      }else if(result[0] === 'X'){
        winnerTag.textContent = `${playersName.player2Name} won!`;
      }
    }

    resultBox.classList.add('active');
    const gameBoard_overlay = document.querySelector('.gameBoard-overlay');
    gameBoard_overlay.classList.add('--active');
  }

  function resetWinner(){
    result = [];
  }


  return {
    getCurrentPlayer,
    swapPlayer,
    checkWin,
    checkPlayer,
    resetWinner
  };

})();

  //restart
  restartBtn.addEventListener('click', function() {
    //reset the array
    DisplayController.resetMark();
    DisplayController.resetMarkNumber();
    //reset the player
    Game.checkPlayer();
    
    Game.resetWinner();
    //remove game board overlay
    const gameBoard_overlay = document.querySelector('.gameBoard-overlay');
    gameBoard_overlay.classList.remove('--active')
    //empty game board
    document.querySelector('.gameBoard').textContent = '';
    document.querySelector('.players').textContent = '';
    //remove result text
    resultBox.classList.remove('active');
    //active player name modal
    overlay.classList.add('active');
    playerNameForm.classList.add('active');
  });
