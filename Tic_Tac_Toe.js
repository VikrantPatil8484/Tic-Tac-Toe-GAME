alert("                         WELCOME TO  TIC-TAC-TOE! \n 1. This game can be played between two players \n 2. Players can add their own names on the scoreboard \n 3. The scoreboard will keep track of the players wins nd will update the scoreboard by assigning 1 points per win to the player who win the game.\n ")

document.addEventListener('DOMContentLoaded', () => {
    let field = document.getElementsByClassName('field');
    let firstMove = 'X';
    let first = true;
    let active = true;
    let gameState = ['', '', '', '', '', '', '', ''];
    let displayTurn = document.querySelector('h4');
    let restart = document.getElementById('restart');
    let xScore = document.querySelector('.x-score');
    let oScore = document.querySelector('.o-score');

    displayTurn.innerText = displayTurnMessage();

    restart.addEventListener('click', restartGame);

    Array.from(field).forEach((field, index) => {
        field.addEventListener('click', e => handleCellPlayed(e, index));
    });

    function handleCellPlayed(e, index) {
        if (e.target.innerText !== "") {
            return;
        }
        if (!handleResultValidation()) {
            e.target.classList.add("move");
            e.target.innerText = firstMove;
            gameState[index] = firstMove;
            handlePlayerChange(e);

            handleResultValidation();
        }
    }

    function handlePlayerChange(e) {
        if (firstMove == 'X') {
            e.target.innerText == 'X' ? (firstMove = 'O') : (firstMove = 'X');
            displayTurn.innerText = `${firstMove}'s turn`;
        }
        if (firstMove == 'O') {
            e.target.innerText == 'O' ? (firstMove = 'X') : (firstMove = 'O');
            displayTurn.innerText = `${firstMove}'s turn`;
        }
        if (displayTurn.innerText) {
            return '';
        }
    }

    function displayTurnMessage() {
        if (first) {
            return `X starts`;
        } else if (first == false) {
            return `O starts`;
        }
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation(e) {
        let roundWon = false;
        for (var i = 0; i < winningConditions.length; i++) {
            let winningCondition = winningConditions[i];
            let a = gameState[winningCondition[0]];
            let b = gameState[winningCondition[1]];
            let c = gameState[winningCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a == b && b == c) {
                roundWon = true;
                firstMove = a;
                let copy = [...winningCondition];
                markGreen(copy);
                break;
            }
        }
        if (roundWon) {
            displayTurn.innerText = `Player ${firstMove} wins`;
            if (firstMove == "X" && active == true) {
                xScore.innerText = parseInt(+xScore.innerText + 1);
                active = false;
            }
            else if (firstMove == "O" && active == false) {
                oScore.innerText = parseInt(+oScore.innerText + 1);
                active = true;
            }
            return true;
        }
        if (!gameState.includes('')) {
            displayTurn.innerText = 'Draw. No winner';
        }
    }

    function markGreen(copy) {
        let mark = Array.from(field).filter((field, i) => {
            return i == copy[0] || i == copy[1] || i == copy[2]
        })
        for (var i = 0; i < mark.length; i++) {
            mark[i].classList.add("correct");
        }
    }

    function restartGame() {
        gameState.fill('');
        Array.from(field).forEach(field => {
            field.innerText = '';
        });
        first = !first;
        if (first == false) {
            firstMove = 'O';
        } else if (first == true) {
            firstMove = 'X';
        }
        displayTurn.innerText = displayTurnMessage();
        let unmark = Array.from(field).filter(field => {
            field.classList.remove("correct")
        })
    }
});
