var state = {
    players: {
        nameX: "Player X",
        nameO: "Player X",
        currentPlayer: "X"
    },
    status: "Player X's turn",
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
    totalMoves: 0,
    score: {
        playerX: {
            won: false,
            row1: 0,
            row2: 0,
            row3: 0,
            col1: 0,
            col2: 0,
            col3: 0,
            dia1: 0,
            dia2: 0
        },
        playerO: {
            won: false,
            row1: 0,
            row2: 0,
            row3: 0,
            col1: 0,
            col2: 0,
            col3: 0,
            dia1: 0,
            dia2: 0
        },

    }
}
/******************************* */
//helpful variables
/******************************* */
var xTurn = `Player X's turn`;
var oTurn = `Player O's turn`;
var statusOnPage = document.getElementsByClassName("status")[0];
var cells = document.getElementsByClassName("cell");


/******************************* */
//helper functions
/******************************* */

function getPlayerNameFromGeneric (player) {
    var designator = player[player.length - 1];
    if (designator === "X") {
        return `${state.players.nameX}`
    }
    if (designator === "O") {
        return `${state.players.nameO}`
    }
};

//template for updating the status HTML
function statusHTMLTemplate (newStatus) {
   return `<h3>Status</h3>
          <p>${newStatus}</p>`;
};

//changes player state from current player
function togglePlayer () {
    if (state.players.currentPlayer === "X") {
        state.players.currentPlayer = "O";
    } else {
        state.players.currentPlayer = "X";
    }
    updatePlayerStatus();
}

//updates the paragraph in the status div with the provided text
function updateStatusOnPage (text) {
    statusOnPage.innerHTML = statusHTMLTemplate(text);
}

//updates state's status
function updatePlayerStatus () {
    if (state.status === xTurn){
        state.status = oTurn;
        updateStatusOnPage(`${state.players.nameO}'s turn`);
    } else if (state.status === oTurn) {
        state.status = xTurn;
        updateStatusOnPage(`${state.players.nameX}'s turn`);
    }
   
}

//handles all the state changes which need to occur on a win
function updateStatusOnWin (winner) {
    setTimeout(()=>{
        updateStatusOnPage(`${winner} is the winner!`);
    }, 0);
    
}

//checks for a draw when 8 moves have been made
function checkForDraw () {
   if (state.totalMoves === 8) {
       setTimeout(()=>{
           if (state.score.playerO.won === false && state.score.playerX.won === false) {
               alert("A draw");
               updateStatusOnPage("It was a draw");
           }
       }, 0);

   }   
}

//need to input 2nd arg as either playerX or playerO
function updateScore (id, player) {
    checkForDraw();

    var rowId = "row" + id[0];
    var colId = "col" + id[2];
    state.score[player][rowId]++;
    state.score[player][colId]++;

    if (state.score[player][rowId] === 3 || state.score[player][colId] === 3) {
        announceWinner(player, getPlayerNameFromGeneric(player));
        return;
    }
      if (id[0] === id[2]) {
        state.score[player]["dia1"]++;
          if (state.score[player]["dia1"] === 3) {
              announceWinner(player, getPlayerNameFromGeneric(player));
              return;
          }
      }

    if (id[0] === "2" && id[2] === "2") {
        state.score[player]["dia2"]++;
        if (state.score[player]["dia2"] === 3) {
            announceWinner(player, getPlayerNameFromGeneric(player));
            return;
        }
    }

      if  ( (id[0] === "3" && id[2]=== "1") || (id[0] === "1" && id[2] === "3") ) {
          state.score[player]["dia2"]++;
          if (state.score[player]["dia2"] === 3) {
              announceWinner(player, getPlayerNameFromGeneric(player));
              return;
          }
      }
 
}

//updates the page and gives an alert of the winner
function announceWinner (player, name) {
    alert(`${name} won!`);
    state.score[player].won = true;
    updateStatusOnWin(name);
}

//changes the visual representation 
function toggleCell (element) {
    if (element.innerHTML === " ") {
        if (state.players.currentPlayer === "X") {
            element.innerHTML = "X";
            updateScore(element.id, "playerX");
            togglePlayer();
        } else {
            element.innerHTML = "O";
            updateScore(element.id, "playerO");
            togglePlayer();
        }
        state.totalMoves++;  
    } else {
        alert("That space has already been played");
    }
   
}

//handles all the changes which need to occur when resetting the board
function resetBoard () {
    state.score = {
        playerX: {
            won: false,
            row1: 0,
            row2: 0,
            row3: 0,
            col1: 0,
            col2: 0,
            col3: 0,
            dia1: 0,
            dia2: 0
        },
        playerO: {
            won: false,
            row1: 0,
            row2: 0,
            row3: 0,      
            col1: 0,
            col2: 0,
            col3: 0,
            dia1: 0,
            dia2: 0
        },
    }
    state.status = "Player X's turn";
    state.players.currentPlayer = "X";
    state.totalMoves=0;
    updateStatusOnPage(`${state.players.nameX} goes first`);
    Array.prototype.forEach.call(cells, (el) => {
        el.innerHTML = " ";
    })

}


/********************************* */

/******************************* */
//function calls
/******************************* */

Array.prototype.forEach.call(cells, (el)=>{
    el.addEventListener("click", ()=>{
       toggleCell(el);
    })
});

document.getElementById("reset").addEventListener("click", () => {
    resetBoard();
});

document.getElementById("player-info").addEventListener("submit", (e) => {
    e.preventDefault();
    state.players.nameX = document.getElementById("player-one").value;
    state.players.nameO = document.getElementById("player-two").value;
    document.getElementById("form").innerHTML = `<h3>Players</h3>
    <p>Player X is ${state.players.nameX} and Player O is ${state.players.nameO}`;
});





// document.getElementById("submit-form").addEventListener("click", ()=>{
//     document.getElementsByClassName("status")[0].innerHTML = "test";
// });