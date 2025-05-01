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

    if (!['human', 'computer'].includes(player)) {
        return;
    }

    const event = new CustomEvent('changeScores', {
        detail: {
            winner: player
        }
    });

    if (player === 'human') {
        humanScore++;
        winSpan.textContent = humanScore;
        winSpan.dispatchEvent(event);
    }
    else {
        computerScore++;
        element = lossSpan;
        lossSpan.textContent = computerScore;
        lossSpan.dispatchEvent(event);
    }
}

const playRound = (computerChoice, humanChoice) => {

    if (!humanChoice) {
        return;
    }

    round++;
    roundSpan.textContent = round;

    if (computerChoice === humanChoice) {

        ties++;

        tieSpan.textContent = ties;
        messageSpan.textContent = `It's a tie! You chose ${humanChoice} and the computer chose ${computerChoice} as well!`;

        return;
    }

    let message       = ``;
    const bothChoices = computerChoice + humanChoice;

    if (['rockscissors', 'scissorspaper', 'paperrock'].includes(bothChoices)) {
        changeScores('computer');
        //  Later, try to create a function to print this message into the DOM.
        message = `You lost this round! ${humanChoice} is beaten by ${computerChoice}!`;
        
    }
    else {
        changeScores('human');
        //  Later, try to create a function to print this message into the DOM.
        message = `You won this round! ${humanChoice} beats ${computerChoice}!`;
    }

    messageSpan.textContent = message;
};

// Later, try to use event delegation here.
document.querySelectorAll('div#playableButtons button').forEach((element) => {
    element.addEventListener('click', () => {
        playRound(getComputerChoice(), element.id);
    });
});

document.querySelectorAll('div#results span#wins, div#results span#losses').forEach((element) => {

    element.addEventListener('changeScores', (event) => {

        const numberOfWinsOrLosses = +event.target.textContent;

        
        if (numberOfWinsOrLosses === limit) {
            alert(`${event.detail.winner} wins!`)
        }
    });
});