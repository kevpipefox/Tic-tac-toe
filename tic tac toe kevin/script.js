var player1 = 'X';
var player2 = 'O';
var endgame = 0;
var currentTurn = 1;
var movesMade = 0
var winnerContainer = $('.winner');
var tieContainer= $('.tie')
var reset = $('.reset');
var sqr = $('.square');
var winningCombos = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
        ];

sqr.on('click', (e) => {
    movesMade++;

    if (endgame == 1){return;
    }
	
	if (event.target.innerHTML === "X" || event.target.innerHTML === "O") {
        return;
    }

    else if (currentTurn % 2 === 1) {
        event.target.innerHTML = player1;
        currentTurn++;

    } else {
        event.target.innerHTML = player2;
        currentTurn--;
    }

    if (checkForWinner()) {
        theWinner = currentTurn == 1 ? player2 : player1;
        declareWinner(theWinner);
    }
    });


reset.on('click', (e) => {
    var moves = Array.prototype.slice.call($(".square"));
    moves.map((m) => {
        m.innerHTML = "";
    });
    winnerContainer.html('');
    winnerContainer.css('display', "none");    
    tieContainer.html('');
    tieContainer.css('display', "none");
    currentTurn = 1;
    movesMade = 0;
    endgame = 0;
});

function declareWinner(winner) {
    winnerContainer.css('display', "block");
    reset.css('display', 'block');
    winner = winner === player1 ? 'Player 1' : 'Player 2';
    winnerContainer.html(winner + " Wins");
    endgame++

}


function declareTie(tie) {
    tieContainer.css('display', "block");
    reset.css('display', 'block');
    tieContainer.html( "Its a Draw!");
    endgame++
}

function checkForWinner() {
        var sqr = $('.square');
        var moves = Array.prototype.slice.call($(".square"));
        var results = moves.map(function(square) { return square.innerHTML; });
        return winningCombos.find(function(combo) {
            if (results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
               return true;
                }
            else if (movesMade == 9) {declareTie()
                }	
            
            else    
            {
                return false; 
            }    
                          
        });

    }
