// Code your JavaScript / jQuery solution here
$(document).ready(function() {
  attachListeners();
});

var win_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let turn = 0


function attachListeners() {
  $("td").on("click", doTurn)
  $('#clear').on('click', clearGame)
  $("#previous").on("click", previousGame)
  $("#save").on("click", saveGame)
}

function player() {
  return turn % 2 ? "O" : "X"
}

function updateState(square) {
  let token = player()
  $(square).append(token)
}

function setMessage(message) {
  $("#message").text(message)
}

function checkWinner() {
  let won = false
  let board = currentBoard()
  win_combinations.forEach(function(combo) {
    if(board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]] && board[combo[0]] != ""){
    won = true
    let token = player()
    setMessage(`Player ${token} Won!`)
  }
  })
  return won
}

function tiedGame() {
  let board = currentBoard()
  let tied = false
  if(!board.includes('')){
    tied = true
  }
  return tied
}

function doTurn(){
  let board = currentBoard()
  updateState(this)
  if(checkWinner()) {
    clearGame()
    turn = 0
  }else if(tiedGame()) {
    clearGame()
    setMessage("Tie game.")
  }else {
    ++turn
  }
}

function saveGame() {
  //sends a PATCH request to the "/games/:id" route
  board = currentBoard()
  $.post("/games", board)
}

function previousGame() {
  //adds those previous games as buttons in the DOM's div#games element
      $.get("/games")
}

function clearGame() {
    $('td').empty();
    turn = 0
}

function currentBoard() {
  let board = []
  $('td').text((index, position) => {
  board.push(position);
});
  return board
}
