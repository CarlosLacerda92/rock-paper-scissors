let round         = 0;
let ties          = 0;
let computerScore = 0;
let humanScore    = 0;
const LIMIT       = 5;
const EMOJIS      = {'rock': '&#128074;', 'paper': '&#128400;', 'scissors': '&#9996;'}

const roundSpan       = document.querySelector('span#round');
const winSpan         = document.querySelector('span#wins');
const lossSpan        = document.querySelector('span#losses');
const tieSpan         = document.querySelector('span#ties');
const humanIconDiv    = document.querySelector('span#humanIcon');
const computerIconDiv = document.querySelector('span#computerIcon');
const iconsSection    = document.querySelector('section#icons');
const messageSpan     = document.querySelector('span#message');

const getComputerChoice = () => {
    const choices      = ["rock", "paper", "scissors"];
    const randomNumber = Math.floor(Math.random() * choices.length);
    return choices[randomNumber];
};

const printIcon = (element, icon) => {
    element.innerHTML = EMOJIS[icon];
}

const changeScores = (player) => {

    if (!['human', 'computer', 'tie'].includes(player)) {
        return;
    }

    if (player === 'tie') {
        ties++;
        tieSpan.textContent = ties;
        return;
    }

    if (player === 'human') {
        humanScore++;
        winSpan.textContent = humanScore;
    }
    else {
        computerScore++;
        element = lossSpan;
        lossSpan.textContent = computerScore;
    }
}

const printMessage = (element, message) => {
    element.textContent = message;
}

const playRound = (computerChoice, humanChoice) => {

    if (!humanChoice) {
        return;
    }

    round++;
    roundSpan.textContent = round;

    printIcon(computerIconDiv, computerChoice);
    printIcon(humanIconDiv, humanChoice);
    iconsSection.style.display = 'flex';

    if (computerChoice === humanChoice) {
        changeScores('tie');
        printMessage(messageSpan, `Tie!`);
        return;
    }

    const bothChoices = computerChoice + humanChoice;
    winnerOfTheRound  = 'human';
    scoreElement      = winSpan;

    if (['rockscissors', 'scissorspaper', 'paperrock'].includes(bothChoices)) {
        changeScores('computer');
        printMessage(messageSpan, `You lost!`);
        winnerOfTheRound = 'computer';
        scoreElement      = lossSpan;
    }
    else {
        changeScores('human');
        printMessage(messageSpan, `You won!`);
    }

    const event = new CustomEvent('checkWinner', {
        detail: {
            winner: winnerOfTheRound
        }
    });

    //  Workaround to make the confirm alert box pop up in the correct order (after the message is printed in the DOM).
    setTimeout(() => {
        scoreElement.dispatchEvent(event);
    },
    0);
};

const restartGame = () => {
    round         = 0;
    ties          = 0;
    computerScore = 0;
    humanScore    = 0;

    roundSpan.textContent      = 0;
    winSpan.textContent        = 0;
    lossSpan.textContent       = 0;
    tieSpan.textContent        = 0;
    messageSpan.textContent    = '';
    humanIconDiv.innerHTML     = '';
    computerIconDiv.innerHTML  = '';
}

const showRules = () => {
    alert("Paper, Rock, Scissors rules:\n\nPaper beats Rock\nRock beats Scissors\nScissors beats Paper\n\nChoose your move by clicking one of the three buttons at the bottom of the screen.\nWhoever wins 5 rounds first, wins the game! Good luck!");
}

document.querySelectorAll('section#playableButtons button').forEach((element) => {
    element.addEventListener('click', () => {
        playRound(getComputerChoice(), element.id);
    });
});

document.querySelector('button#restart').addEventListener('click', restartGame);

document.querySelector('button#rules').addEventListener('click', showRules);

document.querySelectorAll('span#wins, span#losses').forEach((element) => {

    element.addEventListener('checkWinner', (event) => {

        const numberOfWinsOrLosses = +event.target.textContent;

        if (numberOfWinsOrLosses === LIMIT) {

            let message = 'Game over!\nYou won! Congratulations!';

            if (event.detail.winner === 'computer') {
                message = 'Game over!\nYou lost! Better luck next time!';
            }

            alert(message);
            restartGame();
        }
    });
});