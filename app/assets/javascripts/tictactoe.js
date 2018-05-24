// Code your JavaScript / jQuery solution here
$(document).ready(function() {
  attachListeners();
});

function attachListeners() {
  $("td").on("click", console.log(this))
  $('#clear').on('click', clearGame)
  $("#previous").on("click", previousGame)
  $("#save").on("click", saveGame)
}

let turn = 0

function player() {
  return turn % 2 ? "O" : "X"
}


function updateState() {
  let token = player()
  //adds the current player's token to the passed-in <td> element:
}

function setMessage(message) {
  //sets a provided string as the innerHTML of the div#message element
  $("#message").text(message)
}

function checkWinner() {
  //returns true or false
  //invokes the setMessage() function with the argument "Player X Won!"
  //invokes the setMessage() function with the argument "Player O Won!"
}

function doTurn(){
  //invokes the checkWinner() function
  //invokes the updateState() function
  //invokes the setMessage() function with the argument "Tie game." when the game is tied:
  //resets the board and the "turn" counter when a game is won
  ++turn
}

function saveGame() {
  //sends a PATCH request to the "/games/:id" route
      let board = []
      $("td").each (function(){
        board.push($("td").text())
      })
      $.post("/games", board)
}

function previousGame() {
  //adds those previous games as buttons in the DOM's div#games element
      $.get("/game")
}

function clearGame() {
    $('td').empty();
    turn = 0
}
