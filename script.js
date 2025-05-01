let round         = 0;
let ties          = 0;
let computerScore = 0;
let humanScore    = 0;
const limit       = 5;

const roundSpan   = document.querySelector('span#round');
const winSpan     = document.querySelector('span#wins');
const lossSpan    = document.querySelector('span#losses');
const tieSpan     = document.querySelector('span#ties');
const messageSpan = document.querySelector('span#message');

const getComputerChoice = () => {
    const choices      = ["rock", "paper", "scissors"];
    const randomNumber = Math.floor(Math.random() * choices.length);
    return choices[randomNumber];
};

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

    if (computerChoice === humanChoice) {
        changeScores('tie');
        printMessage(messageSpan, `It's a tie! You chose ${humanChoice} and the computer chose ${computerChoice} as well!`);
        return;
    }

    const bothChoices = computerChoice + humanChoice;
    winnerOfTheRound  = 'human';
    scoreElement      = winSpan;

    if (['rockscissors', 'scissorspaper', 'paperrock'].includes(bothChoices)) {
        changeScores('computer');
        printMessage(messageSpan, `You lost this round! ${humanChoice} is beaten by ${computerChoice}!`);
        winnerOfTheRound = 'computer';
        scoreElement      = lossSpan;
    }
    else {
        changeScores('human');
        printMessage(messageSpan, `You won this round! ${humanChoice} beats ${computerChoice}!`);
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

    roundSpan.textContent   = 0;
    winSpan.textContent     = 0;
    lossSpan.textContent    = 0;
    tieSpan.textContent     = 0;
    messageSpan.textContent = '';
}

// Later, try to use event delegation here.
document.querySelectorAll('div#playableButtons button').forEach((element) => {
    element.addEventListener('click', () => {
        playRound(getComputerChoice(), element.id);
    });
});

document.querySelectorAll('div#results span#wins, div#results span#losses').forEach((element) => {

    element.addEventListener('checkWinner', (event) => {

        const numberOfWinsOrLosses = +event.target.textContent;

        if (numberOfWinsOrLosses === limit) {

            let message = 'Game Over!\nYou won! Congratulations!';

            if (event.detail.winner === 'computer') {
                message = 'Game Over!\nYou lost! Better luck next time!';
            }

            alert(message);
            restartGame();
        }
    });
});